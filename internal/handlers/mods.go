package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"path/filepath"
	"strings"
	"time"

	"minepanel/internal/docker"

	"github.com/gin-gonic/gin"
)

type ModHandler struct {
	dockerClient *docker.Client
}

type ModrinthVersion struct {
	ID            string         `json:"id"`
	VersionNumber string         `json:"version_number"`
	VersionType   string         `json:"version_type"`
	Loaders       []string       `json:"loaders"`
	GameVersions  []string       `json:"game_versions"`
	Files         []ModrinthFile `json:"files"`
}

type ModrinthFile struct {
	URL      string `json:"url"`
	Filename string `json:"filename"`
	Primary  bool   `json:"primary"`
}

func NewModHandler(dockerClient *docker.Client) *ModHandler {
	return &ModHandler{dockerClient: dockerClient}
}


func (h *ModHandler) InstallMod(c *gin.Context) {
	serverID := c.Param("serverID")
	projectID := c.Param("projectID") // Modrinth project slug or ID
	versionID := c.DefaultQuery("version", "latest")

	if serverID == "" || projectID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "serverID and projectID are required"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	// Validate server type
	serverType, err := h.dockerClient.GetServerType(ctx, serverID)
	if err != nil {
		log.Printf("Error getting server type: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check server type"})
		return
	}

	serverType = strings.ToLower(serverType)
	if serverType != "fabric" && serverType != "forge" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Mods can only be installed on Fabric or Forge servers"})
		return
	}

	loader := serverType // Modrinth uses the same strings for loaders

	// Resolve version and file
	var ver ModrinthVersion
	if versionID == "latest" {
		v, err := h.getLatestVersionForLoader(projectID, loader)
		if err != nil {
			log.Printf("Error getting latest version for project %s: %v", projectID, err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to resolve latest mod version"})
			return
		}
		ver = *v
		versionID = ver.ID
	} else {
		v, err := h.getVersionByID(versionID)
		if err != nil {
			log.Printf("Error getting version by ID %s: %v", versionID, err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch mod version"})
			return
		}
		ver = *v
		// Validate loader compatibility
		compatible := false
		for _, l := range ver.Loaders {
			if strings.ToLower(l) == loader {
				compatible = true
				break
			}
		}
		if !compatible {
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Selected version is not compatible with %s loader", loader)})
			return
		}
	}

	if len(ver.Files) == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No downloadable files found for the selected version"})
		return
	}

	// Pick primary file or first
	file := ver.Files[0]
	for _, f := range ver.Files {
		if f.Primary {
			file = f
			break
		}
	}

	if file.URL == "" || file.Filename == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid file metadata from Modrinth"})
		return
	}

	log.Printf("Downloading mod from Modrinth: %s", file.URL)
	data, err := h.downloadWithRetry(file.URL, 5)
	if err != nil {
		log.Printf("Error downloading mod file: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to download mod file"})
		return
	}

	// Ensure filename is safe
	filename := filepath.Base(file.Filename)
	modPath := fmt.Sprintf("/data/mods/%s", filename)

	if err := h.dockerClient.SaveFileToContainer(ctx, serverID, modPath, data); err != nil {
		log.Printf("Error saving mod to container: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to install mod into container"})
		return
	}

	log.Printf("Successfully installed mod %s to server %s", filename, serverID)
	c.JSON(http.StatusOK, gin.H{
		"message":    "Mod installed successfully",
		"server":     serverID,
		"project":    projectID,
		"version_id": versionID,
		"filename":   filename,
		"path":       modPath,
		"size":       len(data),
		"loader":     loader,
	})
}

func (h *ModHandler) getLatestVersionForLoader(projectID, loader string) (*ModrinthVersion, error) {
	url := fmt.Sprintf("https://api.modrinth.com/v2/project/%s/version", projectID)
	versions, err := h.fetchVersions(url)
	if err != nil {
		return nil, err
	}
	// Prefer release type and matching loader
	for _, v := range versions {
		if strings.ToLower(v.VersionType) == "release" {
			for _, l := range v.Loaders {
				if strings.ToLower(l) == loader {
					return &v, nil
				}
			}
		}
	}
	// Fallback to any matching loader
	for _, v := range versions {
		for _, l := range v.Loaders {
			if strings.ToLower(l) == loader {
				return &v, nil
			}
		}
	}
	return nil, fmt.Errorf("no compatible versions found for loader %s", loader)
}

func (h *ModHandler) getVersionByID(versionID string) (*ModrinthVersion, error) {
	url := fmt.Sprintf("https://api.modrinth.com/v2/version/%s", versionID)
	client := &http.Client{Timeout: 20 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("HTTP status %d", resp.StatusCode)
	}
	var v ModrinthVersion
	if err := json.NewDecoder(resp.Body).Decode(&v); err != nil {
		return nil, err
	}
	return &v, nil
}

func (h *ModHandler) fetchVersions(url string) ([]ModrinthVersion, error) {
	client := &http.Client{Timeout: 20 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("HTTP status %d", resp.StatusCode)
	}
	var versions []ModrinthVersion
	if err := json.NewDecoder(resp.Body).Decode(&versions); err != nil {
		return nil, err
	}
	return versions, nil
}

func (h *ModHandler) downloadWithRetry(url string, maxRetries int) ([]byte, error) {
	var lastErr error
	for attempt := 1; attempt <= maxRetries; attempt++ {
		client := &http.Client{Timeout: 45 * time.Second}
		resp, err := client.Get(url)
		if err != nil {
			lastErr = err
			log.Printf("Download attempt %d failed: %v", attempt, err)
		} else {
			if resp.StatusCode == http.StatusOK {
				data, err := io.ReadAll(resp.Body)
				resp.Body.Close()
				if err == nil && len(data) > 0 {
					return data, nil
				}
				lastErr = fmt.Errorf("failed to read body: %v", err)
			} else {
				resp.Body.Close()
				lastErr = fmt.Errorf("HTTP status %d", resp.StatusCode)
			}
		}
		if attempt < maxRetries {
			time.Sleep(time.Duration(attempt*attempt) * time.Second)
		}
	}
	return nil, fmt.Errorf("download failed after %d attempts: %v", maxRetries, lastErr)
}

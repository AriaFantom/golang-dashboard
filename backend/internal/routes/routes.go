package routes

import (
	"minepanel-backend/internal/handlers"

	"github.com/gofiber/fiber/v3"
)

func Setup(app *fiber.App) {
	// API v1 routes
	api := app.Group("/api/v1")

	// Health check
	api.Get("/health", handlers.HealthCheck)

	// Auth routes
	auth := api.Group("/auth")
	auth.Post("/login", handlers.Login)
	auth.Post("/register", handlers.Register)

	// Panel routes (protected)
	panel := api.Group("/panel")
	// panel.Use(middleware.AuthRequired()) // Uncomment when auth middleware is ready
	panel.Get("/", handlers.GetPanels)
	panel.Post("/", handlers.CreatePanel)
	panel.Get("/:id", handlers.GetPanel)
	panel.Put("/:id", handlers.UpdatePanel)
	panel.Delete("/:id", handlers.DeletePanel)

	// Server management routes
	server := panel.Group("/:id/server")
	server.Get("/status", handlers.GetServerStatus)
	server.Post("/start", handlers.StartServer)
	server.Post("/stop", handlers.StopServer)
	server.Post("/restart", handlers.RestartServer)

	// Console routes
	console := panel.Group("/:id/console")
	console.Get("/logs", handlers.GetConsoleLogs)
	console.Post("/command", handlers.SendCommand)

	// Files routes
	files := panel.Group("/:id/files")
	files.Get("/", handlers.ListFiles)
	files.Get("/download", handlers.DownloadFile)
	files.Post("/upload", handlers.UploadFile)
	files.Put("/", handlers.UpdateFile)
	files.Delete("/", handlers.DeleteFile)

	// Players routes
	players := panel.Group("/:id/players")
	players.Get("/", handlers.GetPlayers)
	players.Post("/kick", handlers.KickPlayer)
	players.Post("/ban", handlers.BanPlayer)

	// World management routes
	worlds := panel.Group("/:id/worlds")
	worlds.Get("/", handlers.GetWorlds)
	worlds.Post("/backup", handlers.BackupWorld)
	worlds.Post("/restore", handlers.RestoreWorld)

	// Mods/Plugins routes
	mods := panel.Group("/:id/mods")
	mods.Get("/", handlers.GetMods)
	mods.Post("/install", handlers.InstallMod)
	mods.Delete("/:modId", handlers.UninstallMod)

	// Configuration routes
	config := panel.Group("/:id/config")
	config.Get("/", handlers.GetConfig)
	config.Put("/", handlers.UpdateConfig)
}

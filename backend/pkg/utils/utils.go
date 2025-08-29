package utils

import (
	"crypto/rand"
	"encoding/hex"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}


func CheckPassword(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func GenerateRandomString(length int) (string, error) {
	bytes := make([]byte, length)
	if _, err := rand.Read(bytes); err != nil {
		return "", err
	}
	return hex.EncodeToString(bytes), nil
}

func Contains(slice []string, item string) bool {
	for _, s := range slice {
		if s == item {
			return true
		}
	}
	return false
}

func ValidateServerType(serverType string) bool {
	validTypes := []string{"vanilla", "bukkit", "spigot", "paper", "forge", "fabric"}
	return Contains(validTypes, serverType)
}

func ValidateDifficulty(difficulty string) bool {
	validDifficulties := []string{"peaceful", "easy", "normal", "hard"}
	return Contains(validDifficulties, difficulty)
}


func ValidateGamemode(gamemode string) bool {
	validGamemodes := []string{"survival", "creative", "adventure", "spectator"}
	return Contains(validGamemodes, gamemode)
}

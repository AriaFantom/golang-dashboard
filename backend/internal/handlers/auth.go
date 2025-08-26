package handlers

import (
	"github.com/gofiber/fiber/v3"
)

// HealthCheck returns the health status of the API
func HealthCheck(c fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"status":  "ok",
		"message": "MinePanel API is running",
		"version": "1.0.0",
	})
}

// Auth handlers
func Login(c fiber.Ctx) error {
	// TODO: Implement login logic
	return c.JSON(fiber.Map{
		"message": "Login endpoint - to be implemented",
	})
}

func Register(c fiber.Ctx) error {
	// TODO: Implement register logic
	return c.JSON(fiber.Map{
		"message": "Register endpoint - to be implemented",
	})
}

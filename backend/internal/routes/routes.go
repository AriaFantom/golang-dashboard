package routes

import (
	"backend/internal/handlers"

	"github.com/gofiber/fiber/v3"
)

func Setup(app *fiber.App) {

	app.Get("/", handlers.HealthCheck)

	api := app.Group("/api")

	auth := api.Group("/auth")
	auth.Post("/login", handlers.Login)
	auth.Post("/register", handlers.Register)

}

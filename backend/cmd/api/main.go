package main

import (
	"backend/internal/config"
	"backend/internal/routes"
	"log"
	"os"

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/cors"
	"github.com/gofiber/fiber/v3/middleware/logger"
)

func main() {
	cfg := config.Load()

	app := fiber.New(fiber.Config{
		AppName: "MinePanel API",
		ErrorHandler: func(c fiber.Ctx, err error) error {
			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}
			return c.Status(code).JSON(fiber.Map{
				"error": err.Error(),
			})
		},
	})

	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "HEAD", "PUT", "DELETE", "PATCH"},
		AllowHeaders: []string{"Origin", "Content-Type", "Accept", "Authorization"},
	}))

	// Setup routes

	routes.Setup(app)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = cfg.Addr
	}

	log.Printf("🚀 Server starting on port %s", port)
	log.Fatal(app.Listen(":" + port))
}

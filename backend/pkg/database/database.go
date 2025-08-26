package database

import (
	"minepanel-backend/internal/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Database holds the database connection
type Database struct {
	DB *gorm.DB
}

// NewDatabase creates a new database connection
func NewDatabase(databaseURL string) (*Database, error) {
	// For SQLite
	db, err := gorm.Open(sqlite.Open(databaseURL), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	// Auto-migrate models
	err = db.AutoMigrate(
		&models.User{},
		&models.Panel{},
		&models.ServerConfig{},
		&models.Player{},
		&models.Backup{},
		&models.Mod{},
	)
	if err != nil {
		return nil, err
	}

	return &Database{DB: db}, nil
}

// Close closes the database connection
func (d *Database) Close() error {
	sqlDB, err := d.DB.DB()
	if err != nil {
		return err
	}
	return sqlDB.Close()
}

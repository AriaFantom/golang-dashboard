package models

import (
	"time"
)

// User represents a user in the system
type User struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Email     string    `json:"email" gorm:"unique;not null"`
	Username  string    `json:"username" gorm:"unique;not null"`
	Password  string    `json:"-" gorm:"not null"`
	Role      string    `json:"role" gorm:"default:user"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Panel represents a Minecraft server panel
type Panel struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Name        string    `json:"name" gorm:"not null"`
	Description string    `json:"description"`
	ServerType  string    `json:"server_type"` // vanilla, bukkit, spigot, paper, forge, fabric
	Version     string    `json:"version"`
	Port        int       `json:"port" gorm:"unique;not null"`
	MaxRAM      int       `json:"max_ram"` // in MB
	Status      string    `json:"status"`  // stopped, starting, running, stopping
	UserID      uint      `json:"user_id"`
	User        User      `json:"user" gorm:"foreignKey:UserID"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

// ServerConfig represents server configuration
type ServerConfig struct {
	ID                 uint   `json:"id" gorm:"primaryKey"`
	PanelID            uint   `json:"panel_id"`
	Panel              Panel  `json:"panel" gorm:"foreignKey:PanelID"`
	MaxPlayers         int    `json:"max_players" gorm:"default:20"`
	Difficulty         string `json:"difficulty" gorm:"default:normal"`
	Gamemode           string `json:"gamemode" gorm:"default:survival"`
	PVP                bool   `json:"pvp" gorm:"default:true"`
	OnlineMode         bool   `json:"online_mode" gorm:"default:true"`
	Whitelist          bool   `json:"whitelist" gorm:"default:false"`
	MOTD               string `json:"motd" gorm:"default:A Minecraft Server"`
	ViewDistance       int    `json:"view_distance" gorm:"default:10"`
	SimulationDistance int    `json:"simulation_distance" gorm:"default:10"`
}

// Player represents a player on the server
type Player struct {
	ID       uint      `json:"id" gorm:"primaryKey"`
	PanelID  uint      `json:"panel_id"`
	Panel    Panel     `json:"panel" gorm:"foreignKey:PanelID"`
	Username string    `json:"username" gorm:"not null"`
	UUID     string    `json:"uuid" gorm:"unique"`
	IsOnline bool      `json:"is_online" gorm:"default:false"`
	IsBanned bool      `json:"is_banned" gorm:"default:false"`
	IsOp     bool      `json:"is_op" gorm:"default:false"`
	LastSeen time.Time `json:"last_seen"`
}

// Backup represents a world backup
type Backup struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	PanelID     uint      `json:"panel_id"`
	Panel       Panel     `json:"panel" gorm:"foreignKey:PanelID"`
	Name        string    `json:"name" gorm:"not null"`
	Description string    `json:"description"`
	FilePath    string    `json:"file_path" gorm:"not null"`
	Size        int64     `json:"size"` // in bytes
	CreatedAt   time.Time `json:"created_at"`
}

// Mod represents an installed mod/plugin
type Mod struct {
	ID          uint   `json:"id" gorm:"primaryKey"`
	PanelID     uint   `json:"panel_id"`
	Panel       Panel  `json:"panel" gorm:"foreignKey:PanelID"`
	Name        string `json:"name" gorm:"not null"`
	Version     string `json:"version"`
	Description string `json:"description"`
	Author      string `json:"author"`
	Enabled     bool   `json:"enabled" gorm:"default:true"`
	FilePath    string `json:"file_path" gorm:"not null"`
}

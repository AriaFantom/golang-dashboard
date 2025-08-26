# MinePanel Backend

A Golang-based backend API for managing Minecraft servers using the Fiber web framework.

## Features

- **Server Management**: Start, stop, restart Minecraft servers
- **Real-time Console**: Execute commands and view server logs
- **File Management**: Upload, download, edit server files
- **Player Management**: View online players, kick/ban users
- **World Management**: Backup and restore worlds
- **Mod/Plugin Management**: Install and manage server modifications
- **Configuration**: Easy server configuration management
- **User Authentication**: JWT-based authentication system

## Project Structure

```
backend/
├── cmd/
│   └── api/
│       └── main.go              # Application entry point
├── internal/
│   ├── config/
│   │   └── config.go            # Configuration management
│   ├── handlers/
│   │   ├── auth.go              # Authentication handlers
│   │   ├── server.go            # Server management handlers
│   │   ├── files.go             # File management handlers
│   │   └── minecraft.go         # Minecraft-specific handlers
│   ├── middleware/
│   │   └── auth.go              # Authentication middleware
│   ├── models/
│   │   └── models.go            # Database models
│   ├── routes/
│   │   └── routes.go            # Route definitions
│   └── services/
│       └── minecraft.go         # Minecraft server services
├── pkg/
│   ├── database/
│   │   └── database.go          # Database connection
│   └── utils/
│       └── utils.go             # Utility functions
├── .env.example                 # Environment variables example
└── README.md                    # This file
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration

### Panel Management
- `GET /api/v1/panel` - Get all panels
- `POST /api/v1/panel` - Create new panel
- `GET /api/v1/panel/:id` - Get specific panel
- `PUT /api/v1/panel/:id` - Update panel
- `DELETE /api/v1/panel/:id` - Delete panel

### Server Management
- `GET /api/v1/panel/:id/server/status` - Get server status
- `POST /api/v1/panel/:id/server/start` - Start server
- `POST /api/v1/panel/:id/server/stop` - Stop server
- `POST /api/v1/panel/:id/server/restart` - Restart server

### Console Management
- `GET /api/v1/panel/:id/console/logs` - Get console logs
- `POST /api/v1/panel/:id/console/command` - Send command to server

### File Management
- `GET /api/v1/panel/:id/files` - List files
- `GET /api/v1/panel/:id/files/download` - Download file
- `POST /api/v1/panel/:id/files/upload` - Upload file
- `PUT /api/v1/panel/:id/files` - Update file
- `DELETE /api/v1/panel/:id/files` - Delete file

### Player Management
- `GET /api/v1/panel/:id/players` - Get players
- `POST /api/v1/panel/:id/players/kick` - Kick player
- `POST /api/v1/panel/:id/players/ban` - Ban player

### World Management
- `GET /api/v1/panel/:id/worlds` - Get worlds
- `POST /api/v1/panel/:id/worlds/backup` - Backup world
- `POST /api/v1/panel/:id/worlds/restore` - Restore world

### Mod/Plugin Management
- `GET /api/v1/panel/:id/mods` - Get installed mods
- `POST /api/v1/panel/:id/mods/install` - Install mod
- `DELETE /api/v1/panel/:id/mods/:modId` - Uninstall mod

### Configuration
- `GET /api/v1/panel/:id/config` - Get server config
- `PUT /api/v1/panel/:id/config` - Update server config

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   go mod tidy
   ```

2. **Set up Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your configurations
   ```

3. **Run the Application**:
   ```bash
   go run cmd/api/main.go
   ```

4. **Health Check**:
   ```bash
   curl http://localhost:8080/api/v1/health
   ```

## Dependencies

- **Fiber v3**: Web framework
- **GORM**: ORM for database operations
- **SQLite**: Default database (configurable)
- **bcrypt**: Password hashing
- **JWT**: Authentication tokens

## Environment Variables

- `PORT`: Server port (default: 8080)
- `DATABASE_URL`: Database connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `ENVIRONMENT`: Application environment (development/production)
- `MINECRAFT_SERVERS_PATH`: Path to store Minecraft server files
- `JAVA_PATH`: Path to Java executable

## TODO

- [ ] Implement JWT authentication
- [ ] Add database integration
- [ ] Implement Minecraft server process management
- [ ] Add WebSocket support for real-time console
- [ ] Implement file upload/download functionality
- [ ] Add comprehensive error handling
- [ ] Write unit tests
- [ ] Add Docker support
- [ ] Implement backup scheduling
- [ ] Add monitoring and logging

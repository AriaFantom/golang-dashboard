"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Crown, UserX, Ban } from "lucide-react"


export function PlayerList() {
  const [searchTerm, setSearchTerm] = useState("")

  const [players] = useState([
    {
      id: "1",
      username: "Steve_Builder",
      uuid: "550e8400-e29b-41d4-a716-446655440000",
      status: "online",
      isOp: true,
      joinDate: "2024-01-10",
      lastSeen: "Now",
      playtime: "45h 23m",
    },
    {
      id: "2",
      username: "Alex_Miner",
      uuid: "550e8400-e29b-41d4-a716-446655440001",
      status: "online",
      isOp: false,
      joinDate: "2024-01-12",
      lastSeen: "Now",
      playtime: "32h 15m",
    },
    {
      id: "3",
      username: "Creeper_Hunter",
      uuid: "550e8400-e29b-41d4-a716-446655440002",
      status: "offline",
      isOp: false,
      joinDate: "2024-01-08",
      lastSeen: "2 hours ago",
      playtime: "67h 42m",
    },
    {
      id: "4",
      username: "Redstone_Master",
      uuid: "550e8400-e29b-41d4-a716-446655440003",
      status: "online",
      isOp: false,
      joinDate: "2024-01-15",
      lastSeen: "Now",
      playtime: "12h 8m",
    },
    {
      id: "5",
      username: "Diamond_Digger",
      uuid: "550e8400-e29b-41d4-a716-446655440004",
      status: "offline",
      isOp: false,
      joinDate: "2024-01-05",
      lastSeen: "1 day ago",
      playtime: "89h 31m",
    },
  ])

  const filteredPlayers = players.filter((player) => player.username.toLowerCase().includes(searchTerm.toLowerCase()))

  const onlinePlayers = filteredPlayers.filter((p) => p.status === "online")
  const offlinePlayers = filteredPlayers.filter((p) => p.status === "offline")

  const handleOp = (playerId) => {
    console.log(`Making player ${playerId} an operator`)
  }

  const handleKick = (playerId) => {
    console.log(`Kicking player ${playerId}`)
  }

  const handleBan = (playerId) => {
    console.log(`Banning player ${playerId}`)
  }

  const PlayerCard = ({ player }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Minecraft Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            {player.username.charAt(0)}
          </div>

          {/* Player Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{player.username}</h3>
              {player.isOp && (
                <Badge variant="secondary" className="text-xs">
                  <Crown className="h-3 w-3 mr-1" />
                  OP
                </Badge>
              )}
              <Badge variant={player.status === "online" ? "default" : "secondary"} className="text-xs">
                {player.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              <div>Playtime: {player.playtime}</div>
              <div>Last seen: {player.lastSeen}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1">
            {!player.isOp && (
              <Button size="sm" variant="outline" onClick={() => handleOp(player.id)} className="text-xs">
                <Crown className="h-3 w-3 mr-1" />
                OP
              </Button>
            )}
            {player.status === "online" && (
              <Button size="sm" variant="outline" onClick={() => handleKick(player.id)} className="text-xs">
                <UserX className="h-3 w-3 mr-1" />
                Kick
              </Button>
            )}
            <Button size="sm" variant="destructive" onClick={() => handleBan(player.id)} className="text-xs">
              <Ban className="h-3 w-3 mr-1" />
              Ban
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Player Management</h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Online: {onlinePlayers.length}</span>
              <span>Total: {players.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Online Players */}
      {onlinePlayers.length > 0 && (
        <div>
          <h3 className="text-md font-semibold mb-3 text-green-600">
            Online Players ({onlinePlayers.length})
          </h3>
          <div className="grid gap-3">
            {onlinePlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      )}

      {/* Offline Players */}
      {offlinePlayers.length > 0 && (
        <div>
          <h3 className="text-md font-semibold mb-3 text-gray-600">
            Offline Players ({offlinePlayers.length})
          </h3>
          <div className="grid gap-3">
            {offlinePlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      )}

      {filteredPlayers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">
              No players found matching your search.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

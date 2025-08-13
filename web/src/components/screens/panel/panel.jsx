"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Square, RotateCcw } from "lucide-react";

const mockServers = [
  {
    id: "1",
    name: "Creative World",
    version: "1.20.4",
    type: "vanilla",
    status: "running",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Survival Plus",
    version: "1.20.1",
    type: "fabric",
    status: "stopped",
    createdAt: "2024-02-03",
  },
  {
    id: "3",
    name: "PvP Arena",
    version: "1.19.4",
    type: "spigot",
    status: "starting",
    createdAt: "2024-01-28",
  },
  {
    id: "4",
    name: "Modded Adventure",
    version: "1.20.2",
    type: "forge",
    status: "running",
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    name: "Mini Games Hub",
    version: "1.20.4",
    type: "paper",
    status: "stopped",
    createdAt: "2024-01-20",
  },
  {
    id: "6",
    name: "Skyblock Server",
    version: "1.20.1",
    type: "spigot",
    status: "running",
    createdAt: "2024-02-05",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "running":
      return "bg-green-500";
    case "starting":
      return "bg-yellow-500";
    case "stopped":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusAnimation = (status) => {
  return "animate-pulse";
};

const getTypeColor = (type) => {
  switch (type) {
    case "vanilla":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200";
    case "fabric":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "spigot":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    case "forge":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "paper":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export const ServerDashboard = () => {
  const [servers, setServers] = useState(mockServers);

  const handleServerAction = (serverId, action) => {
    setServers((prevServers) =>
      prevServers.map((server) => {
        if (server.id === serverId) {
          switch (action) {
            case "start":
              return { ...server, status: "starting" };
            case "stop":
              return { ...server, status: "stopped" };
            case "restart":
              return { ...server, status: "starting" };
            default:
              return server;
          }
        }
        return server;
      })
    );

    // Simulate server state changes
    if (action === "start" || action === "restart") {
      setTimeout(() => {
        setServers((prevServers) =>
          prevServers.map((server) =>
            server.id === serverId ? { ...server, status: "running" } : server
          )
        );
      }, 3000);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servers.map((server) => (
        <Card key={server.id} className="relative">
          {/* Status indicator dot */}
          <div className="absolute -top-1 -right-1 z-10">
            <div
              className={`w-4 h-4 rounded-full ${getStatusColor(
                server.status
              )} ${getStatusAnimation(
                server.status
              )} border-2 border-background`}
              title={`Status: ${server.status}`}
            />
          </div>

          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold pr-6">
              {server.name}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Version:</span>
                <span className="text-sm font-medium">{server.version}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type:</span>
                <Badge
                  variant="secondary"
                  className={getTypeColor(server.type)}
                >
                  {server.type.charAt(0).toUpperCase() + server.type.slice(1)}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created:</span>
                <span className="text-sm font-medium">
                  {new Date(server.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => handleServerAction(server.id, "start")}
                disabled={
                  server.status === "running" || server.status === "starting"
                }
              >
                <Play className="w-4 h-4 mr-1" />
                Start
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => handleServerAction(server.id, "stop")}
                disabled={server.status === "stopped"}
              >
                <Square className="w-4 h-4 mr-1" />
                Stop
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => handleServerAction(server.id, "restart")}
                disabled={
                  server.status === "stopped" || server.status === "starting"
                }
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Restart
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Download } from "lucide-react"


const mockPlugins = [
  {
    id: "1",
    name: "EssentialsX",
    provider: "SpigotMC",
    version: "2.20.1",
    description: "The essential plugin suite for Bukkit servers",
    image: "/essentials-plugin-icon.png",
  },
  {
    id: "2",
    name: "WorldEdit",
    provider: "EngineHub",
    version: "7.2.15",
    description: "Fast world editing for builders, large networks and developers",
    image: "/worldedit-plugin-icon.png",
  },
  {
    id: "3",
    name: "Vault",
    provider: "SpigotMC",
    version: "1.7.3",
    description: "Vault is a Economy/Permission plugin for hooking into the various Economy plugins",
    image: "/vault-plugin-icon.png",
  },
  {
    id: "4",
    name: "LuckPerms",
    provider: "LuckPerms",
    version: "5.4.102",
    description: "A permissions plugin for Minecraft servers",
    image: "/luckperms-plugin-icon.png",
  },
  {
    id: "5",
    name: "PlaceholderAPI",
    provider: "PlaceholderAPI",
    version: "2.11.4",
    description: "A resource that allows information from other plugins to be shown everywhere",
    image: "/placeholderapi-plugin-icon.png",
  },
  {
    id: "6",
    name: "Citizens",
    provider: "CitizensDev",
    version: "2.0.32",
    description: "The original Bukkit NPC plugin",
    image: "/citizens-plugin-icon.png",
  },
  {
    id: "7",
    name: "WorldGuard",
    provider: "EngineHub",
    version: "7.0.9",
    description: "Protect areas of your world so only certain people can build in them",
    image: "/worldguard-plugin-icon.png",
  },
  {
    id: "8",
    name: "Multiverse-Core",
    provider: "Multiverse",
    version: "4.3.1",
    description: "The original Bukkit Multi-World plugin",
    image: "/multiverse-plugin-icon.png",
  },
  {
    id: "9",
    name: "ChestShop",
    provider: "ChestShop-authors",
    version: "3.12.2",
    description: "A chest shop plugin for economy servers",
    image: "/chestshop-icon.png",
  },
  {
    id: "10",
    name: "Dynmap",
    provider: "mikeprimm",
    version: "3.6",
    description: "A Google Maps-like map for your Minecraft server",
    image: "/placeholder-8x8aq.png",
  },
  {
    id: "11",
    name: "GriefPrevention",
    provider: "BigScary",
    version: "16.18",
    description: "Prevents grief without any effort from administrators",
    image: "/griefprevention-icon.png",
  },
  {
    id: "12",
    name: "McMMO",
    provider: "nossr50",
    version: "2.1.220",
    description: "The RPG skills plugin with a level cap of your choice",
    image: "/mcmmo-plugin-icon.png",
  },
  {
    id: "13",
    name: "Holographic Displays",
    provider: "filoghost",
    version: "3.0.0",
    description: "Create holograms in your server",
    image: "/holographic-displays-plugin-icon.png",
  },
  {
    id: "14",
    name: "ProtocolLib",
    provider: "dmulloy2",
    version: "5.1.0",
    description: "Provides read and write access to the Minecraft protocol",
    image: "/protocollib-plugin-icon.png",
  },
  {
    id: "15",
    name: "Jobs Reborn",
    provider: "GamingMesh",
    version: "5.2.2.2",
    description: "Jobs plugin for minecraft with leveling mechanic",
    image: "/jobs-reborn-icon.png",
  },
]

export function PluginsComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredPlugins = mockPlugins.filter(
    (plugin) =>
      plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPlugins.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPlugins = filteredPlugins.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleInstall = (pluginName) => {
    console.log(`Installing plugin: ${pluginName}`);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search plugins..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Plugins Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPlugins.map((plugin) => (
          <Card key={plugin.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <img
                  src={plugin.image || "/placeholder.svg"}
                  alt={plugin.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">
                    {plugin.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    by {plugin.provider}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    v{plugin.version}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {plugin.description}
              </p>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={() => handleInstall(plugin.name)}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Install
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

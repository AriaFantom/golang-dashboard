"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Download, FolderOpen, Settings, RotateCcw } from "lucide-react"
import { WorldConfig } from "./world-config"


export function WorldsPage() {
  const [selectedWorld, setSelectedWorld] = useState(null)
  const [showConfig, setShowConfig] = useState(false)

  const worlds = [
    {
      id: "1",
      name: "world",
      type: "overworld",
      createdAt: "2024-01-15",
      size: "2.4 GB",
    },
    {
      id: "2",
      name: "world_nether",
      type: "nether",
      createdAt: "2024-01-15",
      size: "856 MB",
    },
    {
      id: "3",
      name: "world_the_end",
      type: "end",
      createdAt: "2024-01-15",
      size: "124 MB",
    },
  ]

  const handleConfigClick = (world) => {
    setSelectedWorld(world)
    setShowConfig(true)
  }

  const handleBackToWorlds = () => {
    setShowConfig(false)
    setSelectedWorld(null)
  }

  if (showConfig && selectedWorld) {
    return <WorldConfig world={selectedWorld} onBack={handleBackToWorlds} />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">World Management</h2>
        <p className="text-muted-foreground">Manage your server worlds and their configurations</p>
      </div>

      <div className="grid gap-4">
        {worlds.map((world) => (
          <Card key={world.id} className="p-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {/* Left side - World info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <FolderOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{world.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Created: {world.createdAt}</span>
                      <span>Size: {world.size}</span>
                      <span className="capitalize">{world.type}</span>
                    </div>
                  </div>
                </div>

                {/* Right side - Action buttons */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Files
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleConfigClick(world)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Config
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

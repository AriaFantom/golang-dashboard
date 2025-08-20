"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Terminal, FolderOpen, Archive, Puzzle, Settings, Users, ChevronLeft, ChevronRight } from "lucide-react"



const sidebarItems = [
  { id: "console", label: "Console", icon: Terminal },
  { id: "files", label: "File Manager", icon: FolderOpen },
  { id: "backup", label: "Backup", icon: Archive },
  { id: "mods", label: "Mods", icon: Puzzle },
  { id: "plugins", label: "Plugins", icon: Puzzle },
  { id: "config", label: "Server Config", icon: Settings },
  { id: "players", label: "Player List", icon: Users },
]

export function Sidebar({ activeTab, onTabChange }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn("bg-background border-r transition-all duration-300 flex flex-col z-10", isCollapsed ? "w-16" : "w-64")}
    >
      {/* Sidebar Header */}
      <div className="py-4 px-4 h-18 border-b flex items-center justify-between">
        {!isCollapsed && <h3 className="font-semibold text-sm text-muted-foreground">SERVER PANEL</h3>}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <Button
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-3 h-10", isCollapsed && "justify-center px-2")}
                  onClick={() => onTabChange(item.id)}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

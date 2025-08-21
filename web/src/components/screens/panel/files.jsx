"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Folder, File, Upload, Download, Trash2, Search, FileText, ImageIcon, Archive } from "lucide-react"


export function FileManager() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const [files] = useState([
    { id: "1", name: "world", type: "folder", modified: "2024-01-15 14:30" },
    { id: "2", name: "plugins", type: "folder", modified: "2024-01-14 09:15" },
    { id: "7", name: "logs", type: "folder", modified: "2024-01-15 16:50" },
    {
      id: "3",
      name: "server.properties",
      type: "file",
      size: "2.1 KB",
      modified: "2024-01-15 16:45",
      extension: "properties",
    },
    {
      id: "4",
      name: "server.jar",
      type: "file",
      size: "45.2 MB",
      modified: "2024-01-10 12:00",
      extension: "jar",
    },
    {
      id: "5",
      name: "whitelist.json",
      type: "file",
      size: "156 B",
      modified: "2024-01-15 11:20",
      extension: "json",
    },
    {
      id: "6",
      name: "banned-players.json",
      type: "file",
      size: "89 B",
      modified: "2024-01-12 08:30",
      extension: "json",
    },

    {
      id: "8",
      name: "backup.zip",
      type: "file",
      size: "128.5 MB",
      modified: "2024-01-14 20:15",
      extension: "zip",
    },
  ]);

  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([])
    } else {
      setSelectedFiles(filteredFiles.map((file) => file.id))
    }
  }

  const handleFileSelect = (fileId) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]))
  }

  const getFileIcon = (file) => {
    if (file.type === "folder") return <Folder className="h-5 w-5 text-blue-500" />

    switch (file.extension) {
      case "zip":
      case "rar":
        return <Archive className="h-5 w-5 text-orange-500" />
      case "png":
      case "jpg":
      case "jpeg":
        return <ImageIcon className="h-5 w-5 text-green-500" />
      case "json":
      case "properties":
      case "txt":
        return <FileText className="h-5 w-5 text-gray-500" />
      default:
        return <File className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">File Manager</h2>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button size="sm" variant="outline" disabled={selectedFiles.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button size="sm" onClick={handleSelectAll}>
              {selectedFiles.length === filteredFiles.length ? "Deselect All" : "Select All"}
            </Button>
            {selectedFiles.length > 0 && (
              <Button size="sm" variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete ({selectedFiles.length})
              </Button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              className={`flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary cursor-pointer transition-colors ${
                selectedFiles.includes(file.id) ? " bg-sidebar-accent border-primary" : ""
              }`}
            >
              <Checkbox checked={selectedFiles.includes(file.id)} onCheckedChange={() => handleFileSelect(file.id)} />
              {getFileIcon(file)}
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{file.name}</div>
                <div className="text-sm text-muted-foreground">
                  {file.size && `${file.size} • `}Modified {file.modified}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

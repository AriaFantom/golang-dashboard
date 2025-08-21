"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Download } from "lucide-react";

const mockMods = [
  {
    id: "1",
    name: "JEI (Just Enough Items)",
    provider: "CurseForge",
    version: "15.2.0.27",
    description: "Item and Recipe viewing mod for Minecraft",
    image: "/jei-mod-icon.png",
  },
  {
    id: "2",
    name: "Optifine",
    provider: "OptiFine",
    version: "1.20.1_HD_U_I6",
    description: "Minecraft optimization mod",
    image: "/optifine-mod-icon.png",
  },
  {
    id: "3",
    name: "Biomes O' Plenty",
    provider: "CurseForge",
    version: "18.0.0.592",
    description: "Adds over 80 unique biomes to enhance your world",
    image: "/biomes-o-plenty-icon.png",
  },
  {
    id: "4",
    name: "Applied Energistics 2",
    provider: "CurseForge",
    version: "15.0.16",
    description:
      "A Mod about Matter, Energy and using them to conquer the world",
    image: "/applied-energistics-icon.png",
  },
  {
    id: "5",
    name: "Thermal Expansion",
    provider: "CurseForge",
    version: "10.0.1.18",
    description:
      "Expanding Minecraft Thermally! A server-friendly and content-rich blend of magic and technology!",
    image: "/thermal-expansion-mod-icon.png",
  },
  {
    id: "6",
    name: "Iron Chests",
    provider: "CurseForge",
    version: "14.4.4",
    description: "New chests with larger sizes, with in-place upgrade items",
    image: "/iron-chests-mod-icon.png",
  },
  {
    id: "7",
    name: "Tinkers' Construct",
    provider: "CurseForge",
    version: "3.7.1.185",
    description: "Modify all the things, then do it again!",
    image: "/tinkers-construct-icon.png",
  },
  {
    id: "8",
    name: "IndustrialCraft 2",
    provider: "CurseForge",
    version: "2.8.222",
    description: "Industrial age themed expansion for Minecraft",
    image: "/industrialcraft2-icon.png",
  },
  {
    id: "9",
    name: "BuildCraft",
    provider: "CurseForge",
    version: "7.99.24.9",
    description:
      "Extending Minecraft with pipes, auto-crafting, quarries, engines and much more!",
    image: "/placeholder-jk6p5.png",
  },
  {
    id: "10",
    name: "Forestry",
    provider: "CurseForge",
    version: "5.19.7.422",
    description: "Trees, bees and butterflies",
    image: "/forestry-mod-icon.png",
  },
  {
    id: "11",
    name: "Thaumcraft",
    provider: "CurseForge",
    version: "6.1.BETA26",
    description: "Thaumaturgy is the capability of a magician to work miracles",
    image: "/thaumcraft-mod-icon.png",
  },
  {
    id: "12",
    name: "Botania",
    provider: "CurseForge",
    version: "1.20.1-444",
    description: "An innovative natural magic themed tech mod",
    image: "/botania-mod-icon.png",
  },
  {
    id: "13",
    name: "Chisel",
    provider: "CurseForge",
    version: "1.0.44",
    description: "Adds a huge variety of static blocks to the game",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "14",
    name: "Carpenter's Blocks",
    provider: "CurseForge",
    version: "3.3.8.1",
    description: "Adds slopes and a variety of vanilla-inspired blocks",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "15",
    name: "Twilight Forest",
    provider: "CurseForge",
    version: "4.3.2145",
    description: "Adventure awaits in a realm of eternal twilight",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "16",
    name: "Mystcraft",
    provider: "CurseForge",
    version: "0.12.3.04",
    description:
      "Allows players to create their own Ages (dimensions) to explore",
    image: "/placeholder.svg?height=64&width=64",
  },
];

export function ModsComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredMods = mockMods.filter(
    (mod) =>
      mod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mod.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMods.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMods = filteredMods.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleInstall = (modName) => {
    console.log(`Installing mod: ${modName}`);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search mods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Mods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedMods.map((mod) => (
          <Card key={mod.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <img
                  src={mod.image || "/placeholder.svg"}
                  alt={mod.name}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{mod.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {mod.provider}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    v{mod.version}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {mod.description}
              </p>
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={() => handleInstall(mod.name)}
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

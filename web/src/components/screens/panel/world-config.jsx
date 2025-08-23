"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Minus } from "lucide-react"


export function WorldConfig({ world, onBack }) {
  const [config, setConfig] = useState({
    seed: "",
    hardcore: false,
    difficulty: "normal",
    // Game rules - boolean switches
    announceAdvancements: true,
    universalAnger: false,
    commandBlockOutput: true,
    disableElytraMovementCheck: false,
    disableRaids: false,
    doDaylightCycle: true,
    doEntityDrops: true,
    doFireTick: true,
    doInsomnia: true,
    doImmediateRespawn: false,
    doLimitedCrafting: false,
    doMobLoot: true,
    doMobSpawning: true,
    doPatrolSpawning: true,
    doTileDrops: true,
    doTraderSpawning: true,
    doWeatherCycle: true,
    drowningDamage: true,
    fallDamage: true,
    fireDamage: true,
    freezeDamage: true,
    forgiveDeadPlayers: true,
    keepInventory: false,
    showDeathMessages: true,
    logAdminCommands: true,
    mobGriefing: true,
    naturalRegeneration: true,
    spectatorsGenerateChunks: true,
    sendCommandFeedback: true,
    blockExplosionDropDecay: true,
    mobExplosionDropDecay: true,
    tntExplosionDropDecay: true,
    waterSourceConversion: true,
    lavaSourceConversion: false,
    globalSoundEvents: true,
    // Integer values
    maxEntityCramming: 24,
    playersSleepingPercentage: 100,
    maxCommandChainLength: 65536,
  })

  const handleSwitchChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const handleIntegerChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: Math.max(0, value) }))
  }

  const incrementValue = (key) => {
    setConfig((prev) => ({ ...prev, [key]: (prev[key]) + 1 }))
  }

  const decrementValue = (key) => {
    setConfig((prev) => ({ ...prev, [key]: Math.max(0, (prev[key]) - 1) }))
  }

  const gameRuleSwitches = [
    { key: "announceAdvancements", label: "Announce Advancements" },
    { key: "universalAnger", label: "Universal Anger" },
    { key: "commandBlockOutput", label: "Command Block Output" },
    { key: "disableElytraMovementCheck", label: "Disable Elytra Movement Check" },
    { key: "disableRaids", label: "Disable Raids" },
    { key: "doDaylightCycle", label: "Do Daylight Cycle" },
    { key: "doEntityDrops", label: "Do Entity Drops" },
    { key: "doFireTick", label: "Do Fire Tick" },
    { key: "doInsomnia", label: "Do Insomnia" },
    { key: "doImmediateRespawn", label: "Do Immediate Respawn" },
    { key: "doLimitedCrafting", label: "Do Limited Crafting" },
    { key: "doMobLoot", label: "Do Mob Loot" },
    { key: "doMobSpawning", label: "Do Mob Spawning" },
    { key: "doPatrolSpawning", label: "Do Patrol Spawning" },
    { key: "doTileDrops", label: "Do Tile Drops" },
    { key: "doTraderSpawning", label: "Do Trader Spawning" },
    { key: "doWeatherCycle", label: "Do Weather Cycle" },
    { key: "drowningDamage", label: "Drowning Damage" },
    { key: "fallDamage", label: "Fall Damage" },
    { key: "fireDamage", label: "Fire Damage" },
    { key: "freezeDamage", label: "Freeze Damage" },
    { key: "forgiveDeadPlayers", label: "Forgive Dead Players" },
    { key: "keepInventory", label: "Keep Inventory" },
    { key: "showDeathMessages", label: "Show Death Messages" },
    { key: "logAdminCommands", label: "Log Admin Commands" },
    { key: "mobGriefing", label: "Mob Griefing" },
    { key: "naturalRegeneration", label: "Natural Regeneration" },
    { key: "spectatorsGenerateChunks", label: "Spectators Generate Chunks" },
    { key: "sendCommandFeedback", label: "Send Command Feedback" },
    { key: "blockExplosionDropDecay", label: "Block Explosion Drop Decay" },
    { key: "mobExplosionDropDecay", label: "Mob Explosion Drop Decay" },
    { key: "tntExplosionDropDecay", label: "TNT Explosion Drop Decay" },
    { key: "waterSourceConversion", label: "Water Source Conversion" },
    { key: "lavaSourceConversion", label: "Lava Source Conversion" },
    { key: "globalSoundEvents", label: "Global Sound Events" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        
        <div>
          <h2 className="text-2xl font-bold">World Configuration</h2>
          <p className="text-muted-foreground">Configure settings for {world.name}</p>
        </div>
      </div>

      {/* Basic Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="seed">Seed</Label>
              <Input
                id="seed"
                value={config.seed}
                onChange={(e) => setConfig((prev) => ({ ...prev, seed: e.target.value }))}
                placeholder="Enter world seed"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={config.difficulty}
                onValueChange={(value) => setConfig((prev) => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="peaceful">Peaceful</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="hardcore"
                checked={config.hardcore}
                onCheckedChange={(checked) => setConfig((prev) => ({ ...prev, hardcore: checked }))}
              />
              <Label htmlFor="hardcore">Hardcore Mode</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Game Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {gameRuleSwitches.map(({ key, label }) => (
              <div key={key} className="flex items-center space-x-2">
                <Switch
                  id={key}
                  checked={config[key]}
                  onCheckedChange={(checked) => handleSwitchChange(key, checked)}
                />
                <Label htmlFor={key} className="text-sm">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integer Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="maxEntityCramming">Max Entity Cramming</Label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => decrementValue("maxEntityCramming")}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="maxEntityCramming"
                  type="number"
                  value={config.maxEntityCramming}
                  onChange={(e) => handleIntegerChange("maxEntityCramming", Number.parseInt(e.target.value) || 0)}
                  className="text-center"
                />
                <Button variant="outline" size="sm" onClick={() => incrementValue("maxEntityCramming")}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="playersSleepingPercentage">Players Sleeping Percentage</Label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => decrementValue("playersSleepingPercentage")}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="playersSleepingPercentage"
                  type="number"
                  value={config.playersSleepingPercentage}
                  onChange={(e) =>
                    handleIntegerChange("playersSleepingPercentage", Number.parseInt(e.target.value) || 0)
                  }
                  className="text-center"
                />
                <Button variant="outline" size="sm" onClick={() => incrementValue("playersSleepingPercentage")}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxCommandChainLength">Max Command Chain Length</Label>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => decrementValue("maxCommandChainLength")}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="maxCommandChainLength"
                  type="number"
                  value={config.maxCommandChainLength}
                  onChange={(e) => handleIntegerChange("maxCommandChainLength", Number.parseInt(e.target.value) || 0)}
                  className="text-center"
                />
                <Button variant="outline" size="sm" onClick={() => incrementValue("maxCommandChainLength")}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button>Save Configuration</Button>
      </div>
    </div>
  )
}

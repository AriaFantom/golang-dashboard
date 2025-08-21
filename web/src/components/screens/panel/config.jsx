"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Minus, Users, Shield } from "lucide-react";

export function ServerConfig() {
  const [settings, setSettings] = useState([
    {
      name: "Slots",
      property: "max-players=20",
      type: "number",
      value: 20,
      icon: Users,
    },
    {
      name: "Gamemode",
      property: "gamemode=survival",
      type: "dropdown",
      value: "survival",
      options: ["survival", "creative", "adventure", "spectator"],
    },
    {
      name: "Difficulty",
      property: "difficulty=easy",
      type: "dropdown",
      value: "easy",
      options: ["peaceful", "easy", "normal", "hard"],
    },
    {
      name: "Whitelist",
      property: "white-list=false",
      type: "toggle",
      value: false,
    },
    {
      name: "Cracked",
      property: "online-mode=true",
      type: "toggle",
      value: false,
    },
    {
      name: "PVP",
      property: "pvp=true",
      type: "toggle",
      value: true,
    },
    {
      name: "Commandblocks",
      property: "enable-command-block=true",
      type: "toggle",
      value: true,
    },
    {
      name: "Fly",
      property: "allow-flight=true",
      type: "toggle",
      value: true,
    },
    {
      name: "Monster",
      property: "spawn-monsters=true",
      type: "toggle",
      value: true,
    },
    {
      name: "Nether",
      property: "allow-nether=true",
      type: "toggle",
      value: true,
    },
    {
      name: "Force Gamemode",
      property: "force-gamemode=false",
      type: "toggle",
      value: false,
    },
    {
      name: "Spawn Protection",
      property: "spawn-protection=0",
      type: "special",
      value: 0,
      icon: Shield,
    },
  ]);

  const updateSetting = (index, newValue) => {
    setSettings((prev) =>
      prev.map((setting, i) =>
        i === index ? { ...setting, value: newValue } : setting
      )
    );
  };

  const renderSettingControl = (setting, index) => {
    switch (setting.type) {
      case "number":
        return (
          <div className="flex items-center gap-2">
            {setting.icon && <setting.icon className="h-4 w-4" />}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateSetting(index, Math.max(0, setting.value - 1))
              }
            >
              <Minus className="h-3 w-3" />
            </Button>
            <Input
              type="number"
              value={setting.value}
              onChange={(e) =>
                updateSetting(index, Number.parseInt(e.target.value) || 0)
              }
              className="w-16 text-center"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateSetting(index, setting.value + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        );

      case "dropdown":
        return (
          <Select
            value={setting.value}
            onValueChange={(value) => updateSetting(index, value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {setting.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "toggle":
        return (
          <Switch
            checked={setting.value}
            onCheckedChange={(checked) => updateSetting(index, checked)}
          />
        );

      case "special":
        return (
          <div className="flex items-center gap-2">
            {setting.icon && <setting.icon className="h-4 w-4" />}
            <Input
              type="number"
              value={setting.value}
              onChange={(e) =>
                updateSetting(index, Number.parseInt(e.target.value) || 0)
              }
              className="w-16 text-center"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateSetting(index, setting.value + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        
        <h1 className="text-xl font-semibold">server.properties</h1>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settings.map((setting, index) => (
          <Card key={setting.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{setting.name}</h3>
                {renderSettingControl(setting, index)}
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                {setting.property}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button>Save Configuration</Button>
      </div>
    </div>
  );
}

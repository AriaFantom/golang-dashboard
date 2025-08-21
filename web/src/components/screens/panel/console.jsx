"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Play, Square, RotateCcw } from "lucide-react";

export function ServerConsole({ serverId, serverName, onBack }) {
  const [consoleOutput, setConsoleOutput] = useState([
    "[12:34:56] [Server thread/INFO]: Starting minecraft server version 1.20.1",
    "[12:34:57] [Server thread/INFO]: Loading properties",
    "[12:34:58] [Server thread/INFO]: Default game type: SURVIVAL",
    "[12:34:59] [Server thread/INFO]: Generating keypair",
    "[12:35:00] [Server thread/INFO]: Starting Minecraft server on *:25565",
    "[12:35:01] [Server thread/INFO]: Using epoll channel type",
    '[12:35:02] [Server thread/INFO]: Preparing level "world"',
    "[12:35:03] [Server thread/INFO]: Preparing start region for dimension minecraft:overworld",
    '[12:35:04] [Server thread/INFO]: Done (2.456s)! For help, type "help"',
  ]);

  const [metrics, setMetrics] = useState({
    ram: { used: 2.4, total: 8.0, percentage: 30 },
    cpu: 45,
    disk: { used: 12.5, total: 50.0, percentage: 25 },
  });

  const [serverStatus, setServerStatus] = useState("running");
  const consoleRef = useRef(null);

  // Simulate live console updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (serverStatus === "running") {
        const timestamp = new Date().toLocaleTimeString("en-US", {
          hour12: false,
        });
        const messages = [
          `[${timestamp}] [Server thread/INFO]: Player joined the game`,
          `[${timestamp}] [Server thread/INFO]: Saving the game (this may take a moment!)`,
          `[${timestamp}] [Server thread/INFO]: Saved the game`,
          `[${timestamp}] [Server thread/WARN]: Can't keep up! Is the server overloaded?`,
          `[${timestamp}] [Server thread/INFO]: Player left the game`,
        ];

        if (Math.random() > 0.7) {
          const randomMessage =
            messages[Math.floor(Math.random() * messages.length)];
          setConsoleOutput((prev) => [...prev.slice(-50), randomMessage]);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [serverStatus]);

  // Simulate metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ram: {
          ...prev.ram,
          used: Math.max(
            1,
            Math.min(7.5, prev.ram.used + (Math.random() - 0.5) * 0.2)
          ),
          percentage: Math.round((prev.ram.used / prev.ram.total) * 100),
        },
        cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        disk: prev.disk,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleOutput]);

  const handleStart = () => {
    setServerStatus("starting");
    setConsoleOutput((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString("en-US", {
        hour12: false,
      })}] [Server thread/INFO]: Starting server...`,
    ]);
    setTimeout(() => {
      setServerStatus("running");
      setConsoleOutput((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString("en-US", {
          hour12: false,
        })}] [Server thread/INFO]: Server started successfully`,
      ]);
    }, 2000);
  };

  const handleStop = () => {
    setServerStatus("stopped");
    setConsoleOutput((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString("en-US", {
        hour12: false,
      })}] [Server thread/INFO]: Stopping server...`,
    ]);
  };

  const handleRestart = () => {
    setServerStatus("starting");
    setConsoleOutput((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString("en-US", {
        hour12: false,
      })}] [Server thread/INFO]: Restarting server...`,
    ]);
    setTimeout(() => {
      setServerStatus("running");
      setConsoleOutput((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString("en-US", {
          hour12: false,
        })}] [Server thread/INFO]: Server restarted successfully`,
      ]);
    }, 3000);
  };

  const getStatusColor = () => {
    switch (serverStatus) {
      case "running":
        return "bg-green-500";
      case "starting":
        return "bg-yellow-500 animate-pulse";
      case "stopped":
        return "bg-red-500";
    }
  };

  return (
    <div className=" p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
          <h1 className="text-2xl font-bold">{serverName} Console</h1>
        </div>
      </div>

      {/* Metrics and Controls */}
      <Card className="mb-6">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">System Metrics</h2>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleStart}
                disabled={
                  serverStatus === "running" || serverStatus === "starting"
                }
                className="bg-green-600 hover:bg-green-700"
              >
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleStop}
                disabled={serverStatus === "stopped"}
              >
                <Square className="h-4 w-4 mr-1" />
                Stop
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleRestart}
                disabled={serverStatus === "stopped"}
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Restart
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* RAM Usage */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">RAM Usage</span>
                <span className="text-muted-foreground">
                  {metrics.ram.used.toFixed(1)}GB / {metrics.ram.total}GB
                </span>
              </div>
              <Progress value={metrics.ram.percentage} className="h-2" />
              <div className="text-xs text-muted-foreground text-center">
                {metrics.ram.percentage}%
              </div>
            </div>

            {/* CPU Usage */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">CPU Usage</span>
                <span className="text-muted-foreground">{metrics.cpu}%</span>
              </div>
              <Progress value={metrics.cpu} className="h-2" />
              <div className="text-xs text-muted-foreground text-center">
                {metrics.cpu}%
              </div>
            </div>

            {/* Disk Usage */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Disk Usage</span>
                <span className="text-muted-foreground">
                  {metrics.disk.used}GB / {metrics.disk.total}GB
                </span>
              </div>
              <Progress value={metrics.disk.percentage} className="h-2" />
              <div className="text-xs text-muted-foreground text-center">
                {metrics.disk.percentage}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Console Output */}
      <Card className="flex-1">
        <CardHeader className="pb-4">
          <h2 className="text-lg font-semibold">Console Output</h2>
        </CardHeader>
        <CardContent>
          <div
            ref={consoleRef}
            className="bg-black text-green-400 font-mono text-sm p-4 rounded-lg h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
          >
            {consoleOutput.map((line, index) => (
              <div key={index} className="mb-1 whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export default function LiveStreamPlayer({ streamUrl }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewerCount] = useState(Math.floor(Math.random() * 500) + 50) // Mock viewer count
  const [volume, setVolume] = useState(80)
  const [quality, setQuality] = useState("HD")
  const [isPlaying, setIsPlaying] = useState(true)

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
  }

  if (!streamUrl) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">📺</div>
          <h3 className="text-xl font-semibold mb-2">No Live Stream</h3>
          <p className="text-muted-foreground">This location is not currently streaming live.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-black" : "relative"}`}>
      <Card className={isFullscreen ? "h-full border-none" : ""}>
        <CardContent className={`p-0 ${isFullscreen ? "h-full" : ""}`}>
          <div className={`relative ${isFullscreen ? "h-full" : "aspect-video"} bg-black rounded-lg overflow-hidden`}>
            {/* Mock live stream player */}
            <div className="w-full h-full bg-gradient-to-br from-spiritual-gold/20 to-spiritual-orange/20 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🕉️</div>
                <h3 className="text-xl font-semibold mb-2">Live Aarti</h3>
                <p className="text-gray-300">Experience the divine ceremony live</p>
                <Badge className="mt-2 bg-green-500 text-white">{quality}</Badge>
              </div>
            </div>

            {/* Live indicator and controls */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>
              <Badge variant="secondary" className="bg-black/50 text-white">
                👥 {viewerCount} watching
              </Badge>
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="bg-black/50 text-white text-sm px-2 py-1 rounded border-none"
              >
                <option value="HD">HD</option>
                <option value="720p">720p</option>
                <option value="480p">480p</option>
              </select>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleFullscreen}
                className="bg-black/50 text-white hover:bg-black/70"
              >
                {isFullscreen ? "⤓" : "⤢"}
              </Button>
            </div>

            {/* Bottom controls */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-black/50 px-2 py-1 rounded">
                  <Button size="sm" variant="secondary" className="bg-transparent text-white hover:bg-black/70 p-1">
                    🔊
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => handleVolumeChange(e.target.value)}
                    className="w-16 h-1 bg-white/30 rounded-lg appearance-none slider"
                  />
                  <span className="text-white text-xs w-8">{volume}%</span>
                </div>
                <Button size="sm" variant="secondary" className="bg-black/50 text-white hover:bg-black/70">
                  💬 Chat
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" className="bg-black/50 text-white hover:bg-black/70">
                  📤 Share
                </Button>
                <Button size="sm" variant="secondary" className="bg-black/50 text-white hover:bg-black/70">
                  ❤️
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

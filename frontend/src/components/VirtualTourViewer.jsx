"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"

export default function VirtualTourViewer({ tour }) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  if (!tour || !tour.url) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">🏛️</div>
          <h3 className="text-xl font-semibold mb-2">Virtual Tour Not Available</h3>
          <p className="text-muted-foreground">This location doesn't have a virtual tour yet.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-black" : "relative"}`}>
      <Card className={isFullscreen ? "h-full border-none" : ""}>
        <CardContent className={`p-0 ${isFullscreen ? "h-full" : ""}`}>
          <div className={`relative ${isFullscreen ? "h-full" : "aspect-video"} bg-black rounded-lg overflow-hidden`}>
            {tour.type === "360" ? (
              <iframe
                src={tour.url}
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                title="360° Virtual Tour"
              />
            ) : tour.type === "3d" ? (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-6xl mb-4">🏛️</div>
                  <h3 className="text-xl font-semibold mb-2">3D Virtual Tour</h3>
                  <p className="text-gray-300 mb-4">Experience this sacred space in immersive 3D</p>
                  <Button
                    onClick={() => window.open(tour.url, "_blank")}
                    className="bg-spiritual-gold hover:bg-spiritual-gold/90"
                  >
                    Launch 3D Tour
                  </Button>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="text-6xl mb-4">🥽</div>
                  <h3 className="text-xl font-semibold mb-2">VR Experience</h3>
                  <p className="text-gray-300 mb-4">Best experienced with VR headset</p>
                  <Button
                    onClick={() => window.open(tour.url, "_blank")}
                    className="bg-spiritual-gold hover:bg-spiritual-gold/90"
                  >
                    Launch VR Tour
                  </Button>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleFullscreen}
                className="bg-black/50 text-white hover:bg-black/70"
              >
                {isFullscreen ? "⤓" : "⤢"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

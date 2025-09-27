"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Link } from "react-router-dom"
import MapView from "../components/MapView"
import { pandalsAPI } from "../utils/api"

export default function MapExplorePage() {
  const [pandals, setPandals] = useState([])
  const [selectedPandal, setSelectedPandal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [nearbyPandals, setNearbyPandals] = useState([])

  useEffect(() => {
    fetchPandals()
  }, [])

  const fetchPandals = async () => {
    try {
      setLoading(true)
      const response = await pandalsAPI.getAll()
      if (response.success) {
        setPandals(response.data)
        // Mock nearby pandals based on user location
        setNearbyPandals(response.data.slice(0, 5))
      }
    } catch (error) {
      console.error("Error fetching pandals:", error)
    } finally {
      setLoading(false)
    }
  }

  const handlePandalSelect = (pandal) => {
    setSelectedPandal(pandal)
  }

  const PandalListItem = ({ pandal, isSelected = false }) => (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? "ring-2 ring-spiritual-gold" : ""}`}
      onClick={() => handlePandalSelect(pandal)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-spiritual-rose to-accent rounded-lg flex items-center justify-center text-xl">
            {pandal.type === "pandal"
              ? "🏛️"
              : pandal.type === "temple"
                ? "🕉️"
                : pandal.type === "mosque"
                  ? "🕌"
                  : pandal.type === "church"
                    ? "⛪"
                    : "🏛️"}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold text-sm truncate">{pandal.name}</h3>
              <div className="flex items-center gap-1 ml-2">
                <Badge variant="outline" className="text-xs capitalize">
                  {pandal.type}
                </Badge>
                {pandal.liveStream?.isLive && (
                  <Badge className="bg-red-500 text-white text-xs animate-pulse">LIVE</Badge>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-2">
              📍 {pandal.location.city}, {pandal.location.state}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>⭐ {pandal.ratings?.average?.toFixed(1) || "0.0"}</span>
                <span>👥 {pandal.visitors?.total || 0}</span>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link to={`/pandal/${pandal._id}`}>View</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore on Map</h1>
        <p className="text-muted-foreground">Discover sacred places near you and around the world</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <MapView pandals={pandals} onPandalSelect={handlePandalSelect} selectedPandal={selectedPandal} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Pandal Details */}
          {selectedPandal && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">📍 Selected Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedPandal.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedPandal.location.address}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="capitalize">
                      {selectedPandal.type}
                    </Badge>
                    {selectedPandal.category && (
                      <Badge className="bg-spiritual-gold text-white">{selectedPandal.category}</Badge>
                    )}
                    {selectedPandal.liveStream?.isLive && (
                      <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-3">{selectedPandal.description}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>⭐ {selectedPandal.ratings?.average?.toFixed(1) || "0.0"}</span>
                    <span>👥 {selectedPandal.visitors?.total || 0}</span>
                    <span>💰 ₹{selectedPandal.donations?.total || 0}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link to={`/pandal/${selectedPandal._id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      📍 Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Nearby Places */}
          <Card>
            <CardHeader>
              <CardTitle>Nearby Places</CardTitle>
              <CardDescription>Sacred places close to your location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-muted rounded w-3/4"></div>
                          <div className="h-3 bg-muted rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : nearbyPandals.length > 0 ? (
                  nearbyPandals.map((pandal) => (
                    <PandalListItem key={pandal._id} pandal={pandal} isSelected={selectedPandal?._id === pandal._id} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No nearby places found</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  🔴 Live Streaming Now
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  🏛️ Pandals Only
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  🕉️ Temples
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  📍 Within 5km
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  ⭐ Highly Rated
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Map Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Total Places</span>
                  <span className="font-semibold">{pandals.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Live Streams</span>
                  <span className="font-semibold">{pandals.filter((p) => p.liveStream?.isLive).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cities Covered</span>
                  <span className="font-semibold">{new Set(pandals.map((p) => p.location.city)).size}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Visitors</span>
                  <span className="font-semibold">
                    {pandals.reduce((sum, p) => sum + (p.visitors?.total || 0), 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

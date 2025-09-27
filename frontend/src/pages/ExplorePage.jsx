"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { pandalsAPI } from "../utils/api"

export default function ExplorePage() {
  const [pandals, setPandals] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCity, setSelectedCity] = useState("all")

  useEffect(() => {
    fetchPandals()
  }, [])

  const fetchPandals = async () => {
    try {
      setLoading(true)
      const response = await pandalsAPI.getAll()
      if (response.success) {
        setPandals(response.data)
      }
    } catch (error) {
      console.error("Error fetching pandals:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPandals = pandals.filter((pandal) => {
    const matchesSearch =
      pandal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pandal.location.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || pandal.type === selectedType
    const matchesCity = selectedCity === "all" || pandal.location.city === selectedCity

    return matchesSearch && matchesType && matchesCity
  })

  const cities = [...new Set(pandals.map((p) => p.location.city))]
  const types = ["pandal", "temple", "mosque", "church", "gurudwara"]

  const PandalCard = ({ pandal }) => (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-spiritual-rose to-accent">
        {pandal.media?.images?.[0] ? (
          <img
            src={pandal.media.images[0] || "/placeholder.svg"}
            alt={pandal.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
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
        )}
        {pandal.liveStream?.isLive && (
          <Badge className="absolute top-2 right-2 bg-red-500 text-white animate-pulse">LIVE</Badge>
        )}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-1">{pandal.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              📍 {pandal.location.city}, {pandal.location.state}
            </CardDescription>
          </div>
          <Badge variant="outline" className="capitalize">
            {pandal.type}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{pandal.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">⭐ {pandal.ratings?.average?.toFixed(1) || "0.0"}</span>
            <span className="flex items-center gap-1">👥 {pandal.visitors?.total || 0}</span>
          </div>
          {pandal.media?.virtualTour && (
            <Badge variant="secondary" className="text-xs">
              360° Tour
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link to={`/pandal/${pandal._id}`}>View Details</Link>
          </Button>
          {pandal.liveStream?.isLive && (
            <Button variant="outline" size="sm">
              Watch Live
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Sacred Spaces</h1>
        <p className="text-muted-foreground">Discover pandals, temples, and spiritual places around you</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>

          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type} className="capitalize">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <div className="text-sm text-muted-foreground">{filteredPandals.length} places found</div>
        </div>

        <TabsContent value="grid">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <CardHeader>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPandals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPandals.map((pandal) => (
                <PandalCard key={pandal._id} pandal={pandal} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No places found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or explore different areas</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="list">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="flex p-6">
                    <div className="w-32 h-24 bg-muted rounded mr-6"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/3"></div>
                      <div className="h-3 bg-muted rounded w-1/4"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredPandals.length > 0 ? (
            <div className="space-y-4">
              {filteredPandals.map((pandal) => (
                <Card key={pandal._id} className="hover:shadow-lg transition-shadow">
                  <div className="flex p-6">
                    <div className="w-32 h-24 bg-gradient-to-r from-spiritual-rose to-accent rounded-lg mr-6 flex items-center justify-center text-3xl">
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
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold">{pandal.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            📍 {pandal.location.city}, {pandal.location.state}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {pandal.type}
                          </Badge>
                          {pandal.liveStream?.isLive && (
                            <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{pandal.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>⭐ {pandal.ratings?.average?.toFixed(1) || "0.0"}</span>
                          <span>👥 {pandal.visitors?.total || 0}</span>
                          {pandal.media?.virtualTour && (
                            <Badge variant="secondary" className="text-xs">
                              360° Tour
                            </Badge>
                          )}
                        </div>
                        <Button asChild>
                          <Link to={`/pandal/${pandal._id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No places found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or explore different areas</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

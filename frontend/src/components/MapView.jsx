"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function MapView({ pandals = [], onPandalSelect, selectedPandal }) {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [userLocation, setUserLocation] = useState(null)
  const [searchLocation, setSearchLocation] = useState("")
  const [mapType, setMapType] = useState("roadmap")

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return

    // Initialize Google Maps
    const initMap = () => {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 19.076, lng: 72.8777 }, // Mumbai center
        zoom: 12,
        mapTypeId: mapType,
        styles: [
          {
            featureType: "poi.place_of_worship",
            elementType: "geometry",
            stylers: [{ color: "#f59e0b" }],
          },
          {
            featureType: "poi.place_of_worship",
            elementType: "labels.text.fill",
            stylers: [{ color: "#92400e" }],
          },
        ],
      })

      setMap(mapInstance)

      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            setUserLocation(userPos)
            mapInstance.setCenter(userPos)

            // Add user location marker
            new window.google.maps.Marker({
              position: userPos,
              map: mapInstance,
              title: "Your Location",
              icon: {
                url:
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(`
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(24, 24),
              },
            })
          },
          () => {
            console.log("Geolocation permission denied")
          },
        )
      }
    }

    // Load Google Maps API if not already loaded
    if (window.google && window.google.maps) {
      initMap()
    } else {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    }
  }, [mapType])

  // Update markers when pandals change
  useEffect(() => {
    if (!map || !pandals.length) return

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null))

    // Create new markers
    const newMarkers = pandals.map((pandal) => {
      const marker = new window.google.maps.Marker({
        position: {
          lat: pandal.location.coordinates.lat,
          lng: pandal.location.coordinates.lng,
        },
        map: map,
        title: pandal.name,
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C10.48 2 6 6.48 6 12C6 20 16 30 16 30C16 30 26 20 26 12C26 6.48 21.52 2 16 2Z" fill="${getPandalColor(pandal.type)}" stroke="#ffffff" stroke-width="2"/>
              <circle cx="16" cy="12" r="4" fill="#ffffff"/>
              <text x="16" y="16" text-anchor="middle" fill="#000" font-size="12">${getPandalIcon(pandal.type)}</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
        },
      })

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: createInfoWindowContent(pandal),
      })

      marker.addListener("click", () => {
        // Close other info windows
        markers.forEach((m) => m.infoWindow?.close())

        infoWindow.open(map, marker)
        if (onPandalSelect) {
          onPandalSelect(pandal)
        }
      })

      marker.infoWindow = infoWindow
      return marker
    })

    setMarkers(newMarkers)

    // Fit map to show all markers
    if (newMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds()
      newMarkers.forEach((marker) => bounds.extend(marker.getPosition()))
      if (userLocation) bounds.extend(userLocation)
      map.fitBounds(bounds)
    }
  }, [map, pandals, onPandalSelect, userLocation])

  // Highlight selected pandal
  useEffect(() => {
    if (!selectedPandal || !markers.length) return

    const selectedMarker = markers.find((marker) => marker.getTitle() === selectedPandal.name)

    if (selectedMarker) {
      map.setCenter(selectedMarker.getPosition())
      map.setZoom(15)
      selectedMarker.infoWindow?.open(map, selectedMarker)
    }
  }, [selectedPandal, markers, map])

  const getPandalColor = (type) => {
    const colors = {
      pandal: "#f59e0b",
      temple: "#dc2626",
      mosque: "#059669",
      church: "#7c3aed",
      gurudwara: "#ea580c",
    }
    return colors[type] || "#6b7280"
  }

  const getPandalIcon = (type) => {
    const icons = {
      pandal: "🏛️",
      temple: "🕉️",
      mosque: "🕌",
      church: "⛪",
      gurudwara: "🏛️",
    }
    return icons[type] || "📍"
  }

  const createInfoWindowContent = (pandal) => {
    return `
      <div style="max-width: 250px; padding: 8px;">
        <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${pandal.name}</h3>
        <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">📍 ${pandal.location.city}</p>
        <p style="margin: 0 0 8px 0; font-size: 14px; line-height: 1.4;">${pandal.description.substring(0, 100)}...</p>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 12px; text-transform: capitalize;">${pandal.type}</span>
          ${pandal.liveStream?.isLive ? '<span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">🔴 LIVE</span>' : ""}
        </div>
        <div style="display: flex; align-items: center; gap: 12px; font-size: 12px; color: #666; margin-bottom: 8px;">
          <span>⭐ ${pandal.ratings?.average?.toFixed(1) || "0.0"}</span>
          <span>👥 ${pandal.visitors?.total || 0}</span>
        </div>
        <button onclick="window.location.href='/pandal/${pandal._id}'" style="background: #f59e0b; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 14px;">
          View Details
        </button>
      </div>
    `
  }

  const searchLocationOnMap = () => {
    if (!map || !searchLocation.trim()) return

    const geocoder = new window.google.maps.Geocoder()
    geocoder.geocode({ address: searchLocation }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location
        map.setCenter(location)
        map.setZoom(14)
      }
    })
  }

  const handleMapTypeChange = (newType) => {
    setMapType(newType)
    if (map) {
      map.setMapTypeId(newType)
    }
  }

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🗺️ Interactive Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="flex gap-2">
                <Input
                  placeholder="Search location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && searchLocationOnMap()}
                />
                <Button onClick={searchLocationOnMap}>🔍</Button>
              </div>
            </div>

            <Select value={mapType} onValueChange={handleMapTypeChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="roadmap">Road Map</SelectItem>
                <SelectItem value="satellite">Satellite</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="terrain">Terrain</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Map Container */}
      <Card>
        <CardContent className="p-0">
          <div ref={mapRef} className="w-full h-96 md:h-[500px] rounded-lg" style={{ minHeight: "400px" }} />
        </CardContent>
      </Card>

      {/* Map Legend */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span>Your Location</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span>Pandals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-600"></div>
              <span>Temples</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-600"></div>
              <span>Mosques</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-600"></div>
              <span>Churches</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-600"></div>
              <span>Gurudwaras</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

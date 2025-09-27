"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { pandalsAPI, ratingsAPI } from "../utils/api"
import RatingComponent from "../components/RatingComponent"
import VirtualTourViewer from "../components/VirtualTourViewer"
import LiveStreamPlayer from "../components/LiveStreamPlayer"
import DonationSystem from "../components/DonationSystem"
import VirtualTour360 from "../components/VirtualTour360"

export default function PandalDetailPage({ user }) {
  const { id } = useParams()
  const [pandal, setPandal] = useState(null)
  const [ratings, setRatings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchPandalDetails()
      fetchRatings()
    }
  }, [id])

  const fetchPandalDetails = async () => {
    try {
      const response = await pandalsAPI.getById(id)
      if (response.success) {
        setPandal(response.data)
      }
    } catch (error) {
      console.error("Error fetching pandal details:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRatings = async () => {
    try {
      const response = await ratingsAPI.getByTarget(id, "Pandal")
      if (response.success) {
        setRatings(response.data)
      }
    } catch (error) {
      console.error("Error fetching ratings:", error)
    }
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-64 bg-muted rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-1/3"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!pandal) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Pandal not found</h1>
        <Button asChild>
          <Link to="/explore">Back to Explore</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{pandal.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              📍 {pandal.location.address}, {pandal.location.city}, {pandal.location.state}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {pandal.type}
            </Badge>
            {pandal.category && <Badge className="bg-spiritual-gold text-white">{pandal.category}</Badge>}
            {pandal.liveStream?.isLive && <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>}
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            ⭐ {pandal.ratings?.average?.toFixed(1) || "0.0"} ({pandal.ratings?.count || 0} reviews)
          </span>
          <span className="flex items-center gap-1">👥 {pandal.visitors?.total || 0} visitors</span>
          <span className="flex items-center gap-1">💰 ₹{pandal.donations?.total || 0} raised</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="virtual-tour">Virtual Tour</TabsTrigger>
              <TabsTrigger value="live-stream">Live Stream</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Image Gallery */}
              {pandal.media?.images?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pandal.media.images.slice(0, 6).map((image, index) => (
                    <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${pandal.name} ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{pandal.description}</p>
                </CardContent>
              </Card>

              {/* Events */}
              {pandal.events?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pandal.events.map((event, index) => (
                        <div key={index} className="border-l-4 border-spiritual-gold pl-4">
                          <h4 className="font-semibold">{event.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            {new Date(event.startDate).toLocaleDateString()} -{" "}
                            {new Date(event.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm">{event.description}</p>
                          {event.timings?.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {event.timings.map((timing, i) => (
                                <div key={i} className="text-xs text-muted-foreground">
                                  {timing.time} - {timing.activity}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Features */}
              {pandal.features?.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {pandal.features.map((feature, index) => (
                        <Badge key={index} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="virtual-tour">
              {pandal.virtualTour ? (
                <div className="space-y-6">
                  <VirtualTour360 tourUrl={pandal.virtualTour} pandalName={pandal.name} />
                  {pandal.media?.virtualTour && <VirtualTourViewer tour={pandal.media.virtualTour} />}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <div className="text-6xl mb-4">🏛️</div>
                    <h3 className="text-xl font-semibold mb-2">Virtual Tour Not Available</h3>
                    <p className="text-muted-foreground">This location doesn't have a virtual tour yet.</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="live-stream">
              {pandal.liveStream?.isLive ? (
                <LiveStreamPlayer streamUrl={pandal.liveStream.streamUrl} />
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <div className="text-6xl mb-4">📺</div>
                    <h3 className="text-xl font-semibold mb-2">No Live Stream</h3>
                    <p className="text-muted-foreground mb-4">This location is not currently streaming live.</p>
                    {pandal.liveStream?.schedule?.length > 0 && (
                      <div className="text-left max-w-md mx-auto">
                        <h4 className="font-semibold mb-2">Upcoming Streams:</h4>
                        <div className="space-y-2">
                          {pandal.liveStream.schedule.map((stream, index) => (
                            <div key={index} className="text-sm border rounded p-2">
                              <div className="font-medium">{stream.title}</div>
                              <div className="text-muted-foreground">{new Date(stream.startTime).toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="reviews">
              <div className="space-y-6">
                {user && (
                  <RatingComponent
                    targetId={pandal._id}
                    targetType="Pandal"
                    user={user}
                    onRatingSubmitted={fetchRatings}
                  />
                )}

                <div className="space-y-4">
                  {ratings.length > 0 ? (
                    ratings.map((rating) => (
                      <Card key={rating._id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={rating.user?.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{rating.user?.name?.charAt(0)?.toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">{rating.user?.name}</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < rating.rating ? "text-yellow-400" : "text-gray-300"}>
                                      ⭐
                                    </span>
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(rating.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              {rating.review && <p className="text-muted-foreground">{rating.review}</p>}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {pandal.samiti && <DonationSystem pandalId={pandal._id} samiti={pandal.samiti} />}

          {/* Team Information */}
          {(pandal.samiti || pandal.murtikar || pandal.pujari) && (
            <Card>
              <CardHeader>
                <CardTitle>Team</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pandal.samiti && (
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={pandal.samiti.profile?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-green-100 text-green-800">S</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{pandal.samiti.name}</p>
                      <p className="text-sm text-muted-foreground">Samiti (Committee)</p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/profile/${pandal.samiti._id}`}>View</Link>
                    </Button>
                  </div>
                )}

                {pandal.murtikar && (
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={pandal.murtikar.profile?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-purple-100 text-purple-800">M</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{pandal.murtikar.name}</p>
                      <p className="text-sm text-muted-foreground">Murtikar (Idol Maker)</p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/profile/${pandal.murtikar._id}`}>View</Link>
                    </Button>
                  </div>
                )}

                {pandal.pujari && (
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={pandal.pujari.profile?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-orange-100 text-orange-800">P</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{pandal.pujari.name}</p>
                      <p className="text-sm text-muted-foreground">Pujari (Priest)</p>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/profile/${pandal.pujari._id}`}>View</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                📍 Get Directions
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                📞 Contact
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                📤 Share
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                ❤️ Add to Favorites
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

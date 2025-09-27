"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import {
  Video,
  Users,
  Clock,
  Heart,
  MessageCircle,
  Share,
  Search,
  Filter,
  Play,
  Eye,
  Globe,
  ArrowLeft,
} from "lucide-react"
import { pandalsAPI } from "../utils/api"
import LiveStreamPlayer from "../components/LiveStreamPlayer"

export default function LiveStreamPage() {
  const [liveStreams, setLiveStreams] = useState([])
  const [selectedStream, setSelectedStream] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [viewerCount, setViewerCount] = useState(0)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "DevoteeRam", message: "Om Namah Shivaya 🙏", timestamp: "2 min ago" },
    { id: 2, user: "SpiritualSeeker", message: "Beautiful aarti today", timestamp: "1 min ago" },
    { id: 3, user: "PrayerWarrior", message: "Feeling blessed to witness this", timestamp: "30 sec ago" },
  ])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    fetchLiveStreams()
    // Simulate viewer count updates
    const interval = setInterval(() => {
      setViewerCount((prev) => prev + Math.floor(Math.random() * 10) - 5)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const fetchLiveStreams = async () => {
    try {
      setLoading(true)
      const response = await pandalsAPI.getAll({ isLive: "true" })
      if (response.success) {
        setLiveStreams(response.data)
        setViewerCount(response.data.reduce((sum, stream) => sum + (stream.viewers || 0), 0))
      }
    } catch (error) {
      console.error("Error fetching live streams:", error)
      // Mock data for demonstration
      setLiveStreams([
        {
          _id: "1",
          name: "Lalbaugcha Raja Live Aarti",
          type: "pandal",
          location: { city: "Mumbai", state: "Maharashtra" },
          liveStream: {
            isLive: true,
            streamUrl: "https://youtube.com/live/lalbaugcha-raja",
            viewers: 1234,
            startedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          },
          description: "Experience the divine aarti of Lalbaugcha Raja",
          category: "Ganesh Festival",
          language: "Marathi/Hindi",
        },
        {
          _id: "2",
          name: "Dagdusheth Ganpati Temple",
          type: "temple",
          location: { city: "Pune", state: "Maharashtra" },
          liveStream: {
            isLive: true,
            streamUrl: "https://youtube.com/live/dagdusheth",
            viewers: 856,
            startedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          },
          description: "Live darshan and prayers from historic temple",
          category: "Daily Prayers",
          language: "Marathi",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const filteredStreams = liveStreams.filter((stream) => {
    const matchesSearch =
      stream.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stream.location.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || stream.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleStreamSelect = (stream) => {
    setSelectedStream(stream)
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: "You",
        message: newMessage,
        timestamp: "now",
      }
      setChatMessages((prev) => [...prev, message])
      setNewMessage("")
    }
  }

  const formatDuration = (startTime) => {
    const now = new Date()
    const start = new Date(startTime)
    const diff = Math.floor((now - start) / 1000 / 60) // minutes
    if (diff < 60) return `${diff}m`
    const hours = Math.floor(diff / 60)
    const minutes = diff % 60
    return `${hours}h ${minutes}m`
  }

  if (selectedStream) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" onClick={() => setSelectedStream(null)} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Live Streams
            </Button>
            <div className="flex items-center gap-4">
              <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                {selectedStream.liveStream.viewers?.toLocaleString()} watching
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Video Player */}
            <div className="lg:col-span-3">
              <LiveStreamPlayer streamUrl={selectedStream.liveStream.streamUrl} />

              {/* Stream Info */}
              <Card className="mt-4">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h1 className="text-2xl font-bold">{selectedStream.name}</h1>
                      <p className="text-muted-foreground">{selectedStream.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          {selectedStream.location.city}, {selectedStream.location.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Started {formatDuration(selectedStream.liveStream.startedAt)} ago
                        </span>
                        <Badge variant="outline">{selectedStream.category}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4 mr-2" />
                        Like
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Sidebar */}
            <div className="lg:col-span-1">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Live Chat
                  </CardTitle>
                  <CardDescription>{chatMessages.length} messages</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">{msg.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{msg.user}</span>
                          <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm ml-8">{msg.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button size="sm" onClick={handleSendMessage}>
                        Send
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Live Spiritual Streams</h1>
          <p className="text-muted-foreground">
            Join live religious ceremonies, prayers, and spiritual gatherings from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search live streams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="pandal">Pandals</SelectItem>
              <SelectItem value="temple">Temples</SelectItem>
              <SelectItem value="mosque">Mosques</SelectItem>
              <SelectItem value="church">Churches</SelectItem>
              <SelectItem value="gurudwara">Gurudwaras</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500">{filteredStreams.length}</div>
              <div className="text-sm text-muted-foreground">Live Now</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{viewerCount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Viewers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">24/7</div>
              <div className="text-sm text-muted-foreground">Available</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-500">HD</div>
              <div className="text-sm text-muted-foreground">Quality</div>
            </CardContent>
          </Card>
        </div>

        {/* Live Streams Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredStreams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStreams.map((stream) => (
                <Card key={stream._id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div
                    className="relative aspect-video bg-gradient-to-br from-spiritual-gold/20 to-spiritual-orange/20 flex items-center justify-center"
                    onClick={() => handleStreamSelect(stream)}
                  >
                    <div className="text-center text-white">
                      <Play className="w-12 h-12 mx-auto mb-2 opacity-80" />
                      <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {formatDuration(stream.liveStream.startedAt)}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold line-clamp-2">{stream.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{stream.description}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {stream.liveStream.viewers?.toLocaleString()} watching
                        </span>
                        <Badge variant="outline" className="capitalize">
                          {stream.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="w-4 h-4" />
                        {stream.location.city}, {stream.location.state}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Video className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Live Streams Found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterType !== "all"
                    ? "Try adjusting your search or filters"
                    : "Check back later for live spiritual content"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

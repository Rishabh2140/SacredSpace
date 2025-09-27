"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  BookOpen,
  Search,
  Clock,
  Play,
  Pause,
  Volume2,
  Bookmark,
  Share,
  Download,
  Eye,
  Users,
  Calendar,
  Headphones,
  Cross,
  Percent as Crescent,
  StarOff as StarOfDavid,
  Focus as Lotus,
  Atom as Om,
} from "lucide-react"

export function PrayerContentLibrary() {
  const [selectedFaith, setSelectedFaith] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(null)

  const faithTraditions = [
    { id: "christianity", name: "Christianity", icon: Cross, color: "spiritual-sage" },
    { id: "islam", name: "Islam", icon: Crescent, color: "spiritual-gold" },
    { id: "judaism", name: "Judaism", icon: StarOfDavid, color: "primary" },
    { id: "hinduism", name: "Hinduism", icon: Om, color: "spiritual-rose" },
    { id: "buddhism", name: "Buddhism", icon: Lotus, color: "spiritual-sage" },
  ]

  const contentCategories = [
    { id: "prayers", name: "Prayers", count: 234 },
    { id: "scriptures", name: "Sacred Texts", count: 156 },
    { id: "meditations", name: "Meditations", count: 89 },
    { id: "devotionals", name: "Daily Devotionals", count: 178 },
    { id: "audio", name: "Audio Content", count: 67 },
    { id: "study-guides", name: "Study Guides", count: 45 },
  ]

  const featuredContent = [
    {
      id: "1",
      title: "The Lord's Prayer - Traditional",
      type: "Prayer",
      faith: "Christianity",
      duration: "2 min",
      description: "The prayer Jesus taught his disciples, a cornerstone of Christian faith.",
      content: "Our Father, who art in heaven, hallowed be thy name...",
      author: "Traditional",
      views: 1234,
      bookmarks: 89,
      hasAudio: true,
      tags: ["traditional", "jesus", "christian-prayer"],
    },
    {
      id: "2",
      title: "Psalm 23 - The Lord is My Shepherd",
      type: "Scripture",
      faith: "Christianity",
      duration: "3 min",
      description: "One of the most beloved psalms, offering comfort and assurance.",
      content: "The Lord is my shepherd; I shall not want...",
      author: "King David",
      views: 2156,
      bookmarks: 156,
      hasAudio: true,
      tags: ["psalm", "comfort", "shepherd"],
    },
    {
      id: "3",
      title: "Al-Fatiha - The Opening",
      type: "Prayer",
      faith: "Islam",
      duration: "1 min",
      description: "The opening chapter of the Quran, recited in daily prayers.",
      content: "In the name of Allah, the Most Gracious, the Most Merciful...",
      author: "Quran",
      views: 987,
      bookmarks: 67,
      hasAudio: true,
      tags: ["quran", "daily-prayer", "fatiha"],
    },
    {
      id: "4",
      title: "Loving-Kindness Meditation",
      type: "Meditation",
      faith: "Buddhism",
      duration: "15 min",
      description: "A guided meditation to cultivate compassion and loving-kindness.",
      content: "Begin by finding a comfortable seated position...",
      author: "Buddhist Tradition",
      views: 543,
      bookmarks: 78,
      hasAudio: true,
      tags: ["meditation", "compassion", "mindfulness"],
    },
    {
      id: "5",
      title: "Shema Yisrael",
      type: "Prayer",
      faith: "Judaism",
      duration: "1 min",
      description: "The central prayer in Jewish worship, affirming faith in one God.",
      content: "Hear, O Israel: The Lord our God, the Lord is one...",
      author: "Torah",
      views: 678,
      bookmarks: 45,
      hasAudio: true,
      tags: ["shema", "jewish-prayer", "monotheism"],
    },
    {
      id: "6",
      title: "Morning Gratitude Prayer",
      type: "Devotional",
      faith: "Multi-Faith",
      duration: "5 min",
      description: "Start your day with gratitude and positive intention.",
      content: "As I begin this new day, I am grateful for...",
      author: "Interfaith Council",
      views: 432,
      bookmarks: 34,
      hasAudio: false,
      tags: ["gratitude", "morning", "daily-practice"],
    },
  ]

  const dailyDevotional = {
    date: "December 26, 2024",
    title: "Finding Light in Darkness",
    verse: "The light shines in the darkness, and the darkness has not overcome it. - John 1:5",
    reflection:
      "In times of uncertainty and challenge, we are reminded that light always overcomes darkness. This eternal truth gives us hope and strength to face each day with courage and faith.",
    prayer:
      "Divine Light, help us to be beacons of hope in a world that sometimes feels dark. Guide our steps and illuminate our path forward.",
    readTime: "3 min",
  }

  const playAudio = (contentId) => {
    if (currentAudio === contentId && isPlaying) {
      setIsPlaying(false)
    } else {
      setCurrentAudio(contentId)
      setIsPlaying(true)
    }
  }

  const filteredContent = featuredContent.filter((item) => {
    const matchesFaith = selectedFaith === "all" || item.faith.toLowerCase().includes(selectedFaith)
    const matchesCategory = selectedCategory === "all" || item.type.toLowerCase().includes(selectedCategory)
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesFaith && matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full spiritual-gradient flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold">Prayer & Content Library</h1>
                <p className="text-sm text-muted-foreground">Sacred texts, prayers, and spiritual resources</p>
              </div>
            </div>
            <Button variant="outline">
              <Bookmark className="w-4 h-4 mr-2" />
              My Bookmarks
            </Button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Daily Devotional */}
            <Card className="spiritual-gradient text-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Daily Devotional</CardTitle>
                    <CardDescription className="text-white/80">{dailyDevotional.date}</CardDescription>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30">{dailyDevotional.readTime}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold">{dailyDevotional.title}</h3>
                <blockquote className="text-white/90 italic border-l-2 border-white/30 pl-4">{dailyDevotional.verse}</blockquote>
                <p className="text-white/90">{dailyDevotional.reflection}</p>
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Today's Prayer</h4>
                  <p className="text-white/90">{dailyDevotional.prayer}</p>
                </div>
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Full Devotional
                </Button>
              </CardContent>
            </Card>

            {/* Search & Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search prayers, scriptures, meditations..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      className="px-3 py-2 border rounded-md bg-background"
                      value={selectedFaith}
                      onChange={(e) => setSelectedFaith(e.target.value)}
                    >
                      <option value="all">All Faiths</option>
                      {faithTraditions.map((faith) => (
                        <option key={faith.id} value={faith.id}>
                          {faith.name}
                        </option>
                      ))}
                    </select>
                    <select
                      className="px-3 py-2 border rounded-md bg-background"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      {contentCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredContent.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{item.type}</Badge>
                          <Badge variant="secondary">{item.faith}</Badge>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm italic">{item.content}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>by {item.author}</span>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{item.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Bookmark className="w-3 h-3" />
                          <span>{item.bookmarks}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.hasAudio && (
                          <Button variant="ghost" size="sm" onClick={() => playAudio(item.id)}>
                            {currentAudio === item.id && isPlaying ? (
                              <Pause className="w-4 h-4 mr-1" />
                            ) : (
                              <Play className="w-4 h-4 mr-1" />
                            )}
                            {currentAudio === item.id && isPlaying ? "Pause" : "Listen"}
                          </Button>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Read
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{item.title}</DialogTitle>
                              <DialogDescription>
                                {item.type} • {item.faith} • by {item.author}
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="max-h-96 p-4">
                              <div className="space-y-4">
                                <p>{item.content}</p>
                                <p className="text-muted-foreground">{item.description}</p>
                              </div>
                            </ScrollArea>
                            <div className="flex justify-between">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Bookmark className="w-4 h-4 mr-1" />
                                  Bookmark
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Share className="w-4 h-4 mr-1" />
                                  Share
                                </Button>
                              </div>
                              {item.hasAudio && (
                                <Button variant="outline" size="sm" onClick={() => playAudio(item.id)}>
                                  <Headphones className="w-4 h-4 mr-1" />
                                  Audio Version
                                </Button>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Faith Traditions */}
            <Card>
              <CardHeader>
                <CardTitle>Faith Traditions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {faithTraditions.map((faith) => (
                  <div
                    key={faith.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedFaith === faith.id ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedFaith(faith.id)}
                  >
                    <div className={`w-8 h-8 rounded-full bg-${faith.color}/20 flex items-center justify-center`}>
                      <faith.icon className={`w-4 h-4 text-${faith.color}`} />
                    </div>
                    <span className="font-medium">{faith.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {contentCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory === category.id ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline">{category.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Reading Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Devotionals</span>
                    <span>15/30</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Prayer Collection</span>
                    <span>8/20</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Scripture Study</span>
                    <span>12/25</span>
                  </div>
                  <Progress value={48} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download for Offline
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  Reading Plan
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Study Groups
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {isPlaying && currentAudio && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={() => setIsPlaying(false)}>
                  <Pause className="w-5 h-5" />
                </Button>
                <div>
                  <p className="font-medium">{featuredContent.find((item) => item.id === currentAudio)?.title}</p>
                  <p className="text-sm text-muted-foreground">Now Playing</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Progress value={35} className="w-32" />
                <span className="text-sm text-muted-foreground">1:23 / 3:45</span>
                <Button variant="ghost" size="icon">
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Heart,
  Users,
  MessageCircle,
  Pin,
  TrendingUp,
  Plus,
  Search,
  Filter,
  ThumbsUp,
  Reply,
  Share,
  Eye,
  Star,
  BookOpen,
  PlayIcon as PrayIcon,
  HelpCircle,
  Lightbulb,
  Calendar,
} from "lucide-react"

export function CommunityForums() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const forumCategories = [
    {
      id: "bible-study",
      name: "Bible Study",
      description: "Discuss scripture, share insights, and grow in understanding",
      icon: BookOpen,
      posts: 234,
      members: 1456,
      color: "spiritual-sage",
    },
    {
      id: "prayer-requests",
      name: "Prayer Requests",
      description: "Share your prayer needs and pray for others",
      icon: PrayIcon,
      posts: 189,
      members: 2341,
      color: "spiritual-rose",
    },
    {
      id: "faith-questions",
      name: "Faith Questions",
      description: "Ask questions and seek guidance on your spiritual journey",
      icon: HelpCircle,
      posts: 156,
      members: 987,
      color: "spiritual-gold",
    },
    {
      id: "testimonies",
      name: "Testimonies",
      description: "Share how faith has impacted your life",
      icon: Star,
      posts: 98,
      members: 1234,
      color: "primary",
    },
    {
      id: "daily-devotions",
      name: "Daily Devotions",
      description: "Daily reflections and spiritual insights",
      icon: Lightbulb,
      posts: 312,
      members: 1876,
      color: "spiritual-sage",
    },
    {
      id: "events",
      name: "Community Events",
      description: "Organize and discuss community gatherings",
      icon: Calendar,
      posts: 67,
      members: 543,
      color: "spiritual-gold",
    },
  ]

  const featuredPosts = [
    {
      id: "1",
      title: "Finding Peace in Difficult Times - A Discussion on Psalm 23",
      author: "Rev. Michael Thompson",
      authorAvatar: "/placeholder.svg?key=rev-michael",
      category: "Bible Study",
      replies: 23,
      views: 156,
      likes: 45,
      timeAgo: "2 hours ago",
      isPinned: true,
      excerpt: "Let's explore how the 23rd Psalm can bring comfort and guidance during life's challenges...",
    },
    {
      id: "2",
      title: "Prayer Request: Healing for My Mother",
      author: "Sarah Johnson",
      authorAvatar: "/placeholder.svg?key=sarah-j",
      category: "Prayer Requests",
      replies: 18,
      views: 89,
      likes: 32,
      timeAgo: "4 hours ago",
      isPinned: false,
      excerpt: "Please keep my mother in your prayers as she undergoes surgery this week...",
    },
    {
      id: "3",
      title: "How Do I Know God's Will for My Life?",
      author: "David Chen",
      authorAvatar: "/placeholder.svg?key=david-c",
      category: "Faith Questions",
      replies: 31,
      views: 234,
      likes: 28,
      timeAgo: "6 hours ago",
      isPinned: false,
      excerpt: "I'm at a crossroads in my career and struggling to discern God's direction...",
    },
    {
      id: "4",
      title: "Testimony: How Faith Helped Me Overcome Addiction",
      author: "Mark Rodriguez",
      authorAvatar: "/placeholder.svg?key=mark-r",
      category: "Testimonies",
      replies: 42,
      views: 567,
      likes: 89,
      timeAgo: "1 day ago",
      isPinned: false,
      excerpt: "I want to share my story of recovery and how my faith community supported me...",
    },
  ]

  const trendingTopics = [
    { tag: "prayer", posts: 45 },
    { tag: "faith-journey", posts: 32 },
    { tag: "bible-study", posts: 28 },
    { tag: "community-support", posts: 24 },
    { tag: "spiritual-growth", posts: 19 },
  ]

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
                <h1 className="text-xl font-serif font-semibold">Community Forums</h1>
                <p className="text-sm text-muted-foreground">Connect, share, and grow together in faith</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="spiritual-gradient border-0">
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                  <DialogDescription>
                    Share your thoughts, questions, or prayer requests with the community
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {forumCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-title">Title</Label>
                    <Input id="post-title" placeholder="Enter your post title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-content">Content</Label>
                    <Textarea
                      id="post-content"
                      placeholder="Share your thoughts, questions, or prayer requests..."
                      className="min-h-32"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Save Draft</Button>
                    <Button className="spiritual-gradient border-0">Publish Post</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search discussions..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {forumCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Posts */}
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold">Recent Discussions</h2>
              {featuredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={post.authorAvatar || "/placeholder.svg"} alt={post.author} />
                        <AvatarFallback>
                          {post.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              {post.isPinned && <Pin className="w-4 h-4 text-spiritual-gold" />}
                              <h3 className="text-lg font-semibold hover:text-primary cursor-pointer">{post.title}</h3>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>by {post.author}</span>
                              <span>•</span>
                              <Badge variant="outline">{post.category}</Badge>
                              <span>•</span>
                              <span>{post.timeAgo}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground">{post.excerpt}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.replies} replies</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.views} views</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{post.likes} likes</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Like
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Reply className="w-4 h-4 mr-1" />
                              Reply
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share className="w-4 h-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Forum Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Forum Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {forumCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full bg-${category.color}/20 flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 text-${category.color}`} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{category.name}</p>
                          <p className="text-xs text-muted-foreground">{category.posts} posts</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.members}
                      </Badge>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Trending Topics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {trendingTopics.map((topic) => (
                  <div key={topic.tag} className="flex items-center justify-between">
                    <span className="text-sm font-medium">#{topic.tag}</span>
                    <Badge variant="outline" className="text-xs">
                      {topic.posts}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Members</span>
                  <span className="font-semibold">12,456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posts This Week</span>
                  <span className="font-semibold">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Discussions</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Prayer Requests</span>
                  <span className="font-semibold">45</span>
                </div>
              </CardContent>
            </Card>

            {/* Community Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Be respectful and kind to all members</p>
                <p>• Keep discussions relevant to faith and spirituality</p>
                <p>• No spam or promotional content</p>
                <p>• Respect different faith traditions</p>
                <p>• Report inappropriate content</p>
                <Button variant="link" className="p-0 h-auto text-xs">
                  Read Full Guidelines
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

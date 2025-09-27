"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookOpen, Calendar, DollarSign, Star, Eye, Edit, Plus, Bell, Settings, Award, Mic } from "lucide-react"

export function KathavachakDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview")

  const kathavachakStats = {
    upcomingSessions: 6,
    completedSessions: 89,
    totalEarnings: 67000,
    averageRating: 4.9,
    totalAudience: 2450,
    activeTopics: 8,
  }

  const upcomingSessions = [
    { id: "1", topic: "Ramayana - Ayodhya Kand", venue: "Community Center", date: "2024-12-29", time: "7:00 PM", duration: "2 hours", expectedAudience: 80, amount: 5000 },
    { id: "2", topic: "Bhagavad Gita - Chapter 2", venue: "Temple Hall", date: "2025-01-01", time: "6:00 PM", duration: "1.5 hours", expectedAudience: 60, amount: 3500 },
    { id: "3", topic: "Mahabharata - Kurukshetra War", venue: "School Auditorium", date: "2025-01-05", time: "5:00 PM", duration: "2.5 hours", expectedAudience: 120, amount: 6000 },
  ]

  const recentSessions = [
    { topic: "Diwali Special - Lakshmi Katha", venue: "Community Hall", date: "2024-12-20", rating: 5, audience: 95, amount: 4500 },
    { topic: "Hanuman Chalisa Explanation", venue: "Temple", date: "2024-12-18", rating: 5, audience: 70, amount: 3000 },
    { topic: "Krishna Leela Stories", venue: "School", date: "2024-12-15", rating: 4, audience: 85, amount: 4000 },
  ]

  const availableTopics = [
    { name: "Ramayana", sessions: 12, avgDuration: "2 hours", price: "₹4000-6000" },
    { name: "Mahabharata", sessions: 18, avgDuration: "2.5 hours", price: "₹5000-7000" },
    { name: "Bhagavad Gita", sessions: 8, avgDuration: "1.5 hours", price: "₹3000-4500" },
    { name: "Puranas", sessions: 6, avgDuration: "2 hours", price: "₹3500-5000" },
    { name: "Festival Stories", sessions: 4, avgDuration: "1 hour", price: "₹2500-3500" },
    { name: "Moral Stories", sessions: 3, avgDuration: "1 hour", price: "₹2000-3000" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full spiritual-gradient flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold">Kathavachak Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" alt={user.name} />
                <AvatarFallback>
                  {user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Upcoming Sessions</p>
                      <p className="text-2xl font-bold">{kathavachakStats.upcomingSessions}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-spiritual-sage/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-spiritual-sage" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed Sessions</p>
                      <p className="text-2xl font-bold">{kathavachakStats.completedSessions}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-spiritual-gold/20 flex items-center justify-center">
                      <Award className="w-6 h-6 text-spiritual-gold" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                      <p className="text-2xl font-bold">₹{kathavachakStats.totalEarnings.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-spiritual-rose/20 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-spiritual-rose" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Rating</p>
                      <p className="text-2xl font-bold">{kathavachakStats.averageRating}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming & Recent Sessions */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSessions.slice(0, 3).map(session => (
                    <div key={session.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{session.topic}</h4>
                        <span className="text-sm font-semibold">₹{session.amount.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Venue: {session.venue}</p>
                      <p className="text-sm text-muted-foreground mb-1">{session.date} at {session.time}</p>
                      <p className="text-sm text-muted-foreground">Duration: {session.duration} • Expected: {session.expectedAudience} people</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{session.topic}</p>
                        <p className="text-sm text-muted-foreground">{session.venue}</p>
                        <p className="text-sm text-muted-foreground">{session.date} • {session.audience} people</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{session.rating}</span>
                        </div>
                        <p className="font-semibold">₹{session.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs (sessions, topics, schedule, profile) remain exactly same as JSX */}
          {/* Just remove TypeScript types */}
          {/* ... */}
        </Tabs>
      </div>
    </div>
  )
}

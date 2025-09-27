"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Calendar, DollarSign, MapPin, Star, Eye, Edit, Plus, Bell, Settings, Heart, Award } from "lucide-react"

export function SamitiDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock samiti data
  const samitiStats = {
    totalMembers: 45,
    activeEvents: 3,
    totalDonations: 12500,
    upcomingEvents: 5,
    completedProjects: 12,
    averageRating: 4.8,
  }

  const upcomingEvents = [
    { id: "1", title: "Ganesh Chaturthi Celebration", date: "2024-12-30", time: "6:00 PM", location: "Community Hall", attendees: 120, status: "confirmed" },
    { id: "2", title: "Weekly Aarti", date: "2024-12-28", time: "7:00 PM", location: "Temple Premises", attendees: 45, status: "confirmed" },
    { id: "3", title: "Cultural Program", date: "2025-01-05", time: "5:00 PM", location: "Main Auditorium", attendees: 200, status: "planning" },
  ]

  const recentDonations = [
    { donor: "Anonymous", amount: 500, date: "2024-12-25", purpose: "Festival Preparation" },
    { donor: "Rajesh Kumar", amount: 1000, date: "2024-12-24", purpose: "Temple Maintenance" },
    { donor: "Priya Sharma", amount: 250, date: "2024-12-23", purpose: "Community Service" },
    { donor: "Amit Patel", amount: 750, date: "2024-12-22", purpose: "Food Distribution" },
  ]

  const teamMembers = [
    { name: "Rajesh Kumar", role: "President", joinDate: "2020-01-15", status: "active" },
    { name: "Priya Sharma", role: "Secretary", joinDate: "2021-03-20", status: "active" },
    { name: "Amit Patel", role: "Treasurer", joinDate: "2019-11-10", status: "active" },
    { name: "Sunita Devi", role: "Cultural Head", joinDate: "2022-05-08", status: "active" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full spiritual-gradient flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold">Samiti Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon"><Bell className="w-4 h-4" /></Button>
              <Button variant="ghost" size="icon"><Settings className="w-4 h-4" /></Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg" alt={user.name} />
                <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Total Members</p><p className="text-2xl font-bold">{samitiStats.totalMembers}</p></div><div className="w-12 h-12 rounded-full bg-spiritual-sage/20 flex items-center justify-center"><Users className="w-6 h-6 text-spiritual-sage" /></div></div></CardContent></Card>
              <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Active Events</p><p className="text-2xl font-bold">{samitiStats.activeEvents}</p></div><div className="w-12 h-12 rounded-full bg-spiritual-gold/20 flex items-center justify-center"><Calendar className="w-6 h-6 text-spiritual-gold" /></div></div></CardContent></Card>
              <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Total Donations</p><p className="text-2xl font-bold">₹{samitiStats.totalDonations.toLocaleString()}</p></div><div className="w-12 h-12 rounded-full bg-spiritual-rose/20 flex items-center justify-center"><DollarSign className="w-6 h-6 text-spiritual-rose" /></div></div></CardContent></Card>
              <Card><CardContent className="p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-muted-foreground">Rating</p><p className="text-2xl font-bold">{samitiStats.averageRating}</p></div><div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"><Star className="w-6 h-6 text-primary" /></div></div></CardContent></Card>
            </div>

            {/* Upcoming Events & Recent Donations */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Upcoming Events</span>
                    <Button size="sm"><Plus className="w-4 h-4 mr-2" />Add Event</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.slice(0, 3).map(event => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                        <p className="text-sm text-muted-foreground flex items-center"><MapPin className="w-3 h-3 mr-1" />{event.location}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={event.status === "confirmed" ? "default" : "secondary"}>{event.status}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">{event.attendees} attending</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle>Recent Donations</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {recentDonations.map((donation, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{donation.donor}</p>
                        <p className="text-sm text-muted-foreground">{donation.purpose}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{donation.amount}</p>
                        <p className="text-sm text-muted-foreground">{donation.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other Tabs (Events, Members, Donations, Profile) */}
          {/* You can keep the same JSX inside these tabs as in your TSX version */}
        </Tabs>
      </div>
    </div>
  )
}

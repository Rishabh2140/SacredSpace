"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, DollarSign, Star, Eye, Edit, Plus, Bell, Settings, Heart, Award } from "lucide-react"

export function PujariDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock pujari data
  const pujariStats = {
    upcomingBookings: 8,
    completedServices: 156,
    totalEarnings: 45000,
    averageRating: 4.8,
    monthlyBookings: 24,
    availableSlots: 12,
  }

  const upcomingBookings = [
    { id: "1", service: "Wedding Ceremony", client: "Sharma Family", date: "2024-12-28", time: "10:00 AM", duration: "3 hours", amount: 5000, location: "Bride's Home" },
    { id: "2", service: "Griha Pravesh Puja", client: "Patel Family", date: "2024-12-30", time: "6:00 AM", duration: "2 hours", amount: 2500, location: "New Home" },
    { id: "3", service: "Satyanarayan Katha", client: "Gupta Family", date: "2025-01-02", time: "7:00 PM", duration: "2.5 hours", amount: 3000, location: "Community Hall" },
  ]

  const recentServices = [
    { service: "Diwali Puja", client: "Singh Family", date: "2024-12-20", rating: 5, amount: 2000 },
    { service: "Havan Ceremony", client: "Agarwal Family", date: "2024-12-18", rating: 5, amount: 3500 },
    { service: "Birthday Puja", client: "Jain Family", date: "2024-12-15", rating: 4, amount: 1500 },
  ]

  const availableServices = [
    { name: "Wedding Ceremony", duration: "3-4 hours", price: "₹5000-8000" },
    { name: "Griha Pravesh", duration: "2 hours", price: "₹2500" },
    { name: "Satyanarayan Katha", duration: "2.5 hours", price: "₹3000" },
    { name: "Havan Ceremony", duration: "1.5 hours", price: "₹2000" },
    { name: "Birthday Puja", duration: "1 hour", price: "₹1500" },
    { name: "Festival Puja", duration: "2 hours", price: "₹2500" },
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
                <h1 className="text-xl font-serif font-semibold">Pujari Dashboard</h1>
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
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Upcoming Bookings</p>
                    <p className="text-2xl font-bold">{pujariStats.upcomingBookings}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-spiritual-sage/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-spiritual-sage" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed Services</p>
                    <p className="text-2xl font-bold">{pujariStats.completedServices}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-spiritual-gold/20 flex items-center justify-center">
                    <Award className="w-6 h-6 text-spiritual-gold" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                    <p className="text-2xl font-bold">₹{pujariStats.totalEarnings.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-spiritual-rose/20 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-spiritual-rose" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rating</p>
                    <p className="text-2xl font-bold">{pujariStats.averageRating}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upcoming Bookings */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Bookings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{booking.service}</h4>
                        <span className="text-sm font-semibold">₹{booking.amount.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Client: {booking.client}</p>
                      <p className="text-sm text-muted-foreground mb-1">{booking.date} at {booking.time}</p>
                      <p className="text-sm text-muted-foreground">Duration: {booking.duration} • Location: {booking.location}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{service.service}</p>
                        <p className="text-sm text-muted-foreground">{service.client}</p>
                        <p className="text-sm text-muted-foreground">{service.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{service.rating}</span>
                        </div>
                        <p className="font-semibold">₹{service.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings, Services, Schedule, Profile Tabs remain the same, just remove TS types */}
        </Tabs>
      </div>
    </div>
  )
}

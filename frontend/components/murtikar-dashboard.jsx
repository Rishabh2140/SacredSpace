"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Palette, Package, DollarSign, Star, Eye, Edit, Plus, Bell, Settings, Award } from "lucide-react"

export function MurtikarDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock murtikar data
  const murtikarStats = {
    totalOrders: 28,
    completedWorks: 24,
    activeProjects: 4,
    totalEarnings: 85000,
    averageRating: 4.9,
    portfolioItems: 45,
  }

  const activeOrders = [
    { id: "1", title: "Ganesh Murti - Large", client: "Shree Ganesh Samiti", deadline: "2024-12-30", status: "in-progress", amount: 15000, progress: 75 },
    { id: "2", title: "Durga Mata Idol", client: "Community Center", deadline: "2025-01-15", status: "design-phase", amount: 25000, progress: 25 },
    { id: "3", title: "Krishna Murti Set", client: "Private Client", deadline: "2025-01-20", status: "material-prep", amount: 12000, progress: 10 },
  ]

  const recentCompletions = [
    { title: "Saraswati Idol", client: "School Committee", completedDate: "2024-12-20", rating: 5, amount: 8000 },
    { title: "Hanuman Murti", client: "Temple Trust", completedDate: "2024-12-15", rating: 5, amount: 10000 },
    { title: "Lakshmi Idol", client: "Private Client", completedDate: "2024-12-10", rating: 4, amount: 6000 },
  ]

  const materials = [
    { name: "Clay", quantity: "50 kg", status: "sufficient", lastOrdered: "2024-12-15" },
    { name: "Plaster of Paris", quantity: "25 kg", status: "low", lastOrdered: "2024-12-10" },
    { name: "Paints", quantity: "Various", status: "sufficient", lastOrdered: "2024-12-18" },
    { name: "Brushes", quantity: "15 pieces", status: "sufficient", lastOrdered: "2024-12-05" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full spiritual-gradient flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold">Murtikar Dashboard</h1>
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
                  {user.name.split(" ").map((n) => n[0]).join("")}
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
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                      <p className="text-2xl font-bold">{murtikarStats.activeProjects}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-spiritual-sage/20 flex items-center justify-center">
                      <Package className="w-6 h-6 text-spiritual-sage" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed Works</p>
                      <p className="text-2xl font-bold">{murtikarStats.completedWorks}</p>
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
                      <p className="text-2xl font-bold">₹{murtikarStats.totalEarnings.toLocaleString()}</p>
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
                      <p className="text-2xl font-bold">{murtikarStats.averageRating}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Orders and Recent Completions */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Active Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeOrders.map((order) => (
                    <div key={order.id} className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{order.title}</h4>
                        <Badge variant={order.status === "in-progress" ? "default" : "secondary"}>{order.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Client: {order.client}</p>
                      <p className="text-sm text-muted-foreground mb-2">Deadline: {order.deadline}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">₹{order.amount.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">{order.progress}% complete</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Completions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Completions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentCompletions.map((completion, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{completion.title}</p>
                        <p className="text-sm text-muted-foreground">{completion.client}</p>
                        <p className="text-sm text-muted-foreground">{completion.completedDate}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{completion.rating}</span>
                        </div>
                        <p className="font-semibold">₹{completion.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other Tabs: orders, portfolio, materials, profile */}
          {/* ... keep the JSX content as-is, just without type annotations */}
        </Tabs>
      </div>
    </div>
  )
}

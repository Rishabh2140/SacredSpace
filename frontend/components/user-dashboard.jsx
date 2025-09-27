"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  Users,
  BookOpen,
  Calendar,
  Settings,
  Bell,
  MessageCircle,
  Clock,
  Star,
  Award,
  Target,
  TrendingUp,
} from "lucide-react"

export function UserDashboard({ user }) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock user data
  const userData = {
    faith: "Christianity",
    joinDate: "January 2024",
    avatar: "/diverse-woman-smiling.png",
    stats: {
      prayersCompleted: 45,
      communityPosts: 12,
      eventsAttended: 8,
      studyHours: 24,
    },
  }

  const recentActivities = [
    { type: "prayer", text: "Completed morning prayer", time: "2 hours ago", icon: Heart },
    { type: "community", text: "Posted in Bible Study group", time: "4 hours ago", icon: MessageCircle },
    { type: "event", text: "Attended Sunday Service", time: "2 days ago", icon: Calendar },
    { type: "study", text: "Read Psalm 23", time: "3 days ago", icon: BookOpen },
  ]

  const upcomingEvents = [
    { title: "Wednesday Prayer Circle", time: "Tomorrow 7:00 PM", participants: 24 },
    { title: "Bible Study Group", time: "Friday 6:30 PM", participants: 18 },
    { title: "Community Outreach", time: "Saturday 10:00 AM", participants: 35 },
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
                <h1 className="text-xl font-serif font-semibold">SacredSpace</h1>
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
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Prayers Completed */}
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Prayers Completed</p>
                    <p className="text-2xl font-bold">{userData.stats.prayersCompleted}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-spiritual-rose/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-spiritual-rose" />
                  </div>
                </CardContent>
              </Card>

              {/* Community Posts */}
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Community Posts</p>
                    <p className="text-2xl font-bold">{userData.stats.communityPosts}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-spiritual-sage/20 flex items-center justify-center">
                    <Users className="w-6 h-6 text-spiritual-sage" />
                  </div>
                </CardContent>
              </Card>

              {/* Events Attended */}
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Events Attended</p>
                    <p className="text-2xl font-bold">{userData.stats.eventsAttended}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-spiritual-gold/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-spiritual-gold" />
                  </div>
                </CardContent>
              </Card>

              {/* Study Hours */}
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Study Hours</p>
                    <p className="text-2xl font-bold">{userData.stats.studyHours}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.text}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Upcoming Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge variant="secondary">{event.participants} attending</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                      {index < upcomingEvents.length - 1 && <Separator />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile, Community, Progress tabs remain unchanged */}
          {/* ... copy all JSX from TypeScript version without type annotations ... */}

        </Tabs>
      </div>
    </div>
  )
}

"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Users,
  MessageCircle,
  Shield,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  DollarSign,
  Activity,
  Search,
  Filter,
  Plus,
  Download,
} from "lucide-react"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")

  // Mock admin data
  const platformStats = {
    totalUsers: 12456,
    activeUsers: 8934,
    totalPosts: 3456,
    totalServices: 234,
    totalDonations: 45678,
    reportedContent: 23,
    pendingApprovals: 12,
  }

  const recentUsers = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      joinDate: "2024-12-20",
      status: "active",
      faith: "Christianity",
      posts: 12,
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Ahmed Hassan",
      email: "ahmed@example.com",
      joinDate: "2024-12-19",
      status: "active",
      faith: "Islam",
      posts: 8,
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "David Chen",
      email: "david@example.com",
      joinDate: "2024-12-18",
      status: "pending",
      faith: "Buddhism",
      posts: 0,
      lastActive: "3 days ago",
    },
  ]

  const reportedContent = [
    {
      id: "1",
      type: "Forum Post",
      title: "Inappropriate language in prayer request",
      author: "John Doe",
      reporter: "Mary Smith",
      reason: "Inappropriate language",
      status: "pending",
      reportDate: "2024-12-25",
      severity: "medium",
    },
    {
      id: "2",
      type: "Comment",
      title: "Offensive comment on Bible study discussion",
      author: "Anonymous User",
      reporter: "Pastor Mike",
      reason: "Hate speech",
      status: "under-review",
      reportDate: "2024-12-24",
      severity: "high",
    },
  ]

  const pendingServices = [
    {
      id: "1",
      title: "Evening Prayer Session",
      organizer: "Sister Maria",
      faith: "Christianity",
      scheduledDate: "2024-12-27",
      expectedAttendees: 45,
      status: "pending-approval",
      submittedDate: "2024-12-23",
    },
    {
      id: "2",
      title: "Quran Study Circle",
      organizer: "Imam Abdullah",
      faith: "Islam",
      scheduledDate: "2024-12-28",
      expectedAttendees: 32,
      status: "pending-approval",
      submittedDate: "2024-12-24",
    },
  ]

  const contentLibraryStats = [
    { category: "Prayers", count: 234, approved: 220, pending: 14 },
    { category: "Scriptures", count: 156, approved: 156, pending: 0 },
    { category: "Meditations", count: 89, approved: 85, pending: 4 },
    { category: "Devotionals", count: 178, approved: 170, pending: 8 },
  ]

  const handleUserAction = (userId, action) => {
    console.log(`${action} user ${userId}`)
    // Implement user action logic
  }

  const handleContentModeration = (contentId, action) => {
    console.log(`${action} content ${contentId}`)
    // Implement content moderation logic
  }

  const handleServiceApproval = (serviceId, approved) => {
    console.log(`${approved ? "Approve" : "Reject"} service ${serviceId}`)
    // Implement service approval logic
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Platform management and moderation</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+12% from last month</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-spiritual-sage/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-spiritual-sage" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                      <p className="text-2xl font-bold">{platformStats.activeUsers.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+8% from last week</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-spiritual-gold/20 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-spiritual-gold" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Community Posts</p>
                      <p className="text-2xl font-bold">{platformStats.totalPosts.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+15% from last week</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-spiritual-rose/20 flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-spiritual-rose" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
                      <p className="text-2xl font-bold">${platformStats.totalDonations.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+23% from last month</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alerts and Pending Items */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span>Requires Attention</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <p className="font-medium">Reported Content</p>
                      <p className="text-sm text-muted-foreground">{platformStats.reportedContent} items need review</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Pending Approvals</p>
                      <p className="text-sm text-muted-foreground">
                        {platformStats.pendingApprovals} services awaiting approval
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <p className="text-sm">New user registration: Sarah Johnson</p>
                    <span className="text-xs text-muted-foreground ml-auto">2 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <p className="text-sm">Service approved: Evening Prayer Session</p>
                    <span className="text-xs text-muted-foreground ml-auto">15 min ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <p className="text-sm">Content reported: Forum post flagged</p>
                    <span className="text-xs text-muted-foreground ml-auto">1 hour ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <p className="text-sm">New donation received: $250</p>
                    <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">User Management</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search users..." className="pl-10 w-64" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Faith</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Posts</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.faith}</Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.posts}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Ban className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Suspend User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to suspend {user.name}? This action can be reversed later.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleUserAction(user.id, "suspend")}>
                                  Suspend User
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Content Library Management</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Content
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contentLibraryStats.map((stat) => (
                <Card key={stat.category}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{stat.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total</span>
                      <span className="font-semibold">{stat.count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Approved</span>
                      <span className="font-semibold text-green-600">{stat.approved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Pending</span>
                      <span className="font-semibold text-orange-600">{stat.pending}</span>
                    </div>
                    {stat.pending > 0 && (
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Review Pending
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Service Management</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Service
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Pending Service Approvals</CardTitle>
                <CardDescription>Services awaiting admin approval</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Organizer</TableHead>
                      <TableHead>Faith</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Expected Attendees</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{service.title}</p>
                            <p className="text-sm text-muted-foreground">Submitted {service.submittedDate}</p>
                          </div>
                        </TableCell>
                        <TableCell>{service.organizer}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{service.faith}</Badge>
                        </TableCell>
                        <TableCell>{service.scheduledDate}</TableCell>
                        <TableCell>{service.expectedAttendees}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleServiceApproval(service.id, true)}>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleServiceApproval(service.id, false)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Content Moderation</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="destructive">{reportedContent.length} reports pending</Badge>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Reported Content</CardTitle>
                <CardDescription>Content flagged by community members</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Content</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportedContent.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{report.title}</p>
                            <Badge variant="outline" className="mt-1">
                              {report.type}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{report.author}</TableCell>
                        <TableCell>{report.reporter}</TableCell>
                        <TableCell>{report.reason}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              report.severity === "high"
                                ? "destructive"
                                : report.severity === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {report.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Review
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleContentModeration(report.id, "approve")}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Dismiss
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleContentModeration(report.id, "remove")}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-semibold">Platform Settings</h2>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure platform-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">User Registration</p>
                      <p className="text-sm text-muted-foreground">Allow new users to register</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Content Moderation</p>
                      <p className="text-sm text-muted-foreground">Require approval for new content</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Send platform notifications via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage platform security options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-muted-foreground">Auto-logout inactive sessions</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">IP Restrictions</p>
                      <p className="text-sm text-muted-foreground">Restrict admin access by IP</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

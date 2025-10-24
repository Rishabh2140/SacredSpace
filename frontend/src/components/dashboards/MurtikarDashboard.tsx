import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Calendar,
  DollarSign,
  Users,
  Star,
  TrendingUp,
  Eye,
  MessageCircle,
  Briefcase,
  Package,
  Clock,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function MurtikarDashboard({ onNavigate, currentUser }) {
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] =
    useState("30d");

  const stats = {
    totalOrders: 47,
    completedOrders: 43,
    activeOrders: 4,
    totalRevenue: 1250000,
    monthlyRevenue: 185000,
    avgRating: 4.8,
    totalReviews: 156,
    profileViews: 2840,
    newInquiries: 12,
  };

  const recentOrders = [
    {
      id: 1,
      title: "Eco-Friendly Ganesh Idol",
      client: "Mumbai Cultural Society",
      clientAvatar: "MCS",
      amount: 250000,
      status: "In Progress",
      deadline: "Nov 15, 2024",
      progress: 65,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      title: "Traditional Durga Maa",
      client: "Kolkata Puja Committee",
      clientAvatar: "KPC",
      amount: 375000,
      status: "Completed",
      deadline: "Oct 20, 2024",
      progress: 100,
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      title: "Krishna Miniature Set",
      client: "Vrindavan Temple",
      clientAvatar: "VT",
      amount: 45000,
      status: "Pending Approval",
      deadline: "Dec 5, 2024",
      progress: 25,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const recentInquiries = [
    {
      id: 1,
      client: "Delhi Temple Committee",
      service: "Large Hanuman Statue",
      budget: "₹5,00,000 - ₹7,50,000",
      deadline: "March 2025",
      time: "2 hours ago",
      priority: "high",
    },
    {
      id: 2,
      client: "Private Client",
      service: "Home Altar Set",
      budget: "₹25,000 - ₹50,000",
      deadline: "January 2025",
      time: "5 hours ago",
      priority: "medium",
    },
    {
      id: 3,
      client: "Pune Cultural Society",
      service: "Ganesha Festival Decoration",
      budget: "₹1,00,000 - ₹2,00,000",
      deadline: "August 2025",
      time: "1 day ago",
      priority: "low",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Complete clay modeling for Ganesh project",
      due: "Today",
      priority: "high",
    },
    {
      id: 2,
      title: "Client meeting - Durga Maa design approval",
      due: "Tomorrow",
      priority: "high",
    },
    {
      id: 3,
      title: "Source materials for Krishna set",
      due: "Nov 8",
      priority: "medium",
    },
    {
      id: 4,
      title: "Photography for portfolio update",
      due: "Nov 10",
      priority: "low",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-blue-500";
      case "Pending Approval":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-orange-600 bg-orange-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
                  {currentUser?.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Welcome back, {currentUser?.name}!
                </h1>
                <p className="text-sm text-gray-600">
                  Manage your sculpture business
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/profile">
                <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline">View Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalOrders}
                    </p>
                    <ArrowUp className="w-4 h-4 text-green-500 ml-2" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Monthly Revenue
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">
                      ₹
                      {(stats.monthlyRevenue / 1000).toFixed(0)}
                      k
                    </p>
                    <ArrowUp className="w-4 h-4 text-green-500 ml-2" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Rating
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.avgRating}
                    </p>
                    <Star className="w-4 h-4 text-yellow-500 fill-current ml-2" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Profile Views
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.profileViews}
                    </p>
                    <ArrowUp className="w-4 h-4 text-green-500 ml-2" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={order.image}
                          alt={order.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {order.title}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                                  {order.clientAvatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-600">
                                {order.client}
                              </span>
                            </div>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span>{order.deadline}</span>
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                <span>
                                  ₹
                                  {order.amount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={getStatusColor(
                                order.status,
                              )}
                            >
                              {order.status}
                            </Badge>
                            <div className="mt-2 w-20">
                              <Progress
                                value={order.progress}
                                className="h-2"
                              />
                              <span className="text-xs text-gray-500">
                                {order.progress}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                    <p>Revenue chart visualization</p>
                    <p className="text-sm">
                      ₹{stats.totalRevenue.toLocaleString()}{" "}
                      total revenue
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Project
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Update Portfolio
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Clients
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
              </CardContent>
            </Card>

            {/* New Inquiries */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>New Inquiries</CardTitle>
                  <Badge className="bg-red-500">
                    {stats.newInquiries}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm">
                          {inquiry.client}
                        </h4>
                        <Badge
                          className={`text-xs ${getPriorityColor(inquiry.priority)}`}
                        >
                          {inquiry.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {inquiry.service}
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        {inquiry.budget}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{inquiry.time}</span>
                        <span>Due: {inquiry.deadline}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                >
                  View All Inquiries
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {task.title}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            {task.due}
                          </span>
                          <Badge
                            className={`text-xs ${getPriorityColor(task.priority)}`}
                          >
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Order Completion Rate</span>
                      <span>91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Client Satisfaction</span>
                      <span>4.8/5</span>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>On-Time Delivery</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
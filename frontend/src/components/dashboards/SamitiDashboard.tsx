import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Eye,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUp,
  Star,
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
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function SamitiDashboard({ currentUser }) {
  const navigate = useNavigate();
  const [selectedTimeRange, setSelectedTimeRange] =
    useState("30d");

  const stats = {
    totalEvents: 73,
    activeEvents: 3,
    upcomingEvents: 8,
    totalDonations: 2850000,
    monthlyDonations: 420000,
    totalVolunteers: 245,
    activeVolunteers: 89,
    communityMembers: 5600,
    avgEventRating: 4.7,
  };

  const activeEvents = [
    {
      id: 1,
      name: "Ganesh Chaturthi 2024",
      location: "Lalbagh Pandal",
      startDate: "Sep 7, 2024",
      endDate: "Sep 17, 2024",
      status: "In Progress",
      budget: 1500000,
      raised: 1450000,
      volunteers: 156,
      attendees: 50000,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      name: "Diwali Community Festival",
      location: "Mumbai Cultural Center",
      startDate: "Nov 1, 2024",
      endDate: "Nov 5, 2024",
      status: "Planning",
      budget: 800000,
      raised: 425000,
      volunteers: 89,
      attendees: 15000,
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      name: "Community Kitchen Setup",
      location: "Andheri Community Hall",
      startDate: "Dec 10, 2024",
      endDate: "Ongoing",
      status: "Fundraising",
      budget: 300000,
      raised: 245000,
      volunteers: 34,
      attendees: 500,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const recentDonations = [
    {
      id: 1,
      donor: "Anita Sharma",
      amount: 51000,
      campaign: "Ganesh Chaturthi 2024",
      time: "2 hours ago",
      type: "individual",
    },
    {
      id: 2,
      donor: "Corporate Sponsor Ltd",
      amount: 200000,
      campaign: "Diwali Community Festival",
      time: "5 hours ago",
      type: "corporate",
    },
    {
      id: 3,
      donor: "Mumbai Residents Assoc",
      amount: 75000,
      campaign: "Community Kitchen Setup",
      time: "1 day ago",
      type: "organization",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Rajesh Kulkarni",
      role: "President",
      avatar: "RK",
      status: "online",
      tasksCompleted: 34,
      events: 12,
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Secretary",
      avatar: "PS",
      status: "online",
      tasksCompleted: 28,
      events: 15,
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Treasurer",
      avatar: "AP",
      status: "away",
      tasksCompleted: 31,
      events: 9,
    },
    {
      id: 4,
      name: "Sunita Joshi",
      role: "Event Coordinator",
      avatar: "SJ",
      status: "online",
      tasksCompleted: 42,
      events: 18,
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: "Finalize vendor contracts for Diwali festival",
      due: "Today",
      priority: "high",
      assignee: "Priya Sharma",
    },
    {
      id: 2,
      title: "Coordinate volunteer training session",
      due: "Tomorrow",
      priority: "high",
      assignee: "Sunita Joshi",
    },
    {
      id: 3,
      title: "Review budget allocation for community kitchen",
      due: "Nov 8",
      priority: "medium",
      assignee: "Amit Patel",
    },
    {
      id: 4,
      title: "Update event website with latest information",
      due: "Nov 10",
      priority: "low",
      assignee: "Rajesh Kulkarni",
    },
  ];

  const getEventStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500";
      case "Planning":
        return "bg-yellow-500";
      case "Fundraising":
        return "bg-green-500";
      case "Completed":
        return "bg-gray-500";
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

  const getDonorTypeIcon = (type) => {
    switch (type) {
      case "corporate":
        return "🏢";
      case "organization":
        return "🏛️";
      default:
        return "👤";
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
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  {currentUser?.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Welcome back, {currentUser?.name}!
                </h1>
                <p className="text-sm text-gray-600">
                  Manage your community events and activities
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/profile">
                <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                  <Plus className="w-4 h-4 mr-2" />
                  New Event
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
                    Active Events
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.activeEvents}
                    </p>
                    <ArrowUp className="w-4 h-4 text-green-500 ml-2" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Monthly Donations
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">
                      ₹
                      {(stats.monthlyDonations / 1000).toFixed(
                        0,
                      )}
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
                    Active Volunteers
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.activeVolunteers}
                    </p>
                    <ArrowUp className="w-4 h-4 text-green-500 ml-2" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Community Members
                  </p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-gray-900">
                      {(stats.communityMembers / 1000).toFixed(
                        1,
                      )}
                      k
                    </p>
                    <ArrowUp className="w-4 h-4 text-green-500 ml-2" />
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Events */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Active Events</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={event.image}
                            alt={event.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {event.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {event.location}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {event.startDate} -{" "}
                                {event.endDate}
                              </p>
                            </div>
                            <Badge
                              className={getEventStatusColor(
                                event.status,
                              )}
                            >
                              {event.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-gray-500">
                                Fundraising
                              </p>
                              <div className="flex items-center space-x-2">
                                <Progress
                                  value={
                                    (event.raised /
                                      event.budget) *
                                    100
                                  }
                                  className="flex-1 h-2"
                                />
                                <span className="text-xs text-gray-600">
                                  {Math.round(
                                    (event.raised /
                                      event.budget) *
                                      100,
                                  )}
                                  %
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                ₹
                                {(event.raised / 1000).toFixed(
                                  0,
                                )}
                                k / ₹
                                {(event.budget / 1000).toFixed(
                                  0,
                                )}
                                k
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Volunteers
                              </p>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 text-gray-400 mr-1" />
                                <span className="text-sm font-medium">
                                  {event.volunteers}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">
                                Expected Attendees
                              </p>
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 text-gray-400 mr-1" />
                                <span className="text-sm font-medium">
                                  {event.attendees.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Donations Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Donation Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center text-gray-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                    <p>Donation trends visualization</p>
                    <p className="text-sm">
                      ₹{stats.totalDonations.toLocaleString()}{" "}
                      total raised
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">
                    Recent Donations
                  </h4>
                  {recentDonations.map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">
                          {getDonorTypeIcon(donation.type)}
                        </div>
                        <div>
                          <p className="font-medium text-sm">
                            {donation.donor}
                          </p>
                          <p className="text-xs text-gray-600">
                            {donation.campaign}
                          </p>
                          <p className="text-xs text-gray-500">
                            {donation.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">
                          ₹{donation.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
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
                  Create New Event
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Manage Volunteers
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  View Donations
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Team Communication
                </Button>
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            member.status === "online"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {member.role}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                          <span>
                            {member.tasksCompleted} tasks
                          </span>
                          <span>{member.events} events</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                      className="p-3 border rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">
                          {task.title}
                        </h4>
                        <Badge
                          className={`text-xs ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Due: {task.due}</span>
                        <span>{task.assignee}</span>
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
                      <span>Event Success Rate</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fundraising Goal Achievement</span>
                      <span>87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Volunteer Retention</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Community Satisfaction</span>
                      <span>{stats.avgEventRating}/5</span>
                    </div>
                    <Progress
                      value={(stats.avgEventRating / 5) * 100}
                      className="h-2"
                    />
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
import { useState } from "react";
import {
  Plus,
  Calendar,
  Heart,
  Bookmark,
  MapPin,
  Star,
  Eye,
  Play,
  Clock,
  TrendingUp,
  Users,
  Bell,
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

export function CommonUserDashboard({
  onNavigate,
  currentUser,
}) {
  const [selectedTab, setSelectedTab] = useState("overview");
  const navigate = useNavigate();
  const stats = {
    templesVisited: 24,
    totalPrayers: 156,
    donationsGiven: 12,
    totalDonationAmount: 25000,
    bookmarkedPlaces: 18,
    communityPosts: 8,
    followedGuides: 15,
    attendedEvents: 6,
  };

  const recentActivities = [
    {
      id: 1,
      type: "visit",
      title: "Virtual visit to Golden Temple",
      location: "Amritsar, Punjab",
      time: "2 hours ago",
      image:
        "https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      type: "donation",
      title: "Donated to Ganesh Festival",
      location: "Mumbai, Maharashtra",
      time: "1 day ago",
      amount: 2500,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      type: "prayer",
      title: "Submitted prayer request",
      location: "Siddhivinayak Temple",
      time: "2 days ago",
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 4,
      type: "booking",
      title: "Booked Satyanarayan Puja",
      location: "Home Service",
      time: "3 days ago",
      pujari: "Pandit Vishnu Acharya",
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const bookmarkedPlaces = [
    {
      id: 1,
      name: "Lalbaugcha Raja",
      location: "Mumbai, Maharashtra",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: true,
    },
    {
      id: 2,
      name: "Golden Temple",
      location: "Amritsar, Punjab",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: true,
    },
    {
      id: 3,
      name: "Meenakshi Temple",
      location: "Madurai, Tamil Nadu",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: false,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      name: "Diwali Celebration",
      organizer: "Mumbai Cultural Society",
      date: "Oct 31, 2024",
      time: "6:00 PM",
      location: "Mumbai Temple",
      attendees: 450,
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      name: "Christmas Mass",
      organizer: "St. Cathedral",
      date: "Dec 25, 2024",
      time: "7:00 AM",
      location: "Mumbai Cathedral",
      attendees: 320,
      image:
        "https://images.unsplash.com/photo-1625259566209-8c59614a28fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjYXRoZWRyYWwlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const myBookings = [
    {
      id: 1,
      service: "Ganesh Puja Ritual",
      pujari: "Pandit Rajesh Sharma",
      date: "Nov 12, 2024",
      time: "10:00 AM",
      status: "Confirmed",
      amount: 2500,
    },
    {
      id: 2,
      service: "Wedding Ceremony Consultation",
      pujari: "Pandit Vishnu Acharya",
      date: "Nov 20, 2024",
      time: "4:00 PM",
      status: "Pending",
      amount: 5000,
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "visit":
        return <Eye className="w-4 h-4 text-blue-500" />;
      case "donation":
        return <Heart className="w-4 h-4 text-red-500" />;
      case "prayer":
        return <Star className="w-4 h-4 text-yellow-500" />;
      case "booking":
        return <Calendar className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 sm:h-16 sm:py-0 gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
                  {currentUser?.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Welcome, {currentUser?.name}!
                </h1>
                <p className="text-sm text-gray-600">
                  Your spiritual journey continues
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
              <Link to="/virtual-worship" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-sm">
                  <Play className="w-4 h-4 mr-2" />
                  Start Virtual Visit
                </Button>
              </Link>
              <Link to="/profile" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto text-sm">View Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Temples Visited
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.templesVisited}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Prayers Offered
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalPrayers}
                  </p>
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
                    Donations Given
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹
                    {(stats.totalDonationAmount / 1000).toFixed(
                      0,
                    )}
                    k
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Bookmarked Places
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.bookmarkedPlaces}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Bookmark className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Activities</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getActivityIcon(activity.type)}
                          <h4 className="font-semibold text-sm">
                            {activity.title}
                          </h4>
                        </div>
                        <p className="text-xs text-gray-600 mb-1">
                          {activity.location}
                        </p>
                        {activity.amount && (
                          <p className="text-xs text-green-600 font-medium">
                            ₹{activity.amount.toLocaleString()}
                          </p>
                        )}
                        {activity.pujari && (
                          <p className="text-xs text-blue-600">
                            {activity.pujari}
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* My Bookings */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Bookings</CardTitle>
                  <Button variant="outline" size="sm">
                    New Booking
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {booking.service}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {booking.pujari}
                          </p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>{booking.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{booking.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={getStatusColor(
                              booking.status,
                            )}
                          >
                            {booking.status}
                          </Badge>
                          <p className="text-sm font-semibold text-gray-900 mt-2">
                            ₹{booking.amount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Spiritual Progress */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Spiritual Journey Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Monthly Temple Visits</span>
                      <span>{stats.templesVisited}/30</span>
                    </div>
                    <Progress
                      value={(stats.templesVisited / 30) * 100}
                      className="h-3"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Prayer Consistency</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Community Engagement</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-3" />
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
                <Button
                  className="w-full justify-start"
                  onClick={() => onNavigate("virtual-worship")}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Virtual Temple Visit
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate("live-streaming")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Join Live Aarti
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate("map")}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Explore Map
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate("community")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Community Forum
                </Button>
              </CardContent>
            </Card>

            {/* Bookmarked Places */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>My Favorites</CardTitle>
                  <Badge variant="secondary">
                    {stats.bookmarkedPlaces}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {bookmarkedPlaces.map((place) => (
                    <div
                      key={place.id}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                        {place.isLive && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">
                          {place.name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {place.location}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                          <span className="text-xs">
                            {place.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-3"
                >
                  View All Favorites
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-lg p-3"
                    >
                      <div className="flex space-x-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={event.image}
                            alt={event.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">
                            {event.name}
                          </h4>
                          <p className="text-xs text-gray-600 mb-1">
                            {event.organizer}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span>{event.date}</span>
                            <span>•</span>
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <Users className="w-3 h-3 mr-1" />
                            <span>
                              {event.attendees} attending
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full mt-3"
                      >
                        <Bell className="w-3 h-3 mr-1" />
                        Set Reminder
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievement Badge */}
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Devoted Seeker
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  You've visited 24 temples and offered 156
                  prayers. Keep up your spiritual journey!
                </p>
                <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  Level 3 Devotee
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Calendar,
  Clock,
  Users,
  Heart,
  Share2,
  Bookmark,
  Play,
  Eye,
  Phone,
  Mail,
  Globe,
  Camera,
  MessageCircle,
  Gift,
  Plus,
  Filter,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function SpaceDetail({
  space,
  onNavigate,
  onSelectProfile,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [eventFilter, setEventFilter] = useState("all");
  const [searchEvents, setSearchEvents] = useState("");

  // Mock space data - in real app this would come from props or API
  const defaultSpaceData = {
    id: id || 1,
    name: "Sri Krishna Temple",
    type: "temple",
    category: "Hindu",
    location: "Dwarka, Delhi",
    address: "Sector 13, Dwarka, New Delhi - 110078",
    description:
      "A magnificent temple dedicated to Lord Krishna, known for its beautiful architecture and spiritual ambiance. The temple hosts daily prayers, festivals, and community events.",
    image:
      "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
    reviewCount: 1250,
    followers: 25000,
    establishedYear: 1995,
    contact: {
      phone: "+91-9876543210",
      email: "info@srikrishnatemple.org",
      website: "www.srikrishnatemple.org",
    },
    timings: {
      morning: "5:00 AM - 12:00 PM",
      evening: "4:00 PM - 9:00 PM",
    },
    facilities: [
      "Parking",
      "Wheelchair Access",
      "Prasadam",
      "Book Store",
      "Rest Rooms",
    ],
    events: [
      {
        id: 1,
        title: "Morning Aarti",
        type: "live",
        status: "live",
        time: "6:00 AM",
        duration: "30 min",
        viewers: 1250,
        description:
          "Daily morning prayers and devotional songs",
        image:
          "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: 2,
        title: "Janmashtami Celebration",
        type: "festival",
        status: "upcoming",
        date: "2024-08-26",
        time: "7:00 PM",
        duration: "3 hours",
        description:
          "Grand celebration of Lord Krishna's birthday with cultural programs",
        image:
          "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      },
      {
        id: 3,
        title: "Evening Aarti",
        type: "live",
        status: "scheduled",
        time: "7:00 PM",
        duration: "45 min",
        description: "Evening prayers and divine experience",
        image:
          "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    administrators: [
      {
        id: 1,
        name: "Pandit Raghunath Sharma",
        role: "Head Priest",
        avatar: "PS",
        experience: "15 years",
        specialization: "Vedic Rituals",
      },
    ],
  };

  // Merge space prop with default data, ensuring events array exists
  const mockSpace = {
    ...defaultSpaceData,
    ...(space || {}),
    events: space?.events || defaultSpaceData.events || [],
  };

  const getSpaceIcon = (type) => {
    switch (type) {
      case "temple":
        return "🛕";
      case "mosque":
        return "🕌";
      case "church":
        return "⛪";
      case "gurudwara":
        return "🏛️";
      case "buddhist-center":
        return "☸️";
      case "pandal":
        return "🎪";
      default:
        return "🏛️";
    }
  };

  const getSpaceTypeLabel = (type) => {
    switch (type) {
      case "temple":
        return "Hindu Temple";
      case "mosque":
        return "Mosque";
      case "church":
        return "Church";
      case "gurudwara":
        return "Gurudwara";
      case "buddhist-center":
        return "Buddhist Center";
      case "pandal":
        return "Pandal";
      default:
        return "Sacred Space";
    }
  };

  const filteredEvents = (mockSpace.events || []).filter(
    (event) => {
      const matchesFilter =
        eventFilter === "all" || event.status === eventFilter;
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchEvents.toLowerCase());
      return matchesFilter && matchesSearch;
    },
  );

  const handleEventClick = (event) => {
    if (event.type === "live" && event.status === "live") {
      navigate(`/live-event/${event.id}`);
    } else {
      navigate(`/event/${event.id}`);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark className="w-4 h-4 mr-2" />
                {isBookmarked ? "Saved" : "Save"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Hero Section */}
        <div className="relative mb-8 mt-11">
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <ImageWithFallback
              src={mockSpace.image}
              alt={mockSpace.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">
                  {getSpaceIcon(mockSpace.type)}
                </span>
                <Badge className="bg-white/20 text-white border-white/30">
                  {getSpaceTypeLabel(mockSpace.type)}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-2">
                {mockSpace.name}
              </h1>
              <div className="flex items-center space-x-4 text-lg">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {mockSpace.location}
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1 fill-yellow-400 text-yellow-400" />
                  {mockSpace.rating} ({mockSpace.reviewCount}{" "}
                  reviews)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs
              value={selectedTab}
              onValueChange={setSelectedTab}
            >
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="overview">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="gallery">
                  Gallery
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="overview"
                className="space-y-6"
              >
                {/* Description */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      About {mockSpace.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {mockSpace.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">
                          Established
                        </h4>
                        <p className="text-gray-600">
                          {mockSpace.establishedYear}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">
                          Followers
                        </h4>
                        <p className="text-gray-600">
                          {mockSpace.followers.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Timings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-3 text-orange-500" />
                        <div>
                          <p className="font-semibold">
                            Morning
                          </p>
                          <p className="text-gray-600">
                            {mockSpace.timings.morning}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-3 text-blue-500" />
                        <div>
                          <p className="font-semibold">
                            Evening
                          </p>
                          <p className="text-gray-600">
                            {mockSpace.timings.evening}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Facilities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {mockSpace.facilities.map(
                        (facility, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                          >
                            {facility}
                          </Badge>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                {/* Event Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "all",
                      "live",
                      "upcoming",
                      "scheduled",
                    ].map((filter) => (
                      <Button
                        key={filter}
                        variant={
                          eventFilter === filter
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => setEventFilter(filter)}
                      >
                        {filter === "live" && (
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
                        )}
                        {filter.charAt(0).toUpperCase() +
                          filter.slice(1)}
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search events..."
                      value={searchEvents}
                      onChange={(e) =>
                        setSearchEvents(e.target.value)
                      }
                      className="pl-10 w-64"
                    />
                  </div>
                </div>

                {/* Events List */}
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleEventClick(event)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h3 className="font-semibold text-lg">
                                    {event.title}
                                  </h3>
                                  {event.status === "live" && (
                                    <Badge className="bg-red-500 hover:bg-red-600">
                                      <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1" />
                                      LIVE
                                    </Badge>
                                  )}
                                  {event.status ===
                                    "upcoming" && (
                                    <Badge className="bg-blue-500 hover:bg-blue-600">
                                      Upcoming
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-gray-600 mb-2">
                                  {event.description}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {event.time} •{" "}
                                    {event.duration}
                                  </div>
                                  {event.viewers && (
                                    <div className="flex items-center">
                                      <Eye className="w-4 h-4 mr-1" />
                                      {event.viewers} watching
                                    </div>
                                  )}
                                </div>
                              </div>
                              <Button size="sm">
                                {event.status === "live" ? (
                                  <>
                                    <Play className="w-4 h-4 mr-2" />
                                    Watch Live
                                  </>
                                ) : (
                                  <>
                                    <Calendar className="w-4 h-4 mr-2" />
                                    View Details
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="gallery"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockSpace.gallery.map((image, index) => (
                    <div
                      key={index}
                      className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
                    >
                      <ImageWithFallback
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-12">
                      <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">
                        Reviews Coming Soon
                      </h3>
                      <p className="text-gray-600">
                        User reviews and ratings will be
                        available here.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                  <Play className="w-4 h-4 mr-2" />
                  Virtual Visit
                </Button>
                <Button variant="outline" className="w-full">
                  <Gift className="w-4 h-4 mr-2" />
                  Make Donation
                </Button>
                <Button
                  variant={isFollowing ? "default" : "outline"}
                  className="w-full"
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-gray-600">
                      {mockSpace.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-gray-600">
                      {mockSpace.contact.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">
                      {mockSpace.contact.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Website</p>
                    <p className="text-sm text-gray-600">
                      {mockSpace.contact.website}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Administrators */}
            <Card>
              <CardHeader>
                <CardTitle>Space Administrators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSpace.administrators.map((admin) => (
                    <div
                      key={admin.id}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                      onClick={() => onSelectProfile?.(admin)}
                    >
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
                          {admin.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">
                          {admin.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {admin.role}
                        </p>
                        <p className="text-xs text-gray-500">
                          {admin.experience} •{" "}
                          {admin.specialization}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
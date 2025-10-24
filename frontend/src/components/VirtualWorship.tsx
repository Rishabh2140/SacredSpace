import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Share2,
  DollarSign,
  MapPin,
  Eye,
  Users,
  Play,
  Pause,
  Calendar,
  Clock,
  Filter,
  Search,
  Star,
  MoreVertical,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function VirtualWorship({ onNavigate, onSelectSpace, onSelectEvent }) {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("live");

  const liveEvents = [
    {
      id: 1,
      title: "Morning Aarti - Lalbaugcha Raja",
      type: "pandal",
      location: "Mumbai, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      viewers: 2547,
      startTime: "6:00 AM",
      duration: "45 min",
      status: "live",
      rating: 4.9,
      description:
        "Experience the divine morning prayers and rituals",
      host: "Mumbai Ganesh Mandal",
      category: "Hindu",
    },
    {
      id: 2,
      title: "Fajr Prayer - Jama Masjid",
      type: "mosque",
      location: "Delhi, India",
      image:
        "https://images.unsplash.com/photo-1626303298621-984f671f8a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      viewers: 1856,
      startTime: "5:30 AM",
      duration: "30 min",
      status: "live",
      rating: 4.8,
      description: "Join the dawn prayer congregation",
      host: "Jama Masjid Delhi",
      category: "Islamic",
    },
    {
      id: 3,
      title: "Morning Service - St. Mary's Cathedral",
      type: "church",
      location: "Bangalore, Karnataka",
      image:
        "https://images.unsplash.com/photo-1632754951329-5aa76d6321ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjaHJpc3RpYW4lMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      viewers: 1245,
      startTime: "7:00 AM",
      duration: "60 min",
      status: "live",
      rating: 4.7,
      description: "Sunday morning worship service with choir",
      host: "St. Mary's Cathedral",
      category: "Christian",
    },
    {
      id: 4,
      title: "Gurdwara Morning Kirtan - Golden Temple",
      type: "gurudwara",
      location: "Amritsar, Punjab",
      image:
        "https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      viewers: 3124,
      startTime: "5:00 AM",
      duration: "90 min",
      status: "live",
      rating: 4.9,
      description:
        "Sacred hymns and prayers at the holiest Sikh shrine",
      host: "Sri Harmandir Sahib",
      category: "Sikh",
    },
    {
      id: 5,
      title: "Meditation Session - Buddhist Center",
      type: "buddhist-center",
      location: "Dharamshala, Himachal Pradesh",
      image:
        "https://images.unsplash.com/photo-1669208167316-6d01cbd7b2e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMG1vbmFzdGVyeSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      viewers: 892,
      startTime: "6:30 AM",
      duration: "45 min",
      status: "live",
      rating: 4.6,
      description: "Guided meditation and mindfulness practice",
      host: "Tushita Meditation Centre",
      category: "Buddhist",
    },
    {
      id: 6,
      title: "Evening Aarti - Vaishno Devi Temple",
      type: "temple",
      location: "Katra, Jammu",
      image:
        "https://images.unsplash.com/photo-1545558014-8692077e9b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMGF0JTIwbmlnaHR8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      viewers: 4567,
      startTime: "7:00 PM",
      duration: "30 min",
      status: "upcoming",
      rating: 4.8,
      description: "Sacred evening prayers at the holy shrine",
      host: "Shri Mata Vaishno Devi Shrine Board",
      category: "Hindu",
    },
  ];

  const upcomingEvents = [
    {
      id: 7,
      title: "Maghrib Prayer - Shah Jahan Mosque",
      type: "mosque",
      location: "Woking, UK",
      image:
        "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBzdW5zZXQlMjBwcmF5ZXJ8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      viewers: 0,
      startTime: "6:30 PM",
      duration: "25 min",
      status: "upcoming",
      rating: 4.7,
      description: "Evening prayer at sunset",
      host: "Shah Jahan Mosque",
      category: "Islamic",
    },
    {
      id: 8,
      title: "Evening Mass - Sacred Heart Basilica",
      type: "church",
      location: "Pondicherry, India",
      image:
        "https://images.unsplash.com/photo-1520637836862-4d197d17c13a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBldmVuaW5nJTIwc2VydmljZXxlbnwxfHx8fDE3NTkwOTM0NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      viewers: 0,
      startTime: "6:00 PM",
      duration: "45 min",
      status: "upcoming",
      rating: 4.6,
      description: "Evening holy mass with special prayers",
      host: "Sacred Heart Basilica",
      category: "Christian",
    },
  ];

  const filteredEvents = [
    ...liveEvents,
    ...upcomingEvents,
  ].filter((event) => {
    const matchesFilter =
      selectedFilter === "all" ||
      event.category.toLowerCase() === selectedFilter;
    const matchesSearch =
      event.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      event.location
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "live"
        ? event.status === "live"
        : event.status === "upcoming";
    return matchesFilter && matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-16 z-40 mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between py-4 lg:h-16 lg:py-0 gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Live Sacred Events
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Join spiritual events from around the world
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 ">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select
                value={selectedFilter}
                onValueChange={setSelectedFilter}
              >
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by faith" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    All Faiths
                  </SelectItem>
                  <SelectItem value="hindu">Hindu</SelectItem>
                  <SelectItem value="islamic">
                    Islamic
                  </SelectItem>
                  <SelectItem value="christian">
                    Christian
                  </SelectItem>
                  <SelectItem value="sikh">Sikh</SelectItem>
                  <SelectItem value="buddhist">
                    Buddhist
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-7 lg:mt-8 xl:mt-12">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
            <TabsTrigger
              value="live"
              className="flex items-center space-x-2 text-xs sm:text-sm"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span>Live Events</span>
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="flex items-center space-x-2 text-xs sm:text-sm"
            >
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Upcoming Events</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">
                    No live events found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="hover:shadow-lg transition-shadow overflow-hidden bg-white"
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                      {/* Live Indicator */}
                      {event.status === "live" && (
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                          <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></div>
                            LIVE
                          </Badge>
                        </div>
                      )}
                      {/* Viewers Count */}
                      {event.status === "live" && (
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                          <Badge
                            variant="secondary"
                            className="bg-black/60 text-white text-xs"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            {event.viewers.toLocaleString()}
                          </Badge>
                        </div>
                      )}
                      {/* Category Badge */}
                      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
                        <Badge
                          className={`text-xs ${
                            event.category === "Hindu"
                              ? "bg-orange-500"
                              : event.category === "Islamic"
                                ? "bg-green-500"
                                : event.category === "Christian"
                                  ? "bg-blue-500"
                                  : event.category === "Sikh"
                                    ? "bg-yellow-600"
                                    : event.category ===
                                        "Buddhist"
                                      ? "bg-purple-500"
                                      : "bg-gray-500"
                          } text-white`}
                        >
                          {event.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.location}
                          </p>
                        </div>

                        <p className="text-sm text-gray-700">
                          {event.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {event.startTime}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {event.duration}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                            <span className="font-semibold">
                              {event.rating}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-gray-500">
                            by {event.host}
                          </span>
                          <div className="flex space-x-2">
                            {event.status === "live" ? (
                              <Button
                                size="sm"
                                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                                onClick={() =>
                                  navigate(
                                    `/live-event/${event.id}`,
                                  )
                                }
                              >
                                <Play className="w-3 h-3 mr-1" />
                                Join Live
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-orange-300 text-orange-600 hover:bg-orange-50"
                                onClick={() =>
                                  alert(
                                    "Reminder set! We'll notify you when this event starts.",
                                  )
                                }
                              >
                                <Calendar className="w-3 h-3 mr-1" />
                                Set Reminder
                              </Button>
                            )}
                            <Button size="sm" variant="ghost">
                              <Heart className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2">
                    No upcoming events found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="hover:shadow-lg transition-shadow overflow-hidden bg-white"
                  >
                    <div className="relative">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover"
                      />
                      {/* Upcoming Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                          <Calendar className="w-3 h-3 mr-1" />
                          UPCOMING
                        </Badge>
                      </div>
                      {/* Category Badge */}
                      <div className="absolute bottom-3 left-3">
                        <Badge
                          className={`${
                            event.category === "Hindu"
                              ? "bg-orange-500"
                              : event.category === "Islamic"
                                ? "bg-green-500"
                                : event.category === "Christian"
                                  ? "bg-blue-500"
                                  : event.category === "Sikh"
                                    ? "bg-yellow-600"
                                    : event.category ===
                                        "Buddhist"
                                      ? "bg-purple-500"
                                      : "bg-gray-500"
                          } text-white`}
                        >
                          {event.category}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-600 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {event.location}
                          </p>
                        </div>

                        <p className="text-sm text-gray-700">
                          {event.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {event.startTime}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-3 h-3 mr-1" />
                              {event.duration}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                            <span className="font-semibold">
                              {event.rating}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs text-gray-500">
                            by {event.host}
                          </span>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-300 text-blue-600 hover:bg-blue-50"
                              onClick={() =>
                                alert(
                                  "Reminder set! We'll notify you when this event starts.",
                                )
                              }
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              Set Reminder
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Heart className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Global Statistics Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">
            Today's Global Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">
                12
              </div>
              <div className="text-sm text-gray-600">
                Live Events
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">
                28
              </div>
              <div className="text-sm text-gray-600">
                Upcoming Events
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">
                24.5K
              </div>
              <div className="text-sm text-gray-600">
                Total Viewers
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                156
              </div>
              <div className="text-sm text-gray-600">
                Sacred Spaces
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
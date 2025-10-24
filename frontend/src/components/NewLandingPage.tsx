import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Flame,
  Clock,
  Star,
  Play,
  Eye,
  ArrowRight,
  Heart,
  Globe,
  Zap,
  Shield,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function NewLandingPage({
  onSelectSpace,
  onNavigate,
  isAuthenticated,
  currentUser,
}) {
  const navigate = useNavigate();
  const [showQuickTest, setShowQuickTest] = useState(false);

  const featuredSpaces = [
    {
      id: 1,
      name: "Lalbaugcha Raja",
      location: "Mumbai, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1601265982884-5ef03fde1293?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbCUyMHdvcnNoaXB8ZW58MXx8fHwxNzU5MjI4MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      visitors: "2.1M",
      rating: 4.9,
      category: "Ganesh",
      isLive: true,
      type: "virtual-temple",
    },
    {
      id: 2,
      name: "Golden Temple",
      location: "Amritsar, Punjab",
      image:
        "https://images.unsplash.com/photo-1609133969965-8024b40d7b25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjB0ZW1wbGUlMjBzaWtoJTIwZ3VydWR3YXJhfGVufDF8fHx8MTc1OTIyODExN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      visitors: "1.8M",
      rating: 4.8,
      category: "Sikh",
      isLive: true,
      type: "gurudwara",
    },
    {
      id: 3,
      name: "Blue Mosque",
      location: "Istanbul, Turkey",
      image:
        "https://images.unsplash.com/photo-1626303298621-984f671f8a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1OTIyODEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      visitors: "1.5M",
      rating: 4.7,
      category: "Islamic",
      isLive: false,
      type: "mosque",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Diwali Celebration",
      date: "Oct 31, 2024",
      time: "6:00 PM",
      location: "Mumbai Temple",
      attendees: 450,
      featured: true,
    },
    {
      id: 2,
      title: "Christmas Mass",
      date: "Dec 25, 2024",
      time: "7:00 AM",
      location: "St. Cathedral",
      attendees: 320,
      featured: false,
    },
    {
      id: 3,
      title: "Friday Prayer",
      date: "Oct 4, 2024",
      time: "1:00 PM",
      location: "Central Mosque",
      attendees: 280,
      featured: false,
    },
  ];

  const faithCategories = [
    {
      name: "Hindu",
      icon: "🕉️",
      count: "2.4k",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
    },
    {
      name: "Sikh",
      icon: "☬",
      count: "1.2k",
      color: "from-blue-500 to-purple-500",
      bgColor: "bg-blue-50",
    },
    {
      name: "Christian",
      icon: "✝️",
      count: "1.8k",
      color: "from-blue-600 to-indigo-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Islamic",
      icon: "☪️",
      count: "1.5k",
      color: "from-green-500 to-teal-500",
      bgColor: "bg-green-50",
    },
    {
      name: "Buddhist",
      icon: "☸️",
      count: "900",
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
    },
    {
      name: "Jain",
      icon: "🕯️",
      count: "650",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
  ];

  const features = [
    {
      icon: Globe,
      title: "Virtual Worship",
      description:
        "Experience divine darshan from anywhere in the world",
    },
    {
      icon: Users,
      title: "Global Community",
      description:
        "Connect with millions of devotees across all faiths",
    },
    {
      icon: Zap,
      title: "Live Streaming",
      description:
        "Join real-time prayers, ceremonies, and festivals",
    },
    {
      icon: Shield,
      title: "Authentic Spaces",
      description:
        "Verified temples, churches, mosques, and sacred sites",
    },
  ];

  const stats = [
    { number: "10M+", label: "Devotees", icon: Users },
    { number: "25k+", label: "Sacred Spaces", icon: MapPin },
    {
      number: "500+",
      label: "Live Events Daily",
      icon: Calendar,
    },
    { number: "4.9", label: "User Rating", icon: Star },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-orange-600 via-yellow-500 to-blue-600 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-300/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 right-10 w-12 h-12 bg-orange-300/20 rounded-full animate-bounce delay-500"></div>
        </div>

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
          <div className="text-center w-full">
            {/* Main Heading */}
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                <span className="text-white text-sm sm:text-base">
                  Welcome to the Future of Spirituality
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight px-2">
                Experience
                <br />
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Divine Spirituality
                </span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-yellow-100 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
                Connect with sacred spaces worldwide through
                immersive virtual experiences. Join millions in
                worship, meditation, and spiritual growth.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-yellow-50 hover:text-orange-700 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto shadow-2xl w-full sm:w-auto"
                onClick={() => onNavigate("/feed")}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3" />
                Feed
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto backdrop-blur-sm w-full sm:w-auto"
                onClick={() => onNavigate("/virtual-worship")}
              >
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3" />
                Watch Live Events
              </Button>

              {!isAuthenticated && (
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto shadow-2xl w-full sm:w-auto"
                  onClick={() => onNavigate("/signup")}
                >
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3" />
                  Join Community
                </Button>
              )}
            </div>

            {/* Quick Test Panel - Developer Mode */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQuickTest(!showQuickTest)}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                Developer Mode
                <ChevronDown
                  className={`w-4 h-4 ml-2 transition-transform ${showQuickTest ? "rotate-180" : ""}`}
                />
              </Button>

              {showQuickTest && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 min-w-max">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white hover:text-orange-600"
                      onClick={() => onNavigate("/explore")}
                    >
                      🔍 Explore
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white hover:text-orange-600"
                      onClick={() => onNavigate("/dashboard")}
                    >
                      👤 Dashboard
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white hover:text-orange-600"
                      onClick={() => onNavigate("/login")}
                    >
                      🔑 Login
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white hover:text-orange-600"
                      onClick={() => {
                        const mockTemple = {
                          id: 1,
                          name: "Test Temple",
                          location: "Test City",
                          type: "temple",
                          rating: 4.8,
                          visitors: "1.2M",
                        };
                        onSelectSpace &&
                          onSelectSpace(mockTemple);
                        navigate("/temple/1");
                      }}
                    >
                      🛕 Temple
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 px-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-yellow-100 text-xs sm:text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Features Section */}
        <section className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SacredSpace?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Experience the divine through cutting-edge
              technology and authentic spiritual connections
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg"
              >
                <CardContent className="p-6 sm:p-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg sm:text-xl mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Faith Categories */}
        <section className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore by Faith
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">
              Discover sacred spaces from all spiritual
              traditions
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {faithCategories.map((faith) => (
              <Card
                key={faith.name}
                className={`cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 ${faith.bgColor} border-0`}
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br ${faith.color} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg`}
                  >
                    {faith.icon}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 mb-1">
                    {faith.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    {faith.count} places
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Sacred Spaces */}
        <section className="mb-16 sm:mb-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Featured Sacred Spaces
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600">
                Experience the most popular and revered
                spiritual destinations
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onNavigate("/explore")}
              className="flex lg:hidden self-start"
            >
              View All Spaces
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              onClick={() => onNavigate("/explore")}
              className="hidden lg:flex"
            >
              View All Spaces
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredSpaces.map((space) => (
              <Card
                key={space.id}
                className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 shadow-lg"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={space.image}
                    alt={space.name}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  {space.isLive && (
                    <Badge className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-red-500 hover:bg-red-600 shadow-lg text-xs">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      LIVE
                    </Badge>
                  )}
                  <Badge className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-black/60 text-white backdrop-blur-sm text-xs">
                    {space.category}
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-3 sm:p-4 text-white">
                      <p className="text-xs sm:text-sm">
                        Click to explore virtually
                      </p>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3">
                    {space.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{space.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {space.visitors}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">
                          {space.rating}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                      onClick={() => {
                        onSelectSpace(space);
                        onNavigate(`/space/${space.id}`);
                      }}
                    >
                      Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button
              variant="outline"
              onClick={() => onNavigate("/explore")}
            >
              View All Spaces
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600">
              Join live celebrations and spiritual gatherings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className={`hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 shadow-lg ${event.featured ? "ring-2 ring-orange-500 ring-opacity-50" : ""}`}
              >
                <CardContent className="p-8">
                  {event.featured && (
                    <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-yellow-500">
                      Featured Event
                    </Badge>
                  )}
                  <h3 className="font-bold text-xl mb-4">
                    {event.title}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-3 text-orange-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3 text-orange-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3 text-orange-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-3 text-orange-500" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Join Event
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-orange-600 to-yellow-600 rounded-3xl p-16 text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Begin Your Spiritual Journey?
          </h2>
          <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
            Join millions of devotees discovering divine
            experiences through SacredSpace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-4 h-auto"
              onClick={() => onNavigate("/signup")}
            >
              <Heart className="w-5 h-5 mr-2" />
              Join Free Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 text-lg px-8 py-4 h-auto"
              onClick={() => onNavigate("/virtual-worship")}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Exploring
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
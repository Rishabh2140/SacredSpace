import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  Filter,
  Heart,
  Star,
  Users,
  Clock,
  Eye,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const spaceTypes = [
  {
    id: "all",
    label: "All Spaces",
    color: "bg-gradient-to-r from-orange-500 to-yellow-500",
  },
  {
    id: "pandal",
    label: "Pandals",
    color: "bg-gradient-to-r from-orange-600 to-red-500",
  },
  {
    id: "temple",
    label: "Temples",
    color: "bg-gradient-to-r from-yellow-500 to-orange-500",
  },
  {
    id: "mosque",
    label: "Mosques",
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
  {
    id: "church",
    label: "Churches",
    color: "bg-gradient-to-r from-blue-500 to-indigo-500",
  },
  {
    id: "gurudwara",
    label: "Gurudwaras",
    color: "bg-gradient-to-r from-blue-600 to-purple-600",
  },
  {
    id: "buddhist",
    label: "Buddhist Centers",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
];

const mockSpaces = [
  {
    id: 1,
    name: "Shree Durga Pandal",
    type: "pandal",
    location: "Salt Lake, Kolkata",
    distance: "2.5 km",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
    rating: 4.8,
    followers: 15420,
    isLive: true,
    nextEvent: "Aarti at 6:00 PM",
    description:
      "Traditional Durga Puja celebration with beautiful decorations",
  },
  {
    id: 2,
    name: "ISKCON Temple",
    type: "temple",
    location: "Mayapur, West Bengal",
    distance: "45 km",
    image:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400",
    rating: 4.9,
    followers: 28750,
    isLive: false,
    nextEvent: "Morning Aarti at 4:30 AM",
    description:
      "International Society for Krishna Consciousness temple",
  },
  {
    id: 3,
    name: "Nakhoda Mosque",
    type: "mosque",
    location: "Chitpur, Kolkata",
    distance: "8.2 km",
    image:
      "https://images.unsplash.com/photo-1564769625392-651b4aa2ecf4?w=400",
    rating: 4.7,
    followers: 12300,
    isLive: true,
    nextEvent: "Maghrib Prayer at 5:45 PM",
    description:
      "Historic mosque with beautiful Indo-Saracenic architecture",
  },
  {
    id: 4,
    name: "St. Paul's Cathedral",
    type: "church",
    location: "Cathedral Road, Kolkata",
    distance: "5.1 km",
    image:
      "https://images.unsplash.com/photo-1520637836862-4d197d17c35a?w=400",
    rating: 4.6,
    followers: 8900,
    isLive: false,
    nextEvent: "Sunday Service at 10:00 AM",
    description:
      "Anglican cathedral with Gothic Revival architecture",
  },
  {
    id: 5,
    name: "Gurudwara Sahib",
    type: "gurudwara",
    location: "Ballygunge, Kolkata",
    distance: "3.8 km",
    image:
      "https://images.unsplash.com/photo-1582748824612-d49d258c31a3?w=400",
    rating: 4.8,
    followers: 6750,
    isLive: true,
    nextEvent: "Kirtan at 7:00 PM",
    description: "Sikh place of worship with community kitchen",
  },
  {
    id: 6,
    name: "Buddha Meditation Center",
    type: "buddhist",
    location: "Park Street, Kolkata",
    distance: "4.2 km",
    image:
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400",
    rating: 4.5,
    followers: 4200,
    isLive: false,
    nextEvent: "Meditation Session at 6:30 PM",
    description:
      "Peaceful center for Buddhist meditation and teachings",
  },
  {
    id: 7,
    name: "Kali Pandal",
    type: "pandal",
    location: "Kalighat, Kolkata",
    distance: "6.5 km",
    image:
      "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400",
    rating: 4.9,
    followers: 22100,
    isLive: true,
    nextEvent: "Evening Aarti at 8:00 PM",
    description:
      "Famous Kali temple with spiritual significance",
  },
  {
    id: 8,
    name: "Dakshineswar Temple",
    type: "temple",
    location: "Dakshineswar, Kolkata",
    distance: "12.3 km",
    image:
      "https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=400",
    rating: 4.8,
    followers: 35600,
    isLive: false,
    nextEvent: "Bhog at 12:30 PM",
    description: "Historic temple dedicated to Goddess Kali",
  },
];

export function Explore({
  onSelectSpace,
}) {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredSpaces = mockSpaces.filter((space) => {
    const matchesType =
      selectedType === "all" || space.type === selectedType;
    const matchesLocation =
      !searchLocation ||
      space.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase()) ||
      space.name
        .toLowerCase()
        .includes(searchLocation.toLowerCase());
    return matchesType && matchesLocation;
  });

  const handleSpaceClick = (space) => {
    onSelectSpace?.(space);
    navigate(`/space/${space.id}`);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "pandal":
        return "🎪";
      case "temple":
        return "🛕";
      case "mosque":
        return "🕌";
      case "church":
        return "⛪";
      case "gurudwara":
        return "🏛️";
      case "buddhist":
        return "☸️";
      default:
        return "🏛️";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 pt-4 mt-6 sm:mt-2 md:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Explore Sacred Spaces
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Discover temples, mosques, churches, and spiritual
            centers near you
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by location or sacred space name..."
              value={searchLocation}
              onChange={(e) =>
                setSearchLocation(e.target.value)
              }
              className="pl-10 pr-12 py-3 w-full bg-white border-orange-200 focus:border-orange-400 focus:ring-orange-200 text-sm sm:text-base"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide pb-2">
            {spaceTypes.map((type) => (
              <Button
                key={type.id}
                variant={
                  selectedType === type.id
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => setSelectedType(type.id)}
                className={`flex-shrink-0 text-xs sm:text-sm ${
                  selectedType === type.id
                    ? `${type.color} text-white hover:opacity-90`
                    : "border-orange-200 text-gray-700 hover:bg-orange-50"
                } transition-all duration-200`}
              >
                <span className="mr-1">
                  {getTypeIcon(
                    type.id === "all" ? "temple" : type.id,
                  )}
                </span>
                {type.label}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-gray-600 text-sm sm:text-base">
              Found{" "}
              <span className="font-semibold text-orange-600">
                {filteredSpaces.length}
              </span>{" "}
              sacred spaces
              {searchLocation && ` in "${searchLocation}"`}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("map")}
              className="flex items-center space-x-2 border-orange-200 text-orange-600 hover:bg-orange-50 self-start sm:self-auto"
            >
              <MapPin className="w-4 h-4" />
              <span>View on Map</span>
            </Button>
          </div>
        </div>

        {/* Sacred Spaces Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredSpaces.map((space) => (
            <Card
              key={space.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-orange-100 hover:border-orange-300"
              onClick={() => handleSpaceClick(space)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <ImageWithFallback
                  src={space.image}
                  alt={space.name}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {space.isLive && (
                  <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-500 text-white text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    LIVE
                  </Badge>
                )}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                  <Badge
                    variant="secondary"
                    className="bg-white/90 text-gray-700 text-xs"
                  >
                    <span className="mr-1">
                      {getTypeIcon(space.type)}
                    </span>
                    <span className="hidden sm:inline">
                      {
                        spaceTypes.find(
                          (t) => t.id === space.type,
                        )?.label
                      }
                    </span>
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-white/90 hover:bg-white p-2"
                >
                  <Heart className="w-4 h-4 text-gray-600" />
                </Button>
              </div>

              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {space.name}
                  </h3>
                  <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                    <span className="text-xs sm:text-sm text-gray-600">
                      {space.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1 flex-1">
                    {space.location}
                  </span>
                  <span className="mx-2 flex-shrink-0">•</span>
                  <span className="flex-shrink-0">
                    {space.distance}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3">
                  {space.description}
                </p>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-xs sm:text-sm text-gray-500">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span>
                      {space.followers.toLocaleString()}{" "}
                      followers
                    </span>
                  </div>
                </div>

                <div className="flex items-center text-xs sm:text-sm text-orange-600">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                  <span className="line-clamp-1">
                    {space.nextEvent}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSpaces.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No sacred spaces found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find
              sacred spaces in your area.
            </p>
            <Button
              onClick={() => {
                setSearchLocation("");
                setSelectedType("all");
              }}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
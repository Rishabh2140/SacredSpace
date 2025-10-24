import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  Users,
  Heart,
  Share2,
  Star,
  Eye,
  Phone,
  Mail,
  Globe,
  Navigation as NavigationIcon,
  Camera,
  Play,
  MessageCircle,
  Bookmark,
  DollarSign,
  Info,
  Gift,
  Bell,
  ChevronRight,
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
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function EventDetail() {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");
  const [reviewText, setReviewText] = useState("");

  // Mock event data - in real app, this would be fetched based on ID and type
  const eventData = {
    1: {
      id: 1,
      name: "Shree Durga Pandal",
      type: "pandal",
      location: "Salt Lake, Kolkata",
      distance: "2.5 km",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      galleryImages: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
      ],
      rating: 4.8,
      followers: 15420,
      isLive: true,
      nextEvent: "Aarti at 6:00 PM",
      description:
        "Traditional Durga Puja celebration with beautiful decorations and authentic rituals. Experience the divine presence of Maa Durga in our magnificently decorated pandal.",
      fullDescription:
        "Our Durga Pandal has been serving the community for over 25 years, bringing together thousands of devotees during the festive season. The pandal features traditional Bengali architecture with modern amenities, ensuring a comfortable and spiritual experience for all visitors.",
      address:
        "Block A, Salt Lake City, Sector V, Kolkata, West Bengal 700091",
      phone: "+91 98765 43210",
      email: "contact@shreeDurgapandal.org",
      website: "www.shreeDurgapandal.org",
      established: "1998",
      category: "Hindu",
      timings: {
        morning: "6:00 AM - 12:00 PM",
        evening: "4:00 PM - 10:00 PM",
      },
      upcomingEvents: [
        {
          id: 1,
          title: "Evening Aarti",
          time: "6:00 PM",
          date: "Today",
          description:
            "Traditional evening prayers with cultural programs",
        },
        {
          id: 2,
          title: "Pushpanjali",
          time: "8:00 AM",
          date: "Tomorrow",
          description: "Morning flower offering ceremony",
        },
        {
          id: 3,
          title: "Cultural Evening",
          time: "7:30 PM",
          date: "Oct 5",
          description: "Classical dance and music performances",
        },
      ],
      facilities: [
        "Parking Available",
        "Wheelchair Accessible",
        "Audio Guide",
        "Gift Shop",
        "Prasad Counter",
        "Rest Area",
      ],
      organizers: [
        {
          id: 1,
          name: "Rajesh Kumar",
          role: "President",
          avatar: "RK",
          experience: "15 years",
        },
        {
          id: 2,
          name: "Priya Sharma",
          role: "Secretary",
          avatar: "PS",
          experience: "10 years",
        },
        {
          id: 3,
          name: "Amit Ghosh",
          role: "Treasurer",
          avatar: "AG",
          experience: "12 years",
        },
      ],
      reviews: [
        {
          id: 1,
          user: "Anita Das",
          avatar: "AD",
          rating: 5,
          comment:
            "Beautiful decorations and peaceful atmosphere. The aarti was mesmerizing!",
          date: "2 days ago",
        },
        {
          id: 2,
          user: "Ravi Patel",
          avatar: "RP",
          rating: 4,
          comment:
            "Great organization and friendly volunteers. Parking was easy to find.",
          date: "1 week ago",
        },
        {
          id: 3,
          user: "Meera Singh",
          avatar: "MS",
          rating: 5,
          comment:
            "Authentic traditional experience. The cultural programs were excellent.",
          date: "2 weeks ago",
        },
      ],
      stats: {
        totalVisitors: "25,000+",
        dailyVisitors: "1,200",
        totalDonations: "₹2,50,000",
        volunteers: "45",
      },
    },
    2: {
      id: 2,
      name: "ISKCON Temple",
      type: "temple",
      location: "Mayapur, West Bengal",
      distance: "45 km",
      image:
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800",
      galleryImages: [
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800",
        "https://images.unsplash.com/photo-1580552824613-c5afc3aad4ff?w=800",
        "https://images.unsplash.com/photo-1572635148818-ef6fd45eb394?w=800",
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?w=800",
      ],
      rating: 4.9,
      followers: 28750,
      isLive: false,
      nextEvent: "Morning Aarti at 4:30 AM",
      description:
        "International Society for Krishna Consciousness temple with grand architecture and spiritual programs.",
      fullDescription:
        "ISKCON Mayapur is the spiritual headquarters of the International Society for Krishna Consciousness. The temple complex features stunning architecture, beautiful gardens, and offers various spiritual programs including kirtans, lectures, and festivals throughout the year.",
      address: "ISKCON Mayapur, Nadia, West Bengal 741313",
      phone: "+91 98765 54321",
      email: "info@iskconmayapur.org",
      website: "www.iskconmayapur.org",
      established: "1972",
      category: "Hindu",
      timings: {
        morning: "4:30 AM - 12:30 PM",
        evening: "4:00 PM - 9:00 PM",
      },
      upcomingEvents: [
        {
          id: 1,
          title: "Mangala Aarti",
          time: "4:30 AM",
          date: "Daily",
          description:
            "Early morning worship with melodious kirtans",
        },
        {
          id: 2,
          title: "Bhagavad Gita Class",
          time: "8:00 AM",
          date: "Daily",
          description: "Spiritual discourse on Bhagavad Gita",
        },
        {
          id: 3,
          title: "Gaura Purnima Festival",
          time: "6:00 PM",
          date: "Mar 15",
          description:
            "Grand celebration of Lord Chaitanya appearance",
        },
      ],
      facilities: [
        "Guest House",
        "Vegetarian Restaurant",
        "Gift Shop",
        "Library",
        "Garden",
        "Parking",
      ],
      organizers: [
        {
          id: 1,
          name: "Swami Bhaktivedanta",
          role: "Temple President",
          avatar: "SB",
          experience: "20 years",
        },
        {
          id: 2,
          name: "Gopi Krishna Das",
          role: "Head Priest",
          avatar: "GK",
          experience: "18 years",
        },
      ],
      reviews: [
        {
          id: 1,
          user: "Devotee Ram",
          avatar: "DR",
          rating: 5,
          comment:
            "Absolutely divine experience! The morning aarti is soul-stirring.",
          date: "1 day ago",
        },
        {
          id: 2,
          user: "Spiritual Seeker",
          avatar: "SS",
          rating: 5,
          comment:
            "Beautiful temple with excellent hospitality. The prasadam is amazing!",
          date: "3 days ago",
        },
      ],
      stats: {
        totalVisitors: "50,000+",
        dailyVisitors: "2,500",
        totalDonations: "₹5,00,000",
        volunteers: "75",
      },
    },
    3: {
      id: 3,
      name: "Nakhoda Mosque",
      type: "mosque",
      location: "Chitpur, Kolkata",
      distance: "8.2 km",
      image:
        "https://images.unsplash.com/photo-1564769625392-651b4aa2ecf4?w=800",
      galleryImages: [
        "https://images.unsplash.com/photo-1564769625392-651b4aa2ecf4?w=800",
        "https://images.unsplash.com/photo-1626303298621-984f671f8a82?w=800",
        "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800",
        "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800",
      ],
      rating: 4.7,
      followers: 12300,
      isLive: true,
      nextEvent: "Maghrib Prayer at 5:45 PM",
      description:
        "Historic mosque with beautiful Indo-Saracenic architecture and rich Islamic heritage.",
      fullDescription:
        "Nakhoda Mosque is one of the largest mosques in Kolkata, built in 1926. It features stunning Mughal architecture with beautiful minarets and domes. The mosque serves as a center for Islamic education and community activities.",
      address:
        "Rabindra Sarani, Chitpur, Kolkata, West Bengal 700007",
      phone: "+91 98765 67890",
      email: "info@nakhodamosque.org",
      website: "www.nakhodamosque.org",
      established: "1926",
      category: "Islamic",
      timings: {
        morning: "5:00 AM - 12:00 PM",
        evening: "1:00 PM - 9:00 PM",
      },
      upcomingEvents: [
        {
          id: 1,
          title: "Maghrib Prayer",
          time: "5:45 PM",
          date: "Daily",
          description: "Evening congregational prayer",
        },
        {
          id: 2,
          title: "Friday Khutbah",
          time: "1:30 PM",
          date: "Every Friday",
          description:
            "Weekly sermon and congregational prayer",
        },
        {
          id: 3,
          title: "Eid ul-Fitr",
          time: "8:00 AM",
          date: "Apr 10",
          description:
            "Grand Eid celebration with special prayers",
        },
      ],
      facilities: [
        "Ablution Area",
        "Library",
        "Islamic School",
        "Community Hall",
        "Parking",
        "Shoe Storage",
      ],
      organizers: [
        {
          id: 1,
          name: "Imam Abdullah",
          role: "Chief Imam",
          avatar: "IA",
          experience: "25 years",
        },
        {
          id: 2,
          name: "Mohammed Hassan",
          role: "Committee Chairman",
          avatar: "MH",
          experience: "15 years",
        },
      ],
      reviews: [
        {
          id: 1,
          user: "Ahmed Ali",
          avatar: "AA",
          rating: 5,
          comment:
            "Peaceful place for prayer. The architecture is breathtaking.",
          date: "2 days ago",
        },
        {
          id: 2,
          user: "Fatima Khan",
          avatar: "FK",
          rating: 4,
          comment:
            "Well-maintained mosque with good facilities for women.",
          date: "1 week ago",
        },
      ],
      stats: {
        totalVisitors: "18,000+",
        dailyVisitors: "800",
        totalDonations: "₹3,20,000",
        volunteers: "35",
      },
    },
  };

  const currentEvent = eventData[id] || eventData[1];

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

  const getTypeColor = (type) => {
    switch (type) {
      case "pandal":
        return "from-orange-600 to-red-500";
      case "temple":
        return "from-yellow-500 to-orange-500";
      case "mosque":
        return "from-green-500 to-emerald-500";
      case "church":
        return "from-blue-500 to-indigo-500";
      case "gurudwara":
        return "from-blue-600 to-purple-600";
      case "buddhist":
        return "from-purple-500 to-pink-500";
      default:
        return "from-orange-500 to-yellow-500";
    }
  };

  const handleDonation = () => {
    if (donationAmount) {
      alert(
        `Thank you for your donation of ₹${donationAmount}!`,
      );
      setDonationAmount("");
    }
  };

  const handleReviewSubmit = () => {
    if (reviewText.trim()) {
      alert("Thank you for your review!");
      setReviewText("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/explore")}
                className="text-gray-600 hover:text-orange-600"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Explore
              </Button>
              <div>
                <h1 className="font-semibold text-gray-900">
                  {currentEvent.name}
                </h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {currentEvent.location}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {currentEvent.isLive && (
                <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">
                  <Eye className="w-3 h-3 mr-1" />
                  LIVE
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFollowing(!isFollowing)}
                className={`${isFollowing ? "bg-orange-50 text-orange-600 border-orange-200" : ""}`}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${isFollowing ? "fill-current" : ""}`}
                />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 ">
            {/* Hero Image and Gallery */}
            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <ImageWithFallback
                  src={currentEvent.image}
                  alt={currentEvent.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                  <div className="absolute top-4 left-4">
                    <Badge
                      className={`bg-gradient-to-r ${getTypeColor(currentEvent.type)} text-white`}
                    >
                      <span className="mr-1">
                        {getTypeIcon(currentEvent.type)}
                      </span>
                      {currentEvent.type
                        .charAt(0)
                        .toUpperCase() +
                        currentEvent.type.slice(1)}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h1 className="text-2xl font-bold mb-1">
                      {currentEvent.name}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        <span>{currentEvent.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>
                          {currentEvent.followers.toLocaleString()}{" "}
                          followers
                        </span>
                      </div>
                    </div>
                  </div>
                  {currentEvent.isLive && (
                    <div className="absolute bottom-4 right-4">
                      <Button
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() =>
                          navigate(
                            `/live-event/${currentEvent.id}`,
                          )
                        }
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Join Live
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Gallery */}
              <div className="p-4 border-t">
                <div className="grid grid-cols-4 gap-2">
                  {currentEvent.galleryImages
                    ?.slice(1, 5)
                    .map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square"
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`${currentEvent.name} gallery ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        />
                        {index === 3 && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <span className="text-white font-semibold">
                              +5 more
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </Card>

            {/* Tabs Content */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="organizers">
                  Team
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Info className="w-5 h-5 mr-2 text-orange-600" />
                      About
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      {currentEvent.fullDescription}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">
                          Timings
                        </h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>
                            Morning:{" "}
                            {currentEvent.timings?.morning}
                          </div>
                          <div>
                            Evening:{" "}
                            {currentEvent.timings?.evening}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">
                          Established
                        </h4>
                        <p className="text-sm text-gray-600">
                          {currentEvent.established}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">
                        Facilities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentEvent.facilities?.map(
                          (facility, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {facility}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentEvent.upcomingEvents?.map(
                        (event) => (
                          <div
                            key={event.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">
                                  {event.title}
                                </h4>
                                <p className="text-sm text-gray-600 mb-1">
                                  {event.description}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-gray-500">
                                  <span className="flex items-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {event.time}
                                  </span>
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {event.date}
                                  </span>
                                </div>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                              >
                                <Bell className="w-3 h-3 mr-1" />
                                Remind Me
                              </Button>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="reviews"
                className="space-y-4"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="w-5 h-5 mr-2 text-orange-600" />
                      Reviews & Ratings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Add Review */}
                    <div className="border rounded-lg p-4 mb-4">
                      <h4 className="font-semibold mb-3">
                        Write a Review
                      </h4>
                      <Textarea
                        placeholder="Share your experience..."
                        value={reviewText}
                        onChange={(e) =>
                          setReviewText(e.target.value)
                        }
                        className="mb-3"
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-5 h-5 text-gray-300 hover:text-yellow-400 cursor-pointer"
                            />
                          ))}
                        </div>
                        <Button
                          size="sm"
                          onClick={handleReviewSubmit}
                        >
                          Submit Review
                        </Button>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {currentEvent.reviews?.map((review) => (
                        <div
                          key={review.id}
                          className="border-b pb-4"
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-orange-400 to-yellow-500 text-white">
                                {review.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-semibold">
                                  {review.user}
                                </h5>
                                <span className="text-xs text-gray-500">
                                  {review.date}
                                </span>
                              </div>
                              <div className="flex items-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-gray-700">
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="organizers"
                className="space-y-4"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-orange-600" />
                      Organizing Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentEvent.organizers?.map(
                        (organizer) => (
                          <div
                            key={organizer.id}
                            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-12 h-12">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                  {organizer.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-semibold">
                                  {organizer.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {organizer.role}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {organizer.experience}{" "}
                                  experience
                                </p>
                              </div>
                            </div>
                          </div>
                        ),
                      )}
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
                <Button
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark
                    className={`w-4 h-4 mr-2 ${isBookmarked ? "fill-current" : ""}`}
                  />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button variant="outline" className="w-full">
                  <NavigationIcon className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
                <Button variant="outline" className="w-full">
                  <Camera className="w-4 h-4 mr-2" />
                  Virtual Tour
                </Button>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    {currentEvent.address}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    {currentEvent.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    {currentEvent.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Globe className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    {currentEvent.website}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {currentEvent.stats?.totalVisitors}
                    </div>
                    <div className="text-xs text-gray-600">
                      Total Visitors
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {currentEvent.stats?.dailyVisitors}
                    </div>
                    <div className="text-xs text-gray-600">
                      Daily Visitors
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {currentEvent.stats?.totalDonations}
                    </div>
                    <div className="text-xs text-gray-600">
                      Total Donations
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {currentEvent.stats?.volunteers}
                    </div>
                    <div className="text-xs text-gray-600">
                      Volunteers
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="w-5 h-5 mr-2 text-orange-600" />
                  Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {[51, 101, 501].map((amount) => (
                    <Button
                      key={amount}
                      variant={
                        donationAmount === amount.toString()
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        setDonationAmount(amount.toString())
                      }
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>
                <Input
                  placeholder="Enter custom amount"
                  value={donationAmount}
                  onChange={(e) =>
                    setDonationAmount(e.target.value)
                  }
                  type="number"
                />
                <Button
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  onClick={handleDonation}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Donate Now
                </Button>
                <p className="text-xs text-gray-600 text-center">
                  Your donation supports maintenance and
                  community services
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
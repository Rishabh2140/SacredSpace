import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Star,
  Users,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Award,
  ArrowLeft,
  Eye,
  Palette,
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
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ArtistProfile({ profile, onNavigate }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No profile selected</p>
      </div>
    );
  }

  // Generate mock data based on artist type
  const getPortfolio = () => {
    if (
      profile.category === "Designer" ||
      profile.category === "Decorator"
    ) {
      return [
        {
          id: 1,
          title: "Modern Pandal Design",
          year: "2024",
          location: profile.location?.split(",")[0] || "Mumbai",
          image:
            "https://images.unsplash.com/photo-1625259566209-8c59614a28fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjYXRoZWRyYWwlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
          likes: 2400,
          description:
            "Contemporary design blending traditional and modern elements",
          materials: "LED Lighting, Fabric, Wood",
          price: "₹1,50,000",
        },
        {
          id: 2,
          title: "Festival Decoration",
          year: "2024",
          location: profile.location?.split(",")[0] || "Delhi",
          image:
            "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
          likes: 1800,
          description:
            "Vibrant festival setup with traditional motifs",
          materials: "Flowers, Lights, Fabric",
          price: "₹85,000",
        },
      ];
    } else if (profile.category === "Guide") {
      return [
        {
          id: 1,
          title: "Sacred Architecture Tour",
          year: "2024",
          location: profile.location?.split(",")[0] || "Local",
          image:
            "https://images.unsplash.com/photo-1688935455227-85136cc9b24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHRlbXBsZSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
          likes: 1200,
          description:
            "Comprehensive tour of historical religious sites",
          materials: "Audio Guide, Booklet",
          price: "₹500 per person",
        },
      ];
    } else {
      return [
        {
          id: 1,
          title: "Community Service Project",
          year: "2024",
          location: profile.location?.split(",")[0] || "Local",
          image:
            "https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
          likes: 800,
          description:
            "Organizing community events and festivals",
          materials: "Event Planning, Coordination",
          price: "Volunteer Service",
        },
      ];
    }
  };

  const portfolio = getPortfolio();

  const reviews = [
    {
      id: 1,
      user: "Community Member",
      avatar: "CM",
      rating: 5,
      text: "Excellent work and very professional approach. Highly recommended for any project.",
      date: "2 weeks ago",
      project: portfolio[0]?.title || "Recent Project",
    },
    {
      id: 2,
      user: "Event Organizer",
      avatar: "EO",
      rating: profile.rating >= 4.8 ? 5 : 4,
      text: "Great experience working together. Very dedicated and skilled professional.",
      date: "1 month ago",
      project: portfolio[1]?.title || "Previous Project",
    },
  ];

  const achievements = [
    {
      title: `${profile.category} Excellence Award`,
      year: "2023",
      organization: "Cultural Arts Society",
    },
    {
      title: "Community Service Recognition",
      year: "2022",
      organization: "Local Administration",
    },
    {
      title: "Traditional Arts Appreciation",
      year: "2021",
      organization: "Heritage Foundation",
    },
  ];

  const getSpecializations = () => {
    switch (profile.category) {
      case "Designer":
        return [
          "Pandal Design",
          "Theme Development",
          "Architectural Visualization",
          "Modern Concepts",
          "Traditional Fusion",
          "Digital Planning",
        ];
      case "Decorator":
        return [
          "Festival Decoration",
          "Lighting Design",
          "Floral Arrangements",
          "Stage Setup",
          "Traditional Decor",
          "Modern Lighting",
        ];
      case "Guide":
        return [
          "Historical Tours",
          "Cultural Guidance",
          "Language Translation",
          "Site Knowledge",
          "Group Management",
          "Educational Content",
        ];
      case "Priest":
        return [
          "Religious Ceremonies",
          "Spiritual Counseling",
          "Prayer Services",
          "Community Events",
          "Religious Education",
          "Worship Guidance",
        ];
      case "Volunteer":
        return [
          "Event Support",
          "Community Service",
          "Crowd Management",
          "Setup Assistance",
          "Coordination",
          "General Help",
        ];
      default:
        return [
          "Professional Services",
          "Cultural Knowledge",
          "Community Support",
        ];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => onNavigate("/artists")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Artists
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Profile
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-11">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-2xl">
                      {profile.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {profile.name}
                        </h1>
                        <Badge className="mb-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                          <Palette className="w-4 h-4 mr-1" />
                          {profile.category}
                        </Badge>
                        <p className="text-gray-600 mb-4">
                          {profile.bio}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {profile.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {profile.experience} experience
                          </div>
                        </div>
                      </div>
                      <Button
                        className={`${isFollowing ? "bg-gray-600" : "bg-gradient-to-r from-orange-500 to-yellow-500"}`}
                        onClick={() =>
                          setIsFollowing(!isFollowing)
                        }
                      >
                        <Users className="w-4 h-4 mr-2" />
                        {isFollowing ? "Following" : "Follow"}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {profile.followers || 1200}
                    </div>
                    <div className="text-sm text-gray-600">
                      Followers
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {profile.projects || 25}
                    </div>
                    <div className="text-sm text-gray-600">
                      Projects
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {profile.rating || 4.7}
                    </div>
                    <div className="text-sm text-gray-600">
                      Rating
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {profile.experience || "5+ years"}
                    </div>
                    <div className="text-sm text-gray-600">
                      Experience
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Portfolio */}
            <Tabs defaultValue="portfolio" className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="portfolio">
                  Portfolio
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  Achievements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolio.map((work) => (
                    <Card
                      key={work.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    >
                      <div className="relative">
                        <ImageWithFallback
                          src={work.image}
                          alt={work.title}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-3 right-3 bg-black/60 text-white">
                          {work.year}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-2">
                          {work.title}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">
                            {work.location}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mb-3">
                          {work.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Heart className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-gray-600">
                              {work.likes}
                            </span>
                          </div>
                          <span className="font-semibold text-orange-600">
                            {work.price}
                          </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500">
                            <strong>Materials:</strong>{" "}
                            {work.materials}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                              {review.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">
                                  {review.user}
                                </h4>
                                <Badge
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {review.project}
                                </Badge>
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "text-yellow-500 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 mb-2">
                              {review.text}
                            </p>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent
                value="achievements"
                className="mt-6"
              >
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">
                              {achievement.title}
                            </h4>
                            <p className="text-gray-600">
                              {achievement.organization}
                            </p>
                            <span className="text-sm text-gray-500">
                              {achievement.year}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button className="w-full" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </Button>
                <Button className="w-full" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Services & Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Services & Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">
                      {profile.specialization}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {profile.category} services
                    </p>
                    <span className="text-orange-600 font-semibold">
                      {profile.priceRange}
                    </span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                  Request Quote
                </Button>
              </CardContent>
            </Card>

            {/* Specializations */}
            <Card>
              <CardHeader>
                <CardTitle>Specializations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {getSpecializations().map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Associated Spaces */}
            {profile.associatedSpaces &&
              profile.associatedSpaces.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Associated Spaces</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {profile.associatedSpaces.map((space) => (
                        <div
                          key={space.id}
                          className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() =>
                            onNavigate(`/space/${space.id}`)
                          }
                        >
                          <h4 className="font-semibold text-sm">
                            {space.name}
                          </h4>
                          <p className="text-xs text-gray-600 capitalize">
                            {space.type.replace("-", " ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Completed recent project</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Started new commission</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Received positive review</span>
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
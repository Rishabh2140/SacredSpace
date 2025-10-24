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

export function MurtikarProfile({ profile, onNavigate }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No profile selected</p>
      </div>
    );
  }

  const portfolio = [
    {
      id: 1,
      title: "Eco-Friendly Ganesh",
      year: "2024",
      location: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 2400,
      description:
        "21-foot eco-friendly Ganesh idol made from clay and natural colors",
      materials: "Clay, Natural Colors, Flowers",
      price: "₹2,50,000",
    },
    {
      id: 2,
      title: "Traditional Durga Maa",
      year: "2024",
      location: "Kolkata",
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 1800,
      description:
        "Intricate 15-foot Durga Maa with detailed craftsmanship",
      materials: "Clay, Gold Leaf, Silk",
      price: "₹3,75,000",
    },
    {
      id: 3,
      title: "Miniature Krishna Set",
      year: "2023",
      location: "Vrindavan",
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 1200,
      description:
        "Exquisite miniature Krishna and Radha for home worship",
      materials: "Marble, Semi-precious stones",
      price: "₹45,000",
    },
    {
      id: 4,
      title: "Shiva Nataraja",
      year: "2023",
      location: "Chennai",
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 2100,
      description:
        "Bronze Nataraja sculpture with cosmic dance pose",
      materials: "Bronze, Traditional Patina",
      price: "₹1,25,000",
    },
  ];

  const reviews = [
    {
      id: 1,
      user: "Priya Sharma",
      avatar: "PS",
      rating: 5,
      text: "Absolutely stunning work! The attention to detail is incredible. Our community was thrilled with the Ganesh idol.",
      date: "2 weeks ago",
      project: "Eco-Friendly Ganesh",
    },
    {
      id: 2,
      user: "Mumbai Cultural Society",
      avatar: "MCS",
      rating: 5,
      text: "Professional, timely delivery, and exceptional craftsmanship. Highly recommended for any religious sculpture needs.",
      date: "1 month ago",
      project: "Traditional Durga Maa",
    },
    {
      id: 3,
      user: "Anand Patel",
      avatar: "AP",
      rating: 4,
      text: "Beautiful work and very responsive to our requirements. The miniature set exceeded our expectations.",
      date: "2 months ago",
      project: "Miniature Krishna Set",
    },
  ];

  const achievements = [
    {
      title: "Master Craftsman Award",
      year: "2023",
      organization: "Indian Sculptors Association",
    },
    {
      title: "Eco-Sculpture Innovation",
      year: "2022",
      organization: "Green Art Foundation",
    },
    {
      title: "Traditional Arts Excellence",
      year: "2021",
      organization: "Heritage Craft Council",
    },
    {
      title: "Community Service Recognition",
      year: "2020",
      organization: "Mumbai Municipal Corporation",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => onNavigate("pandal-detail")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pandal
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
                          Master Murtikar
                        </Badge>
                        <p className="text-gray-600 mb-4">
                          {profile.bio}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            Mumbai, Maharashtra
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Since 2004
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
                      47
                    </div>
                    <div className="text-sm text-gray-600">
                      Projects
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {profile.rating || 4.9}
                    </div>
                    <div className="text-sm text-gray-600">
                      Rating
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      20+
                    </div>
                    <div className="text-sm text-gray-600">
                      Years Exp.
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
                      Custom Ganesh Idols
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Traditional & eco-friendly designs
                    </p>
                    <span className="text-orange-600 font-semibold">
                      ₹15,000 - ₹5,00,000
                    </span>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">
                      Durga Maa Sculptures
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Detailed craftsmanship
                    </p>
                    <span className="text-orange-600 font-semibold">
                      ₹25,000 - ₹7,50,000
                    </span>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-semibold mb-1">
                      Home Deity Sets
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Miniature collections
                    </p>
                    <span className="text-orange-600 font-semibold">
                      ₹5,000 - ₹75,000
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
                  {[
                    "Ganesh Idols",
                    "Durga Sculptures",
                    "Krishna Statues",
                    "Eco-Friendly Art",
                    "Traditional Designs",
                    "Custom Work",
                  ].map((skill) => (
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
                    <span>
                      Completed Eco-Friendly Ganesh project
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>
                      Started new Durga Maa commission
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Received 5-star review</span>
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
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Edit,
  Camera,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Star,
  Heart,
  Briefcase,
  Package,
  Award,
  Settings,
  Plus,
  Eye,
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
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function MurtikarUserProfile({
  onNavigate,
  currentUser,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "Rajesh Sharma",
    email: currentUser?.email || "murtikar@sacredspace.com",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    bio: "Master sculptor specializing in traditional Hindu idols and contemporary spiritual art. 25+ years of experience in creating divine masterpieces.",
    specialization: "Ganesh Idols, Traditional Sculptures",
    experience: "25 years",
    workshop: "Sharma Murti Kala Kendra",
    joinedDate: "March 2023",
  });

  const stats = {
    totalOrders: 47,
    completedOrders: 43,
    activeOrders: 4,
    totalRevenue: 1250000,
    avgRating: 4.8,
    totalReviews: 156,
    profileViews: 2840,
    repeatClients: 28,
  };

  const portfolio = [
    {
      id: 1,
      title: "Eco-Friendly Ganesh Idol",
      category: "Traditional",
      price: 250000,
      rating: 4.9,
      reviews: 23,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true,
    },
    {
      id: 2,
      title: "Traditional Durga Maa",
      category: "Festival",
      price: 375000,
      rating: 4.8,
      reviews: 31,
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true,
    },
    {
      id: 3,
      title: "Krishna Miniature Set",
      category: "Decorative",
      price: 45000,
      rating: 4.7,
      reviews: 18,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false,
    },
    {
      id: 4,
      title: "Shiva Lingam Sculpture",
      category: "Traditional",
      price: 125000,
      rating: 4.9,
      reviews: 27,
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false,
    },
  ];

  const recentReviews = [
    {
      id: 1,
      client: "Mumbai Cultural Society",
      rating: 5,
      comment:
        "Absolutely stunning work! The attention to detail in the Ganesh idol was exceptional. Will definitely order again for next year's festival.",
      project: "Eco-Friendly Ganesh Idol",
      date: "2 days ago",
      avatar: "MCS",
    },
    {
      id: 2,
      client: "Priya Sharma",
      rating: 5,
      comment:
        "Beautiful Krishna set for our home temple. The craftsmanship is extraordinary and the finish is perfect.",
      project: "Krishna Miniature Set",
      date: "1 week ago",
      avatar: "PS",
    },
    {
      id: 3,
      client: "Delhi Temple Committee",
      rating: 4,
      comment:
        "Good quality work and delivered on time. Some minor finishing touches could be improved but overall satisfied.",
      project: "Traditional Durga Maa",
      date: "2 weeks ago",
      avatar: "DTC",
    },
  ];

  const achievements = [
    {
      title: "Master Craftsman",
      description: "25+ years of experience",
      icon: "🏆",
      earned: "2023-03-15",
    },
    {
      title: "Client Favorite",
      description: "100+ satisfied clients",
      icon: "⭐",
      earned: "2023-08-20",
    },
    {
      title: "Festival Expert",
      description: "Specialist in festival idols",
      icon: "🎭",
      earned: "2023-06-10",
    },
    {
      title: "Eco Warrior",
      description: "Pioneer in eco-friendly sculptures",
      icon: "🌱",
      earned: "2024-01-05",
    },
  ];

  const skills = [
    "Traditional Sculpting",
    "Clay Modeling",
    "Eco-Friendly Materials",
    "Festival Decorations",
    "Custom Designs",
    "Restoration Work",
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard">
              <Button variant="ghost">
                ← Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <Link to="/settings">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className={
                  isEditing
                    ? "bg-green-500 hover:bg-green-600"
                    : ""
                }
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-2xl">
                        {currentUser?.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-orange-500 hover:bg-orange-600"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={profileData.bio}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                bio: e.target.value,
                              })
                            }
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="specialization">
                              Specialization
                            </Label>
                            <Input
                              id="specialization"
                              value={profileData.specialization}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  specialization:
                                    e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="experience">
                              Experience
                            </Label>
                            <Input
                              id="experience"
                              value={profileData.experience}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  experience: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="workshop">
                            Workshop Name
                          </Label>
                          <Input
                            id="workshop"
                            value={profileData.workshop}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                workshop: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center space-x-3 mb-2">
                          <h1 className="text-3xl font-bold text-gray-900">
                            {profileData.name}
                          </h1>
                          <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                            Verified Artist
                          </Badge>
                        </div>
                        <p className="text-lg text-orange-600 font-semibold mb-2">
                          {profileData.workshop}
                        </p>
                        <p className="text-gray-600 mb-4">
                          {profileData.bio}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1" />
                            <span>
                              {profileData.specialization}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Award className="w-4 h-4 mr-1" />
                            <span>
                              {profileData.experience}{" "}
                              experience
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{profileData.location}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.totalOrders}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Orders
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.avgRating}
                    </div>
                    <div className="text-sm text-gray-600">
                      Avg Rating
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{(stats.totalRevenue / 1000).toFixed(0)}k
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Revenue
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.repeatClients}
                    </div>
                    <div className="text-sm text-gray-600">
                      Repeat Clients
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Content */}
            <Tabs defaultValue="portfolio" className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="portfolio">
                  Portfolio
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="achievements">
                  Achievements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="portfolio" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>My Portfolio</CardTitle>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-orange-500 to-yellow-500"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Work
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {portfolio.map((item) => (
                        <div
                          key={item.id}
                          className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                          <div className="relative">
                            <div className="w-full h-48 overflow-hidden">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            {item.featured && (
                              <Badge className="absolute top-2 left-2 bg-orange-500">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold mb-2">
                              {item.title}
                            </h4>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary">
                                {item.category}
                              </Badge>
                              <span className="font-semibold text-green-600">
                                ₹{item.price.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                <span>
                                  {item.rating} ({item.reviews}{" "}
                                  reviews)
                                </span>
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Eye className="w-4 h-4 mr-1" />
                                <span>245 views</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Client Reviews ({stats.totalReviews})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentReviews.map((review) => (
                        <div
                          key={review.id}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                {review.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold">
                                  {review.client}
                                </h4>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700 mb-2">
                                "{review.comment}"
                              </p>
                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <span>
                                  Project: {review.project}
                                </span>
                                <span>{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                    >
                      View All Reviews
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {skills.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Traditional Sculpting</span>
                          <span>Expert</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Clay Modeling</span>
                          <span>Advanced</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Eco-Friendly Materials</span>
                          <span>Advanced</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Custom Designs</span>
                          <span>Expert</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="achievements"
                className="mt-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Achievements & Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map(
                        (achievement, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-4 bg-gradient-to-br from-orange-50 to-yellow-50"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="text-3xl">
                                {achievement.icon}
                              </div>
                              <div>
                                <h4 className="font-semibold">
                                  {achievement.title}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {achievement.description}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Earned: {achievement.earned}
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
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-gray-500" />
                  <span className="text-sm">
                    {profileData.email}
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-gray-500" />
                  <span className="text-sm">
                    {profileData.phone}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-gray-500" />
                  <span className="text-sm">
                    {profileData.location}
                  </span>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-yellow-500">
                  Contact Me
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Active Orders
                    </span>
                    <span className="font-semibold">
                      {stats.activeOrders}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Completion Rate
                    </span>
                    <span className="font-semibold">91%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Profile Views
                    </span>
                    <span className="font-semibold">
                      {stats.profileViews}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Response Time
                    </span>
                    <span className="font-semibold">
                      2 hours
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Workshop Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Badge */}
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Master Craftsman
                </h3>
                <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white mb-4">
                  Verified Professional
                </Badge>
                <p className="text-sm text-gray-600">
                  Certified master sculptor with 25+ years of
                  traditional and contemporary experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
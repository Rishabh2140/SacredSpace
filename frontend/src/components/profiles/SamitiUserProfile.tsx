import { useState } from "react";
import {
  Edit,
  Camera,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Star,
  Users,
  Award,
  Settings,
  Plus,
  Eye,
  Heart,
  DollarSign,
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
import { Link } from "react-router-dom";

export function SamitiUserProfile({ onNavigate, currentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "Mumbai Cultural Society",
    email: currentUser?.email || "samiti@sacredspace.com",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    bio: "Leading cultural organization dedicated to preserving and promoting Indian traditions through festivals, community events, and spiritual gatherings.",
    focus: "Festival Organization, Cultural Events",
    established: "1995",
    registration: "MH/2347/1995",
    website: "www.mumbaikultur.org",
    joinedDate: "January 2023",
  });

  const stats = {
    totalEvents: 73,
    activeEvents: 3,
    upcomingEvents: 8,
    totalMembers: 5600,
    totalDonations: 2850000,
    totalVolunteers: 245,
    avgEventRating: 4.7,
    eventsThisYear: 12,
  };

  const recentEvents = [
    {
      id: 1,
      name: "Ganesh Chaturthi 2024",
      type: "Festival Celebration",
      startDate: "Sep 7, 2024",
      endDate: "Sep 17, 2024",
      attendees: 50000,
      budget: 1500000,
      raised: 1450000,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: "Completed",
    },
    {
      id: 2,
      name: "Diwali Community Festival",
      type: "Cultural Celebration",
      startDate: "Nov 1, 2024",
      endDate: "Nov 5, 2024",
      attendees: 15000,
      budget: 800000,
      raised: 425000,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      status: "Planning",
    },
    {
      id: 3,
      name: "Community Kitchen Setup",
      type: "Social Service",
      startDate: "Dec 10, 2024",
      endDate: "Ongoing",
      attendees: 500,
      budget: 300000,
      raised: 245000,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      status: "Fundraising",
    },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Rajesh Kulkarni",
      role: "President",
      experience: "8 years",
      avatar: "RK",
      email: "rajesh@mumbaikultur.org",
    },
    {
      id: 2,
      name: "Priya Sharma",
      role: "Secretary",
      experience: "5 years",
      avatar: "PS",
      email: "priya@mumbaikultur.org",
    },
    {
      id: 3,
      name: "Amit Patel",
      role: "Treasurer",
      experience: "6 years",
      avatar: "AP",
      email: "amit@mumbaikultur.org",
    },
    {
      id: 4,
      name: "Sunita Joshi",
      role: "Event Coordinator",
      experience: "4 years",
      avatar: "SJ",
      email: "sunita@mumbaikultur.org",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Anita Sharma",
      role: "Community Member",
      comment:
        "Mumbai Cultural Society has been the heart of our community for years. Their events bring everyone together in the spirit of celebration and unity.",
      rating: 5,
      avatar: "AS",
    },
    {
      id: 2,
      name: "Dr. Rajesh Gupta",
      role: "Local Resident",
      comment:
        "The organization's commitment to preserving our cultural heritage while embracing modern values is truly commendable.",
      rating: 5,
      avatar: "RG",
    },
    {
      id: 3,
      name: "Meera Joshi",
      role: "Volunteer",
      comment:
        "Being part of this organization has been incredibly rewarding. The leadership is inspiring and the community impact is real.",
      rating: 4,
      avatar: "MJ",
    },
  ];

  const achievements = [
    {
      title: "Community Leader",
      description:
        "Leading cultural organization for 25+ years",
      icon: "🏆",
      earned: "2023-01-15",
    },
    {
      title: "Festival Master",
      description: "Organized 70+ successful events",
      icon: "🎭",
      earned: "2023-06-20",
    },
    {
      title: "Social Impact",
      description: "Served 100,000+ community members",
      icon: "❤️",
      earned: "2023-09-10",
    },
    {
      title: "Fundraising Champion",
      description: "Raised ₹25L+ for community causes",
      icon: "💰",
      earned: "2024-03-05",
    },
  ];

  const specializations = [
    "Festival Organization",
    "Cultural Events",
    "Community Building",
    "Fundraising",
    "Volunteer Management",
    "Religious Ceremonies",
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const getEventStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "Planning":
        return "bg-yellow-500";
      case "Fundraising":
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
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => onNavigate("samiti-dashboard")}
            >
              ← Back to Dashboard
            </Button>
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
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl">
                        {currentUser?.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 w-8 h-8 p-0 rounded-full bg-blue-500 hover:bg-blue-600"
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
                            Organization Name
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
                          <Label htmlFor="bio">
                            About Organization
                          </Label>
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
                            <Label htmlFor="focus">
                              Focus Areas
                            </Label>
                            <Input
                              id="focus"
                              value={profileData.focus}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  focus: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="established">
                              Established
                            </Label>
                            <Input
                              id="established"
                              value={profileData.established}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  established: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="website">
                            Website
                          </Label>
                          <Input
                            id="website"
                            value={profileData.website}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                website: e.target.value,
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
                          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                            Verified Organization
                          </Badge>
                        </div>
                        <p className="text-lg text-blue-600 font-semibold mb-2">
                          Est. {profileData.established}
                        </p>
                        <p className="text-gray-600 mb-4">
                          {profileData.bio}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{profileData.focus}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{profileData.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>
                              Reg: {profileData.registration}
                            </span>
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
                      {stats.totalEvents}
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Events
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {(stats.totalMembers / 1000).toFixed(1)}k
                    </div>
                    <div className="text-sm text-gray-600">
                      Members
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹
                      {(stats.totalDonations / 100000).toFixed(
                        1,
                      )}
                      L
                    </div>
                    <div className="text-sm text-gray-600">
                      Funds Raised
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.avgEventRating}
                    </div>
                    <div className="text-sm text-gray-600">
                      Avg Rating
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Content */}
            <Tabs defaultValue="events" className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="testimonials">
                  Testimonials
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  Achievements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="mt-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Events</CardTitle>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-purple-500"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Plan New Event
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentEvents.map((event) => (
                        <div
                          key={event.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex space-x-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden">
                              <ImageWithFallback
                                src={event.image}
                                alt={event.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="font-semibold text-lg">
                                    {event.name}
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-2">
                                    {event.type}
                                  </p>
                                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <span>
                                      {event.startDate} -{" "}
                                      {event.endDate}
                                    </span>
                                    <div className="flex items-center">
                                      <Users className="w-4 h-4 mr-1" />
                                      <span>
                                        {event.attendees.toLocaleString()}{" "}
                                        attendees
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Badge
                                  className={getEventStatusColor(
                                    event.status,
                                  )}
                                >
                                  {event.status}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-3 gap-4 mt-3">
                                <div>
                                  <p className="text-xs text-gray-500">
                                    Fundraising Progress
                                  </p>
                                  <Progress
                                    value={
                                      (event.raised /
                                        event.budget) *
                                      100
                                    }
                                    className="h-2 mt-1"
                                  />
                                  <p className="text-xs text-gray-600 mt-1">
                                    ₹
                                    {(
                                      event.raised / 1000
                                    ).toFixed(0)}
                                    k / ₹
                                    {(
                                      event.budget / 1000
                                    ).toFixed(0)}
                                    k
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">
                                    Event Rating
                                  </p>
                                  <div className="flex items-center mt-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                    <span className="text-sm font-medium">
                                      {event.rating}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">
                                    Impact
                                  </p>
                                  <div className="flex items-center mt-1">
                                    <Heart className="w-4 h-4 text-red-500 mr-1" />
                                    <span className="text-sm font-medium">
                                      High
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
              </TabsContent>

              <TabsContent value="team" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Leadership Team</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-center space-x-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                {member.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-semibold">
                                {member.name}
                              </h4>
                              <p className="text-sm text-blue-600">
                                {member.role}
                              </p>
                              <p className="text-xs text-gray-600">
                                {member.experience} with
                                organization
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {member.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Team Member
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent
                value="testimonials"
                className="mt-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Community Testimonials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {testimonials.map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-start space-x-4">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
                                {testimonial.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold">
                                    {testimonial.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {testimonial.role}
                                  </p>
                                </div>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-700">
                                "{testimonial.comment}"
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                    >
                      View All Testimonials
                    </Button>
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
                      Organization Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map(
                        (achievement, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-purple-50"
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
                                  Achieved: {achievement.earned}
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
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-3 text-gray-500" />
                  <span className="text-sm">
                    {profileData.website}
                  </span>
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500">
                  Contact Organization
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Organization Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Active Events
                    </span>
                    <span className="font-semibold">
                      {stats.activeEvents}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Events This Year
                    </span>
                    <span className="font-semibold">
                      {stats.eventsThisYear}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Active Volunteers
                    </span>
                    <span className="font-semibold">
                      {stats.totalVolunteers}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Community Impact
                    </span>
                    <span className="font-semibold">
                      Excellent
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specializations */}
            <Card>
              <CardHeader>
                <CardTitle>Our Specializations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {specializations.map((spec, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-3 py-1"
                    >
                      {spec}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recognition Badge */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Community Leader
                </h3>
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
                  Verified Organization
                </Badge>
                <p className="text-sm text-gray-600">
                  Recognized cultural organization serving the
                  community for 25+ years with excellence.
                </p>
              </CardContent>
            </Card>

            {/* Join Community */}
            <Card>
              <CardHeader>
                <CardTitle>Join Our Community</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-center">
                  <p className="text-sm text-gray-600">
                    Be part of our growing community of{" "}
                    {stats.totalMembers.toLocaleString()}{" "}
                    members
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500">
                    <Users className="w-4 h-4 mr-2" />
                    Become a Member
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Heart className="w-4 h-4 mr-2" />
                    Volunteer With Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
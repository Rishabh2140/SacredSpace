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
  Bookmark,
  Users,
  Award,
  Settings,
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
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function CommonUserProfile({ onNavigate, currentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || "Devotee User",
    email: currentUser?.email || "user@sacredspace.com",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    bio: "Devoted spiritual seeker exploring the divine through virtual and physical experiences.",
    interests: [
      "Hindu Dharma",
      "Meditation",
      "Temple Architecture",
      "Festival Celebrations",
    ],
    joinedDate: "January 2024",
  });

  const stats = {
    templesVisited: 24,
    prayersOffered: 156,
    donationsGiven: 12,
    totalDonated: 25000,
    communitiesJoined: 5,
    eventsAttended: 6,
    bookmarkedPlaces: 18,
    followers: 45,
    following: 23,
  };

  const recentActivities = [
    {
      id: 1,
      type: "visit",
      title: "Visited Golden Temple virtually",
      location: "Amritsar, Punjab",
      date: "2 days ago",
      image:
        "https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      type: "donation",
      title: "Donated to Ganesh Festival",
      location: "Mumbai Cultural Society",
      date: "1 week ago",
      amount: 2500,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      type: "community",
      title: "Joined Hindu Dharma Community",
      location: "Online Community",
      date: "2 weeks ago",
      image:
        "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const favoritePlaces = [
    {
      id: 1,
      name: "Lalbaugcha Raja",
      location: "Mumbai, Maharashtra",
      rating: 4.9,
      visits: 5,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 2,
      name: "Golden Temple",
      location: "Amritsar, Punjab",
      rating: 4.8,
      visits: 3,
      image:
        "https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      id: 3,
      name: "Meenakshi Temple",
      location: "Madurai, Tamil Nadu",
      rating: 4.7,
      visits: 2,
      image:
        "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const achievements = [
    {
      title: "Temple Explorer",
      description: "Visited 20+ temples",
      icon: "🏛️",
      earned: "2024-09-15",
    },
    {
      title: "Generous Heart",
      description: "Donated ₹20,000+",
      icon: "💝",
      earned: "2024-08-20",
    },
    {
      title: "Community Builder",
      description: "Active in 5 communities",
      icon: "👥",
      earned: "2024-07-10",
    },
    {
      title: "Faithful Devotee",
      description: "Offered 100+ prayers",
      icon: "🙏",
      earned: "2024-06-05",
    },
  ];

  const handleSaveProfile = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "visit":
        return <MapPin className="w-4 h-4 text-blue-500" />;
      case "donation":
        return <Heart className="w-4 h-4 text-red-500" />;
      case "community":
        return <Users className="w-4 h-4 text-green-500" />;
      default:
        return <Calendar className="w-4 h-4 text-gray-500" />;
    }
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
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profileData.email}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  email: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={profileData.phone}
                              onChange={(e) =>
                                setProfileData({
                                  ...profileData,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="location">
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                location: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {profileData.name}
                        </h1>
                        <p className="text-gray-600 mb-4">
                          {profileData.bio}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{profileData.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>
                              Joined {profileData.joinedDate}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            <span>{profileData.email}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.templesVisited}
                    </div>
                    <div className="text-sm text-gray-600">
                      Temples Visited
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {stats.prayersOffered}
                    </div>
                    <div className="text-sm text-gray-600">
                      Prayers Offered
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{(stats.totalDonated / 1000).toFixed(0)}k
                    </div>
                    <div className="text-sm text-gray-600">
                      Total Donated
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Content */}
            <Tabs defaultValue="activity" className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="activity">
                  Activity
                </TabsTrigger>
                <TabsTrigger value="places">
                  Favorite Places
                </TabsTrigger>
                <TabsTrigger value="achievements">
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="interests">
                  Interests
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center space-x-4 p-3 border rounded-lg"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={activity.image}
                              alt={activity.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              {getActivityIcon(activity.type)}
                              <h4 className="font-medium">
                                {activity.title}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-600">
                              {activity.location}
                            </p>
                            {activity.amount && (
                              <p className="text-sm text-green-600 font-medium">
                                ₹
                                {activity.amount.toLocaleString()}
                              </p>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            {activity.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="places" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Favorite Sacred Places
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {favoritePlaces.map((place) => (
                        <div
                          key={place.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex space-x-3">
                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                              <ImageWithFallback
                                src={place.image}
                                alt={place.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold">
                                {place.name}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2">
                                {place.location}
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                  <span>{place.rating}</span>
                                </div>
                                <span className="text-gray-500">
                                  {place.visits} visits
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
                    <CardTitle>Achievements & Badges</CardTitle>
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

              <TabsContent value="interests" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spiritual Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {profileData.interests.map(
                        (interest, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="px-3 py-1"
                          >
                            {interest}
                          </Badge>
                        ),
                      )}
                    </div>
                    {isEditing && (
                      <div>
                        <Label>
                          Add or edit your spiritual interests
                        </Label>
                        <Input
                          placeholder="Add new interest..."
                          className="mt-2"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Communities Joined
                    </span>
                    <span className="font-semibold">
                      {stats.communitiesJoined}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Events Attended
                    </span>
                    <span className="font-semibold">
                      {stats.eventsAttended}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Bookmarked Places
                    </span>
                    <span className="font-semibold">
                      {stats.bookmarkedPlaces}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Followers
                    </span>
                    <span className="font-semibold">
                      {stats.followers}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Following
                    </span>
                    <span className="font-semibold">
                      {stats.following}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Spiritual Level */}
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Devoted Seeker
                </h3>
                <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white mb-4">
                  Level 3
                </Badge>
                <p className="text-sm text-gray-600">
                  Continue your spiritual journey to reach the
                  next level!
                </p>
              </CardContent>
            </Card>

            {/* Recent Connections */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      name: "Pandit Rajesh",
                      type: "Pujari",
                      avatar: "PR",
                    },
                    {
                      name: "Mumbai Cultural Society",
                      type: "Samiti",
                      avatar: "MCS",
                    },
                    {
                      name: "SpiritualSeeker",
                      type: "Devotee",
                      avatar: "SS",
                    },
                  ].map((connection, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3"
                    >
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                          {connection.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">
                          {connection.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {connection.type}
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
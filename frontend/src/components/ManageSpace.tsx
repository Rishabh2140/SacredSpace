import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Camera,
  Box,
  MapPin,
  Clock,
  Save,
  Upload,
  Eye,
  Edit,
  Trash2,
  Plus,
  Image as ImageIcon,
  Globe,
  Star,
  Users,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ManageSpace({ currentUser, onNavigate }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState({
    name: "Sri Krishna Temple",
    description:
      "A sacred temple dedicated to Lord Krishna, serving the community for over 50 years.",
    address: "123 Temple Street, Bangalore, Karnataka 560001",
    phone: "+91 9876543210",
    email: "info@srikrishnatemple.org",
    website: "www.srikrishnatemple.org",
    timings: {
      morning: "6:00 AM - 12:00 PM",
      evening: "4:00 PM - 9:00 PM",
    },
    facilities: [
      "Prayer Hall",
      "Community Kitchen",
      "Parking",
      "AC Hall",
      "Library",
    ],
  });

  const getSpaceType = () => {
    if (!currentUser?.type) return "Sacred Space";
    return (
      currentUser.type
        .replace("-admin", "")
        .charAt(0)
        .toUpperCase() +
      currentUser.type.replace("-admin", "").slice(1)
    );
  };

  const mockImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=400",
      title: "Main Prayer Hall",
      type: "interior",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1589016683793-e2f3c24778c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=400",
      title: "Temple Exterior",
      type: "exterior",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBkZWNvcmF0aW9ufGVufDF8fHx8MTc1OTA0MDc4MXww&ixlib=rb-4.1.0&q=80&w=400",
      title: "Festival Decorations",
      type: "event",
    },
  ];

  const mock3DViews = [
    {
      id: 1,
      title: "Virtual Tour - Main Hall",
      thumbnail:
        "https://images.unsplash.com/photo-1632932541194-13465e1da12b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eXxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=300",
      type: "360° Tour",
      views: 1250,
    },
    {
      id: 2,
      title: "Altar Close-up View",
      thumbnail:
        "https://images.unsplash.com/photo-1504885869081-9d3fe53b2f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHRhciUyMHZpZXd8ZW58MXx8fHwxNzU5MDQwNzgxfDA&ixlib=rb-4.1.0&q=80&w=300",
      type: "3D Model",
      views: 890,
    },
  ];

  const handleSave = () => {
    // In a real app, this would save to API
    console.log("Saving space data:", formData);
    alert("Space details updated successfully!");
  };

  const handleImageUpload = () => {
    // In a real app, this would handle file upload
    console.log("Image upload initiated");
  };

  const handle3DUpload = () => {
    // In a real app, this would handle 3D file upload
    console.log("3D view upload initiated");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Settings className="w-8 h-8 mr-3 text-orange-500" />
                Manage {getSpaceType()}
              </h1>
              <p className="text-gray-600 mt-1">
                Update your {getSpaceType().toLowerCase()}{" "}
                details, images, and virtual tours
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-md hover:from-orange-600 hover:to-yellow-600"
              >
                Back to Dashboard
              </button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="virtual">3D Views</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-orange-500" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">
                      {getSpaceType()} Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter space name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe your sacred space"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: e.target.value,
                        })
                      }
                      placeholder="Complete address"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="w-5 h-5 mr-2 text-orange-500" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      placeholder="info@example.org"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          website: e.target.value,
                        })
                      }
                      placeholder="www.example.org"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Timings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-500" />
                    Operating Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="morning">
                      Morning Hours
                    </Label>
                    <Input
                      id="morning"
                      value={formData.timings.morning}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          timings: {
                            ...formData.timings,
                            morning: e.target.value,
                          },
                        })
                      }
                      placeholder="6:00 AM - 12:00 PM"
                    />
                  </div>

                  <div>
                    <Label htmlFor="evening">
                      Evening Hours
                    </Label>
                    <Input
                      id="evening"
                      value={formData.timings.evening}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          timings: {
                            ...formData.timings,
                            evening: e.target.value,
                          },
                        })
                      }
                      placeholder="4:00 PM - 9:00 PM"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Facilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-orange-500" />
                    Facilities & Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {formData.facilities.map(
                        (facility, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center"
                          >
                            {facility}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-2"
                              onClick={() => {
                                const newFacilities =
                                  formData.facilities.filter(
                                    (_, i) => i !== index,
                                  );
                                setFormData({
                                  ...formData,
                                  facilities: newFacilities,
                                });
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ),
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add new facility"
                        onKeyPress={(e) => {
                          if (
                            e.key === "Enter" &&
                            e.target.value.trim()
                          ) {
                            setFormData({
                              ...formData,
                              facilities: [
                                ...formData.facilities,
                                e.target.value.trim(),
                              ],
                            });
                            e.target.value = "";
                          }
                        }}
                      />
                      <Button size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="images" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-orange-500" />
                    Image Gallery
                  </CardTitle>
                  <Button
                    onClick={handleImageUpload}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Images
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockImages.map((image) => (
                    <div
                      key={image.id}
                      className="group relative"
                    >
                      <div className="aspect-square rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={image.url}
                          alt={image.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="secondary">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="secondary">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="font-medium text-sm">
                          {image.title}
                        </p>
                        <Badge
                          variant="outline"
                          className="text-xs"
                        >
                          {image.type}
                        </Badge>
                      </div>
                    </div>
                  ))}

                  {/* Upload Placeholder */}
                  <div
                    className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors"
                    onClick={handleImageUpload}
                  >
                    <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 text-center">
                      Click to upload
                      <br />
                      new images
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="virtual" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Box className="w-5 h-5 mr-2 text-orange-500" />
                    3D Views & Virtual Tours
                  </CardTitle>
                  <Button
                    onClick={handle3DUpload}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload 3D View
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mock3DViews.map((view) => (
                    <div
                      key={view.id}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="aspect-video">
                        <ImageWithFallback
                          src={view.thumbnail}
                          alt={view.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">
                          {view.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">
                            {view.type}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Eye className="w-4 h-4 mr-1" />
                            {view.views} views
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Upload Placeholder */}
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg aspect-video flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
                    onClick={handle3DUpload}
                  >
                    <Box className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 text-center">
                      Upload 3D View
                      <br />
                      or Virtual Tour
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3D Upload Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Supported 3D Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      360° Photos
                    </h4>
                    <p className="text-sm text-blue-700">
                      Upload panoramic images (JPG, PNG)
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">
                      3D Models
                    </h4>
                    <p className="text-sm text-green-700">
                      Upload GLB, GLTF format files
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">
                      Virtual Tours
                    </h4>
                    <p className="text-sm text-purple-700">
                      Embed virtual tour links
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Visibility Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Public Listing
                      </p>
                      <p className="text-sm text-gray-600">
                        Show in public search results
                      </p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Virtual Tours
                      </p>
                      <p className="text-sm text-gray-600">
                        Allow 3D view access
                      </p>
                    </div>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Reviews & Ratings
                      </p>
                      <p className="text-sm text-gray-600">
                        Allow visitor feedback
                      </p>
                    </div>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Profile Views
                      </p>
                      <p className="text-sm text-gray-600">
                        This month
                      </p>
                    </div>
                    <span className="font-bold text-blue-600">
                      1,250
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Virtual Visits
                      </p>
                      <p className="text-sm text-gray-600">
                        3D tour views
                      </p>
                    </div>
                    <span className="font-bold text-green-600">
                      890
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Average Rating
                      </p>
                      <p className="text-sm text-gray-600">
                        From 156 reviews
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-bold text-yellow-600">
                        4.8
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Events Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-orange-500" />
                      Events Management
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                      onClick={() => onNavigate?.("/create-event")}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock Events List */}
                    {[
                      {
                        id: 1,
                        title: "Morning Aarti",
                        type: "live",
                        status: "live",
                        time: "6:00 AM",
                        duration: "30 min",
                        viewers: 1250,
                        description: "Daily morning prayers and devotional songs"
                      },
                      {
                        id: 2,
                        title: "Janmashtami Celebration",
                        type: "festival",
                        status: "upcoming",
                        date: "2024-08-26",
                        time: "7:00 PM",
                        duration: "3 hours",
                        description: "Grand celebration of Lord Krishna's birthday"
                      },
                      {
                        id: 3,
                        title: "Evening Aarti",
                        type: "live",
                        status: "scheduled",
                        time: "7:00 PM",
                        duration: "45 min",
                        description: "Evening prayers and divine experience"
                      }
                    ].map((event) => (
                      <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-lg">{event.title}</h3>
                              {event.status === 'live' && (
                                <Badge className="bg-red-500 hover:bg-red-600">
                                  <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-1" />
                                  LIVE
                                </Badge>
                              )}
                              {event.status === 'upcoming' && (
                                <Badge className="bg-blue-500 hover:bg-blue-600">
                                  Upcoming
                                </Badge>
                              )}
                              {event.status === 'scheduled' && (
                                <Badge variant="outline">
                                  Scheduled
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-2">{event.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {event.time} • {event.duration}
                              </div>
                              {event.viewers && (
                                <div className="flex items-center">
                                  <Eye className="w-4 h-4 mr-1" />
                                  {event.viewers} watching
                                </div>
                              )}
                              {event.date && (
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {event.date}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            {event.status === 'live' && (
                              <Button size="sm" className="bg-red-500 hover:bg-red-600">
                                <Eye className="w-4 h-4 mr-1" />
                                View Live
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Event Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">24</div>
                      <div className="text-sm text-gray-600">Total Events</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">3</div>
                      <div className="text-sm text-gray-600">Live Events</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">15.2k</div>
                      <div className="text-sm text-gray-600">Total Viewers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
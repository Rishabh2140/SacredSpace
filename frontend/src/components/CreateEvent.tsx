import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Save,
  Upload,
  Clock,
  Users,
  Star,
  Image as ImageIcon,
  Plus,
  CheckCircle,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function CreateEvent({ currentUser }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    duration: "",
    location: "",
    capacity: "",
    entryFee: "",
    requirements: [],
    organizers: [],
    contactInfo: { phone: "", email: "" },
    specialInstructions: "",
  });

  const [newRequirement, setNewRequirement] = useState("");
  const [newOrganizer, setNewOrganizer] = useState("");
  const [eventImages, setEventImages] = useState([]);

  const eventCategories = [
    "Religious Festival",
    "Prayer Ceremony",
    "Cultural Program",
    "Community Gathering",
    "Educational Workshop",
    "Spiritual Discourse",
    "Charity Drive",
    "Youth Event",
    "Senior Citizens Program",
    "Special Occasion",
  ];

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

  const handleAddRequirement = () => {
    if (
      newRequirement.trim() &&
      !formData.requirements.includes(newRequirement.trim())
    ) {
      setFormData({
        ...formData,
        requirements: [
          ...formData.requirements,
          newRequirement.trim(),
        ],
      });
      setNewRequirement("");
    }
  };

  const handleRemoveRequirement = (requirement) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter(
        (r) => r !== requirement,
      ),
    });
  };

  const handleAddOrganizer = () => {
    if (
      newOrganizer.trim() &&
      !formData.organizers.includes(newOrganizer.trim())
    ) {
      setFormData({
        ...formData,
        organizers: [
          ...formData.organizers,
          newOrganizer.trim(),
        ],
      });
      setNewOrganizer("");
    }
  };

  const handleRemoveOrganizer = (organizer) => {
    setFormData({
      ...formData,
      organizers: formData.organizers.filter(
        (o) => o !== organizer,
      ),
    });
  };

  const handleImageUpload = () => {
    console.log("Event image upload initiated");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating event:", formData);
    alert("Event created successfully!");
  };

  const mockUpcomingEvents = [
    {
      id: 1,
      title: "Diwali Celebration 2024",
      date: "2024-11-01",
      attendees: 500,
      status: "confirmed",
    },
    {
      id: 2,
      title: "Weekly Prayer Assembly",
      date: "2024-12-31",
      attendees: 100,
      status: "scheduled",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Calendar className="w-8 h-8 mr-3 text-orange-500" />
              Create New Event
            </h1>
            <p className="text-gray-600 mt-1">
              Organize a new event for your{" "}
              {getSpaceType().toLowerCase()} community
            </p>
          </div>

          {/* Back to Dashboard Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-md hover:from-orange-600 hover:to-yellow-600"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit}>
              {/* Event Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-orange-500" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g., Diwali Celebration 2024"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">
                        Event Category *
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({
                            ...formData,
                            category: value,
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventCategories.map((category) => (
                            <SelectItem
                              key={category}
                              value={category}
                            >
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="capacity">
                        Expected Attendees
                      </Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            capacity: e.target.value,
                          })
                        }
                        placeholder="100"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">
                      Description *
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
                      placeholder="Detailed description of the event..."
                      rows={4}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Date, Time & Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-500" />
                    Schedule & Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date">Event Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            date: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Start Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            time: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            duration: e.target.value,
                          })
                        }
                        placeholder="e.g., 2 hours"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">
                      Event Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          location: e.target.value,
                        })
                      }
                      placeholder="Main Hall, Community Center, etc."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-orange-500" />
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="entryFee">
                        Entry Fee (₹)
                      </Label>
                      <Input
                        id="entryFee"
                        type="number"
                        value={formData.entryFee}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            entryFee: e.target.value,
                          })
                        }
                        placeholder="0 for free events"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">
                        Contact Phone
                      </Label>
                      <Input
                        id="contactPhone"
                        value={formData.contactInfo.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contactInfo: {
                              ...formData.contactInfo,
                              phone: e.target.value,
                            },
                          })
                        }
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">
                      Contact Email
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactInfo.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contactInfo: {
                            ...formData.contactInfo,
                            email: e.target.value,
                          },
                        })
                      }
                      placeholder="events@example.org"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialInstructions">
                      Special Instructions
                    </Label>
                    <Textarea
                      id="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialInstructions: e.target.value,
                        })
                      }
                      placeholder="Dress code, items to bring, special requirements..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Requirements & Organizers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {formData.requirements.map((r) => (
                        <Badge
                          key={r}
                          variant="secondary"
                          className="flex items-center"
                        >
                          {r}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-2"
                            onClick={() =>
                              handleRemoveRequirement(r)
                            }
                          >
                            ×
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={newRequirement}
                        onChange={(e) =>
                          setNewRequirement(e.target.value)
                        }
                        placeholder="Add requirement"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddRequirement();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={handleAddRequirement}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Organizers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {formData.organizers.map((o) => (
                        <Badge
                          key={o}
                          variant="secondary"
                          className="flex items-center"
                        >
                          {o}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 ml-2"
                            onClick={() =>
                              handleRemoveOrganizer(o)
                            }
                          >
                            ×
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={newOrganizer}
                        onChange={(e) =>
                          setNewOrganizer(e.target.value)
                        }
                        placeholder="Add organizer name"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddOrganizer();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={handleAddOrganizer}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Event Images */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ImageIcon className="w-5 h-5 mr-2 text-orange-500" />
                    Event Images
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {eventImages.map((image, idx) => (
                      <div
                        key={idx}
                        className="aspect-square border rounded-lg overflow-hidden"
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`Event image ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    <div
                      className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors"
                      onClick={handleImageUpload}
                    >
                      <Upload className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-600">
                        Upload
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Event Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Total Events
                  </span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    This Month
                  </span>
                  <span className="font-semibold text-blue-600">
                    3
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Upcoming
                  </span>
                  <span className="font-semibold text-green-600">
                    2
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Avg. Attendance
                  </span>
                  <span className="font-semibold">150</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockUpcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="border rounded-lg p-3"
                    >
                      <h4 className="font-medium text-sm">
                        {event.title}
                      </h4>
                      <p className="text-xs text-gray-600 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(
                          event.date,
                        ).toLocaleDateString()}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {event.attendees} expected
                        </span>
                        <Badge
                          variant={
                            event.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Event Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Event Planning Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p>
                      Plan events at least 2 weeks in advance
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p>Include clear contact information</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p>Add high-quality event images</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <p>Specify any special requirements</p>
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
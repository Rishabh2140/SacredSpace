import { useState } from 'react';
import { 
  Crown,
  Edit,
  Camera,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  Award,
  Users,
  Settings,
  CheckCircle,
  Save,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function AdministratorUserProfile({ currentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Rajesh Kumar',
    email: currentUser?.email || 'rajesh@srikrishnatemple.org',
    phone: '+91 9876543210',
    location: 'Bangalore, Karnataka',
    spaceName: 'Sri Krishna Temple',
    bio: 'Dedicated administrator with 8 years of experience in temple management.',
    experience: '8 years',
    achievements: [
      'Temple Management Excellence Award 2023',
      'Community Service Recognition 2022',
      'Festival Organization Expert'
    ]
  });

  const getSpaceType = () => {
    if (!currentUser?.type) return 'Sacred Space';
    return currentUser.type.replace('-admin', '').charAt(0).toUpperCase() + 
           currentUser.type.replace('-admin', '').slice(1);
  };

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false);
    console.log('Profile updated:', formData);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: currentUser?.name || 'Rajesh Kumar',
      email: currentUser?.email || 'rajesh@srikrishnatemple.org',
      phone: '+91 9876543210',
      location: 'Bangalore, Karnataka',
      spaceName: 'Sri Krishna Temple',
      bio: 'Dedicated administrator with 8 years of experience in temple management.',
      experience: '8 years',
      achievements: [
        'Temple Management Excellence Award 2023',
        'Community Service Recognition 2022',
        'Festival Organization Expert'
      ]
    });
    setIsEditing(false);
  };

  const mockStats = {
    eventsOrganized: 45,
    followers: 1250,
    rating: 4.8,
    totalReviews: 156,
    yearsActive: 8,
    communityMembers: 5000
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Crown className="w-8 h-8 mr-3 text-orange-500" />
                Administrator Profile
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your {getSpaceType().toLowerCase()} administrator profile
              </p>
            </div>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Picture and Stats */}
          <div className="space-y-6">
            {/* Profile Picture */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="w-32 h-32 mx-auto border-4 border-orange-200">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-3xl">
                        {currentUser?.avatar || 'RK'}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                        variant="secondary"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-center space-x-2">
                      <h3 className="text-lg font-semibold">{formData.name}</h3>
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <Crown className="w-5 h-5 text-yellow-500" />
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      {getSpaceType()} Administrator
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Profile Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm">Events Organized</span>
                    </div>
                    <span className="font-semibold">{mockStats.eventsOrganized}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-green-500" />
                      <span className="text-sm">Followers</span>
                    </div>
                    <span className="font-semibold">{mockStats.followers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      <span className="text-sm">Rating</span>
                    </div>
                    <span className="font-semibold">{mockStats.rating}/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2 text-purple-500" />
                      <span className="text-sm">Years Active</span>
                    </div>
                    <span className="font-semibold">{mockStats.yearsActive}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Crown className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="text-sm">Community Size</span>
                    </div>
                    <span className="font-semibold">{mockStats.communityMembers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-orange-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {formData.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-orange-500" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{formData.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="spaceName">{getSpaceType()} Name</Label>
                    {isEditing ? (
                      <Input
                        id="spaceName"
                        value={formData.spaceName}
                        onChange={(e) => setFormData({ ...formData, spaceName: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{formData.spaceName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {formData.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {formData.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {formData.location}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    {isEditing ? (
                      <Input
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{formData.experience}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">About Me</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      placeholder="Tell us about your experience and vision..."
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Administrator Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-orange-500" />
                  Administrator Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Space Management</h4>
                    <p className="text-sm text-gray-600">
                      Full control over your {getSpaceType().toLowerCase()} details, images, and 3D tours
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Event Organization</h4>
                    <p className="text-sm text-gray-600">
                      Create and manage religious events, festivals, and community gatherings
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Volunteer Coordination</h4>
                    <p className="text-sm text-gray-600">
                      Recruit, organize, and communicate with your volunteer team
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Donation Management</h4>
                    <p className="text-sm text-gray-600">
                      Track contributions and manage financial transparency
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-orange-500" />
                  Community Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{mockStats.eventsOrganized}</p>
                    <p className="text-sm text-blue-600">Events Organized</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{mockStats.communityMembers}</p>
                    <p className="text-sm text-green-600">Community Members</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">{mockStats.yearsActive}</p>
                    <p className="text-sm text-yellow-600">Years of Service</p>
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
import { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Star, 
  Users, 
  Crown, 
  Phone, 
  Mail, 
  Clock,
  Award,
  CheckCircle,
  Edit,
  Share2,
  Heart,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AdministratorProfile({ profile }) {
  const [isFollowing, setIsFollowing] = useState(false);

  // Default profile data if none provided
  const defaultProfile = {
    id: 1,
    name: 'Rajesh Kumar',
    type: 'temple-admin',
    spaceName: 'Sri Krishna Temple',
    location: 'Bangalore, Karnataka',
    experience: '8 years',
    verified: true,
    rating: 4.8,
    followers: 1250,
    following: 95,
    bio: 'Dedicated administrator of Sri Krishna Temple with 8 years of experience in managing temple operations, organizing festivals, and serving the devotee community.',
    phone: '+91 9876543210',
    email: 'rajesh@srikrishnatemple.org',
    avatar: 'RK',
    coverImage: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    achievements: [
      'Temple Management Excellence Award 2023',
      'Community Service Recognition 2022',
      'Festival Organization Expert',
      'Digital Transformation Leader'
    ],
    managedEvents: 45,
    yearsOfService: 8,
    communityImpact: '5000+ devotees served monthly'
  };

  const currentProfile = profile || defaultProfile;

  const getSpaceType = () => {
    if (!currentProfile.type) return 'Sacred Space';
    return currentProfile.type.replace('-admin', '').charAt(0).toUpperCase() + 
           currentProfile.type.replace('-admin', '').slice(1);
  };

  const mockRecentEvents = [
    {
      id: 1,
      title: 'Diwali Celebration',
      date: '2024-11-01',
      attendees: 500,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXdhbGklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      id: 2,
      title: 'Navaratri Festival',
      date: '2024-10-15',
      attendees: 750,
      image: 'https://images.unsplash.com/photo-1665146647893-b90b92c85c3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXZhcmF0cmklMjBmZXN0aXZhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      id: 3,
      title: 'Janmashtami Special',
      date: '2024-08-26',
      attendees: 600,
      image: 'https://images.unsplash.com/photo-1567473512073-4c0e35949a84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYW5tYXNodGFtaXxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=400'
    }
  ];

  const mockReviews = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      comment: 'Excellent administration! The temple is always well-maintained and events are perfectly organized.',
      date: '2024-12-15'
    },
    {
      id: 2,
      name: 'Amit Patel',
      rating: 5,
      comment: 'Very helpful and responsive. Made our family event booking process smooth.',
      date: '2024-12-10'
    },
    {
      id: 3,
      name: 'Sunita Devi',
      rating: 4,
      comment: 'Great leadership in managing the temple community. Always available for devotees.',
      date: '2024-12-05'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80">
        <ImageWithFallback
          src={currentProfile.coverImage}
          alt="Space Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Profile Header */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-lg">
                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-2xl">
                  {currentProfile.avatar}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{currentProfile.name}</h1>
                  {currentProfile.verified && (
                    <CheckCircle className="w-6 h-6 text-blue-400" />
                  )}
                  <Crown className="w-6 h-6 text-yellow-400" />
                </div>
                
                <div className="flex items-center space-x-4 text-sm md:text-base mb-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {getSpaceType()} Administrator
                  </Badge>
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {currentProfile.location}
                  </span>
                </div>
                
                <p className="text-gray-200 text-lg font-medium">{currentProfile.spaceName}</p>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant={isFollowing ? "secondary" : "default"}
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={isFollowing ? 
                    "bg-white/20 text-white border-white/30 hover:bg-white/30" : 
                    "bg-white text-gray-900 hover:bg-gray-100"
                  }
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
                <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="secondary" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Info */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{currentProfile.followers}</p>
                    <p className="text-sm text-gray-600">Followers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{currentProfile.managedEvents}</p>
                    <p className="text-sm text-gray-600">Events Managed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-yellow-600">{currentProfile.rating}</p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{currentProfile.yearsOfService}</p>
                    <p className="text-sm text-gray-600">Years</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-orange-500" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-sm">{currentProfile.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-sm">{currentProfile.email}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="text-sm">{currentProfile.experience} experience</span>
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
                  {currentProfile.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center">
                      <Star className="w-4 h-4 mr-2 text-yellow-500" />
                      <span className="text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About {currentProfile.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">{currentProfile.bio}</p>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-3">Administration Highlights</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium text-gray-900">Community Impact</p>
                          <p className="text-sm text-gray-600">{currentProfile.communityImpact}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium text-gray-900">Specialization</p>
                          <p className="text-sm text-gray-600">{getSpaceType()} Management</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="events">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Events Organized</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockRecentEvents.map((event) => (
                        <div key={event.id} className="border rounded-lg overflow-hidden">
                          <ImageWithFallback
                            src={event.image}
                            alt={event.title}
                            className="w-full h-32 object-cover"
                          />
                          <div className="p-4">
                            <h3 className="font-semibold mb-2">{event.title}</h3>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(event.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {event.attendees}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Community Reviews</span>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-500 mr-1" />
                        <span className="font-bold">{currentProfile.rating}</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockReviews.map((review) => (
                        <div key={review.id} className="border-b pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="w-8 h-8 mr-3">
                                <AvatarFallback className="bg-gray-200">
                                  {review.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{review.name}</p>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
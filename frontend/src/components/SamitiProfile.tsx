import { useState } from 'react';
import { Heart, MessageCircle, Share2, Star, Users, MapPin, Calendar, Phone, Mail, Award, ArrowLeft, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function SamitiProfile({ profile, onNavigate }) {
  const [isFollowing, setIsFollowing] = useState(false);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No profile selected</p>
      </div>
    );
  }

  const events = [
    {
      id: 1,
      name: "Ganesh Chaturthi 2024",
      year: "2024",
      location: "Lalbaughcha Raja Pandal",
      image: "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      attendees: 50000,
      budget: "₹15,00,000",
      status: "Completed",
      rating: 4.9
    },
    {
      id: 2,
      name: "Navratri Celebration",
      year: "2023",
      location: "Central Mumbai Grounds",
      image: "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      attendees: 25000,
      budget: "₹8,50,000",
      status: "Completed",
      rating: 4.8
    },
    {
      id: 3,
      name: "Diwali Community Festival",
      year: "2023",
      location: "Mumbai Cultural Center",
      image: "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      attendees: 15000,
      budget: "₹6,00,000",
      status: "Completed",
      rating: 4.7
    }
  ];

  const teamMembers = [
    {
      name: "Rajesh Kulkarni",
      role: "President",
      avatar: "RK",
      experience: "15 years"
    },
    {
      name: "Priya Sharma",
      role: "Secretary",
      avatar: "PS",
      experience: "8 years"
    },
    {
      name: "Amit Patel",
      role: "Treasurer",
      avatar: "AP",
      experience: "12 years"
    },
    {
      name: "Sunita Joshi",
      role: "Event Coordinator",
      avatar: "SJ",
      experience: "6 years"
    }
  ];

  const donations = [
    {
      campaign: "Ganesh Festival 2024",
      target: 1500000,
      raised: 1450000,
      donors: 2340,
      status: "Active"
    },
    {
      campaign: "Temple Renovation Fund",
      target: 500000,
      raised: 425000,
      donors: 890,
      status: "Active"
    },
    {
      campaign: "Community Kitchen Setup",
      target: 300000,
      raised: 300000,
      donors: 567,
      status: "Completed"
    }
  ];

  const reviews = [
    {
      id: 1,
      user: "Anita Desai",
      avatar: "AD",
      rating: 5,
      text: "Excellent organization and management. The Ganesh festival was beautifully executed with great attention to detail.",
      date: "2 weeks ago",
      event: "Ganesh Chaturthi 2024"
    },
    {
      id: 2,
      user: "Ravi Kumar",
      avatar: "RK",
      rating: 5,
      text: "Professional team with deep cultural knowledge. They made our community event memorable and spiritually enriching.",
      date: "1 month ago",
      event: "Navratri Celebration"
    },
    {
      id: 3,
      user: "Mumbai Residents Association",
      avatar: "MRA",
      rating: 4,
      text: "Well-coordinated events with transparent financial management. Great community engagement and volunteer management.",
      date: "2 months ago",
      event: "Diwali Community Festival"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={() => onNavigate('pandal-detail')}>
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
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl">
                      {profile.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                        <Badge className="mb-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          Cultural Samiti
                        </Badge>
                        <p className="text-gray-600 mb-4">{profile.bio}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            Mumbai, Maharashtra
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Est. 1985
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            250+ Members
                          </div>
                        </div>
                      </div>
                      <Button 
                        className={`${isFollowing ? 'bg-gray-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'}`}
                        onClick={() => setIsFollowing(!isFollowing)}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{profile.followers || 5600}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">73</div>
                    <div className="text-sm text-gray-600">Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{profile.rating || 4.7}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">39</div>
                    <div className="text-sm text-gray-600">Years</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Tabs */}
            <Tabs defaultValue="events" className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="donations">Donations</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="mt-6">
                <div className="space-y-6">
                  {events.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex">
                        <div className="w-48 h-32 relative">
                          <ImageWithFallback
                            src={event.image}
                            alt={event.name}
                            className="w-full h-full object-cover"
                          />
                          <Badge className="absolute top-2 right-2 bg-green-500">
                            {event.status}
                          </Badge>
                        </div>
                        <CardContent className="flex-1 p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-lg mb-2">{event.name}</h3>
                              <div className="flex items-center text-gray-600 mb-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">{event.location}</span>
                              </div>
                              <div className="flex items-center text-gray-600 mb-1">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span className="text-sm">{event.year}</span>
                              </div>
                              <div className="flex items-center text-gray-600 mb-3">
                                <Users className="w-4 h-4 mr-1" />
                                <span className="text-sm">{event.attendees.toLocaleString()} attendees</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center mb-2">
                                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                <span className="font-semibold">{event.rating}</span>
                              </div>
                              <span className="text-sm text-gray-600">Budget: {event.budget}</span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="team" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teamMembers.map((member, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                              {member.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{member.name}</h3>
                            <Badge variant="secondary" className="mb-2">{member.role}</Badge>
                            <p className="text-sm text-gray-600">{member.experience} experience</p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <Button variant="outline" size="sm" className="w-full">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Contact
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="donations" className="mt-6">
                <div className="space-y-6">
                  {donations.map((donation, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg mb-2">{donation.campaign}</h3>
                            <Badge className={`${
                              donation.status === 'Active' ? 'bg-green-500' : 'bg-blue-500'
                            }`}>
                              {donation.status}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">Raised</div>
                            <div className="text-xl font-bold text-green-600">
                              ₹{donation.raised.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">
                              of ₹{donation.target.toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        <Progress 
                          value={(donation.raised / donation.target) * 100} 
                          className="mb-4" 
                        />
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{donation.donors} donors</span>
                          <span>{Math.round((donation.raised / donation.target) * 100)}% funded</span>
                        </div>
                        
                        {donation.status === 'Active' && (
                          <Button className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500">
                            <DollarSign className="w-4 h-4 mr-2" />
                            Donate Now
                          </Button>
                        )}
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
                            <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
                              {review.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">{review.user}</h4>
                                <Badge variant="secondary" className="text-xs">{review.event}</Badge>
                              </div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 mb-2">{review.text}</p>
                            <span className="text-sm text-gray-500">{review.date}</span>
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
                  Call Office
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

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Our Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    'Festival Organization',
                    'Pandal Setup & Management',
                    'Community Events',
                    'Cultural Programs',
                    'Donation Management',
                    'Volunteer Coordination'
                  ].map((service, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Campaign */}
            <Card>
              <CardHeader>
                <CardTitle>Active Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <h4 className="font-semibold mb-2">Ganesh Festival 2024</h4>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    ₹14,50,000
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    of ₹15,00,000 target
                  </div>
                  <Progress value={96.7} className="mb-4" />
                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Support Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p>Successfully completed Ganesh Festival 2024</p>
                      <span className="text-gray-500">2 days ago</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p>Started planning for Navratri 2024</p>
                      <span className="text-gray-500">1 week ago</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p>New team member joined as coordinator</p>
                      <span className="text-gray-500">2 weeks ago</span>
                    </div>
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
import { useState } from 'react';
import { Heart, MessageCircle, Share2, Star, Users, MapPin, Calendar, Phone, Mail, Clock, ArrowLeft, Book, Video, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PujariProfile({ profile, onNavigate }) {
  const [isFollowing, setIsFollowing] = useState(false);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No profile selected</p>
      </div>
    );
  }

  const services = [
    {
      id: 1,
      name: "Ganesh Puja Ritual",
      duration: "2 hours",
      price: "₹2,500",
      description: "Complete traditional Ganesh worship with mantras and offerings",
      bookings: 145,
      rating: 4.9
    },
    {
      id: 2,
      name: "Wedding Ceremonies",
      duration: "4-6 hours",
      price: "₹15,000",
      description: "Full Hindu wedding ceremony with all traditional rituals",
      bookings: 67,
      rating: 4.8
    },
    {
      id: 3,
      name: "Havan & Yagya",
      duration: "3 hours",
      price: "₹5,500",
      description: "Sacred fire ceremony for prosperity and purification",
      bookings: 89,
      rating: 4.9
    },
    {
      id: 4,
      name: "Griha Pravesh",
      duration: "2-3 hours",
      price: "₹3,500",
      description: "House warming ceremony with proper rituals",
      bookings: 134,
      rating: 4.7
    },
    {
      id: 5,
      name: "Satyanarayan Puja",
      duration: "2.5 hours",
      price: "₹2,000",
      description: "Monthly worship for prosperity and wellbeing",
      bookings: 198,
      rating: 4.8
    },
    {
      id: 6,
      name: "Online Puja Consultation",
      duration: "30 minutes",
      price: "₹500",
      description: "Virtual consultation for rituals and spiritual guidance",
      bookings: 78,
      rating: 4.6
    }
  ];

  const pastEvents = [
    {
      id: 1,
      name: "Maha Shivaratri Celebration",
      location: "Mumbai Temple",
      date: "Feb 2024",
      attendees: 500,
      image: "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9
    },
    {
      id: 2,
      name: "Diwali Maha Aarti",
      location: "Community Center",
      date: "Nov 2023",
      attendees: 800,
      image: "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8
    },
    {
      id: 3,
      name: "Krishna Janmashtami",
      location: "ISKCON Temple",
      date: "Aug 2023",
      attendees: 1200,
      image: "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9
    }
  ];

  const reviews = [
    {
      id: 1,
      user: "Kavita Sharma",
      avatar: "KS",
      rating: 5,
      text: "Pandit ji conducted our wedding ceremony beautifully. His knowledge of rituals and mantras is exceptional. Highly recommend!",
      date: "2 weeks ago",
      service: "Wedding Ceremonies"
    },
    {
      id: 2,
      user: "Rajesh Patel",
      avatar: "RP",
      rating: 5,
      text: "Very knowledgeable and patient. Explained the significance of each ritual during our Griha Pravesh ceremony.",
      date: "1 month ago",
      service: "Griha Pravesh"
    },
    {
      id: 3,
      user: "Anjali Singh",
      avatar: "AS",
      rating: 4,
      text: "Conducted our monthly Satyanarayan Puja with great devotion. Always punctual and well-prepared.",
      date: "6 weeks ago",
      service: "Satyanarayan Puja"
    }
  ];

  const credentials = [
    { title: "Vedic Studies Certification", institution: "Banaras Hindu University", year: "2005" },
    { title: "Sanskrit Acharya", institution: "Traditional Gurukul", year: "2008" },
    { title: "Astrology Diploma", institution: "Indian Council of Astrological Sciences", year: "2012" },
    { title: "Temple Management Course", institution: "Hindu Dharma Foundation", year: "2015" }
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
              <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Book Service
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
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-500 text-white text-2xl">
                      {profile.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                        <Badge className="mb-3 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          Certified Pujari
                        </Badge>
                        <p className="text-gray-600 mb-4">{profile.bio}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            Mumbai, Maharashtra
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            15+ Years Experience
                          </div>
                          <div className="flex items-center">
                            <Book className="w-4 h-4 mr-1" />
                            Sanskrit Scholar
                          </div>
                        </div>
                      </div>
                      <Button 
                        className={`${isFollowing ? 'bg-gray-600' : 'bg-gradient-to-r from-orange-500 to-red-500'}`}
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
                    <div className="text-2xl font-bold text-gray-900">{profile.followers || 2400}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">512</div>
                    <div className="text-sm text-gray-600">Services</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{profile.rating || 4.8}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">98%</div>
                    <div className="text-sm text-gray-600">Satisfied</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Tabs */}
            <Tabs defaultValue="services" className="mb-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="events">Past Events</TabsTrigger>
                <TabsTrigger value="credentials">Credentials</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="services" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                            <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {service.duration}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {service.bookings} bookings
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-orange-600 mb-2">{service.price}</div>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                              <span className="text-sm">{service.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          Book Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="events" className="mt-6">
                <div className="space-y-6">
                  {pastEvents.map((event) => (
                    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex">
                        <div className="w-48 h-32 relative">
                          <ImageWithFallback
                            src={event.image}
                            alt={event.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-lg mb-2">{event.name}</h3>
                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">{event.location}</span>
                              </div>
                              <div className="flex items-center text-gray-600 mb-2">
                                <Calendar className="w-4 h-4 mr-1" />
                                <span className="text-sm">{event.date}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Users className="w-4 h-4 mr-1" />
                                <span className="text-sm">{event.attendees} attendees</span>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Star className="w-5 h-5 text-yellow-500 fill-current mr-1" />
                              <span className="font-semibold">{event.rating}</span>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="credentials" className="mt-6">
                <div className="space-y-4">
                  {credentials.map((credential, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{credential.title}</h4>
                            <p className="text-gray-600">{credential.institution}</p>
                            <span className="text-sm text-gray-500">{credential.year}</span>
                          </div>
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
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                              {review.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold">{review.user}</h4>
                                <Badge variant="secondary" className="text-xs">{review.service}</Badge>
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
            {/* Quick Booking */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Service
                </Button>
                <Button className="w-full" variant="outline">
                  <Video className="w-4 h-4 mr-2" />
                  Video Consultation
                </Button>
                <Button className="w-full" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button className="w-full" variant="outline">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Popular Services */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {services.slice(0, 3).map((service) => (
                    <div key={service.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-sm">{service.name}</h4>
                          <div className="flex items-center text-xs text-gray-600">
                            <Clock className="w-3 h-3 mr-1" />
                            {service.duration}
                          </div>
                        </div>
                        <span className="text-orange-600 font-semibold text-sm">{service.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Today:</span>
                    <span className="text-green-600">Available</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tomorrow:</span>
                    <span className="text-orange-600">2 slots left</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This week:</span>
                    <span className="text-green-600">Open</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekend:</span>
                    <span className="text-red-600">Fully booked</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Full Calendar
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
                  {['Vedic Rituals', 'Wedding Ceremonies', 'Havan & Yagya', 'Astrology', 'Sanskrit', 'Temple Worship'].map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Associated Spaces */}
            {profile.associatedSpaces && profile.associatedSpaces.length > 0 && (
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
                        onClick={() => onNavigate(`/space/${space.id}`)}
                      >
                        <h4 className="font-semibold text-sm">{space.name}</h4>
                        <p className="text-xs text-gray-600 capitalize">{space.type.replace('-', ' ')}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {[
                    { lang: 'Sanskrit', level: 'Native' },
                    { lang: 'Hindi', level: 'Fluent' },
                    { lang: 'Marathi', level: 'Fluent' },
                    { lang: 'English', level: 'Conversational' }
                  ].map((language, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{language.lang}</span>
                      <span className="text-gray-600">{language.level}</span>
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
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Flame, Clock, Star, Play, Eye } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LandingPage({ onSelectPandal, onSelectSpace, isAuthenticated, currentUser }) {
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(`/${path}`);
  };
  const featuredPandals = [
    {
      id: 1,
      name: "Lalbaugcha Raja",
      location: "Mumbai, Maharashtra",
      image: "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      visitors: "2.1M",
      rating: 4.9,
      category: "Ganesh",
      isLive: true
    },
    {
      id: 2,
      name: "Golden Temple",
      location: "Amritsar, Punjab", 
      image: "https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      visitors: "1.8M",
      rating: 4.8,
      category: "Sikh",
      isLive: true
    },
    {
      id: 3,
      name: "Blue Mosque",
      location: "Istanbul, Turkey",
      image: "https://images.unsplash.com/photo-1626303298621-984f671f8a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      visitors: "1.5M",
      rating: 4.7,
      category: "Islamic",
      isLive: false
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Diwali Celebration",
      date: "Oct 31, 2024",
      time: "6:00 PM",
      location: "Mumbai Temple",
      attendees: 450
    },
    {
      id: 2,
      title: "Christmas Mass",
      date: "Dec 25, 2024", 
      time: "7:00 AM",
      location: "St. Cathedral",
      attendees: 320
    },
    {
      id: 3,
      title: "Friday Prayer",
      date: "Oct 4, 2024",
      time: "1:00 PM",
      location: "Central Mosque",
      attendees: 280
    }
  ];

  const faithCategories = [
    { name: "Hindu", icon: "🕉️", count: "2.4k", color: "from-orange-500 to-red-500" },
    { name: "Sikh", icon: "☬", count: "1.2k", color: "from-blue-500 to-purple-500" },
    { name: "Christian", icon: "✝️", count: "1.8k", color: "from-blue-600 to-indigo-600" },
    { name: "Islamic", icon: "☪️", count: "1.5k", color: "from-green-500 to-teal-500" },
    { name: "Buddhist", icon: "☸️", count: "900", color: "from-yellow-500 to-orange-500" },
    { name: "Jain", icon: "🕯️", count: "650", color: "from-purple-500 to-pink-500" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-orange-600 via-yellow-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Experience Divine
              <br />
              <span className="text-yellow-300">Spirituality</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-yellow-100">
              Connect with sacred spaces worldwide through immersive virtual experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-yellow-50 hover:text-orange-700"
                onClick={() => onNavigate('virtual-worship')}
              >
                <MapPin className="w-5 h-5 mr-2" />
                Start Virtual Tour
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-orange-600"
                onClick={() => onNavigate('live-streaming')}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Live
              </Button>
              
              {/* Testing buttons - remove after debugging */}
              {!isAuthenticated && (
                <Button 
                  size="lg" 
                  className="bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => onNavigate('login')}
                >
                  Test Login
                </Button>
              )}
            </div>
            
            {/* Quick test dashboard buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button 
                size="sm" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
                onClick={() => onNavigate('explore')}
              >
                🔍 Test Explore
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
                onClick={() => {
                  // Simulate user dashboard navigation by setting user type
                  if (currentUser) {
                    onNavigate('dashboard');
                  } else {
                    onNavigate('login');
                  }
                }}
              >
                Test User Dashboard
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
                onClick={() => {
                  // Mock login as murtikar for testing
                  if (window.mockLogin) {
                    window.mockLogin({ id: 1, name: 'Test Artist', type: 'murtikar', verified: true });
                  }
                  onNavigate('dashboard');
                }}
              >
                Test Artist Dashboard
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
                onClick={() => {
                  // Mock login as administrator for testing
                  if (window.mockLogin) {
                    window.mockLogin({ id: 1, name: 'Test Admin', type: 'temple', verified: true });
                  }
                  onNavigate('dashboard');
                }}
              >
                Test Admin Dashboard
              </Button>
            </div>
            
            {/* Quick test space detail buttons */}
            <div className="flex flex-wrap gap-2 mt-2">
              <Button 
                size="sm" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
                onClick={() => {
                  // Mock temple data for testing
                  const mockTemple = {
                    id: 1,
                    name: "Sri Krishna Temple",
                    location: "Mathura, Uttar Pradesh",
                    type: "temple",
                    rating: 4.8,
                    visitors: "1.2M"
                  };
                  onSelectSpace && onSelectSpace(mockTemple);
                  navigate('/temple/1');
                }}
              >
                Test Temple
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
                onClick={() => {
                  // Mock church data for testing
                  const mockChurch = {
                    id: 1,
                    name: "St. Mary's Cathedral",
                    location: "Mumbai, Maharashtra",
                    type: "church",
                    rating: 4.7,
                    visitors: "800K"
                  };
                  onSelectSpace && onSelectSpace(mockChurch);
                  navigate('/church/1');
                }}
              >
                Test Church
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
                onClick={() => {
                  // Mock mosque data for testing
                  const mockMosque = {
                    id: 1,
                    name: "Jama Masjid",
                    location: "Delhi",
                    type: "mosque",
                    rating: 4.6,
                    visitors: "900K"
                  };
                  onSelectSpace && onSelectSpace(mockMosque);
                  navigate('/mosque/1');
                }}
              >
                Test Mosque
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
                onClick={() => {
                  // Mock gurudwara data for testing
                  const mockGurudwara = {
                    id: 1,
                    name: "Golden Temple",
                    location: "Amritsar, Punjab",
                    type: "gurudwara",
                    rating: 4.9,
                    visitors: "1.8M"
                  };
                  onSelectSpace && onSelectSpace(mockGurudwara);
                  navigate('/gurudwara/1');
                }}
              >
                Test Gurudwara
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-600"
                onClick={() => {
                  // Mock buddhist center data for testing
                  const mockBuddhistCenter = {
                    id: 1,
                    name: "Mahabodhi Temple",
                    location: "Bodh Gaya, Bihar",
                    type: "buddhist-center",
                    rating: 4.8,
                    visitors: "600K"
                  };
                  onSelectSpace && onSelectSpace(mockBuddhistCenter);
                  navigate('/buddhist-center/1');
                }}
              >
                Test Buddhist Center
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Faith Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore by Faith</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {faithCategories.map((faith) => (
              <Card key={faith.name} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 bg-gradient-to-br ${faith.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {faith.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{faith.name}</h3>
                  <p className="text-sm text-gray-500">{faith.count} places</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Pandals/Temples */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Sacred Spaces</h2>
            <Button variant="outline" onClick={() => onNavigate('explore')}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPandals.map((pandal) => (
              <Card key={pandal.id} className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow">
                <div className="relative">
                  <ImageWithFallback
                    src={pandal.image}
                    alt={pandal.name}
                    className="w-full h-48 object-cover"
                  />
                  {pandal.isLive && (
                    <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
                      <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                      LIVE
                    </Badge>
                  )}
                  <Badge className="absolute top-3 right-3 bg-black/60 text-white">
                    {pandal.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{pandal.name}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{pandal.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-600">{pandal.visitors}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{pandal.rating}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        onSelectPandal(pandal);
                        onNavigate('pandal-detail');
                      }}
                    >
                      Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-1">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      <Users className="w-3 h-3 mr-1" />
                      {event.attendees}
                    </Badge>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Trending Content */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Morning Prayers", category: "Audio", duration: "12 min" },
              { title: "Temple Architecture", category: "Article", readTime: "5 min" },
              { title: "Meditation Guide", category: "Video", duration: "20 min" },
              { title: "Festival Stories", category: "Audio", duration: "15 min" }
            ].map((content, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="w-full h-24 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg mb-3 flex items-center justify-center">
                    {content.category === 'Video' ? <Play className="w-6 h-6 text-orange-600" /> : 
                     content.category === 'Audio' ? <Flame className="w-6 h-6 text-orange-600" /> :
                     <Eye className="w-6 h-6 text-orange-600" />}
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{content.title}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{content.category}</span>
                    <span>{content.duration || content.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
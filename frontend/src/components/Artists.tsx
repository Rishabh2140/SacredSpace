import { useState } from 'react';
import { Search, Filter, MapPin, Star, Users, Award, Palette, Hammer, Music, Heart, User } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Artists({ onNavigate, onSelectProfile }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const categories = [
    'All',
    'Murtikar',
    'Designer', 
    'Decorator',
    'Pujari',
    'Priest',
    'Guide',
    'Volunteer'
  ];

  const locations = [
    'All',
    'Mumbai',
    'Delhi',
    'Kolkata',
    'Chennai',
    'Bangalore',
    'Pune',
    'Hyderabad'
  ];

  const artists = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      category: 'Murtikar',
      type: 'murtikar',
      location: 'Mumbai, Maharashtra',
      rating: 4.8,
      followers: 1200,
      experience: '20+ years',
      specialization: 'Ganesh Idols & Traditional Sculptures',
      avatar: 'RK',
      image: 'https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      projects: 47,
      isVerified: true,
      associatedSpaces: [
        { id: 1, name: 'Shree Siddhivinayak Temple', type: 'temple' },
        { id: 6, name: 'Akshardham Temple', type: 'temple' }
      ],
      bio: 'Master craftsman specializing in traditional Hindu sculptures and eco-friendly idol making',
      priceRange: '₹15,000 - ₹5,00,000'
    },
    {
      id: 2,
      name: 'Priya Mehta',
      category: 'Designer',
      type: 'designer',
      location: 'Delhi, India',
      rating: 4.9,
      followers: 850,
      experience: '12 years',
      specialization: 'Pandal Design & Theme Development',
      avatar: 'PM',
      image: 'https://images.unsplash.com/photo-1625259566209-8c59614a28fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjYXRoZWRyYWwlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      projects: 34,
      isVerified: true,
      associatedSpaces: [
        { id: 3, name: 'St. Paul\'s Cathedral', type: 'church' }
      ],
      bio: 'Creative designer with expertise in modern pandal themes and architectural visualization',
      priceRange: '₹25,000 - ₹3,00,000'
    },
    {
      id: 3,
      name: 'Suresh Patel',
      category: 'Decorator',
      type: 'decorator',
      location: 'Mumbai, Maharashtra',
      rating: 4.7,
      followers: 650,
      experience: '15 years',
      specialization: 'Festival Decoration & Lighting',
      avatar: 'SP',
      image: 'https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      projects: 89,
      isVerified: true,
      associatedSpaces: [
        { id: 1, name: 'Shree Siddhivinayak Temple', type: 'temple' },
        { id: 2, name: 'Bangla Sahib Gurudwara', type: 'gurudwara' }
      ],
      bio: 'Expert decorator specializing in traditional festival setups and modern lighting solutions',
      priceRange: '₹10,000 - ₹2,00,000'
    },
    {
      id: 4,
      name: 'Pandit Arun Sharma',
      category: 'Pujari',
      type: 'pujari',
      location: 'Varanasi, UP',
      rating: 4.9,
      followers: 2100,
      experience: '25+ years',
      specialization: 'Vedic Rituals & Traditional Ceremonies',
      avatar: 'AS',
      image: 'https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      projects: 156,
      isVerified: true,
      associatedSpaces: [
        { id: 1, name: 'Shree Siddhivinayak Temple', type: 'temple' },
        { id: 6, name: 'Akshardham Temple', type: 'temple' }
      ],
      bio: 'Senior pujari with deep knowledge of Vedic scriptures and traditional Hindu ceremonies',
      priceRange: '₹2,500 - ₹25,000'
    },
    {
      id: 5,
      name: 'Father Michael',
      category: 'Priest',
      type: 'priest',
      location: 'London, UK',
      rating: 4.8,
      followers: 980,
      experience: '18 years',
      specialization: 'Christian Worship & Counseling',
      avatar: 'FM',
      image: 'https://images.unsplash.com/photo-1625259566209-8c59614a28fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjYXRoZWRyYWwlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      projects: 78,
      isVerified: true,
      associatedSpaces: [
        { id: 3, name: 'St. Paul\'s Cathedral', type: 'church' }
      ],
      bio: 'Experienced priest dedicated to spiritual guidance and community service',
      priceRange: 'Donation Based'
    },
    {
      id: 6,
      name: 'Bhai Gurpreet Singh',
      category: 'Guide',
      type: 'guide',
      location: 'Amritsar, Punjab',
      rating: 4.9,
      followers: 1340,
      experience: '10 years',
      specialization: 'Sikh History & Gurdwara Tours',
      avatar: 'GS',
      image: 'https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      projects: 45,
      isVerified: true,
      associatedSpaces: [
        { id: 2, name: 'Bangla Sahib Gurudwara', type: 'gurudwara' }
      ],
      bio: 'Passionate guide sharing the rich history and traditions of Sikh culture',
      priceRange: '₹500 - ₹2,000 per tour'
    },
    {
      id: 7,
      name: 'Ravi Volunteer',
      category: 'Volunteer',
      type: 'volunteer',
      location: 'Chennai, TN',
      rating: 4.6,
      followers: 420,
      experience: '5 years',
      specialization: 'Community Service & Event Support',
      avatar: 'RV',
      image: 'https://images.unsplash.com/photo-1688935455227-85136cc9b24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHRlbXBsZSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      projects: 23,
      isVerified: false,
      associatedSpaces: [
        { id: 5, name: 'Wat Pho Buddhist Temple', type: 'buddhist-center' }
      ],
      bio: 'Dedicated volunteer helping with temple activities and community outreach programs',
      priceRange: 'Volunteer Service'
    },
    {
      id: 8,
      name: 'Imam Abdullah',
      category: 'Guide',
      type: 'guide',
      location: 'Istanbul, Turkey',
      rating: 4.8,
      followers: 750,
      experience: '12 years',
      specialization: 'Islamic Architecture & History',
      avatar: 'IA',
      image: 'https://images.unsplash.com/photo-1626303298621-984f671f8a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      projects: 67,
      isVerified: true,
      associatedSpaces: [
        { id: 4, name: 'Sultan Ahmed Mosque', type: 'mosque' }
      ],
      bio: 'Knowledgeable guide specializing in Islamic heritage and architectural tours',
      priceRange: '₹800 - ₹3,000 per tour'
    }
  ];

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || artist.category === selectedCategory;
    const matchesLocation = selectedLocation === 'All' || artist.location.includes(selectedLocation);
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleArtistClick = (artist) => {
    onSelectProfile?.(artist);
    // Route based on type
    switch(artist.type) {
      case 'murtikar':
        onNavigate?.(`/murtikar/${artist.id}`);
        break;
      case 'pujari':
        onNavigate?.(`/pujari/${artist.id}`);
        break;
      default:
        // For other types, we can create a generic artist profile route
        onNavigate?.(`/artist/${artist.id}`);
        break;
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Murtikar': return <Hammer className="w-4 h-4" />;
      case 'Designer': return <Palette className="w-4 h-4" />;
      case 'Decorator': return <Palette className="w-4 h-4" />;
      case 'Pujari': return <User className="w-4 h-4" />;
      case 'Priest': return <User className="w-4 h-4" />;
      case 'Guide': return <MapPin className="w-4 h-4" />;
      case 'Volunteer': return <Heart className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8 pt-4 mt-6 sm:mt-2 md:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Sacred Artists & Guides
          </h1>
          <p className="text-gray-600">
            Connect with skilled artisans, spiritual guides, and dedicated volunteers
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search artists, guides, specializations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredArtists.length} artists and guides
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <Card 
              key={artist.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleArtistClick(artist)}
            >
              <div className="relative">
                <ImageWithFallback
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                    {getCategoryIcon(artist.category)}
                    <span className="ml-1">{artist.category}</span>
                  </Badge>
                </div>
                {artist.isVerified && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="bg-green-500 text-white">
                      ✓ Verified
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
                        {artist.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{artist.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        {artist.location}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {artist.bio}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Specialization:</span>
                    <span className="font-medium">{artist.specialization}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Experience:</span>
                    <span className="font-medium">{artist.experience}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Pricing:</span>
                    <span className="font-medium text-orange-600">{artist.priceRange}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center text-sm">
                  <div>
                    <div className="font-bold text-gray-900">{artist.rating}</div>
                    <div className="text-gray-600 flex items-center justify-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                      Rating
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{artist.followers}</div>
                    <div className="text-gray-600">Followers</div>
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{artist.projects}</div>
                    <div className="text-gray-600">Projects</div>
                  </div>
                </div>

                {/* Associated Spaces */}
                {artist.associatedSpaces && artist.associatedSpaces.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-600 mb-2">Associated Spaces:</div>
                    <div className="flex flex-wrap gap-1">
                      {artist.associatedSpaces.slice(0, 2).map((space) => (
                        <Badge key={space.id} variant="secondary" className="text-xs">
                          {space.name}
                        </Badge>
                      ))}
                      {artist.associatedSpaces.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{artist.associatedSpaces.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredArtists.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No artists found matching your criteria</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedLocation('All');
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="text-center py-8">
            <Button variant="outline" size="lg">
              Load More Artists
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
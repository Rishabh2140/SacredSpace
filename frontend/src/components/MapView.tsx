import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, MapPin, Star, Eye, Navigation, Layers, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MapView({ onSelectSpace }) {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapView, setMapView] = useState('satellite'); // 'satellite', 'street', 'hybrid'
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(10);

  const sacredPlaces = [
    {
      id: 1,
      name: "Lalbaugcha Raja",
      type: "Ganesh Temple",
      spaceType: "pandal",
      location: "Mumbai, Maharashtra",
      coordinates: { lat: 19.0176, lng: 72.8562 },
      rating: 4.9,
      visitors: "2.1M",
      image: "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: true,
      category: "Hindu",
      description: "Famous Ganesh temple known for its grand celebrations"
    },
    {
      id: 2,
      name: "Golden Temple",
      type: "Gurudwara",
      spaceType: "gurudwara",
      location: "Amritsar, Punjab",
      coordinates: { lat: 31.6200, lng: 74.8765 },
      rating: 4.8,
      visitors: "1.8M",
      image: "https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: true,
      category: "Sikh",
      description: "Holiest Sikh shrine with golden architecture"
    },
    {
      id: 3,
      name: "Akshardham Temple",
      type: "Hindu Temple",
      spaceType: "temple",
      location: "Delhi, India",
      coordinates: { lat: 28.6127, lng: 77.2773 },
      rating: 4.9,
      visitors: "1.5M",
      image: "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: false,
      category: "Hindu",
      description: "Magnificent temple showcasing traditional Indian architecture"
    },
    {
      id: 4,
      name: "Sultan Ahmed Mosque",
      type: "Mosque",
      spaceType: "mosque",
      location: "Istanbul, Turkey",
      coordinates: { lat: 41.0053, lng: 28.9770 },
      rating: 4.9,
      visitors: "1.2M",
      image: "https://images.unsplash.com/photo-1626303298621-984f671f8a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: false,
      category: "Islamic",
      description: "Historic Blue Mosque with stunning Ottoman architecture"
    },
    {
      id: 5,
      name: "Pema Norbu Monastery",
      type: "Buddhist Center",
      spaceType: "buddhist-center",
      location: "Dharamshala, India",
      coordinates: { lat: 32.2190, lng: 76.3234 },
      rating: 4.8,
      visitors: "200k",
      image: "https://images.unsplash.com/photo-1688935455227-85136cc9b24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRkaGlzdCUyMHRlbXBsZSUyMG1lZGl0YXRpb258ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: false,
      category: "Buddhist",
      description: "Peaceful monastery for meditation and Buddhist teachings"
    },
    {
      id: 6,
      name: "St. Mary's Cathedral",
      type: "Church",
      spaceType: "church",
      location: "New York, USA",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      rating: 4.7,
      visitors: "500k",
      image: "https://images.unsplash.com/photo-1625259566209-8c59614a28fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjYXRoZWRyYWwlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzU5MDkzNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isLive: false,
      category: "Christian",
      description: "Gothic Revival cathedral with stunning architecture"
    }
  ];

  const categories = [
    { id: 'all', name: 'All', color: 'bg-gray-500', count: sacredPlaces.length },
    { id: 'Hindu', name: 'Hindu', color: 'bg-orange-500', count: 2 },
    { id: 'Sikh', name: 'Sikh', color: 'bg-blue-500', count: 1 },
    { id: 'Islamic', name: 'Islamic', color: 'bg-green-500', count: 1 },
    { id: 'Buddhist', name: 'Buddhist', color: 'bg-yellow-500', count: 1 },
    { id: 'Christian', name: 'Christian', color: 'bg-purple-500', count: 1 }
  ];

  const handleLocationClick = (place) => {
    setSelectedLocation(place);
  };

  const handleVisitPlace = (place) => {
    onSelectSpace(place);
    navigate(`/space/${place.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 sm:h-16 sm:py-0 gap-3">
            <Button variant="ghost" onClick={() => onNavigate('landing')} className="self-start">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search sacred places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="w-full sm:w-auto"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-3 h-[calc(100vh-128px)]">
        {/* Sidebar */}
        <div className="order-2 lg:order-1 lg:col-span-1 bg-white border-r overflow-y-auto max-h-96 lg:max-h-none">
          <div className="p-3 sm:p-4">
            {/* Filters */}
            {showFilters && (
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-sm">Filter by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant="outline"
                        size="sm"
                        className="justify-start text-xs"
                      >
                        <div className={`w-3 h-3 rounded-full ${category.color} mr-2 flex-shrink-0`}></div>
                        <span className="truncate">{category.name} ({category.count})</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Places List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 mb-3">Sacred Places ({sacredPlaces.length})</h3>
              {sacredPlaces.map((place) => (
                <Card
                  key={place.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedLocation?.id === place.id ? 'ring-2 ring-orange-500 shadow-lg' : ''
                  }`}
                  onClick={() => handleLocationClick(place)}
                >
                  <CardContent className="p-4">
                    <div className="flex space-x-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={place.image}
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                        {place.isLive && (
                          <Badge className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-xs px-1 py-0">
                            LIVE
                          </Badge>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 mb-1 truncate">
                          {place.name}
                        </h4>
                        <p className="text-xs text-gray-600 mb-1">{place.type}</p>
                        <div className="flex items-center text-xs text-gray-500 mb-2">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="truncate">{place.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                              <span className="text-xs">{place.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-3 h-3 text-gray-400 mr-1" />
                              <span className="text-xs">{place.visitors}</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {place.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="lg:col-span-2 relative bg-gradient-to-br from-blue-100 to-green-100">
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-30 space-y-2">
            <Card className="p-2">
              <div className="flex flex-col space-y-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 18))}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 3))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
              </div>
            </Card>
            <Card className="p-2">
              <Button variant="outline" size="icon" className="w-8 h-8">
                <Navigation className="w-4 h-4" />
              </Button>
            </Card>
            <Card className="p-2">
              <Button
                variant={mapView === 'satellite' ? 'default' : 'outline'}
                size="icon"
                className="w-8 h-8"
                onClick={() => setMapView('satellite')}
              >
                <Layers className="w-4 h-4" />
              </Button>
            </Card>
          </div>

          {/* Mock Map with Markers */}
          <div className="relative w-full h-full">
            {/* Background Map Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-br from-green-200 via-blue-200 to-yellow-200"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLTItNC00LTRzLTQgMi00IDQgMiA0IDQgNCA0LTIgNC00em0wLTMwYzAtMi0yLTQtNC00cy00IDItNCA0IDIgNCA0IDQgNC0yIDQtNHptLTMwIDBjMC0yLTItNC00LTRzLTQgMi00IDQgMiA0IDQgNCA0LTIgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
            </div>

            {/* Place Markers */}
            {sacredPlaces.map((place, index) => {
              const position = {
                top: `${20 + (index * 15) % 60}%`,
                left: `${15 + (index * 20) % 70}%`
              };

              return (
                <div key={place.id} className="absolute z-20" style={position}>
                  <Button
                    className={`relative w-12 h-12 rounded-full p-0 shadow-lg ${
                      selectedLocation?.id === place.id
                        ? 'bg-orange-500 hover:bg-orange-600 ring-4 ring-orange-200'
                        : place.category === 'Hindu'
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : place.category === 'Sikh'
                        ? 'bg-blue-500 hover:bg-blue-600'
                        : place.category === 'Islamic'
                        ? 'bg-green-500 hover:bg-green-600'
                        : place.category === 'Buddhist'
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-purple-500 hover:bg-purple-600'
                    }`}
                    onClick={() => handleLocationClick(place)}
                  >
                    <MapPin className="w-6 h-6 text-white" />
                    {place.isLive && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </Button>
                  
                  {/* Place Label */}
                  <div className="absolute top-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-white px-2 py-1 rounded shadow-md text-xs font-medium">
                      {place.name}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Selected Location Info */}
            {selectedLocation && (
              <div className="absolute bottom-4 left-4 right-4 z-30">
                <Card className="border-orange-200 bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex space-x-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={selectedLocation.image}
                          alt={selectedLocation.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{selectedLocation.name}</h3>
                            <p className="text-gray-600 text-sm">{selectedLocation.type}</p>
                          </div>
                          {selectedLocation.isLive && (
                            <Badge className="bg-red-500 hover:bg-red-600">
                              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                              LIVE
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{selectedLocation.location}</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-3">{selectedLocation.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                              <span>{selectedLocation.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 text-gray-500 mr-1" />
                              <span>{selectedLocation.visitors} visitors</span>
                            </div>
                          </div>
                          <Button
                            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                            onClick={() => handleVisitPlace(selectedLocation)}
                          >
                            Visit Virtual Space
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Map Info */}
          <div className="absolute bottom-4 right-4 z-30">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-3">
                <div className="text-xs text-gray-600">
                  <div>Zoom: {zoomLevel}</div>
                  <div>View: {mapView}</div>
                  <div>Places: {sacredPlaces.length}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
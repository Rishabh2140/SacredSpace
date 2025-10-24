import { useState } from 'react';
import { ArrowLeft, Play, Heart, MessageCircle, Share2, Users, Eye, Volume2, VolumeX, Maximize, Calendar, Clock, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LiveStreaming({ onNavigate }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [viewerCount, setViewerCount] = useState(2847);

  const liveEvents = [
    {
      id: 1,
      title: "Morning Aarti - Lalbaugcha Raja",
      temple: "Mumbai Ganesh Temple",
      viewers: 2847,
      isLive: true,
      thumbnail: "https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      startTime: "6:00 AM",
      category: "Hindu"
    },
    {
      id: 2,
      title: "Evening Gurbani - Golden Temple",
      temple: "Harmandir Sahib",
      viewers: 1923,
      isLive: true,
      thumbnail: "https://images.unsplash.com/photo-1655884569109-4e05f4fd22be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndXJ1ZHdhcmElMjBzaWtoJTIwdGVtcGxlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      startTime: "7:00 PM",
      category: "Sikh"
    },
    {
      id: 3,
      title: "Maghrib Prayer - Blue Mosque",
      temple: "Sultan Ahmed Mosque",
      viewers: 1456,
      isLive: true,
      thumbnail: "https://images.unsplash.com/photo-1626303298621-984f671f8a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBpc2xhbWljJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc1OTA5MzQ3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      startTime: "6:30 PM",
      category: "Islamic"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Diwali Maha Aarti",
      temple: "Siddhivinayak Temple",
      scheduledTime: "Tomorrow 7:00 PM",
      expectedViewers: "10k+",
      category: "Hindu"
    },
    {
      id: 2,
      title: "Christmas Midnight Mass",
      temple: "St. Cathedral",
      scheduledTime: "Dec 25, 12:00 AM",
      expectedViewers: "5k+",
      category: "Christian"
    },
    {
      id: 3,
      title: "Friday Congregational Prayer",
      temple: "Central Mosque",
      scheduledTime: "Friday 1:00 PM",
      expectedViewers: "3k+",
      category: "Islamic"
    }
  ];

  const chatMessages = [
    {
      id: 1,
      user: "DevoteeRam",
      avatar: "DR",
      message: "Om Gam Ganapataye Namaha 🙏",
      time: "now",
      isSupporter: true
    },
    {
      id: 2,
      user: "SpiritualSeeker",
      avatar: "SS",
      message: "Beautiful aarti! Feeling blessed 🕉️",
      time: "1m",
      isSupporter: false
    },
    {
      id: 3,
      user: "PrayerfulHeart",
      avatar: "PH",
      message: "Thank you for sharing this divine experience",
      time: "2m",
      isSupporter: true
    },
    {
      id: 4,
      user: "MumbaiDevotee",
      avatar: "MD",
      message: "Ganpati Bappa Morya! 🚩",
      time: "3m",
      isSupporter: false
    },
    {
      id: 5,
      user: "PeacefulMind",
      avatar: "PM",
      message: "The chanting is so peaceful and calming",
      time: "4m",
      isSupporter: true
    }
  ];

  const sendMessage = () => {
    if (chatMessage.trim()) {
      // In a real app, this would send to server
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={() => onNavigate('landing')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-4">
              <Badge className="bg-red-500 hover:bg-red-600">
                <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                LIVE
              </Badge>
              <span className="text-sm text-gray-600">Sacred Live Streaming</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-3">
            {/* Video Container */}
            <Card className="mb-6 overflow-hidden">
              <div className="relative aspect-video bg-black">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Live Stream"
                  className="w-full h-full object-cover"
                />
                
                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                  {/* Live Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 hover:bg-red-600">
                      <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                      LIVE
                    </Badge>
                  </div>

                  {/* Viewer Count */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-black/60 backdrop-blur-md rounded-lg px-3 py-1 text-white text-sm flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {viewerCount.toLocaleString()} watching
                    </div>
                  </div>

                  {/* Video Controls */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                          onClick={() => setIsMuted(!isMuted)}
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </Button>
                        
                        <div className="text-white">
                          <h3 className="font-semibold">Morning Aarti - Lalbaugcha Raja</h3>
                          <p className="text-sm text-gray-300">Mumbai Ganesh Temple</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                          onClick={() => setIsFullscreen(!isFullscreen)}
                        >
                          <Maximize className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stream Info */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Morning Aarti - Lalbaugcha Raja</h1>
                    <p className="text-gray-600 mb-4">
                      Join us for the divine morning aarti at Mumbai's most revered Ganesh temple. 
                      Experience the sacred rituals, chanting, and spiritual atmosphere from the comfort of your home.
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Daily at 6:00 AM</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>Started 45 minutes ago</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{viewerCount.toLocaleString()} viewers</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant={isLiked ? "default" : "outline"}
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      {isLiked ? 'Liked' : 'Like'}
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline">
                      <Bell className="w-4 h-4 mr-2" />
                      Subscribe
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Live Streams */}
            <Card>
              <CardHeader>
                <CardTitle>Other Live Streams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {liveEvents.slice(1).map((event) => (
                    <div key={event.id} className="relative cursor-pointer hover:opacity-80 transition-opacity">
                      <div className="relative">
                        <ImageWithFallback
                          src={event.thumbnail}
                          alt={event.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                          <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></div>
                          LIVE
                        </Badge>
                        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md rounded px-2 py-1 text-white text-xs flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {event.viewers}
                        </div>
                      </div>
                      <div className="mt-3">
                        <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                        <p className="text-xs text-gray-600 mb-1">{event.temple}</p>
                        <Badge variant="secondary" className="text-xs">{event.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Chat */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Live Chat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 h-64 overflow-y-auto mb-4">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="flex space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs">
                          {msg.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className={`font-semibold text-xs ${msg.isSupporter ? 'text-yellow-600' : 'text-gray-700'}`}>
                            {msg.user}
                          </span>
                          {msg.isSupporter && (
                            <Badge variant="secondary" className="text-xs px-1 py-0">
                              ⭐
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-sm text-gray-700 break-words">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={sendMessage}>
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Be respectful and maintain the sacred atmosphere
                </p>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Live Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{event.temple}</p>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          {event.scheduledTime}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-3 h-3 mr-1" />
                          {event.expectedViewers}
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs mt-2">{event.category}</Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Set Reminders
                </Button>
              </CardContent>
            </Card>

            {/* Prayer Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Send Prayer Request</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="Your name" />
                  <Input placeholder="Prayer request" />
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                    <Heart className="w-4 h-4 mr-2" />
                    Submit Prayer
                  </Button>
                  <p className="text-xs text-gray-500">
                    Your prayer will be included in the live ceremony
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Stream Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stream Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Peak Viewers:</span>
                    <span className="font-semibold">3,124</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Likes:</span>
                    <span className="font-semibold">1,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chat Messages:</span>
                    <span className="font-semibold">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prayer Requests:</span>
                    <span className="font-semibold">156</span>
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
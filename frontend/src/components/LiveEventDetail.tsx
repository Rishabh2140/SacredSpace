import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Heart,
  Share2,
  MessageCircle,
  Users,
  Eye,
  Gift,
  Settings,
  MoreVertical,
  Send,
  MapPin
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LiveEventDetail({ event, space }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [isLiked, setIsLiked] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(true);

  // Mock data - in real app would come from props or API
  const mockEvent = event || {
    id: id || 1,
    title: "Morning Aarti - Sri Krishna Temple",
    spaceName: "Sri Krishna Temple",
    spaceLocation: "Dwarka, Delhi",
    spaceId: 1,
    streamUrl: "https://example.com/stream",
    isLive: true,
    viewers: 2547,
    likes: 1234,
    startTime: "6:00 AM",
    duration: "45 min",
    description: "Join us for the divine morning aarti with traditional hymns and prayers. Experience the spiritual energy and seek blessings from Lord Krishna.",
    category: "Hindu",
    type: "live",
    image: "https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    host: {
      name: "Pandit Raghunath Sharma",
      avatar: "PS",
      title: "Head Priest",
      id: 1
    },
    chatMessages: [
      {
        id: 1,
        user: "Devotee123",
        message: "Hare Krishna! 🙏",
        time: "now",
        avatar: "D1"
      },
      {
        id: 2,
        user: "Spiritual_Soul",
        message: "Beautiful aarti today",
        time: "1m ago",
        avatar: "SS"
      },
      {
        id: 3,
        user: "Krishna_Bhakt",
        message: "Feeling blessed 🕉️",
        time: "2m ago",
        avatar: "KB"
      },
      {
        id: 4,
        user: "Divine_Seeker",
        message: "Thank you for sharing this divine experience",
        time: "3m ago",
        avatar: "DS"
      },
      {
        id: 5,
        user: "Peaceful_Mind",
        message: "Om Namah Shivaya",
        time: "4m ago",
        avatar: "PM"
      }
    ]
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, this would send the message to the server
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleSpaceClick = () => {
    navigate(`/space/${mockEvent.spaceId}`);
  };

  const handleDonation = () => {
    // Navigate to donation page or open donation modal
    console.log('Opening donation interface');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-md border-b border-gray-800 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 sm:h-16 sm:py-0 gap-3">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={handleBack} className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-500 hover:bg-red-600">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
                  LIVE
                </Badge>
                <div className="flex items-center text-white">
                  <Eye className="w-4 h-4 mr-1" />
                  <span>{mockEvent.viewers.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:bg-white/10"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                {mockEvent.likes}
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-4 h-[calc(100vh-128px)]">
        {/* Video Player */}
        <div className="lg:col-span-3 relative bg-black min-h-[60vh] lg:min-h-full">
          {/* Mock Video Player */}
          <div className="relative w-full h-full bg-gradient-to-br from-orange-900 via-yellow-800 to-red-900 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" />
            <div className="text-center text-white z-10 p-4">
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <Play className="w-8 h-8 sm:w-12 sm:h-12" />
              </div>
              <h3 className="text-lg sm:text-2xl font-bold mb-2">{mockEvent.title}</h3>
              <p className="text-base sm:text-lg text-yellow-200">{mockEvent.spaceName}</p>
              <p className="text-sm sm:text-base text-yellow-300">{mockEvent.spaceLocation}</p>
            </div>
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:bg-white/20"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </Button>
                    <div className="w-16 sm:w-20 hidden sm:block">
                      <Slider
                        value={isMuted ? [0] : volume}
                        onValueChange={setVolume}
                        max={100}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className="lg:col-span-1 bg-white flex flex-col max-h-[40vh] lg:max-h-full">
          {/* Event Info */}
          <div className="p-3 sm:p-4 border-b">
            <div className="flex items-center space-x-3 mb-3">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
                  {mockEvent.host.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{mockEvent.host.name}</p>
                <p className="text-sm text-gray-600 truncate">{mockEvent.host.title}</p>
              </div>
            </div>
            <div 
              className="flex items-center space-x-2 mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg -m-2"
              onClick={handleSpaceClick}
            >
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{mockEvent.spaceName}</p>
                <p className="text-xs text-gray-500 truncate">{mockEvent.spaceLocation}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3 line-clamp-2">{mockEvent.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Started at {mockEvent.startTime}</span>
              <span>{mockEvent.duration}</span>
            </div>
          </div>

          {/* Donation Button */}
          <div className="p-3 sm:p-4 border-b">
            <Button 
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              onClick={handleDonation}
            >
              <Gift className="w-4 h-4 mr-2" />
              Support with Donation
            </Button>
          </div>

          {/* Chat Header */}
          <div className="p-3 sm:p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold">Live Chat</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">{mockEvent.viewers.toLocaleString()}</span>
              <span className="sm:hidden">{(mockEvent.viewers / 1000).toFixed(1)}k</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 min-h-0">
            {mockEvent.chatMessages.map((message) => (
              <div key={message.id} className="flex items-start space-x-2">
                <Avatar className="w-6 h-6 flex-shrink-0">
                  <AvatarFallback className="bg-blue-500 text-white text-xs">
                    {message.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium truncate">{message.user}</span>
                    <span className="text-xs text-gray-500 flex-shrink-0">{message.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 break-words">{message.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 sm:p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Send a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 text-sm"
              />
              <Button size="sm" onClick={handleSendMessage}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Be respectful and follow community guidelines
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
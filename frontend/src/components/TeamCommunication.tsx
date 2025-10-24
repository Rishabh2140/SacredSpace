import { useState } from 'react';
import {
  MessageSquare,
  Send,
  Users,
  Plus,
  Search,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Hash,
  Lock,
  Volume2,
  Bell,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

export function TeamCommunication({ currentUser }) {
  const [selectedChannel, setSelectedChannel] = useState('general');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const mockChannels = [
    {
      id: 'general',
      name: 'General',
      type: 'public',
      unread: 3,
      lastMessage: 'Great work on the festival arrangements!',
      lastTime: '2:30 PM'
    },
    {
      id: 'events',
      name: 'Event Planning',
      type: 'public',
      unread: 1,
      lastMessage: 'New Year celebration schedule ready',
      lastTime: '1:45 PM'
    },
    {
      id: 'volunteers',
      name: 'Volunteers',
      type: 'private',
      unread: 0,
      lastMessage: 'Training session tomorrow at 10 AM',
      lastTime: '11:20 AM'
    },
    {
      id: 'admin',
      name: 'Admin Team',
      type: 'private',
      unread: 2,
      lastMessage: 'Budget approval needed',
      lastTime: 'Yesterday'
    }
  ];

  const mockMembers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Administrator',
      status: 'online',
      avatar: 'RK'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'Event Coordinator',
      status: 'online',
      avatar: 'PS'
    },
    {
      id: 3,
      name: 'Amit Singh',
      role: 'Volunteer Leader',
      status: 'away',
      avatar: 'AS'
    },
    {
      id: 4,
      name: 'Sunita Devi',
      role: 'Kitchen Manager',
      status: 'offline',
      avatar: 'SD'
    },
    {
      id: 5,
      name: 'Ravi Patel',
      role: 'Security Head',
      status: 'online',
      avatar: 'RP'
    }
  ];

  const mockMessages = [
    {
      id: 1,
      sender: 'Priya Sharma',
      avatar: 'PS',
      message: 'Good morning everyone! The New Year celebration preparations are going well.',
      time: '9:30 AM',
      type: 'text'
    },
    {
      id: 2,
      sender: 'Amit Singh',
      avatar: 'AS',
      message: 'I have 15 volunteers confirmed for the decorations team.',
      time: '9:35 AM',
      type: 'text'
    },
    {
      id: 3,
      sender: 'Sunita Devi',
      avatar: 'SD',
      message: 'The catering arrangements are finalized. Menu has been shared in the events channel.',
      time: '10:15 AM',
      type: 'text'
    },
    {
      id: 4,
      sender: 'Rajesh Kumar',
      avatar: 'RK',
      message: 'Excellent progress team! Let\'s have a quick meeting at 3 PM to finalize everything.',
      time: '10:45 AM',
      type: 'text'
    },
    {
      id: 5,
      sender: 'Ravi Patel',
      avatar: 'RP',
      message: 'Security arrangements are in place. All entry points will be monitored.',
      time: '11:20 AM',
      type: 'text'
    },
    {
      id: 6,
      sender: 'Priya Sharma',
      avatar: 'PS',
      message: 'Perfect! I\'ll send the final timeline to everyone shortly.',
      time: '2:30 PM',
      type: 'text'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message via API
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const selectedChannelData = mockChannels.find(c => c.id === selectedChannel);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <MessageSquare className="w-8 h-8 mr-3 text-orange-500" />
            Team Communication
          </h1>
          <p className="text-gray-600 mt-1">
            Collaborate with your team members and volunteers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar - Channels and Members */}
          <div className="lg:col-span-1 space-y-4">
            {/* Channels */}
            <Card className="h-fit">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-gray-700">CHANNELS</CardTitle>
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  {mockChannels.map((channel) => (
                    <div
                      key={channel.id}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                        selectedChannel === channel.id
                          ? 'bg-orange-100 text-orange-700'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedChannel(channel.id)}
                    >
                      <div className="flex items-center space-x-2">
                        {channel.type === 'public' ? (
                          <Hash className="w-4 h-4 text-gray-500" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-500" />
                        )}
                        <span className="text-sm font-medium">{channel.name}</span>
                      </div>
                      {channel.unread > 0 && (
                        <Badge variant="secondary" className="h-5 text-xs bg-red-500 text-white">
                          {channel.unread}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Online Members */}
            <Card className="flex-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-gray-700">
                  TEAM MEMBERS ({mockMembers.filter(m => m.status === 'online').length} online)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ScrollArea className="h-64">
                  <div className="space-y-2">
                    {mockMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <div className="relative">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-xs">
                              {member.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{member.name}</p>
                          <p className="text-xs text-gray-500 truncate">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {selectedChannelData?.type === 'public' ? (
                      <Hash className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-500" />
                    )}
                    <div>
                      <h3 className="font-semibold">{selectedChannelData?.name}</h3>
                      <p className="text-sm text-gray-500">
                        {mockMembers.filter(m => m.status === 'online').length} members online
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Search className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div key={message.id} className="flex items-start space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-xs">
                            {message.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-sm text-gray-900">{message.sender}</span>
                            <span className="text-xs text-gray-500">{message.time}</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>

              <Separator />

              {/* Message Input */}
              <div className="p-4">
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost" className="p-2">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`Message #${selectedChannelData?.name}`}
                      className="pr-20"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                      <Button size="sm" variant="ghost" className="p-1">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-1"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Video className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Start Video Call</p>
                  <p className="text-xs text-gray-500">Team meeting</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Create Channel</p>
                  <p className="text-xs text-gray-500">New discussion</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Bell className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Announcements</p>
                  <p className="text-xs text-gray-500">Important updates</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Settings</p>
                  <p className="text-xs text-gray-500">Notifications</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
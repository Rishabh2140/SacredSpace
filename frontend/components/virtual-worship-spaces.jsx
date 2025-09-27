"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Heart,
  Users,
  Calendar,
  Clock,
  Video,
  Mic,
  MicOff,
  VideoOff,
  MessageCircle,
  Settings,
  Share,
  Cable as Candle,
  Cross,
  Globe,
  ArrowLeft,
  Bell,
} from "lucide-react";

export function VirtualWorshipSpaces() {
  const [activeSpace, setActiveSpace] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(true);

  const liveServices = [
    {
      id: "1",
      title: "Sunday Morning Service",
      faith: "Christianity",
      pastor: "Rev. Michael Thompson",
      participants: 234,
      startTime: "10:00 AM EST",
      status: "live",
      description: "Join us for our weekly Sunday service with worship, prayer, and biblical teaching.",
      duration: "1h 30m",
      language: "English",
    },
    {
      id: "2",
      title: "Evening Prayer Circle",
      faith: "Multi-Faith",
      leader: "Sister Maria Santos",
      participants: 67,
      startTime: "7:00 PM EST",
      status: "live",
      description: "A peaceful evening of prayer and meditation open to all faiths.",
      duration: "45m",
      language: "English/Spanish",
    },
    {
      id: "3",
      title: "Quran Study Session",
      faith: "Islam",
      imam: "Imam Abdullah Hassan",
      participants: 89,
      startTime: "6:30 PM EST",
      status: "starting-soon",
      description: "Weekly Quran study and discussion session.",
      duration: "1h",
      language: "Arabic/English",
    },
  ];

  const upcomingServices = [
    {
      id: "4",
      title: "Wednesday Bible Study",
      faith: "Christianity",
      leader: "Pastor Sarah Johnson",
      scheduledTime: "Tomorrow 7:00 PM",
      expectedParticipants: 45,
      description: "Deep dive into the Book of Romans",
    },
    {
      id: "5",
      title: "Friday Jummah Prayer",
      faith: "Islam",
      imam: "Imam Omar Al-Rashid",
      scheduledTime: "Friday 1:00 PM",
      expectedParticipants: 156,
      description: "Weekly congregational prayer service",
    },
    {
      id: "6",
      title: "Shabbat Service",
      faith: "Judaism",
      rabbi: "Rabbi David Cohen",
      scheduledTime: "Friday 6:00 PM",
      expectedParticipants: 78,
      description: "Traditional Shabbat evening service",
    },
  ];

  const prayerRooms = [
    {
      id: "prayer-1",
      name: "Quiet Reflection",
      type: "Silent Prayer",
      participants: 12,
      capacity: 50,
      atmosphere: "Peaceful",
      description: "A space for silent prayer and personal reflection",
    },
    {
      id: "prayer-2",
      name: "Guided Meditation",
      type: "Meditation",
      participants: 28,
      capacity: 100,
      atmosphere: "Meditative",
      description: "Guided meditation sessions for spiritual growth",
    },
    {
      id: "prayer-3",
      name: "Prayer Requests",
      type: "Community Prayer",
      participants: 34,
      capacity: 75,
      atmosphere: "Supportive",
      description: "Share prayer requests and pray together as a community",
    },
  ];

  const joinService = (serviceId) => {
    setActiveSpace(serviceId);
    setIsJoined(true);
  };

  const leaveService = () => {
    setActiveSpace(null);
    setIsJoined(false);
    setIsMuted(true);
    setIsVideoOff(true);
  };

  if (isJoined && activeSpace) {
    const service = liveServices.find((s) => s.id === activeSpace);
    if (!service) return null;

    return (
      <div className="min-h-screen bg-background">
        {/* Live Service Interface */}
        <div className="relative h-screen flex flex-col">
          {/* Video Area */}
          <div className="flex-1 bg-black relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white space-y-4">
                <div className="w-24 h-24 rounded-full bg-spiritual-sage/20 flex items-center justify-center mx-auto mb-4">
                  <Video className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-semibold">{service.title}</h2>
                <p className="text-white/80">Led by {service.pastor || service.leader || service.imam}</p>
                <Badge className="bg-red-500 text-white">LIVE</Badge>
              </div>
            </div>

            {/* Top Controls */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <Button
                variant="secondary"
                size="sm"
                onClick={leaveService}
                className="bg-black/50 text-white border-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Leave Service
              </Button>
              <div className="flex items-center space-x-2 bg-black/50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white text-sm">{service.participants} watching</span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center space-x-4 bg-black/70 px-6 py-3 rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`text-white hover:bg-white/20 ${isMuted ? "bg-red-500/20" : ""}`}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`text-white hover:bg-white/20 ${isVideoOff ? "bg-red-500/20" : ""}`}
                >
                  {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <MessageCircle className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Share className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Share your thoughts and prayers</p>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">John Doe</p>
                    <p className="text-sm">Blessed to be here with everyone 🙏</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">MS</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Mary Smith</p>
                    <p className="text-sm">Please pray for my family's health</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">RJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Robert Johnson</p>
                    <p className="text-sm">Amen! Beautiful message today</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="icon">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full spiritual-gradient flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-serif font-semibold">Virtual Worship Spaces</h1>
                <p className="text-sm text-muted-foreground">Join live services and prayer sessions</p>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Create Service</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Service</DialogTitle>
                  <DialogDescription>Set up a new worship service or prayer session</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="service-title">Service Title</Label>
                    <Input id="service-title" placeholder="Enter service title" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-faith">Faith Tradition</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select faith tradition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="christianity">Christianity</SelectItem>
                        <SelectItem value="islam">Islam</SelectItem>
                        <SelectItem value="judaism">Judaism</SelectItem>
                        <SelectItem value="hinduism">Hinduism</SelectItem>
                        <SelectItem value="buddhism">Buddhism</SelectItem>
                        <SelectItem value="multi-faith">Multi-Faith</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service-description">Description</Label>
                    <Textarea id="service-description" placeholder="Describe your service" />
                  </div>
                  <Button className="w-full">Create Service</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="live" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="live">Live Services</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="prayer-rooms">Prayer Rooms</TabsTrigger>
          </TabsList>

          {/* Live Services */}
          <TabsContent value="live" className="space-y-6">
            <div className="grid gap-6">
              {liveServices.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="flex">
                    <div className="w-48 h-32 bg-gradient-to-br from-spiritual-sage/20 to-spiritual-rose/20 flex items-center justify-center">
                      <div className="text-center">
                        <Cross className="w-8 h-8 text-spiritual-sage mx-auto mb-2" />
                        <Badge className={`${service.status === "live" ? "bg-red-500" : "bg-orange-500"} text-white`}>
                          {service.status === "live" ? "LIVE" : "STARTING SOON"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-semibold">{service.title}</h3>
                            <Badge variant="outline">{service.faith}</Badge>
                          </div>
                          <p className="text-muted-foreground">{service.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{service.participants} participants</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{service.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Globe className="w-4 h-4" />
                              <span>{service.language}</span>
                            </div>
                          </div>
                          <p className="text-sm">
                            Led by <span className="font-medium">{service.pastor || service.leader || service.imam}</span>
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-sm font-medium">{service.startTime}</p>
                          <Button onClick={() => joinService(service.id)} className="spiritual-gradient border-0">
                            <Video className="w-4 h-4 mr-2" />
                            Join Service
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Upcoming Services */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid gap-6">
              {upcomingServices.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">{service.title}</h3>
                          <Badge variant="outline">{service.faith}</Badge>
                        </div>
                        <p className="text-muted-foreground">{service.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{service.scheduledTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{service.expectedParticipants} expected</span>
                          </div>
                        </div>
                        <p className="text-sm">
                          Led by <span className="font-medium">{service.leader || service.imam || service.rabbi}</span>
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <Button variant="outline">
                          <Bell className="w-4 h-4 mr-2" />
                          Remind Me
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prayer Rooms */}
          <TabsContent value="prayer-rooms" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prayerRooms.map((room) => (
                <Card key={room.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full bg-spiritual-gold/20 flex items-center justify-center mx-auto mb-4">
                      <Candle className="w-8 h-8 text-spiritual-gold" />
                    </div>
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <CardDescription>{room.type}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground text-center">{room.description}</p>
                    <div className="flex justify-between text-sm">
                      <span>Participants</span>
                      <span>{room.participants}/{room.capacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Atmosphere</span>
                      <Badge variant="secondary">{room.atmosphere}</Badge>
                    </div>
                    <Button className="w-full spiritual-gradient border-0">
                      <Heart className="w-4 h-4 mr-2" />
                      Join Prayer Room
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

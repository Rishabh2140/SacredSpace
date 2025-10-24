import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  DollarSign,
  BarChart3,
  MessageSquare,
  Settings,
  Plus,
  Camera,
  Box,
  Edit,
  Eye,
  Star,
  MapPin,
  Clock,
  Crown,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';

export function AdministratorDashboard({ currentUser }) {
  const [selectedTab, setSelectedTab] = useState('overview');
    const navigate = useNavigate();

  const getSpaceType = () => {
    if (!currentUser?.type) return 'Sacred Space';
    return currentUser.type.replace('-admin', '').charAt(0).toUpperCase() + 
           currentUser.type.replace('-admin', '').slice(1);
  };

  const mockStats = {
    totalVisitors: 1250,
    monthlyEvents: 8,
    activeVolunteers: 24,
    monthlyDonations: 45000,
    avgRating: 4.8,
    totalReviews: 156
  };

  const mockEvents = [
    {
      id: 1,
      title: 'Morning Prayer Service',
      date: '2024-12-30',
      time: '06:00 AM',
      attendees: 45,
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Community Feast',
      date: '2024-12-31',
      time: '12:00 PM',
      attendees: 120,
      status: 'confirmed'
    },
    {
      id: 3,
      title: 'New Year Blessing',
      date: '2025-01-01',
      time: '11:00 PM',
      attendees: 200,
      status: 'scheduled'
    }
  ];

  const mockVolunteers = [
    { id: 1, name: 'Rajesh Kumar', role: 'Event Coordinator', status: 'active' },
    { id: 2, name: 'Priya Sharma', role: 'Guest Relations', status: 'active' },
    { id: 3, name: 'Amit Singh', role: 'Security', status: 'inactive' },
    { id: 4, name: 'Sunita Devi', role: 'Kitchen Help', status: 'active' }
  ];

  const mockRecentDonations = [
    { id: 1, donor: 'Anonymous', amount: 5000, date: '2024-12-29', type: 'general' },
    { id: 2, donor: 'Ramesh Family', amount: 2000, date: '2024-12-28', type: 'events' },
    { id: 3, donor: 'Local Business', amount: 10000, date: '2024-12-27', type: 'maintenance' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Crown className="w-8 h-8 mr-3 text-orange-500" />
                {getSpaceType()} Administrator Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {currentUser?.name}! Manage your sacred space.
              </p>
            </div>
            <div className="flex space-x-3">
              <Link to="/manage-space">
                <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Space
                </Button>
              </Link>
              <Link to="/create-event">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Event
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-blue-600">Total Visitors</p>
                    <p className="text-2xl font-bold text-blue-900">{mockStats.totalVisitors}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500 rounded-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-green-600">Monthly Events</p>
                    <p className="text-2xl font-bold text-green-900">{mockStats.monthlyEvents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-500 rounded-lg">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-600">Monthly Donations</p>
                    <p className="text-2xl font-bold text-purple-900">₹{mockStats.monthlyDonations.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-500 rounded-lg">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-yellow-600">Average Rating</p>
                    <p className="text-2xl font-bold text-yellow-900">{mockStats.avgRating}/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="management">Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Events */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Upcoming Events</CardTitle>
                  <Link to="/create-event">
                    <Button size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {event.attendees} expected
                          </p>
                        </div>
                        <Badge variant={event.status === 'confirmed' ? 'default' : 'secondary'}>
                          {event.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Volunteers */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Active Volunteers</CardTitle>
                  <Link to="/manage-volunteers">
                    <Button size="sm" variant="outline">
                      <Users className="w-4 h-4 mr-2" />
                      Manage
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockVolunteers.filter(v => v.status === 'active').map((volunteer) => (
                      <div key={volunteer.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{volunteer.name}</p>
                          <p className="text-sm text-gray-600">{volunteer.role}</p>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Active
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Donations */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Donations</CardTitle>
                <Link to="/donations">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRecentDonations.map((donation) => (
                    <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{donation.donor}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(donation.date).toLocaleDateString()} • {donation.type}
                        </p>
                      </div>
                      <p className="font-bold text-green-600">₹{donation.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Event Management</CardTitle>
                <Link to="/create-event">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Event
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{event.title}</h3>
                          <p className="text-gray-600 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {event.attendees} expected attendees
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={event.status === 'confirmed' ? 'default' : 'secondary'}>
                            {event.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="volunteers">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Volunteer Management</CardTitle>
                <Link to="/manage-volunteers">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Volunteer
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockVolunteers.map((volunteer) => (
                    <div key={volunteer.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{volunteer.name}</h3>
                          <p className="text-gray-600">{volunteer.role}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={volunteer.status === 'active' ? 'default' : 'secondary'}>
                            {volunteer.status}
                          </Badge>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Donation Management</CardTitle>
                <Link to="/donations">
                  <Button>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Reports
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentDonations.map((donation) => (
                    <div key={donation.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{donation.donor}</h3>
                          <p className="text-gray-600">
                            {new Date(donation.date).toLocaleDateString()} • {donation.type}
                          </p>
                        </div>
                        <p className="font-bold text-green-600 text-lg">
                          ₹{donation.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link to="/manage-space">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Settings className="w-8 h-8 text-orange-500 mb-3" />
                        <h3 className="font-semibold text-lg">Manage Space</h3>
                        <p className="text-gray-600 text-sm">Update details, images, and 3D views</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/team-communication">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <MessageSquare className="w-8 h-8 text-blue-500 mb-3" />
                        <h3 className="font-semibold text-lg">Team Chat</h3>
                        <p className="text-gray-600 text-sm">Communicate with volunteers and staff</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Camera className="w-8 h-8 text-purple-500 mb-3" />
                      <h3 className="font-semibold text-lg">Media Gallery</h3>
                      <p className="text-gray-600 text-sm">Manage photos and videos</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Box className="w-8 h-8 text-green-500 mb-3" />
                      <h3 className="font-semibold text-lg">3D Views</h3>
                      <p className="text-gray-600 text-sm">Upload and manage 3D tours</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <BarChart3 className="w-8 h-8 text-red-500 mb-3" />
                      <h3 className="font-semibold text-lg">Analytics</h3>
                      <p className="text-gray-600 text-sm">View visitor and engagement stats</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <MapPin className="w-8 h-8 text-indigo-500 mb-3" />
                      <h3 className="font-semibold text-lg">Location</h3>
                      <p className="text-gray-600 text-sm">Update address and directions</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
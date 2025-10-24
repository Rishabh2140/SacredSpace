import { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  UserPlus,
  Edit,
  Trash2,
  Star,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export function ManageVolunteers({ currentUser }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newVolunteer, setNewVolunteer] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
    experience: ''
  });

  const mockVolunteers = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 9876543210',
      role: 'Event Coordinator',
      skills: ['Organization', 'Leadership', 'Communication'],
      status: 'active',
      joinDate: '2024-01-15',
      hoursContributed: 120,
      eventsParticipated: 8,
      rating: 4.8,
      avatar: 'RK',
      availability: 'Weekends'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 9876543211',
      role: 'Guest Relations',
      skills: ['Customer Service', 'Languages', 'Hospitality'],
      status: 'active',
      joinDate: '2024-02-10',
      hoursContributed: 85,
      eventsParticipated: 6,
      rating: 4.9,
      avatar: 'PS',
      availability: 'Evenings'
    },
    {
      id: 3,
      name: 'Amit Singh',
      email: 'amit@example.com',
      phone: '+91 9876543212',
      role: 'Security',
      skills: ['Security', 'Crowd Management', 'First Aid'],
      status: 'inactive',
      joinDate: '2024-03-05',
      hoursContributed: 45,
      eventsParticipated: 3,
      rating: 4.5,
      avatar: 'AS',
      availability: 'Flexible'
    },
    {
      id: 4,
      name: 'Sunita Devi',
      email: 'sunita@example.com',
      phone: '+91 9876543213',
      role: 'Kitchen Help',
      skills: ['Cooking', 'Food Service', 'Hygiene'],
      status: 'active',
      joinDate: '2024-01-20',
      hoursContributed: 95,
      eventsParticipated: 7,
      rating: 4.7,
      avatar: 'SD',
      availability: 'Mornings'
    },
    {
      id: 5,
      name: 'Ravi Patel',
      email: 'ravi@example.com',
      phone: '+91 9876543214',
      role: 'Technical Support',
      skills: ['Audio/Visual', 'IT Support', 'Equipment'],
      status: 'pending',
      joinDate: '2024-12-20',
      hoursContributed: 0,
      eventsParticipated: 0,
      rating: null,
      avatar: 'RP',
      availability: 'Weekends'
    }
  ];

  const volunteerRoles = [
    'Event Coordinator',
    'Guest Relations',
    'Security',
    'Kitchen Help',
    'Technical Support',
    'Decoration Team',
    'Registration Desk',
    'Cleaning Team',
    'Photography',
    'Social Media'
  ];

  const filteredVolunteers = mockVolunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         volunteer.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || volunteer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddVolunteer = () => {
    // In a real app, this would add to API
    console.log('Adding volunteer:', newVolunteer);
    setIsAddDialogOpen(false);
    setNewVolunteer({
      name: '',
      email: '',
      phone: '',
      skills: '',
      availability: '',
      experience: ''
    });
    alert('Volunteer added successfully!');
  };

  const stats = {
    total: mockVolunteers.length,
    active: mockVolunteers.filter(v => v.status === 'active').length,
    pending: mockVolunteers.filter(v => v.status === 'pending').length,
    totalHours: mockVolunteers.reduce((sum, v) => sum + v.hoursContributed, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Users className="w-8 h-8 mr-3 text-orange-500" />
                Manage Volunteers
              </h1>
              <p className="text-gray-600 mt-1">
                Coordinate and manage your volunteer team
              </p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Volunteer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Volunteer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={newVolunteer.name}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, name: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={newVolunteer.phone}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, phone: e.target.value })}
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newVolunteer.email}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, email: e.target.value })}
                      placeholder="volunteer@example.com"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="skills">Skills/Expertise</Label>
                      <Input
                        id="skills"
                        value={newVolunteer.skills}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, skills: e.target.value })}
                        placeholder="e.g., Event Planning, First Aid"
                      />
                    </div>
                    <div>
                      <Label htmlFor="availability">Availability</Label>
                      <Input
                        id="availability"
                        value={newVolunteer.availability}
                        onChange={(e) => setNewVolunteer({ ...newVolunteer, availability: e.target.value })}
                        placeholder="e.g., Weekends, Evenings"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="experience">Previous Experience</Label>
                    <Textarea
                      id="experience"
                      value={newVolunteer.experience}
                      onChange={(e) => setNewVolunteer({ ...newVolunteer, experience: e.target.value })}
                      placeholder="Previous volunteer experience..."
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddVolunteer}>
                      Add Volunteer
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-blue-600">Total Volunteers</p>
                    <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-green-600">Active</p>
                    <p className="text-2xl font-bold text-green-900">{stats.active}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-500 rounded-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-yellow-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-500 rounded-lg">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-600">Total Hours</p>
                    <p className="text-2xl font-bold text-purple-900">{stats.totalHours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search volunteers by name or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Volunteers List */}
        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {filteredVolunteers.map((volunteer) => (
                    <div key={volunteer.id} className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
                              {volunteer.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-gray-900">{volunteer.name}</h3>
                            <p className="text-sm text-gray-600">{volunteer.role}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-xs text-gray-500 flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {volunteer.phone}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center">
                                <Mail className="w-3 h-3 mr-1" />
                                {volunteer.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-sm font-medium">{volunteer.hoursContributed}</p>
                            <p className="text-xs text-gray-500">Hours</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-medium">{volunteer.eventsParticipated}</p>
                            <p className="text-xs text-gray-500">Events</p>
                          </div>
                          {volunteer.rating && (
                            <div className="text-center">
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-500 mr-1" />
                                <span className="text-sm font-medium">{volunteer.rating}</span>
                              </div>
                              <p className="text-xs text-gray-500">Rating</p>
                            </div>
                          )}
                          <Badge className={getStatusColor(volunteer.status)}>
                            {volunteer.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {volunteer.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Message
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVolunteers.map((volunteer) => (
                <Card key={volunteer.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <Avatar className="w-16 h-16 mx-auto mb-3">
                        <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
                          {volunteer.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-gray-900">{volunteer.name}</h3>
                      <p className="text-sm text-gray-600">{volunteer.role}</p>
                      <Badge className={`${getStatusColor(volunteer.status)} mt-2`}>
                        {volunteer.status}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{volunteer.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="truncate">{volunteer.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{volunteer.availability}</span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-lg font-semibold text-blue-600">{volunteer.hoursContributed}</p>
                        <p className="text-xs text-gray-500">Hours</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-green-600">{volunteer.eventsParticipated}</p>
                        <p className="text-xs text-gray-500">Events</p>
                      </div>
                    </div>

                    {volunteer.rating && (
                      <div className="mt-3 flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{volunteer.rating}</span>
                      </div>
                    )}

                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Message
                      </Button>
                    </div>
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
import { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Users,
  Download,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Eye,
  Gift,
  CreditCard,
  Banknote
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';

export function ViewDonations({ currentUser }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const mockDonations = [
    {
      id: 1,
      donor: 'Rajesh Kumar',
      amount: 25000,
      type: 'general',
      method: 'online',
      date: '2024-12-29',
      purpose: 'Temple Maintenance',
      status: 'completed',
      receipt: 'RCP001',
      anonymous: false
    },
    {
      id: 2,
      donor: 'Anonymous',
      amount: 10000,
      type: 'events',
      method: 'cash',
      date: '2024-12-28',
      purpose: 'Festival Celebration',
      status: 'completed',
      receipt: 'RCP002',
      anonymous: true
    },
    {
      id: 3,
      donor: 'Priya Sharma Family',
      amount: 50000,
      type: 'construction',
      method: 'bank_transfer',
      date: '2024-12-27',
      purpose: 'New Hall Construction',
      status: 'completed',
      receipt: 'RCP003',
      anonymous: false
    },
    {
      id: 4,
      donor: 'Local Business Group',
      amount: 75000,
      type: 'general',
      method: 'cheque',
      date: '2024-12-26',
      purpose: 'Community Kitchen',
      status: 'completed',
      receipt: 'RCP004',
      anonymous: false
    },
    {
      id: 5,
      donor: 'Anonymous',
      amount: 5000,
      type: 'events',
      method: 'online',
      date: '2024-12-25',
      purpose: 'New Year Celebration',
      status: 'pending',
      receipt: 'RCP005',
      anonymous: true
    },
    {
      id: 6,
      donor: 'Sunita Devi',
      amount: 15000,
      type: 'charity',
      method: 'online',
      date: '2024-12-24',
      purpose: 'Food Distribution',
      status: 'completed',
      receipt: 'RCP006',
      anonymous: false
    }
  ];

  const donationCategories = [
    { id: 'general', name: 'General Fund', color: 'blue' },
    { id: 'events', name: 'Events & Festivals', color: 'green' },
    { id: 'construction', name: 'Construction', color: 'purple' },
    { id: 'charity', name: 'Charity Work', color: 'orange' },
    { id: 'maintenance', name: 'Maintenance', color: 'red' }
  ];

  const filteredDonations = mockDonations.filter(donation => {
    const matchesSearch = donation.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donation.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || donation.type === filterType;
    
    let matchesPeriod = true;
    if (filterPeriod !== 'all') {
      const donationDate = new Date(donation.date);
      const now = new Date();
      const diffTime = now.getTime() - donationDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (filterPeriod) {
        case 'week':
          matchesPeriod = diffDays <= 7;
          break;
        case 'month':
          matchesPeriod = diffDays <= 30;
          break;
        case 'year':
          matchesPeriod = diffDays <= 365;
          break;
      }
    }
    
    return matchesSearch && matchesType && matchesPeriod;
  });

  const stats = {
    total: mockDonations.reduce((sum, d) => sum + d.amount, 0),
    thisMonth: mockDonations.filter(d => {
      const donationDate = new Date(d.date);
      const now = new Date();
      return donationDate.getMonth() === now.getMonth() && donationDate.getFullYear() === now.getFullYear();
    }).reduce((sum, d) => sum + d.amount, 0),
    totalDonors: new Set(mockDonations.map(d => d.donor)).size,
    avgDonation: Math.round(mockDonations.reduce((sum, d) => sum + d.amount, 0) / mockDonations.length)
  };

  const categoryStats = donationCategories.map(category => {
    const categoryDonations = mockDonations.filter(d => d.type === category.id);
    const amount = categoryDonations.reduce((sum, d) => sum + d.amount, 0);
    const percentage = stats.total > 0 ? Math.round((amount / stats.total) * 100) : 0;
    return { ...category, amount, percentage, count: categoryDonations.length };
  });

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'online': return <CreditCard className="w-4 h-4" />;
      case 'cash': return <Banknote className="w-4 h-4" />;
      case 'bank_transfer': return <BarChart3 className="w-4 h-4" />;
      case 'cheque': return <Gift className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    const cat = donationCategories.find(c => c.id === category);
    return cat ? cat.color : 'gray';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <DollarSign className="w-8 h-8 mr-3 text-orange-500" />
                Donation Management
              </h1>
              <p className="text-gray-600 mt-1">
                Track and manage donations to your sacred space
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-blue-600">Total Donations</p>
                    <p className="text-2xl font-bold text-blue-900">₹{stats.total.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-green-600">This Month</p>
                    <p className="text-2xl font-bold text-green-900">₹{stats.thisMonth.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-500 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-purple-600">Total Donors</p>
                    <p className="text-2xl font-bold text-purple-900">{stats.totalDonors}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-500 rounded-lg">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-yellow-600">Avg. Donation</p>
                    <p className="text-2xl font-bold text-yellow-900">₹{stats.avgDonation.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Donation List</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by donor name or purpose..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Time period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {donationCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donations List */}
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {filteredDonations.map((donation) => (
                    <div key={donation.id} className="border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-lg bg-${getCategoryColor(donation.type)}-100`}>
                            {getPaymentMethodIcon(donation.method)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{donation.donor}</h3>
                            <p className="text-sm text-gray-600">{donation.purpose}</p>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className="text-xs text-gray-500 flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(donation.date).toLocaleDateString()}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {donationCategories.find(c => c.id === donation.type)?.name}
                              </Badge>
                              <Badge className={`${getStatusColor(donation.status)} text-xs`}>
                                {donation.status}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xl font-bold text-green-600">₹{donation.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Receipt: {donation.receipt}</p>
                          <Button size="sm" variant="outline" className="mt-2">
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Donation Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Chart visualization would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Donation Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['online', 'cash', 'bank_transfer', 'cheque'].map((method) => {
                      const methodDonations = mockDonations.filter(d => d.method === method);
                      const amount = methodDonations.reduce((sum, d) => sum + d.amount, 0);
                      const percentage = stats.total > 0 ? Math.round((amount / stats.total) * 100) : 0;
                      
                      return (
                        <div key={method}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="capitalize font-medium">{method.replace('_', ' ')}</span>
                            <span className="font-semibold">₹{amount.toLocaleString()} ({percentage}%)</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Donors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(
                      mockDonations.reduce((acc, donation) => {
                        if (!donation.anonymous) {
                          acc[donation.donor] = (acc[donation.donor] || 0) + donation.amount;
                        }
                        return acc;
                      }, {})
                    )
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([donor, amount]) => (
                        <div key={donor} className="flex justify-between items-center">
                          <span className="font-medium">{donor}</span>
                          <span className="font-semibold text-green-600">₹{amount.toLocaleString()}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockDonations.slice(0, 5).map((donation) => (
                      <div key={donation.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{donation.donor}</p>
                          <p className="text-xs text-gray-500">{donation.purpose}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">₹{donation.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{new Date(donation.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryStats.map((category) => (
                <Card key={category.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                      <DollarSign className={`w-6 h-6 text-${category.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-1">₹{category.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 mb-3">{category.count} donations • {category.percentage}% of total</p>
                    <Progress value={category.percentage} className="h-2" />
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
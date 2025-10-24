import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Heart, ArrowRight, User, Briefcase, Users, Book, Crown, Church, Star, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Signup({ onLogin }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('common');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    bio: '',
    specialization: '',
    experience: '',
    spaceType: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Mock registration - in real app, this would call an API
    const mockUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      type: userType === 'administrator' ? formData.spaceType || 'temple' : userType,
      avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      verified: false,
      location: formData.location,
      bio: formData.bio,
      spaceType: userType === 'administrator' ? formData.spaceType : null
    };
    
    onLogin(mockUser);
    navigate('/dashboard');
  };

  const userTypeIcons = {
    common: User,
    murtikar: Briefcase,
    pujari: Book,
    'virtual-temple': Crown,
    'temple': Crown,
    'church': Church,
    'mosque': Star,
    'gurudwara': Home,
    'buddhist-center': Star
  };

  const userTypeDescriptions = {
    common: 'Explore temples, join communities, book services',
    murtikar: 'Showcase your art, manage commissions, connect with clients',
    pujari: 'Offer spiritual services, conduct rituals, guide devotees',
    administrator: 'Manage sacred space operations, events, and community activities'
  };

  const spaceTypeOptions = [
    { value: 'virtual-temple', label: 'Virtual Temple/Pandal', icon: '🏛️' },
    { value: 'temple', label: 'Temple', icon: '🛕' },
    { value: 'church', label: 'Church', icon: '⛪' },
    { value: 'mosque', label: 'Mosque', icon: '🕌' },
    { value: 'gurudwara', label: 'Gurudwara', icon: '🏛️' },
    { value: 'buddhist-center', label: 'Buddhist Center', icon: '🏯' }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1686035002309-cc6370a987e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW5kdSUyMHRlbXBsZSUyMHNwaXJpdHVhbHxlbnwxfHx8fDE3NTkwNDA3ODF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Sacred Space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Join SacredSpace</h1>
            <p className="text-xl text-blue-100 mb-6">
              Become part of a global spiritual community
            </p>
            <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto">
              <div className="flex items-center text-blue-100">
                <User className="w-5 h-5 mr-2" />
                <span className="text-sm">Devotees</span>
              </div>
              <div className="flex items-center text-blue-100">
                <Briefcase className="w-5 h-5 mr-2" />
                <span className="text-sm">Artists</span>
              </div>
              <div className="flex items-center text-blue-100">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-sm">Organizers</span>
              </div>
              <div className="flex items-center text-blue-100">
                <Book className="w-5 h-5 mr-2" />
                <span className="text-sm">Guides</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SacredSpace
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join our spiritual community</p>
          </div>

          <Card>
            <CardContent className="p-6">
              {/* User Type Selection */}
              <div className="mb-6">
                <Label className="text-base font-semibold mb-4 block">Choose Account Type</Label>
                <Tabs value={userType} onValueChange={setUserType}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="common" className="text-xs">Devotee</TabsTrigger>
                    <TabsTrigger value="murtikar" className="text-xs">Artist</TabsTrigger>
                    <TabsTrigger value="pujari" className="text-xs">Guide</TabsTrigger>
                    <TabsTrigger value="administrator" className="text-xs">Administrator</TabsTrigger>
                  </TabsList>
                </Tabs>

                {/* Space Type Selection for Administrator */}
                {userType === 'administrator' && (
                  <div className="mt-4">
                    <Label htmlFor="spaceType">Sacred Space Type *</Label>
                    <Select value={formData.spaceType} onValueChange={(value) => setFormData({ ...formData, spaceType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your sacred space type" />
                      </SelectTrigger>
                      <SelectContent>
                        {spaceTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center">
                              <span className="mr-2">{option.icon}</span>
                              {option.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    {(() => {
                      const Icon = userTypeIcons[userType] || Crown;
                      return <Icon className="w-4 h-4 mr-2 text-gray-600" />;
                    })()}
                    <span className="font-medium text-gray-800 capitalize">
                      {userType === 'common' ? 'Devotee' : 
                       userType === 'murtikar' ? 'Artist' :
                       userType === 'pujari' ? 'Spiritual Guide' :
                       userType === 'administrator' ? 'Sacred Space Administrator' :
                       userType}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{userTypeDescriptions[userType]}</p>
                  {userType === 'administrator' && formData.spaceType && (
                    <p className="text-sm text-blue-600 mt-1">
                      Managing: {spaceTypeOptions.find(opt => opt.value === formData.spaceType)?.label}
                    </p>
                  )}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, State"
                  />
                </div>

                {userType !== 'common' && (
                  <>
                    <div>
                      <Label htmlFor="specialization">
                        {userType === 'murtikar' ? 'Specialization' : 
                         userType === 'pujari' ? 'Expertise Area' :
                         userType === 'administrator' ? 'Sacred Space Name' : 'Specialization'}
                      </Label>
                      <Input
                        id="specialization"
                        value={formData.specialization}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                        placeholder={
                          userType === 'murtikar' ? 'e.g., Ganesh Idols, Traditional Sculptures' :
                          userType === 'pujari' ? 'e.g., Vedic Rituals, Spiritual Counseling' :
                          userType === 'administrator' ? 'e.g., Sri Krishna Temple, St. Mary Church, Central Mosque' : 'Your specialization'
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">
                        {userType === 'administrator' ? 'Years Managing' : 'Experience'}
                      </Label>
                      <Input
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        placeholder={userType === 'administrator' ? 'Years managing this space' : 'Years of experience'}
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Create password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        placeholder="Confirm password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  Create Account
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-700">
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-6">
            <Link to="/">
              <Button variant="link">
                ← Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
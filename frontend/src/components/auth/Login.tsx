import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Heart, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Login({ onLogin }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('common');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [spaceType, setSpaceType] = useState('temple');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock authentication - in real app, this would call an API
    const mockUser = {
      id: 1,
      name: getUserName(),
      email: formData.email,
      type: userType === 'administrator' ? spaceType : userType,
      avatar: getAvatarInitials(),
      verified: true,
      spaceType: userType === 'administrator' ? spaceType : null
    };
    
    onLogin(mockUser);
    navigate('/dashboard');
  };

  const getUserName = () => {
    switch (userType) {
      case 'murtikar':
        return 'Rajesh Sharma';
      case 'pujari':
        return 'Pandit Vishnu Acharya';
      case 'administrator':
        switch (spaceType) {
          case 'virtual-temple': return 'Lalbaugcha Raja Pandal';
          case 'temple': return 'Sri Krishna Temple';
          case 'church': return 'St. Mary Church';
          case 'mosque': return 'Central Mosque';
          case 'gurudwara': return 'Golden Temple Gurdwara';
          case 'buddhist-center': return 'Meditation Center';
          default: return 'Administrator';
        }
      default:
        return 'Devotee User';
    }
  };

  const getAvatarInitials = () => {
    switch (userType) {
      case 'murtikar':
        return 'RS';
      case 'pujari':
        return 'VA';
      case 'administrator':
        switch (spaceType) {
          case 'virtual-temple': return 'LR';
          case 'temple': return 'SKT';
          case 'church': return 'SMC';
          case 'mosque': return 'CM';
          case 'gurudwara': return 'GT';
          case 'buddhist-center': return 'MC';
          default: return 'AD';
        }
      default:
        return 'DU';
    }
  };

  const demoCredentials = {
    common: { email: 'user@sacredspace.com', password: 'demo123' },
    murtikar: { email: 'murtikar@sacredspace.com', password: 'demo123' },
    pujari: { email: 'pujari@sacredspace.com', password: 'demo123' },
    administrator: { email: 'admin@sacredspace.com', password: 'demo123' }
  };

  const spaceTypeOptions = [
    { value: 'virtual-temple', label: 'Virtual Temple/Pandal', icon: '🏛️' },
    { value: 'temple', label: 'Temple', icon: '🛕' },
    { value: 'church', label: 'Church', icon: '⛪' },
    { value: 'mosque', label: 'Mosque', icon: '🕌' },
    { value: 'gurudwara', label: 'Gurudwara', icon: '🏛️' },
    { value: 'buddhist-center', label: 'Buddhist Center', icon: '🏯' }
  ];

  const fillDemoCredentials = () => {
    setFormData(demoCredentials[userType]);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1669221498006-9d0e6fa84e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZvdGlvbmFsJTIwcHJheWVyJTIwaGFuZHN8ZW58MXx8fHwxNzU5MDkzNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Sacred Space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/80 to-yellow-600/80 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Welcome to SacredSpace</h1>
            <p className="text-xl text-yellow-100 mb-6">
              Connect with divine experiences and spiritual communities worldwide
            </p>
            <div className="space-y-2 text-left max-w-md mx-auto">
              <div className="flex items-center text-yellow-100">
                <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                Virtual temple visits and darshan
              </div>
              <div className="flex items-center text-yellow-100">
                <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                Connect with spiritual guides and artists
              </div>
              <div className="flex items-center text-yellow-100">
                <div className="w-2 h-2 bg-yellow-300 rounded-full mr-3"></div>
                Join multi-faith communities
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                SacredSpace
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your spiritual journey</p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Tabs value={userType} onValueChange={setUserType} className="mb-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="common" className="text-xs">Devotee</TabsTrigger>
                  <TabsTrigger value="murtikar" className="text-xs">Artist</TabsTrigger>
                  <TabsTrigger value="pujari" className="text-xs">Guide</TabsTrigger>
                  <TabsTrigger value="administrator" className="text-xs">Administrator</TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Space Type Selection for Administrator */}
              {userType === 'administrator' && (
                <div className="mb-4">
                  <Label htmlFor="spaceType">Sacred Space Type</Label>
                  <Select value={spaceType} onValueChange={setSpaceType}>
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
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
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter your password"
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

                <div className="flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={fillDemoCredentials}
                  >
                    Use Demo Credentials
                  </Button>
                  <Button variant="link" className="px-0 text-orange-600">
                    Forgot password?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                >
                  Sign In
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-orange-600 hover:text-orange-700">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Demo Information */}
          <Card className="mt-4 border-orange-200 bg-orange-50/50">
            <CardContent className="p-4">
              <h4 className="font-semibold text-orange-800 mb-2">Demo Account Types:</h4>
              <div className="space-y-1 text-sm text-orange-700">
                <div><strong>User:</strong> Browse temples, make bookings, join communities</div>
                <div><strong>Artist:</strong> Manage portfolio, receive orders, client reviews</div>
                <div><strong>Guide:</strong> Offer services, manage bookings, provide guidance</div>
                <div><strong>Administrators:</strong> Manage sacred spaces, events, and communities</div>
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
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
  Star,
  Shield,
  Users,
  Zap,
  Download,
  Smartphone,
  Apple,
  PlayCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Explore Spaces", href: "/explore" },
    { name: "Virtual Worship", href: "/virtual-worship" },
    { name: "Live Events", href: "/virtual-worship" },
    { name: "Community", href: "/community" },
    { name: "Content Library", href: "/library" },
    { name: "Feed", href: "/feed" },
  ];

  const faithCommunities = [
    { name: "Hindu Temples", icon: "🛕" },
    { name: "Islamic Mosques", icon: "🕌" },
    { name: "Christian Churches", icon: "⛪" },
    { name: "Sikh Gurudwaras", icon: "🏛️" },
    { name: "Buddhist Centers", icon: "☸️" },
    { name: "Festival Pandals", icon: "🎪" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Content Guidelines", href: "/guidelines" },
    { name: "Safety Center", href: "/safety" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Contact Support", href: "/support" },
    { name: "Report Issue", href: "/report" },
    { name: "Accessibility", href: "/accessibility" },
    { name: "Developer API", href: "/api" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">🛕</div>
        <div className="absolute top-20 right-20 text-5xl">🕌</div>
        <div className="absolute bottom-20 left-20 text-5xl">⛪</div>
        <div className="absolute bottom-10 right-10 text-6xl">🏛️</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl">☸️</div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* Newsletter Signup */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg self-start">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold">Stay Connected with the Divine</h3>
                    <p className="text-gray-400 text-sm sm:text-base">Get updates on live events, festivals, and spiritual content</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    placeholder="Enter your email address"
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 flex-1"
                  />
                  <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 px-4 sm:px-6 w-full sm:w-auto">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Join 50,000+ devotees worldwide. Unsubscribe anytime.
                </p>
              </div>

              {/* App Download */}
              <div className="text-center lg:text-right">
                <div className="inline-flex items-center space-x-2 mb-4">
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                  <span className="text-base sm:text-lg font-semibold">Download SacredSpace App</span>
                </div>
                <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">Experience spirituality on the go</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-end">
                  <Button variant="outline" className="border-gray-600 bg-gray-800 hover:bg-gray-700 text-white text-sm">
                    <Apple className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    App Store
                  </Button>
                  <Button variant="outline" className="border-gray-600 bg-gray-800 hover:bg-gray-700 text-white text-sm">
                    <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Google Play
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Links Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* About SacredSpace */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold">SacredSpace</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm sm:text-base">
                Connecting souls worldwide through immersive virtual religious and spiritual experiences. 
                Bridging faith communities with technology and devotion.
              </p>
              
              {/* Trust Indicators */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Verified Sacred Spaces</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">50,000+ Active Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">Live 24/7 Spiritual Content</span>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-sm font-semibold mb-3">Follow Us</p>
                <div className="flex space-x-3">
                  <Button size="sm" variant="outline" className="border-gray-600 bg-gray-800 hover:bg-blue-600 p-2">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 bg-gray-800 hover:bg-blue-400 p-2">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 bg-gray-800 hover:bg-pink-500 p-2">
                    <Instagram className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 bg-gray-800 hover:bg-red-600 p-2">
                    <Youtube className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-600 bg-gray-800 hover:bg-blue-700 p-2">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Explore</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Faith Communities */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Faith Communities</h4>
              <ul className="space-y-3">
                {faithCommunities.map((faith) => (
                  <li key={faith.name}>
                    <div className="text-gray-400 hover:text-orange-400 transition-colors duration-200 flex items-center group cursor-pointer">
                      <span className="mr-2 text-sm">{faith.icon}</span>
                      {faith.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support & Legal */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Support & Legal</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-300">Support</p>
                  <ul className="space-y-2">
                    {supportLinks.slice(0, 3).map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2 text-gray-300">Legal</p>
                  <ul className="space-y-2">
                    {legalLinks.slice(0, 3).map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-orange-400 transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Mail className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email Us</p>
                  <p className="text-gray-400 text-sm">support@sacredspace.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Call Us</p>
                  <p className="text-gray-400 text-sm">+1 (555) SACRED (723-733)</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-800 rounded-lg">
                  <MapPin className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Visit Us</p>
                  <p className="text-gray-400 text-sm">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                <p className="text-gray-400 text-sm">
                  © {currentYear} SacredSpace. All rights reserved.
                </p>
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    <Globe className="w-3 h-3 mr-1" />
                    Available Worldwide
                  </Badge>
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    <Star className="w-3 h-3 mr-1" />
                    4.8 Rating
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <a href="/accessibility" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Accessibility
                </a>
                <a href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Privacy
                </a>
                <a href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Terms
                </a>
                <a href="/sitemap" className="text-gray-400 hover:text-orange-400 transition-colors">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Spiritual Quote */}
        <div className="border-t border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Heart className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-gray-300">Unity in Diversity</span>
              <Heart className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-gray-400 text-sm italic max-w-2xl mx-auto">
              "In the garden of spirituality, every faith is a beautiful flower that adds to the divine fragrance of humanity."
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
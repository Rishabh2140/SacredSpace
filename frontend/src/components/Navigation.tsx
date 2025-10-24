import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  Play,
  Users,
  Book,
  MapPin,
  Heart,
  User,
  LogOut,
  Settings,
  Palette,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

export function Navigation({
  isAuthenticated,
  currentUser,
  onLogout,
}) {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/explore", label: "Explore", icon: Search },
    { path: "/feed", label: "Feed", icon: Heart },
    { path: "/artists", label: "Guides", icon: Palette },
    { path: "/map", label: "Map", icon: MapPin },
    { path: "/virtual-worship", label: "Worship", icon: Play },
    { path: "/community", label: "Community", icon: Users },
    { path: "/library", label: "Library", icon: Book },
  ];

  const authenticatedNavItems = [
    ...navItems,
    ...(isAuthenticated
      ? [
          {
            path: "/dashboard",
            label: "Dashboard",
            icon: Settings,
          },
        ]
      : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent truncate">
              SacredSpace
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {authenticatedNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center space-x-2 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600"
                        : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* User Profile */}
          <div className="flex-shrink-0">
            {isAuthenticated && currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-8 h-8 p-0 rounded-full"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-xs">
                        {currentUser.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center space-x-2 p-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white text-xs">
                      {currentUser.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {currentUser.type}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">
                    <Home className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-orange-100">
          <div className="flex items-center justify-between py-2 overflow-x-auto scrollbar-hide">
            {authenticatedNavItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path} className="flex-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex flex-col items-center space-y-1 w-full min-w-0 px-1 py-2 ${
                      isActive
                        ? "text-orange-600 bg-orange-50"
                        : "text-gray-500"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs truncate max-w-full">
                      {item.label}
                    </span>
                  </Button>
                </Link>
              );
            })}
            {!isAuthenticated && (
              <Link to="/login" className="flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex flex-col items-center space-y-1 w-full min-w-0 px-1 py-2 text-gray-500"
                >
                  <User className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs truncate">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
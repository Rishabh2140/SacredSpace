"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Heart,
  Home,
  Map,
  Users,
  BookOpen,
  Calendar,
  Gift,
  Settings,
  Bell,
  Menu,
  Search,
  User,
  LogOut,
  Shield,
  HelpCircle,
} from "lucide-react"

export function MainNavigation({ user, onSignOut }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { name: "Home", href: "/", icon: Home, description: "Discover virtual pandals and religious spaces" },
    { name: "Explore", href: "/explore", icon: Map, description: "Browse pandals by location and category" },
    { name: "Community", href: "/community", icon: Users, description: "Join discussions and connect with others" },
    { name: "Worship", href: "/worship", icon: BookOpen, description: "Virtual worship spaces and live services" },
    { name: "Events", href: "/events", icon: Calendar, description: "Upcoming religious events and festivals" },
    { name: "Donate", href: "/donate", icon: Gift, description: "Support causes and community initiatives" },
  ]

  const userMenuItems = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help", href: "/help", icon: HelpCircle },
  ]

  if (user?.role === "admin") {
    userMenuItems.splice(1, 0, { name: "Admin Panel", href: "/admin", icon: Shield })
  }

  const isActive = (href) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  const NavItems = ({ mobile = false }) => (
    <>
      {navigationItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${mobile ? "w-full" : ""} ${
            isActive(item.href)
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
          onClick={() => mobile && setIsOpen(false)}
        >
          <item.icon className="w-5 h-5" />
          <div className={mobile ? "text-left" : "hidden lg:block"}>
            <div className="font-medium">{item.name}</div>
            {mobile && <div className="text-xs text-muted-foreground">{item.description}</div>}
          </div>
        </Link>
      ))}
    </>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full spiritual-gradient flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-serif font-semibold hidden sm:block">SacredSpace</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavItems />
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Search className="w-4 h-4" />
            </Button>

            {user ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-spiritual-rose">
                    3
                  </Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        <Badge variant="outline" className="w-fit text-xs">
                          {user.role}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {userMenuItems.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link href={item.href} className="flex items-center space-x-2">
                          <item.icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onSignOut} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link href="/auth">Sign In</Link>
                </Button>
                <Button asChild className="spiritual-gradient border-0">
                  <Link href="/auth">Get Started</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full spiritual-gradient flex items-center justify-center">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                    <span>SacredSpace</span>
                  </SheetTitle>
                  <SheetDescription>Navigate to different sections of the platform</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-2">
                  <NavItems mobile />
                  {!user && (
                    <div className="pt-4 space-y-2">
                      <Button variant="outline" className="w-full bg-transparent" asChild>
                        <Link href="/auth" onClick={() => setIsOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button className="w-full spiritual-gradient border-0" asChild>
                        <Link href="/auth" onClick={() => setIsOpen(false)}>
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

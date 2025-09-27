"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Users, BookOpen, Calendar, Sparkles } from "lucide-react"

export function AuthLanding() {
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = async (type) => {
    setIsLoading(true)
    // TODO: Implement authentication logic
    setTimeout(() => setIsLoading(false), 2000)
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
              <span className="text-xl font-serif font-semibold text-foreground">SacredSpace</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#community" className="text-muted-foreground hover:text-foreground transition-colors">
                Community
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-balance leading-tight">
                  Connect with your{" "}
                  <span className="bg-gradient-to-r from-primary to-spiritual-sage bg-clip-text text-transparent">
                    spiritual community
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Join virtual worship spaces, engage in meaningful discussions, and grow your faith alongside believers
                  from around the world.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started - It's Free
                </Button>
                <Button variant="outline" size="lg">
                  Explore Features
                </Button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>10,000+ Members</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Multi-Faith Welcome</span>
                </div>
              </div>
            </div>

            {/* Auth Card */}
            <div className="lg:max-w-md mx-auto w-full">
              <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-serif">Join Our Community</CardTitle>
                  <CardDescription>Create your account or sign in to continue your spiritual journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="signup" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                      <TabsTrigger value="signin">Sign In</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signup" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name">Full Name</Label>
                        <Input id="signup-name" placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input id="signup-email" type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input id="signup-password" type="password" placeholder="Create a password" />
                      </div>
                      <Button
                        className="w-full spiritual-gradient border-0"
                        onClick={() => handleAuth("signup")}
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </TabsContent>

                    <TabsContent value="signin" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="signin-email">Email</Label>
                        <Input id="signin-email" type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signin-password">Password</Label>
                        <Input id="signin-password" type="password" placeholder="Enter your password" />
                      </div>
                      <Button
                        className="w-full spiritual-gradient border-0"
                        onClick={() => handleAuth("signin")}
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing In..." : "Sign In"}
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30 sacred-pattern">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-balance">
              Everything you need for spiritual growth
            </h2>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Our platform brings together the tools and community you need to deepen your faith and connect with
              others.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Virtual Worship</h3>
                <p className="text-sm text-muted-foreground">
                  Join live services and prayer sessions from anywhere in the world
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-spiritual-sage/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-spiritual-sage" />
                </div>
                <h3 className="font-semibold mb-2">Community Forums</h3>
                <p className="text-sm text-muted-foreground">Engage in meaningful discussions with fellow believers</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-spiritual-gold/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-spiritual-gold" />
                </div>
                <h3 className="font-semibold mb-2">Sacred Texts</h3>
                <p className="text-sm text-muted-foreground">
                  Access religious texts, prayers, and spiritual resources
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-card/50 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Events & Gatherings</h3>
                <p className="text-sm text-muted-foreground">Discover and join spiritual events in your community</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-card/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded-full spiritual-gradient flex items-center justify-center">
                <Heart className="w-3 h-3 text-white" />
              </div>
              <span className="font-serif font-semibold">SacredSpace</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 SacredSpace. Bringing communities together in faith.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

export default function HomePage() {
  const features = [
    {
      title: "360° Virtual Tours",
      description: "Experience pandals and temples in immersive 360-degree views",
      icon: "🏛️",
    },
    {
      title: "Live Streaming",
      description: "Watch live aarti, pujas, and religious ceremonies",
      icon: "📺",
    },
    {
      title: "Connect with Experts",
      description: "Find and book Murtikar, Pujari, and Kathavachak services",
      icon: "🤝",
    },
    {
      title: "Community Ratings",
      description: "Rate and review Samiti committees and service providers",
      icon: "⭐",
    },
  ]

  const userTypes = [
    {
      type: "Devotee",
      description: "Explore virtual pandals, watch live streams, and connect with spiritual community",
      color: "bg-blue-100 text-blue-800",
    },
    {
      type: "Samiti",
      description: "Showcase your pandal, manage events, and connect with devotees",
      color: "bg-green-100 text-green-800",
    },
    {
      type: "Murtikar",
      description: "Display your portfolio, connect with committees, and grow your business",
      color: "bg-purple-100 text-purple-800",
    },
    {
      type: "Pujari",
      description: "Offer your services, manage bookings, and serve the community",
      color: "bg-orange-100 text-orange-800",
    },
    {
      type: "Kathavachak",
      description: "Share spiritual stories, conduct sessions, and inspire devotees",
      color: "bg-pink-100 text-pink-800",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="spiritual-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Experience Divine Moments
            <span className="block text-spiritual-orange">Virtually</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Connect with pandals, temples, and spiritual communities from anywhere. Watch live streams, take virtual
            tours, and find trusted service providers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-spiritual-gold hover:bg-spiritual-gold/90">
              <Link to="/explore">Explore Pandals</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/auth">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Discover Sacred Experiences</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform brings together devotees, committees, and service providers in one spiritual ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Built for Everyone</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're a devotee, committee member, or service provider, our platform helps you connect and grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTypes.map((userType, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge className={userType.color}>{userType.type}</Badge>
                  </div>
                  <CardTitle className="text-xl">{userType.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{userType.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Begin Your Spiritual Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of devotees, committees, and service providers who are already part of our growing
              community
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-spiritual-orange hover:bg-spiritual-orange/90">
                <Link to="/auth">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/explore">Browse Pandals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

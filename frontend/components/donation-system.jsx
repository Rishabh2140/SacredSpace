"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Heart, DollarSign, Users, Target, Gift, CheckCircle, TrendingUp, Zap, Shield } from "lucide-react"

export function DonationSystem() {
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [customAmount, setCustomAmount] = useState("")
  const [donationType, setDonationType] = useState("one-time")
  const [selectedCause, setSelectedCause] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const quickAmounts = [25, 50, 100, 250, 500, 1000]

  const featuredCauses = [
    {
      id: "1",
      title: "Community Outreach Program",
      description: "Supporting local families in need with food, shelter, and spiritual guidance",
      goal: 50000,
      raised: 32500,
      donors: 234,
      category: "Community Support",
      urgency: "high",
      image: "/community-outreach.jpg",
      organization: "Sacred Hearts Community Center",
    },
    {
      id: "2",
      title: "Youth Ministry Development",
      description: "Building programs to engage and mentor young people in their faith journey",
      goal: 25000,
      raised: 18750,
      donors: 156,
      category: "Youth Programs",
      urgency: "medium",
      image: "/youth-ministry.jpg",
      organization: "Interfaith Youth Alliance",
    },
    {
      id: "3",
      title: "Disaster Relief Fund",
      description: "Providing immediate aid and long-term support to communities affected by natural disasters",
      goal: 100000,
      raised: 67500,
      donors: 445,
      category: "Emergency Relief",
      urgency: "high",
      image: "/disaster-relief.jpg",
      organization: "Global Faith Relief Network",
    },
    {
      id: "4",
      title: "Sacred Text Translation Project",
      description: "Making religious texts accessible in underserved languages worldwide",
      goal: 75000,
      raised: 23400,
      donors: 89,
      category: "Education",
      urgency: "low",
      image: "/text-translation.jpg",
      organization: "Universal Scripture Society",
    },
  ]

  const donationCategories = [
    { id: "platform", name: "Platform Support", description: "Help maintain and improve SacredSpace" },
    { id: "community", name: "Community Outreach", description: "Support local community programs" },
    { id: "youth", name: "Youth Programs", description: "Invest in the next generation" },
    { id: "relief", name: "Disaster Relief", description: "Emergency aid for those in crisis" },
    { id: "education", name: "Religious Education", description: "Promote spiritual learning and growth" },
    { id: "interfaith", name: "Interfaith Dialogue", description: "Build bridges between communities" },
  ]

  const recentDonations = [
    { donor: "Anonymous", amount: 500, cause: "Community Outreach", time: "2 minutes ago" },
    { donor: "Sarah J.", amount: 100, cause: "Youth Ministry", time: "15 minutes ago" },
    { donor: "Michael T.", amount: 250, cause: "Platform Support", time: "1 hour ago" },
    { donor: "Anonymous", amount: 1000, cause: "Disaster Relief", time: "2 hours ago" },
  ]

  const impactStats = {
    totalRaised: 245678,
    totalDonors: 1234,
    causesSupported: 45,
    communitiesHelped: 89,
  }

  const handleDonation = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Show success message or handle result
    }, 3000)
  }

  const getProgressPercentage = (raised, goal) => {
    return Math.min((raised / goal) * 100, 100)
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
              <div>
                <h1 className="text-xl font-serif font-semibold">Give & Support</h1>
                <p className="text-sm text-muted-foreground">Make a difference through generous giving</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-100 text-green-800">
                ${impactStats.totalRaised.toLocaleString()} raised this year
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-balance">
            Your generosity creates lasting impact
          </h2>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
            Join thousands of believers in supporting causes that matter. Every donation, no matter the size, makes a
            difference in someone's life.
          </p>

          {/* Impact Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-spiritual-sage">${impactStats.totalRaised.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Raised</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-spiritual-gold">{impactStats.totalDonors.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Generous Donors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-spiritual-rose">{impactStats.causesSupported}</div>
              <div className="text-sm text-muted-foreground">Causes Supported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{impactStats.communitiesHelped}</div>
              <div className="text-sm text-muted-foreground">Communities Helped</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Donation Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Donation Card */}
            <Card className="spiritual-gradient text-white">
              <CardHeader>
                <CardTitle className="text-white">Make a Quick Donation</CardTitle>
                <CardDescription className="text-white/80">
                  Support the platform and our community initiatives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs value={donationType} onValueChange={setDonationType}>
                  <TabsList className="bg-white/20 border-white/30">
                    <TabsTrigger
                      value="one-time"
                      className="data-[state=active]:bg-white data-[state=active]:text-primary"
                    >
                      One-time
                    </TabsTrigger>
                    <TabsTrigger
                      value="monthly"
                      className="data-[state=active]:bg-white data-[state=active]:text-primary"
                    >
                      Monthly
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div>
                  <Label className="text-white mb-3 block">Select Amount</Label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "secondary" : "outline"}
                        className={`${
                          selectedAmount === amount
                            ? "bg-white text-primary"
                            : "border-white/30 text-white hover:bg-white/20"
                        }`}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount("")
                        }}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                    <Input
                      placeholder="Custom amount"
                      className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setSelectedAmount(null)
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-3 block">Choose a Cause (Optional)</Label>
                  <Select value={selectedCause} onValueChange={setSelectedCause}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="General Platform Support" />
                    </SelectTrigger>
                    <SelectContent>
                      {donationCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="w-full bg-white text-primary hover:bg-white/90"
                  size="lg"
                  onClick={handleDonation}
                  disabled={isProcessing || (!selectedAmount && !customAmount)}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2" />
                      Donate {selectedAmount ? `$${selectedAmount}` : customAmount ? `$${customAmount}` : ""}
                      {donationType === "monthly" && " Monthly"}
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center space-x-4 text-white/80 text-sm">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-4 h-4" />
                    <span>Instant</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Tax Deductible</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Causes */}
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-semibold">Featured Causes</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {featuredCauses.map((cause) => (
                  <Card key={cause.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-spiritual-sage/20 to-spiritual-rose/20 rounded-t-lg flex items-center justify-center">
                      <div className="text-center">
                        <Target className="w-12 h-12 text-spiritual-sage mx-auto mb-2" />
                        <Badge
                          variant={
                            cause.urgency === "high"
                              ? "destructive"
                              : cause.urgency === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {cause.urgency} priority
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{cause.category}</Badge>
                            <span className="text-sm text-muted-foreground">{cause.organization}</span>
                          </div>
                          <h4 className="font-semibold text-lg mb-2">{cause.title}</h4>
                          <p className="text-muted-foreground text-sm">{cause.description}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>${cause.raised.toLocaleString()} raised</span>
                            <span>${cause.goal.toLocaleString()} goal</span>
                          </div>
                          <Progress value={getProgressPercentage(cause.raised, cause.goal)} className="h-2" />
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{cause.donors} donors</span>
                            </div>
                            <span>{Math.round(getProgressPercentage(cause.raised, cause.goal))}% funded</span>
                          </div>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full spiritual-gradient border-0">
                              <Gift className="w-4 h-4 mr-2" />
                              Donate to This Cause
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Donate to {cause.title}</DialogTitle>
                              <DialogDescription>Support {cause.organization} in their mission</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-3 gap-2">
                                {[25, 50, 100].map((amount) => (
                                  <Button key={amount} variant="outline" size="sm">
                                    ${amount}
                                  </Button>
                                ))}
                              </div>
                              <Input placeholder="Custom amount" />
                              <Button className="w-full spiritual-gradient border-0">
                                <Heart className="w-4 h-4 mr-2" />
                                Complete Donation
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Donations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Recent Donations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentDonations.map((donation, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{donation.donor}</p>
                      <p className="text-sm text-muted-foreground">{donation.cause}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-spiritual-sage">${donation.amount}</p>
                      <p className="text-xs text-muted-foreground">{donation.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Donation Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Donation Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {donationCategories.map((category) => (
                  <div
                    key={category.id}
                    className="p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCause(category.id)}
                  >
                    <h4 className="font-medium">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tax Information */}
            <Card>
              <CardHeader>
                <CardTitle>Tax Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <p>All donations are tax-deductible</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <p>Instant receipt via email</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <p>501(c)(3) registered organization</p>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <p>Annual giving statements provided</p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">Have questions about donating or need assistance?</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

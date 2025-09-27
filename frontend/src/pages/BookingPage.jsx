"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Calendar } from "../components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

export default function BookingPage({ user }) {
  const { serviceType, providerId } = useParams()
  const navigate = useNavigate()
  const [provider, setProvider] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [bookingDetails, setBookingDetails] = useState({
    eventType: "",
    duration: "",
    location: "",
    requirements: "",
    budget: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Mock provider data - in real app, fetch from API
    const mockProvider = {
      _id: providerId,
      name:
        serviceType === "murtikar" ? "Ramesh Kumar" : serviceType === "pujari" ? "Pandit Sharma" : "Samiti Committee",
      type: serviceType,
      profile: {
        avatar: "/placeholder.svg",
        bio: `Experienced ${serviceType} with 15+ years of expertise`,
        rating: 4.8,
        reviewCount: 127,
        location: "Mumbai, Maharashtra",
      },
      services: [
        { name: "Basic Service", price: 5000, duration: "2 hours" },
        { name: "Premium Service", price: 10000, duration: "4 hours" },
        { name: "Full Day Service", price: 20000, duration: "8 hours" },
      ],
      availability: {
        timeSlots: ["09:00", "11:00", "14:00", "16:00", "18:00"],
      },
    }
    setProvider(mockProvider)
  }, [serviceType, providerId])

  const handleBooking = async (e) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time")
      return
    }

    setLoading(true)
    try {
      // Mock booking API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("Booking request submitted successfully!")
      navigate("/dashboard")
    } catch (error) {
      console.error("Booking error:", error)
      alert("Failed to submit booking request")
    } finally {
      setLoading(false)
    }
  }

  if (!provider) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book {provider.name}</h1>
          <p className="text-muted-foreground">Schedule your {serviceType} service</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Provider Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={provider.profile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">{provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <Badge variant="outline" className="capitalize mt-1">
                      {provider.type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <span>⭐ {provider.profile.rating}</span>
                  <span className="text-muted-foreground">({provider.profile.reviewCount} reviews)</span>
                </div>
                <div className="text-sm text-muted-foreground">📍 {provider.profile.location}</div>
                <p className="text-sm">{provider.profile.bio}</p>

                <div className="space-y-2">
                  <h4 className="font-semibold">Services Offered:</h4>
                  {provider.services.map((service, index) => (
                    <div key={index} className="flex justify-between items-center text-sm border rounded p-2">
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-muted-foreground">{service.duration}</div>
                      </div>
                      <div className="font-semibold">₹{service.price}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type</Label>
                      <Select
                        value={bookingDetails.eventType}
                        onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, eventType: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="puja">Puja Ceremony</SelectItem>
                          <SelectItem value="festival">Festival</SelectItem>
                          <SelectItem value="housewarming">Housewarming</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Select
                        value={bookingDetails.duration}
                        onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, duration: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 hours</SelectItem>
                          <SelectItem value="4">4 hours</SelectItem>
                          <SelectItem value="8">Full day</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Event Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter event address"
                      value={bookingDetails.location}
                      onChange={(e) => setBookingDetails((prev) => ({ ...prev, location: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            {selectedDate ? selectedDate.toDateString() : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Select Time</Label>
                      <Select value={selectedTime} onValueChange={setSelectedTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {provider.availability.timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select
                      value={bookingDetails.budget}
                      onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, budget: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                        <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
                        <SelectItem value="20000-50000">₹20,000 - ₹50,000</SelectItem>
                        <SelectItem value="50000+">₹50,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Any specific requirements or notes..."
                      value={bookingDetails.requirements}
                      onChange={(e) => setBookingDetails((prev) => ({ ...prev, requirements: e.target.value }))}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? "Submitting..." : "Submit Booking Request"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

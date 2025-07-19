"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Clock, Star, MapPin, CheckCircle, AlertCircle } from "lucide-react"
import { format, addDays, isSameDay, isAfter, isBefore } from "date-fns"

interface TimeSlot {
  id: string
  time: string
  available: boolean
  price: number
}

interface Booking {
  id: string
  date: Date
  timeSlot: string
  service: string
  description: string
  clientName: string
  clientEmail: string
  clientPhone: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
}

export default function BookingPage({ params }: { params: { technicianId: string } }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [selectedService, setSelectedService] = useState<string>("")
  const [description, setDescription] = useState("")
  const [clientInfo, setClientInfo] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Mock technician data
  const technician = {
    id: params.technicianId,
    name: "John Smith",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviews: 150,
    skills: ["Plumbing", "Electrical", "HVAC"],
    hourlyRate: 75,
    location: "New York, NY",
    bio: "Experienced technician with over 10 years in plumbing, electrical, and HVAC systems.",
  }

  const services = [
    { id: "plumbing", name: "Plumbing Repair", price: 75 },
    { id: "electrical", name: "Electrical Work", price: 85 },
    { id: "hvac", name: "HVAC Service", price: 90 },
    { id: "installation", name: "Installation", price: 80 },
    { id: "maintenance", name: "Maintenance", price: 65 },
  ]

  // Generate time slots based on selected date
  useEffect(() => {
    if (selectedDate) {
      generateTimeSlots(selectedDate)
    }
  }, [selectedDate])

  const generateTimeSlots = (date: Date) => {
    const slots: TimeSlot[] = []
    const startHour = 9
    const endHour = 17
    const now = new Date()
    const isToday = isSameDay(date, now)

    for (let hour = startHour; hour < endHour; hour++) {
      const timeString = `${hour.toString().padStart(2, "0")}:00`
      const slotDateTime = new Date(date)
      slotDateTime.setHours(hour, 0, 0, 0)

      // Check if slot is in the past (for today only)
      const isPast = isToday && isBefore(slotDateTime, now)

      // Mock availability (some slots are booked)
      const isBooked = Math.random() < 0.3 // 30% chance of being booked

      slots.push({
        id: `${hour}:00`,
        time: timeString,
        available: !isPast && !isBooked,
        price: technician.hourlyRate,
      })
    }
    setTimeSlots(slots)
  }

  const handleBooking = async () => {
    if (!selectedDate || !selectedTimeSlot || !selectedService || !clientInfo.name || !clientInfo.email) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const booking: Booking = {
      id: Date.now().toString(),
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      service: selectedService,
      description,
      clientName: clientInfo.name,
      clientEmail: clientInfo.email,
      clientPhone: clientInfo.phone,
      status: "pending",
    }

    // Store booking (in real app, this would be an API call)
    console.log("Booking created:", booking)

    setBookingConfirmed(true)
    setIsLoading(false)

    // Send notifications (mock)
    sendBookingNotifications(booking)
  }

  const sendBookingNotifications = (booking: Booking) => {
    // Mock notification system
    console.log("Sending notifications for booking:", booking.id)

    // Client notification
    console.log(`Email sent to ${booking.clientEmail}: Booking confirmed with ${technician.name}`)

    // Technician notification
    console.log(`Notification sent to technician: New booking from ${booking.clientName}`)

    // Admin notification
    console.log("Admin notification: New booking requires approval")
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
        {/* Enhanced Star Background */}
        <div className="absolute inset-0">
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: Math.random() * 0.8 + 0.2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-16 flex items-center justify-center min-h-screen">
          <Card className="max-w-md w-full bg-gray-800/90 backdrop-blur-lg border-gray-700 text-center">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Booking Confirmed!</h2>
              <p className="text-gray-300 mb-6">
                Your booking with {technician.name} has been submitted and is pending approval.
              </p>
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6 text-left">
                <div className="text-sm text-gray-400 mb-2">Booking Details:</div>
                <div className="text-white">
                  <div>Date: {selectedDate && format(selectedDate, "PPP")}</div>
                  <div>Time: {selectedTimeSlot}</div>
                  <div>Service: {services.find((s) => s.id === selectedService)?.name}</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-6">
                You will receive a confirmation email shortly. The technician will contact you within 24 hours.
              </p>
              <Button
                onClick={() => (window.location.href = "/dashboard")}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Enhanced Star Background */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Book a Service</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Technician Info */}
            <Card className="bg-gray-800/90 backdrop-blur-lg border-gray-700">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-blue-500">
                    <AvatarImage src={technician.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xl">{technician.name[0]}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold text-white mb-2">{technician.name}</h2>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-yellow-400">{technician.rating}</span>
                    <span className="text-gray-400">({technician.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center justify-center text-gray-400 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {technician.location}
                  </div>
                  <div className="text-3xl font-bold text-white mb-4">${technician.hourlyRate}/hr</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {technician.skills.map((skill, index) => (
                        <Badge key={index} className="bg-blue-600/50 text-white">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">About</h3>
                    <p className="text-gray-300 text-sm">{technician.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date Selection */}
              <Card className="bg-gray-800/90 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-2" />
                    Select Date
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => isBefore(date, new Date()) || isAfter(date, addDays(new Date(), 30))}
                    className="rounded-md border border-gray-600 bg-gray-700/50"
                  />
                </CardContent>
              </Card>

              {/* Time Slot Selection */}
              {selectedDate && (
                <Card className="bg-gray-800/90 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Available Time Slots
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot) => (
                        <Button
                          key={slot.id}
                          variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                          disabled={!slot.available}
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={`${
                            selectedTimeSlot === slot.time
                              ? "bg-blue-600 hover:bg-blue-700"
                              : slot.available
                                ? "border-gray-600 text-white hover:bg-gray-700"
                                : "opacity-50 cursor-not-allowed"
                          }`}
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Service Selection */}
              <Card className="bg-gray-800/90 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Select Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} - ${service.price}/hr
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div>
                    <Label className="text-white">Additional Details (Optional)</Label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your issue or requirements..."
                      className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Client Information */}
              <Card className="bg-gray-800/90 backdrop-blur-lg border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Full Name *</Label>
                      <input
                        type="text"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-white">Email *</Label>
                      <input
                        type="email"
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">Phone Number</Label>
                    <input
                      type="tel"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Booking Summary & Confirmation */}
              {selectedDate && selectedTimeSlot && selectedService && (
                <Card className="bg-gray-800/90 backdrop-blur-lg border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Date:</span>
                          <div className="text-white font-medium">{format(selectedDate, "PPP")}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Time:</span>
                          <div className="text-white font-medium">{selectedTimeSlot}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Service:</span>
                          <div className="text-white font-medium">
                            {services.find((s) => s.id === selectedService)?.name}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Rate:</span>
                          <div className="text-white font-medium">
                            ${services.find((s) => s.id === selectedService)?.price}/hr
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-yellow-400">
                      <AlertCircle className="w-4 h-4" />
                      <span>Booking is subject to technician approval</span>
                    </div>

                    <Button
                      onClick={handleBooking}
                      disabled={!clientInfo.name || !clientInfo.email || isLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-3"
                    >
                      {isLoading ? "Processing..." : "Confirm Booking"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

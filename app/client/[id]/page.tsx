"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Phone, Mail, Calendar, MessageCircle, ArrowLeft, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Client {
  id: string
  name: string
  email: string
  phone: string
  location: string
  avatar: string
  joinDate: string
  totalBookings: number
  completedBookings: number
  averageRating: number
  preferredServices: string[]
  lastBooking: string
  status: "active" | "inactive" | "premium"
  totalSpent: number
}

interface Booking {
  id: string
  service: string
  technician: string
  date: string
  status: string
  amount: number
  rating?: number
  review?: string
}

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [client, setClient] = useState<Client | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app, this would be an API call
    const mockClient: Client = {
      id: params.id,
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      avatar: "/placeholder.svg?height=150&width=150",
      joinDate: "2023-06-15",
      totalBookings: 12,
      completedBookings: 10,
      averageRating: 4.8,
      preferredServices: ["Plumbing", "Electrical"],
      lastBooking: "2024-01-15",
      status: "premium",
      totalSpent: 1250,
    }

    const mockBookings: Booking[] = [
      {
        id: "1",
        service: "Kitchen Faucet Repair",
        technician: "John Smith",
        date: "2024-01-15",
        status: "completed",
        amount: 150,
        rating: 5,
        review: "Excellent work! Very professional and quick.",
      },
      {
        id: "2",
        service: "Electrical Outlet Installation",
        technician: "Sarah Johnson",
        date: "2024-01-10",
        status: "completed",
        amount: 200,
        rating: 4,
        review: "Good service, arrived on time.",
      },
      {
        id: "3",
        service: "HVAC Maintenance",
        technician: "Mike Davis",
        date: "2024-01-05",
        status: "completed",
        amount: 120,
        rating: 5,
        review: "Very thorough maintenance check.",
      },
    ]

    setClient(mockClient)
    setBookings(mockBookings)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Client Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested client profile could not be found.</p>
          <Link href="/clients">
            <Button>Back to Clients</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Profile Header */}
        <Card className="mb-8 bg-card border-border">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <Avatar className="w-32 h-32 border-4 border-primary">
                <AvatarImage src={client.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-3xl">
                  {client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{client.name}</h1>
                    <div className="flex items-center space-x-4 text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {client.location}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                        {client.averageRating} rating
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge
                        className={
                          client.status === "premium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : client.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        }
                      >
                        {client.status}
                      </Badge>
                      <Badge variant="outline">Member since {new Date(client.joinDate).getFullYear()}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary mb-2">${client.totalSpent}</div>
                    <div className="text-muted-foreground text-sm mb-4">Total Spent</div>
                    <div className="space-x-2">
                      <Button size="lg" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">{client.totalBookings}</div>
                    <div className="text-muted-foreground text-sm">Total Bookings</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">{client.completedBookings}</div>
                    <div className="text-muted-foreground text-sm">Completed</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">{client.averageRating}</div>
                    <div className="text-muted-foreground text-sm">Avg Rating</div>
                  </div>
                </div>

                <div>
                  <div className="text-muted-foreground text-sm mb-2">Preferred Services:</div>
                  <div className="flex flex-wrap gap-2">
                    {client.preferredServices.map((service, index) => (
                      <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-background">
              Booking History
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-background">
              Reviews Given
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-background">
              Contact Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Booking History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-foreground font-medium">{booking.service}</h3>
                        <Badge
                          className={
                            booking.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Technician:</span>
                          <div className="text-foreground font-medium">{booking.technician}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date:</span>
                          <div className="text-foreground">{new Date(booking.date).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>
                          <div className="text-foreground font-medium">${booking.amount}</div>
                        </div>
                        {booking.rating && (
                          <div>
                            <span className="text-muted-foreground">Rating:</span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < booking.rating! ? "text-yellow-500 fill-current" : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {booking.review && (
                        <div className="bg-muted/50 rounded p-3">
                          <div className="text-muted-foreground text-sm mb-1">Review:</div>
                          <div className="text-foreground text-sm">{booking.review}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Reviews Given</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings
                    .filter((b) => b.review)
                    .map((booking) => (
                      <div key={booking.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-foreground font-medium">{booking.service}</h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < booking.rating! ? "text-yellow-500 fill-current" : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-muted-foreground text-sm mb-2">
                          For {booking.technician} • {new Date(booking.date).toLocaleDateString()}
                        </div>
                        <p className="text-foreground">{booking.review}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-foreground font-medium">Email</div>
                      <div className="text-muted-foreground">{client.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-foreground font-medium">Phone</div>
                      <div className="text-muted-foreground">{client.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-foreground font-medium">Location</div>
                      <div className="text-muted-foreground">{client.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-foreground font-medium">Member Since</div>
                      <div className="text-muted-foreground">{new Date(client.joinDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Client
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Booking History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

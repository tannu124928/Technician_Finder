"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, Phone, Mail, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AvatarService } from "@/lib/avatar-service"
import Link from "next/link"

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

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [clientsPerPage] = useState(6) // Default to 6, can be 4-7

  // Mock client data with generated avatars
  const allClients: Client[] = [
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      avatar: AvatarService.getClientAvatar("Alice Johnson"),
      joinDate: "2023-06-15",
      totalBookings: 12,
      completedBookings: 10,
      averageRating: 4.8,
      preferredServices: ["Plumbing", "Electrical"],
      lastBooking: "2024-01-15",
      status: "premium",
      totalSpent: 1250,
    },
    {
      id: "2",
      name: "Robert Chen",
      email: "robert.chen@email.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, CA",
      avatar: AvatarService.getClientAvatar("Robert Chen"),
      joinDate: "2023-08-22",
      totalBookings: 8,
      completedBookings: 7,
      averageRating: 4.6,
      preferredServices: ["Computer Repair", "Network Setup"],
      lastBooking: "2024-01-12",
      status: "active",
      totalSpent: 890,
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      email: "maria.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      avatar: AvatarService.getClientAvatar("Maria Rodriguez"),
      joinDate: "2023-04-10",
      totalBookings: 15,
      completedBookings: 14,
      averageRating: 4.9,
      preferredServices: ["HVAC", "Appliance Repair"],
      lastBooking: "2024-01-18",
      status: "premium",
      totalSpent: 1680,
    },
    {
      id: "4",
      name: "David Wilson",
      email: "david.wilson@email.com",
      phone: "+1 (555) 456-7890",
      location: "Houston, TX",
      avatar: AvatarService.getClientAvatar("David Wilson"),
      joinDate: "2023-09-05",
      totalBookings: 6,
      completedBookings: 5,
      averageRating: 4.4,
      preferredServices: ["Plumbing", "Installation"],
      lastBooking: "2024-01-08",
      status: "active",
      totalSpent: 520,
    },
    {
      id: "5",
      name: "Sarah Thompson",
      email: "sarah.thompson@email.com",
      phone: "+1 (555) 567-8901",
      location: "Phoenix, AZ",
      avatar: AvatarService.getClientAvatar("Sarah Thompson"),
      joinDate: "2023-07-18",
      totalBookings: 9,
      completedBookings: 8,
      averageRating: 4.7,
      preferredServices: ["Electrical", "Smart Home"],
      lastBooking: "2024-01-14",
      status: "active",
      totalSpent: 780,
    },
    {
      id: "6",
      name: "Michael Brown",
      email: "michael.brown@email.com",
      phone: "+1 (555) 678-9012",
      location: "Philadelphia, PA",
      avatar: AvatarService.getClientAvatar("Michael Brown"),
      joinDate: "2023-05-30",
      totalBookings: 4,
      completedBookings: 3,
      averageRating: 4.2,
      preferredServices: ["Computer Repair"],
      lastBooking: "2023-12-20",
      status: "inactive",
      totalSpent: 340,
    },
    {
      id: "7",
      name: "Jennifer Davis",
      email: "jennifer.davis@email.com",
      phone: "+1 (555) 789-0123",
      location: "San Antonio, TX",
      avatar: AvatarService.getClientAvatar("Jennifer Davis"),
      joinDate: "2023-11-12",
      totalBookings: 11,
      completedBookings: 10,
      averageRating: 4.8,
      preferredServices: ["HVAC", "Maintenance"],
      lastBooking: "2024-01-16",
      status: "premium",
      totalSpent: 1120,
    },
    {
      id: "8",
      name: "James Miller",
      email: "james.miller@email.com",
      phone: "+1 (555) 890-1234",
      location: "San Diego, CA",
      avatar: AvatarService.getClientAvatar("James Miller"),
      joinDate: "2023-03-25",
      totalBookings: 7,
      completedBookings: 6,
      averageRating: 4.5,
      preferredServices: ["Plumbing", "Appliance Repair"],
      lastBooking: "2024-01-10",
      status: "active",
      totalSpent: 650,
    },
    {
      id: "9",
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "+1 (555) 901-2345",
      location: "Dallas, TX",
      avatar: AvatarService.getClientAvatar("Lisa Anderson"),
      joinDate: "2023-10-08",
      totalBookings: 13,
      completedBookings: 12,
      averageRating: 4.9,
      preferredServices: ["Electrical", "Installation", "Smart Home"],
      lastBooking: "2024-01-17",
      status: "premium",
      totalSpent: 1450,
    },
    {
      id: "10",
      name: "Kevin Garcia",
      email: "kevin.garcia@email.com",
      phone: "+1 (555) 012-3456",
      location: "San Jose, CA",
      avatar: AvatarService.getClientAvatar("Kevin Garcia"),
      joinDate: "2023-12-01",
      totalBookings: 3,
      completedBookings: 2,
      averageRating: 4.3,
      preferredServices: ["Computer Repair", "Network Setup"],
      lastBooking: "2024-01-05",
      status: "active",
      totalSpent: 280,
    },
  ]

  // Filter clients
  const filteredClients = allClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || client.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Pagination
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage)
  const startIndex = (currentPage - 1) * clientsPerPage
  const endIndex = startIndex + clientsPerPage
  const currentClients = filteredClients.slice(startIndex, endIndex)

  const stats = {
    totalClients: allClients.length,
    activeClients: allClients.filter((c) => c.status === "active").length,
    premiumClients: allClients.filter((c) => c.status === "premium").length,
    totalRevenue: allClients.reduce((sum, c) => sum + c.totalSpent, 0),
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-foreground">
              TechConnect
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link href="/admin">
                <Button>Admin Panel</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Client Management</h1>
          <p className="text-muted-foreground">Manage and view client profiles and booking history</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Clients</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalClients}</p>
                </div>
                <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Clients</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activeClients}</p>
                </div>
                <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Premium Clients</p>
                  <p className="text-2xl font-bold text-foreground">{stats.premiumClients}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-600/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600 fill-current" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-purple-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Controls */}
        <Card className="bg-card border-border mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-muted-foreground text-sm">
                Showing {currentClients.length} of {filteredClients.length} clients
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentClients.map((client) => (
            <Card
              key={client.id}
              className="bg-card border-border hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-16 h-16 border-2 border-primary">
                      <AvatarImage
                        src={client.avatar || "/placeholder.svg"}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = AvatarService.generateRandomAvatar(64)
                        }}
                      />
                      <AvatarFallback className="text-lg">
                        {client.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-foreground font-semibold text-lg">{client.name}</h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="w-3 h-3 mr-1" />
                        {client.location}
                      </div>
                    </div>
                  </div>
                  <Badge
                    className={
                      client.status === "premium"
                        ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                        : client.status === "active"
                          ? "bg-green-500/10 text-green-600 border-green-500/20"
                          : "bg-gray-500/10 text-gray-600 border-gray-500/20"
                    }
                  >
                    {client.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.email}
                  </div>
                  <div className="flex items-center text-muted-foreground text-sm">
                    <Phone className="w-4 h-4 mr-2" />
                    {client.phone}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-foreground">{client.totalBookings}</div>
                    <div className="text-muted-foreground text-xs">Total Bookings</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold text-foreground">${client.totalSpent}</div>
                    <div className="text-muted-foreground text-xs">Total Spent</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-foreground font-medium">{client.averageRating}</span>
                    <span className="text-muted-foreground text-sm ml-1">rating</span>
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {client.completedBookings}/{client.totalBookings} completed
                  </div>
                </div>

                {/* Preferred Services */}
                <div>
                  <div className="text-muted-foreground text-sm mb-2">Preferred Services:</div>
                  <div className="flex flex-wrap gap-1">
                    {client.preferredServices.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary text-xs">
                        {service}
                      </Badge>
                    ))}
                    {client.preferredServices.length > 3 && (
                      <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                        +{client.preferredServices.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Last Booking */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last booking:</span>
                  <span className="text-foreground">{new Date(client.lastBooking).toLocaleDateString()}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Link href={`/client/${client.id}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 hover:bg-accent hover:text-accent-foreground bg-transparent"
                    >
                      View Profile
                    </Button>
                  </Link>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

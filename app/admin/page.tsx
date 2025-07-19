"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Search,
  Eye,
  Edit,
  UserCheck,
  AlertTriangle,
  FileText,
  Download,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AvatarService } from "@/lib/avatar-service"
import Link from "next/link"

interface Technician {
  id: string
  name: string
  email: string
  phone: string
  skills: string[]
  experience: string
  hourlyRate: number
  rating: number
  completedJobs: number
  status: "pending" | "approved" | "rejected" | "suspended"
  joinDate: string
  avatar: string
  documents: string[]
  bio?: string
}

interface Booking {
  id: string
  technicianId: string
  technicianName: string
  clientName: string
  clientEmail: string
  service: string
  date: string
  time: string
  status: "pending" | "approved" | "rejected" | "completed" | "cancelled"
  amount: number
  createdAt: string
  description?: string
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTechnician, setSelectedTechnician] = useState<Technician | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  // Mock data with generated avatars
  const [technicians, setTechnicians] = useState<Technician[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      skills: ["Plumbing", "Electrical"],
      experience: "10+ years",
      hourlyRate: 75,
      rating: 4.8,
      completedJobs: 150,
      status: "pending",
      joinDate: "2024-01-15",
      avatar: AvatarService.getTechnicianAvatar("John Smith"),
      documents: ["license.pdf", "insurance.pdf", "certification.pdf"],
      bio: "Experienced plumber and electrician with over 10 years in the field.",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 (555) 234-5678",
      skills: ["Computer Repair", "Network Setup"],
      experience: "8 years",
      hourlyRate: 85,
      rating: 4.9,
      completedJobs: 200,
      status: "approved",
      joinDate: "2024-01-10",
      avatar: AvatarService.getTechnicianAvatar("Sarah Johnson"),
      documents: ["license.pdf", "certification.pdf"],
      bio: "IT specialist focusing on computer repair and network solutions.",
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike@example.com",
      phone: "+1 (555) 345-6789",
      skills: ["HVAC", "Appliance Repair"],
      experience: "12 years",
      hourlyRate: 90,
      rating: 4.7,
      completedJobs: 180,
      status: "approved",
      joinDate: "2024-01-05",
      avatar: AvatarService.getTechnicianAvatar("Mike Davis"),
      documents: ["license.pdf", "insurance.pdf"],
      bio: "HVAC and appliance repair specialist with extensive experience.",
    },
  ])

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      technicianId: "1",
      technicianName: "John Smith",
      clientName: "Alice Brown",
      clientEmail: "alice@example.com",
      service: "Plumbing Repair",
      date: "2024-01-20",
      time: "10:00",
      status: "pending",
      amount: 150,
      createdAt: "2024-01-18",
      description: "Kitchen faucet repair needed urgently.",
    },
    {
      id: "2",
      technicianId: "2",
      technicianName: "Sarah Johnson",
      clientName: "Bob Wilson",
      clientEmail: "bob@example.com",
      service: "Computer Repair",
      date: "2024-01-21",
      time: "14:00",
      status: "approved",
      amount: 200,
      createdAt: "2024-01-17",
      description: "Laptop not booting, possible hardware issue.",
    },
  ])

  const stats = {
    totalTechnicians: technicians.length,
    pendingApprovals: technicians.filter((t) => t.status === "pending").length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === "pending").length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.amount, 0),
    approvedTechnicians: technicians.filter((t) => t.status === "approved").length,
  }

  const handleTechnicianAction = (technicianId: string, action: "approve" | "reject" | "suspend") => {
    setTechnicians((prev) =>
      prev.map((tech) =>
        tech.id === technicianId
          ? { ...tech, status: action === "approve" ? "approved" : action === "reject" ? "rejected" : "suspended" }
          : tech,
      ),
    )

    // Send notification (mock)
    const technician = technicians.find((t) => t.id === technicianId)
    if (technician) {
      console.log(`Notification sent to ${technician.email}: Application ${action}d`)
    }
  }

  const handleBookingAction = (bookingId: string, action: "approve" | "reject") => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: action === "approve" ? "approved" : "rejected" } : booking,
      ),
    )

    // Send notifications (mock)
    const booking = bookings.find((b) => b.id === bookingId)
    if (booking) {
      console.log(`Notification sent to ${booking.clientEmail}: Booking ${action}d`)
      console.log(`Notification sent to technician: Booking ${action}d`)
    }
  }

  const filteredTechnicians = technicians.filter((tech) => {
    const matchesSearch =
      tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || tech.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.technicianName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-foreground">
              TechConnect Admin
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link href="/search">
                <Button variant="outline">Search</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage technicians, bookings, and platform operations</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Technicians</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalTechnicians}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex items-center mt-2 text-green-500 text-sm">
                <UserCheck className="w-4 h-4 mr-1" />
                {stats.approvedTechnicians} approved
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Pending Approvals</p>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingApprovals}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="flex items-center mt-2 text-yellow-500 text-sm">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Requires attention
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Bookings</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-500" />
              </div>
              <div className="flex items-center mt-2 text-purple-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {stats.pendingBookings} pending
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">${stats.totalRevenue}</p>
                </div>
                <Star className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center mt-2 text-green-500 text-sm">
                <CheckCircle className="w-4 h-4 mr-1" />
                Platform earnings
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-muted mb-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background">
              Overview
            </TabsTrigger>
            <TabsTrigger value="technicians" className="data-[state=active]:bg-background">
              Technicians
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-background">
              Bookings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Technician Applications */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {technicians
                      .filter((t) => t.status === "pending")
                      .slice(0, 3)
                      .map((tech) => (
                        <div key={tech.id} className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-10 h-10">
                                <AvatarImage src={tech.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{tech.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="text-foreground font-medium">{tech.name}</h4>
                                <p className="text-muted-foreground text-sm">{tech.skills.join(", ")}</p>
                              </div>
                            </div>
                            <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Pending</Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => handleTechnicianAction(tech.id, "approve")}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleTechnicianAction(tech.id, "reject")}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setSelectedTechnician(tech)}>
                                  <Eye className="w-4 h-4 mr-1" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Technician Details</DialogTitle>
                                </DialogHeader>
                                {selectedTechnician && (
                                  <div className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                      <Avatar className="w-16 h-16">
                                        <AvatarImage src={selectedTechnician.avatar || "/placeholder.svg"} />
                                        <AvatarFallback>{selectedTechnician.name[0]}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h3 className="text-lg font-semibold">{selectedTechnician.name}</h3>
                                        <p className="text-muted-foreground">{selectedTechnician.email}</p>
                                        <p className="text-muted-foreground">{selectedTechnician.phone}</p>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium">Experience</label>
                                        <p className="text-muted-foreground">{selectedTechnician.experience}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium">Hourly Rate</label>
                                        <p className="text-muted-foreground">${selectedTechnician.hourlyRate}/hr</p>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Skills</label>
                                      <div className="flex flex-wrap gap-2 mt-1">
                                        {selectedTechnician.skills.map((skill, index) => (
                                          <Badge key={index} variant="secondary">
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Documents</label>
                                      <div className="flex flex-wrap gap-2 mt-1">
                                        {selectedTechnician.documents.map((doc, index) => (
                                          <Button key={index} variant="outline" size="sm">
                                            <FileText className="w-4 h-4 mr-1" />
                                            {doc}
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Bookings */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="bg-muted/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="text-foreground font-medium">{booking.service}</h4>
                            <p className="text-muted-foreground text-sm">
                              {booking.clientName} → {booking.technicianName}
                            </p>
                          </div>
                          <Badge
                            className={
                              booking.status === "approved"
                                ? "bg-green-500/10 text-green-600 border-green-500/20"
                                : booking.status === "pending"
                                  ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                  : "bg-red-500/10 text-red-600 border-red-500/20"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {booking.date} at {booking.time}
                          </span>
                          <span className="text-foreground font-medium">${booking.amount}</span>
                        </div>
                        <div className="flex space-x-2 mt-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => setSelectedBooking(booking)}>
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Booking Details</DialogTitle>
                              </DialogHeader>
                              {selectedBooking && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium">Service</label>
                                      <p className="text-muted-foreground">{selectedBooking.service}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Amount</label>
                                      <p className="text-muted-foreground">${selectedBooking.amount}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Client</label>
                                      <p className="text-muted-foreground">{selectedBooking.clientName}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Technician</label>
                                      <p className="text-muted-foreground">{selectedBooking.technicianName}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Date & Time</label>
                                      <p className="text-muted-foreground">
                                        {selectedBooking.date} at {selectedBooking.time}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium">Status</label>
                                      <Badge className="ml-2">{selectedBooking.status}</Badge>
                                    </div>
                                  </div>
                                  {selectedBooking.description && (
                                    <div>
                                      <label className="text-sm font-medium">Description</label>
                                      <p className="text-muted-foreground">{selectedBooking.description}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="technicians">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <CardTitle className="text-foreground">Technician Management</CardTitle>
                  <div className="flex space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search technicians..."
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
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTechnicians.map((tech) => (
                    <div key={tech.id} className="bg-muted/50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={tech.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-lg">{tech.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-foreground font-semibold text-lg">{tech.name}</h3>
                            <p className="text-muted-foreground">{tech.email}</p>
                            <p className="text-muted-foreground text-sm">{tech.phone}</p>
                          </div>
                        </div>
                        <Badge
                          className={
                            tech.status === "approved"
                              ? "bg-green-500/10 text-green-600 border-green-500/20"
                              : tech.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                : tech.status === "rejected"
                                  ? "bg-red-500/10 text-red-600 border-red-500/20"
                                  : "bg-gray-500/10 text-gray-600 border-gray-500/20"
                          }
                        >
                          {tech.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-foreground font-medium mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {tech.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Experience:</span>
                            <span className="text-foreground">{tech.experience}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Rate:</span>
                            <span className="text-foreground">${tech.hourlyRate}/hr</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Rating:</span>
                            <span className="text-foreground flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                              {tech.rating}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Jobs:</span>
                            <span className="text-foreground">{tech.completedJobs}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link href={`/technician/${tech.id}`}>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            View Profile
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          Documents
                        </Button>
                        {tech.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleTechnicianAction(tech.id, "approve")}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleTechnicianAction(tech.id, "reject")}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        {tech.status === "approved" && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleTechnicianAction(tech.id, "suspend")}
                          >
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Suspend
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <CardTitle className="text-foreground">Booking Management</CardTitle>
                  <div className="flex space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search bookings..."
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
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredBookings.map((booking) => (
                    <div key={booking.id} className="bg-muted/50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-foreground font-semibold text-lg">{booking.service}</h3>
                          <p className="text-muted-foreground">Booking ID: {booking.id}</p>
                        </div>
                        <Badge
                          className={
                            booking.status === "approved"
                              ? "bg-green-500/10 text-green-600 border-green-500/20"
                              : booking.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                                : booking.status === "completed"
                                  ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                  : "bg-red-500/10 text-red-600 border-red-500/20"
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Client:</span>
                            <span className="text-foreground">{booking.clientName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="text-foreground">{booking.clientEmail}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Technician:</span>
                            <span className="text-foreground">{booking.technicianName}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date:</span>
                            <span className="text-foreground">{booking.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time:</span>
                            <span className="text-foreground">{booking.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount:</span>
                            <span className="text-foreground font-semibold">${booking.amount}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedBooking(booking)}>
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Booking Details</DialogTitle>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Service</label>
                                    <p className="text-muted-foreground">{selectedBooking.service}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Amount</label>
                                    <p className="text-muted-foreground">${selectedBooking.amount}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Client</label>
                                    <p className="text-muted-foreground">{selectedBooking.clientName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Technician</label>
                                    <p className="text-muted-foreground">{selectedBooking.technicianName}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Date & Time</label>
                                    <p className="text-muted-foreground">
                                      {selectedBooking.date} at {selectedBooking.time}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Status</label>
                                    <Badge className="ml-2">{selectedBooking.status}</Badge>
                                  </div>
                                </div>
                                {selectedBooking.description && (
                                  <div>
                                    <label className="text-sm font-medium">Description</label>
                                    <p className="text-muted-foreground">{selectedBooking.description}</p>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        {booking.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleBookingAction(booking.id, "approve")}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleBookingAction(booking.id, "reject")}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

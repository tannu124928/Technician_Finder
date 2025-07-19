"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MessageCircle, Calendar, DollarSign, Star, TrendingUp, Users, Clock, MapPin } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationCenter } from "@/components/notification-center"
import { AvatarService } from "@/lib/avatar-service"

export default function DashboardPage() {
  const [userType] = useState<"client" | "technician">("technician") // This would come from auth

  const stats = {
    totalEarnings: 2450,
    completedJobs: 18,
    averageRating: 4.8,
    activeRequests: 3,
  }

  const recentJobs = [
    {
      id: "1",
      title: "Kitchen Faucet Repair",
      client: "Sarah Johnson",
      status: "completed",
      amount: 150,
      date: "2024-01-15",
    },
    {
      id: "2",
      title: "Electrical Outlet Installation",
      client: "Mike Davis",
      status: "in-progress",
      amount: 200,
      date: "2024-01-16",
    },
    {
      id: "3",
      title: "HVAC Maintenance",
      client: "Lisa Chen",
      status: "pending",
      amount: 120,
      date: "2024-01-17",
    },
  ]

  const upcomingAppointments = [
    {
      id: "1",
      title: "Plumbing Inspection",
      client: "John Doe",
      time: "10:00 AM",
      date: "Today",
      location: "123 Main St",
    },
    {
      id: "2",
      title: "Electrical Repair",
      client: "Jane Smith",
      time: "2:00 PM",
      date: "Tomorrow",
      location: "456 Oak Ave",
    },
  ]

  const messages = [
    {
      id: "1",
      sender: "Sarah Johnson",
      message: "Thank you for the excellent work!",
      time: "5 min ago",
      unread: true,
    },
    {
      id: "2",
      sender: "Mike Davis",
      message: "When can you start the project?",
      time: "1 hour ago",
      unread: true,
    },
  ]

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
              <NotificationCenter recipient="current-user@example.com" />
              <ThemeToggle />
              <Link href="/profile">
                <Avatar className="w-8 h-8 border-2 border-primary">
                  <AvatarImage src={AvatarService.getTechnicianAvatar("John Smith", 32) || "/placeholder.svg"} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, John! 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your business today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Earnings</p>
                  <p className="text-2xl font-bold text-foreground">${stats.totalEarnings}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center mt-2 text-green-500 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Completed Jobs</p>
                  <p className="text-2xl font-bold text-foreground">{stats.completedJobs}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex items-center mt-2 text-blue-500 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +3 this week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Average Rating</p>
                  <p className="text-2xl font-bold text-foreground">{stats.averageRating}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500 fill-current" />
              </div>
              <div className="flex items-center mt-2 text-yellow-500 text-sm">
                <Star className="w-4 h-4 mr-1 fill-current" />
                Excellent rating
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Requests</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activeRequests}</p>
                </div>
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
              <div className="flex items-center mt-2 text-purple-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                Respond quickly
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-foreground font-medium">{job.title}</h3>
                        <Badge
                          className={
                            job.status === "completed"
                              ? "bg-green-500/10 text-green-600 border-green-500/20"
                              : job.status === "in-progress"
                                ? "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                : "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Client: {job.client}</span>
                        <span className="text-foreground font-medium">${job.amount}</span>
                      </div>
                      <div className="text-muted-foreground text-xs mt-1">
                        {new Date(job.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full bg-transparent">
                    View All Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="bg-muted/50 rounded-lg p-3">
                      <h4 className="text-foreground font-medium text-sm">{appointment.title}</h4>
                      <p className="text-muted-foreground text-xs">{appointment.client}</p>
                      <div className="flex items-center justify-between mt-2 text-xs">
                        <span className="text-primary">
                          {appointment.date} at {appointment.time}
                        </span>
                      </div>
                      <div className="flex items-center text-muted-foreground text-xs mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {appointment.location}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-foreground font-medium text-sm">{message.sender}</h4>
                        {message.unread && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                      </div>
                      <p className="text-muted-foreground text-xs truncate">{message.message}</p>
                      <p className="text-muted-foreground text-xs mt-1">{message.time}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/messages">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Messages
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/search">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Search className="w-4 h-4 mr-2" />
                    Find New Clients
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button variant="outline" className="w-full bg-transparent">
                    Update Profile
                  </Button>
                </Link>
                <Link href="/payment">
                  <Button variant="outline" className="w-full bg-transparent">
                    Payment History
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Phone, Mail, Calendar, Award, Clock, MessageCircle, ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AvatarService } from "@/lib/avatar-service"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Technician {
  id: string
  name: string
  email: string
  phone: string
  location: string
  avatar: string
  skills: string[]
  experience: string
  hourlyRate: number
  rating: number
  completedJobs: number
  joinDate: string
  bio: string
  availability: string
  certifications: string[]
  languages: string[]
  serviceAreas: string[]
}

interface Review {
  id: string
  clientName: string
  rating: number
  comment: string
  date: string
  service: string
}

interface Portfolio {
  id: string
  title: string
  description: string
  images: string[]
  completedDate: string
  category: string
}

export default function TechnicianProfilePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [technician, setTechnician] = useState<Technician | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [portfolio, setPortfolio] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data - in real app, this would be an API call
    const mockTechnician: Technician = {
      id: params.id,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      avatar: AvatarService.getTechnicianAvatar("John Smith", 150),
      skills: ["Plumbing", "Electrical", "HVAC", "Installation"],
      experience: "10+ years",
      hourlyRate: 75,
      rating: 4.8,
      completedJobs: 150,
      joinDate: "2020-03-15",
      bio: "Experienced technician with over 10 years in plumbing, electrical, and HVAC systems. Committed to providing quality service and customer satisfaction. Licensed and insured professional with expertise in residential and commercial projects.",
      availability: "Monday - Friday: 8 AM - 6 PM, Saturday: 9 AM - 4 PM",
      certifications: ["Licensed Plumber", "Electrical Contractor", "HVAC Certified", "EPA Certified"],
      languages: ["English", "Spanish"],
      serviceAreas: ["Manhattan", "Brooklyn", "Queens", "Bronx"],
    }

    const mockReviews: Review[] = [
      {
        id: "1",
        clientName: "Sarah Johnson",
        rating: 5,
        comment:
          "Excellent work! John fixed my plumbing issue quickly and professionally. Very knowledgeable and clean work area. Highly recommend!",
        date: "2024-01-15",
        service: "Plumbing Repair",
      },
      {
        id: "2",
        clientName: "Mike Davis",
        rating: 5,
        comment:
          "Outstanding electrical work. John installed new outlets and fixed wiring issues. Very professional and reasonably priced.",
        date: "2024-01-10",
        service: "Electrical Installation",
      },
      {
        id: "3",
        clientName: "Lisa Chen",
        rating: 4,
        comment:
          "Good service for HVAC maintenance. Arrived on time and completed the job efficiently. Will use again.",
        date: "2024-01-05",
        service: "HVAC Maintenance",
      },
      {
        id: "4",
        clientName: "Robert Wilson",
        rating: 5,
        comment:
          "John is fantastic! Fixed multiple issues in one visit. Very thorough and explains everything clearly.",
        date: "2023-12-28",
        service: "General Repair",
      },
    ]

    const mockPortfolio: Portfolio[] = [
      {
        id: "1",
        title: "Kitchen Renovation - Plumbing & Electrical",
        description:
          "Complete kitchen renovation including new plumbing lines, electrical outlets, and appliance installations.",
        images: ["/placeholder.svg?height=200&width=300"],
        completedDate: "2024-01-10",
        category: "Renovation",
      },
      {
        id: "2",
        title: "Commercial HVAC System Installation",
        description: "Installed new HVAC system for a 5,000 sq ft office building including ductwork and controls.",
        images: ["/placeholder.svg?height=200&width=300"],
        completedDate: "2023-12-15",
        category: "Commercial",
      },
      {
        id: "3",
        title: "Smart Home Electrical Setup",
        description: "Wired smart home system with automated lighting, security, and climate control integration.",
        images: ["/placeholder.svg?height=200&width=300"],
        completedDate: "2023-11-20",
        category: "Smart Home",
      },
    ]

    setTechnician(mockTechnician)
    setReviews(mockReviews)
    setPortfolio(mockPortfolio)
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

  if (!technician) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Technician Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested technician profile could not be found.</p>
          <Link href="/search">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    )
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
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8 bg-card border-border">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <Avatar className="w-32 h-32 border-4 border-primary">
                <AvatarImage
                  src={technician.avatar || "/placeholder.svg"}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = AvatarService.generateRandomAvatar(128)
                  }}
                />
                <AvatarFallback className="text-3xl">{technician.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">{technician.name}</h1>
                    <div className="flex items-center space-x-4 text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {technician.location}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" />
                        {technician.rating} ({technician.completedJobs} reviews)
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        {technician.availability.includes("Available") ? "Available" : "Busy"}
                      </Badge>
                      <Badge variant="outline">{technician.experience}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary mb-2">${technician.hourlyRate}/hr</div>
                    <div className="space-x-2">
                      <Link href={`/booking/${technician.id}`}>
                        <Button size="lg" className="bg-primary hover:bg-primary/90">
                          Book Now
                        </Button>
                      </Link>
                      <Button size="lg" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">{technician.completedJobs}</div>
                    <div className="text-muted-foreground text-sm">Jobs Completed</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">{technician.rating}</div>
                    <div className="text-muted-foreground text-sm">Average Rating</div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {new Date().getFullYear() - new Date(technician.joinDate).getFullYear()}
                    </div>
                    <div className="text-muted-foreground text-sm">Years on Platform</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {technician.skills.map((skill, index) => (
                    <Badge key={index} className="bg-primary/10 text-primary border-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="about" className="data-[state=active]:bg-background">
              About
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-background">
              Reviews
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-background">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-background">
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{technician.bio}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {technician.skills.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-foreground">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {technician.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="w-full justify-start">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Availability
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{technician.availability}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Service Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {technician.serviceAreas.map((area, index) => (
                        <div key={index} className="text-muted-foreground text-sm">
                          {area}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Customer Reviews ({reviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage
                              src={AvatarService.getClientAvatar(review.clientName, 40) || "/placeholder.svg"}
                            />
                            <AvatarFallback>{review.clientName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="text-foreground font-medium">{review.clientName}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {review.service}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-500 fill-current" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-2">{review.comment}</p>
                      <p className="text-muted-foreground text-sm">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.map((project) => (
                <Card key={project.id} className="bg-card border-border overflow-hidden">
                  <div className="aspect-video bg-muted">
                    <img
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-foreground font-semibold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{project.category}</Badge>
                      <span className="text-muted-foreground text-xs">
                        {new Date(project.completedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                      <div className="text-muted-foreground">{technician.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-foreground font-medium">Phone</div>
                      <div className="text-muted-foreground">{technician.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="text-foreground font-medium">Location</div>
                      <div className="text-muted-foreground">{technician.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href={`/booking/${technician.id}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Appointment
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
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

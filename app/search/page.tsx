"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Star, Clock, Filter } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AvatarService } from "@/lib/avatar-service"
import Link from "next/link"

interface Technician {
  id: string
  name: string
  skills: string[]
  rating: number
  distance: number
  hourlyRate: number
  availability: string
  image: string
  completedJobs: number
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchRadius, setSearchRadius] = useState([10])
  const [selectedSkill, setSelectedSkill] = useState("allSkills")
  const [technicians, setTechnicians] = useState<Technician[]>([])
  const [filteredTechnicians, setFilteredTechnicians] = useState<Technician[]>([])

  // Mock data with generated avatars
  const mockTechnicians: Technician[] = [
    {
      id: "1",
      name: "John Smith",
      skills: ["Plumbing", "Electrical", "HVAC"],
      rating: 4.8,
      distance: 2.5,
      hourlyRate: 75,
      availability: "Available now",
      image: AvatarService.getTechnicianAvatar("John Smith"),
      completedJobs: 150,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      skills: ["Computer Repair", "Network Setup", "Software Installation"],
      rating: 4.9,
      distance: 5.2,
      hourlyRate: 85,
      availability: "Available today",
      image: AvatarService.getTechnicianAvatar("Sarah Johnson"),
      completedJobs: 200,
    },
    {
      id: "3",
      name: "Mike Davis",
      skills: ["Appliance Repair", "Installation", "Maintenance"],
      rating: 4.7,
      distance: 8.1,
      hourlyRate: 65,
      availability: "Available tomorrow",
      image: AvatarService.getTechnicianAvatar("Mike Davis"),
      completedJobs: 120,
    },
    {
      id: "4",
      name: "Lisa Chen",
      skills: ["Mobile Repair", "Data Recovery", "Hardware Upgrade"],
      rating: 4.9,
      distance: 12.3,
      hourlyRate: 90,
      availability: "Available now",
      image: AvatarService.getTechnicianAvatar("Lisa Chen"),
      completedJobs: 180,
    },
  ]

  useEffect(() => {
    setTechnicians(mockTechnicians)
    setFilteredTechnicians(mockTechnicians)
  }, [])

  useEffect(() => {
    const filtered = technicians.filter(
      (tech) =>
        tech.distance <= searchRadius[0] &&
        (selectedSkill === "allSkills" ||
          tech.skills.some((skill) => skill.toLowerCase().includes(selectedSkill.toLowerCase()))) &&
        (searchQuery === "" ||
          tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tech.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))),
    )
    setFilteredTechnicians(filtered)
  }, [searchRadius, selectedSkill, searchQuery, technicians])

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
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">Find Expert Technicians</h1>

        {/* Search Filters */}
        <Card className="mb-8 bg-card border-border">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or skill..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger>
                  <SelectValue placeholder="Select skill category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="allSkills">All Skills</SelectItem>
                  <SelectItem value="plumbing">Plumbing</SelectItem>
                  <SelectItem value="electrical">Electrical</SelectItem>
                  <SelectItem value="computer">Computer Repair</SelectItem>
                  <SelectItem value="appliance">Appliance Repair</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Filter className="w-4 h-4 mr-2" />
                Apply Filters
              </Button>
            </div>

            {/* Search Radius Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-foreground font-medium">Search Radius</label>
                <span className="text-primary">{searchRadius[0]} miles</span>
              </div>
              <Slider
                value={searchRadius}
                onValueChange={setSearchRadius}
                max={50}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground">
                Showing {filteredTechnicians.length} technicians within {searchRadius[0]} miles
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technician Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechnicians.map((technician) => (
            <Card
              key={technician.id}
              className="bg-card border-border hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={technician.image || "/placeholder.svg"}
                    alt={technician.name}
                    className="w-16 h-16 rounded-full border-2 border-primary"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = AvatarService.generateRandomAvatar(64)
                    }}
                  />
                  <div>
                    <CardTitle className="text-foreground">{technician.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400">{technician.rating}</span>
                      <span className="text-muted-foreground">({technician.completedJobs} jobs)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1">
                    {technician.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {technician.distance} miles away
                    </div>
                    <div className="text-green-500">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {technician.availability}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">${technician.hourlyRate}/hr</span>
                    <div className="space-x-2">
                      <Link href={`/technician/${technician.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:bg-accent hover:text-accent-foreground bg-transparent"
                        >
                          View Profile
                        </Button>
                      </Link>
                      <Link href={`/booking/${technician.id}`}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTechnicians.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No technicians found</h3>
            <p className="text-muted-foreground">Try expanding your search radius or adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}

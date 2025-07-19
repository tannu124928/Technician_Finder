"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Award, Edit, Camera, Plus, X } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [skills, setSkills] = useState(["Plumbing", "Electrical", "HVAC"])
  const [newSkill, setNewSkill] = useState("")
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    bio: "Experienced technician with over 10 years in plumbing, electrical, and HVAC systems. Committed to providing quality service and customer satisfaction.",
    hourlyRate: 75,
    experience: "10+ years",
    availability: "Available weekdays 9 AM - 6 PM",
  })

  const reviews = [
    {
      id: "1",
      client: "Sarah Johnson",
      rating: 5,
      comment: "Excellent work! Fixed my plumbing issue quickly and professionally.",
      date: "2024-01-15",
      service: "Plumbing Repair",
    },
    {
      id: "2",
      client: "Mike Davis",
      rating: 5,
      comment: "Very knowledgeable and efficient. Highly recommended!",
      date: "2024-01-10",
      service: "Electrical Installation",
    },
    {
      id: "3",
      client: "Lisa Chen",
      rating: 4,
      comment: "Good service, arrived on time and completed the job well.",
      date: "2024-01-05",
      service: "HVAC Maintenance",
    },
  ]

  const completedJobs = [
    {
      id: "1",
      title: "Kitchen Faucet Repair",
      client: "Sarah Johnson",
      date: "2024-01-15",
      amount: 150,
      status: "Completed",
    },
    {
      id: "2",
      title: "Ceiling Fan Installation",
      client: "Mike Davis",
      date: "2024-01-10",
      amount: 200,
      status: "Completed",
    },
    {
      id: "3",
      title: "AC Unit Maintenance",
      client: "Lisa Chen",
      date: "2024-01-05",
      amount: 120,
      status: "Completed",
    },
  ]

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8 bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-purple-400">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" />
                    <AvatarFallback className="text-2xl">{profileData.name[0]}</AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">{profileData.name}</h1>
                      <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-300">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {profileData.location}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                          {averageRating.toFixed(1)} ({reviews.length} reviews)
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-white">${profileData.hourlyRate}</div>
                      <div className="text-gray-300 text-sm">Per Hour</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-white">{completedJobs.length}</div>
                      <div className="text-gray-300 text-sm">Jobs Completed</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-white">{profileData.experience}</div>
                      <div className="text-gray-300 text-sm">Experience</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {skills.map((skill, index) => (
                      <Badge key={index} className="bg-purple-600/50 text-white">
                        {skill}
                        {isEditing && (
                          <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-300">
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <div className="flex items-center space-x-2">
                        <Input
                          placeholder="Add skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          className="w-24 h-6 text-xs bg-white/20 border-white/30 text-white"
                          onKeyPress={(e) => e.key === "Enter" && addSkill()}
                        />
                        <Button size="sm" onClick={addSkill} className="h-6 px-2">
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-lg">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">
                Overview
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-purple-600">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="jobs" className="text-white data-[state=active]:bg-purple-600">
                Job History
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-white data-[state=active]:bg-purple-600">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">About Me</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-300">{profileData.bio}</p>
                    )}
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-white">Email</Label>
                      {isEditing ? (
                        <Input
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="bg-white/20 border-white/30 text-white"
                        />
                      ) : (
                        <p className="text-gray-300">{profileData.email}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-white">Phone</Label>
                      {isEditing ? (
                        <Input
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="bg-white/20 border-white/30 text-white"
                        />
                      ) : (
                        <p className="text-gray-300">{profileData.phone}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-white">Availability</Label>
                      {isEditing ? (
                        <Input
                          value={profileData.availability}
                          onChange={(e) => setProfileData({ ...profileData, availability: e.target.value })}
                          className="bg-white/20 border-white/30 text-white"
                        />
                      ) : (
                        <p className="text-gray-300">{profileData.availability}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    Customer Reviews ({reviews.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-white font-medium">{review.client}</h4>
                            <Badge variant="secondary" className="bg-purple-600/50 text-white text-xs">
                              {review.service}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300 mb-2">{review.comment}</p>
                        <p className="text-gray-400 text-sm">{new Date(review.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Job History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedJobs.map((job) => (
                      <div key={job.id} className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{job.title}</h4>
                          <Badge className="bg-green-600 text-white">{job.status}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-gray-300">
                            <span>Client: {job.client}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(job.date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-white font-medium">${job.amount}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Pricing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-white">Hourly Rate ($)</Label>
                      <Input
                        type="number"
                        value={profileData.hourlyRate}
                        onChange={(e) =>
                          setProfileData({ ...profileData, hourlyRate: Number.parseInt(e.target.value) })
                        }
                        className="bg-white/20 border-white/30 text-white"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-white border-white hover:bg-white hover:text-slate-900 bg-transparent"
                    >
                      Privacy Settings
                    </Button>
                    <Button variant="destructive" className="w-full">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

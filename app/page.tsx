import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MessageCircle, CreditCard, MapPin } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="text-2xl font-bold text-foreground">TechConnect</div>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <Link href="/search">
            <Button
              variant="outline"
              className="text-foreground border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
            >
              Find Technicians
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button className="bg-primary hover:bg-primary/90">Dashboard</Button>
          </Link>
          <Link href="/admin">
            <Button className="bg-secondary hover:bg-secondary/90">Admin Panel</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-foreground mb-6 transform hover:scale-105 transition-transform duration-300">
            Connect with Expert
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              {" "}
              Technicians
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find skilled professionals in your area for all your technical needs. From repairs to installations, we've
            got you covered.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/search">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Find Technicians
              </Button>
            </Link>
            <Link href="/clients">
              <Button
                size="lg"
                variant="outline"
                className="text-foreground border-border hover:bg-accent hover:text-accent-foreground bg-transparent text-lg px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300"
              >
                View Clients
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Search, title: "Smart Search", desc: "Find technicians by skills, location, and availability" },
            { icon: MapPin, title: "Location-Based", desc: "Expandable search radius to find more options" },
            { icon: MessageCircle, title: "Real-Time Chat", desc: "Instant communication with technicians" },
            { icon: CreditCard, title: "Secure Payments", desc: "Safe and encrypted payment processing" },
          ].map((feature, index) => (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur-lg border-border hover:bg-card transition-all duration-300 transform hover:scale-105"
            >
              <CardContent className="p-6 text-center">
                <feature.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-foreground font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 3D Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            { number: "10,000+", label: "Verified Technicians" },
            { number: "50,000+", label: "Jobs Completed" },
            { number: "4.9/5", label: "Average Rating" },
          ].map((stat, index) => (
            <div key={index} className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-4xl font-bold text-foreground mb-2 transform hover:rotate-3 transition-transform">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

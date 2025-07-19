"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, XCircle, Clock, Star } from "lucide-react"

interface Notification {
  id: string
  type: "booking_confirmed" | "booking_cancelled" | "technician_approved" | "payment_received" | "booking_reminder"
  title: string
  message: string
  createdAt: string
  read: boolean
  data?: any
}

export function NotificationCenter({ recipient }: { recipient: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    fetchNotifications()
  }, [recipient])

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/notifications?recipient=${recipient}`)
      const data = await response.json()
      setNotifications(data.notifications || [])
      setUnreadCount(data.notifications?.filter((n: Notification) => !n.read).length || 0)
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    }
  }

  const markAsRead = async (notificationId: string) => {
    // In a real app, this would make an API call to mark as read
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking_confirmed":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "booking_cancelled":
        return <XCircle className="w-5 h-5 text-red-400" />
      case "technician_approved":
        return <Star className="w-5 h-5 text-yellow-400" />
      case "payment_received":
        return <CheckCircle className="w-5 h-5 text-blue-400" />
      case "booking_reminder":
        return <Clock className="w-5 h-5 text-purple-400" />
      default:
        return <Bell className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowNotifications(!showNotifications)}
        className="text-white hover:bg-white/20 relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {showNotifications && (
        <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto bg-gray-800/95 backdrop-blur-lg border-gray-700 z-50">
          <CardHeader className="pb-3">
            <CardTitle className="text-white text-lg">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    notification.read ? "bg-gray-700/30" : "bg-blue-600/20 border border-blue-600/30"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                      <p className="text-gray-300 text-xs mt-1 line-clamp-2">{notification.message}</p>
                      <p className="text-gray-400 text-xs mt-2">{new Date(notification.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

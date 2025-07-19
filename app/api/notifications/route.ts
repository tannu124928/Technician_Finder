import { type NextRequest, NextResponse } from "next/server"

interface Notification {
  id: string
  type: "booking_confirmed" | "booking_cancelled" | "technician_approved" | "payment_received"
  recipient: string
  title: string
  message: string
  data: any
  createdAt: string
  read: boolean
}

// Mock notification storage (in real app, this would be a database)
const notifications: Notification[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, recipient, title, message, data } = body

    const notification: Notification = {
      id: Date.now().toString(),
      type,
      recipient,
      title,
      message,
      data,
      createdAt: new Date().toISOString(),
      read: false,
    }

    notifications.push(notification)

    // In a real app, you would:
    // 1. Save to database
    // 2. Send push notification
    // 3. Send email notification
    // 4. Send SMS if configured

    console.log(`Notification sent to ${recipient}: ${title}`)

    return NextResponse.json({ success: true, notification })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const recipient = searchParams.get("recipient")

  if (!recipient) {
    return NextResponse.json({ error: "Recipient required" }, { status: 400 })
  }

  const userNotifications = notifications
    .filter((n) => n.recipient === recipient)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return NextResponse.json({ notifications: userNotifications })
}

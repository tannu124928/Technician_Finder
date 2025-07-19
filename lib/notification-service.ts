interface NotificationData {
  type: "booking_confirmed" | "booking_cancelled" | "technician_approved" | "payment_received" | "booking_reminder"
  recipient: string
  title: string
  message: string
  data?: any
}

export class NotificationService {
  static async sendNotification(notificationData: NotificationData) {
    try {
      // Send to API endpoint
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notificationData),
      })

      if (!response.ok) {
        throw new Error("Failed to send notification")
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Notification service error:", error)
      throw error
    }
  }

  static async sendBookingConfirmation(booking: any) {
    // Send to client
    await this.sendNotification({
      type: "booking_confirmed",
      recipient: booking.clientEmail,
      title: "Booking Confirmed",
      message: `Your booking with ${booking.technicianName} has been confirmed for ${booking.date} at ${booking.time}.`,
      data: { bookingId: booking.id },
    })

    // Send to technician
    await this.sendNotification({
      type: "booking_confirmed",
      recipient: booking.technicianEmail,
      title: "New Booking Received",
      message: `You have a new booking from ${booking.clientName} for ${booking.service} on ${booking.date} at ${booking.time}.`,
      data: { bookingId: booking.id },
    })

    // Send to admin
    await this.sendNotification({
      type: "booking_confirmed",
      recipient: "admin@techconnect.com",
      title: "New Booking Created",
      message: `New booking created: ${booking.service} - ${booking.clientName} → ${booking.technicianName}`,
      data: { bookingId: booking.id },
    })
  }

  static async sendTechnicianApproval(technician: any, approved: boolean) {
    await this.sendNotification({
      type: "technician_approved",
      recipient: technician.email,
      title: approved ? "Application Approved" : "Application Rejected",
      message: approved
        ? "Congratulations! Your technician application has been approved. You can now start accepting bookings."
        : "We regret to inform you that your technician application has been rejected. Please contact support for more information.",
      data: { technicianId: technician.id, approved },
    })
  }

  static async sendPaymentConfirmation(payment: any) {
    await this.sendNotification({
      type: "payment_received",
      recipient: payment.clientEmail,
      title: "Payment Confirmed",
      message: `Your payment of $${payment.amount} has been processed successfully.`,
      data: { paymentId: payment.id, amount: payment.amount },
    })
  }

  static async sendBookingReminder(booking: any) {
    // Send to client
    await this.sendNotification({
      type: "booking_reminder",
      recipient: booking.clientEmail,
      title: "Booking Reminder",
      message: `Reminder: You have a booking with ${booking.technicianName} tomorrow at ${booking.time}.`,
      data: { bookingId: booking.id },
    })

    // Send to technician
    await this.sendNotification({
      type: "booking_reminder",
      recipient: booking.technicianEmail,
      title: "Booking Reminder",
      message: `Reminder: You have a booking with ${booking.clientName} tomorrow at ${booking.time}.`,
      data: { bookingId: booking.id },
    })
  }
}

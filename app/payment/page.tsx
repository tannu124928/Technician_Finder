"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, Clock, CheckCircle } from "lucide-react"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
  })

  const jobDetails = {
    technician: "John Smith",
    service: "Plumbing Repair",
    duration: "2 hours",
    hourlyRate: 75,
    total: 150,
    serviceFee: 15,
    tax: 13.25,
    finalTotal: 178.25,
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Payment submitted:", formData)
  }

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
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Secure Payment</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Payment Form */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Payment Information
                </CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Payment Method Selection */}
                  <div>
                    <Label className="text-white">Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="apple">Apple Pay</SelectItem>
                        <SelectItem value="google">Google Pay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentMethod === "card" && (
                    <>
                      {/* Card Number */}
                      <div>
                        <Label htmlFor="cardNumber" className="text-white">
                          Card Number
                        </Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                        />
                      </div>

                      {/* Expiry and CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate" className="text-white">
                            Expiry Date
                          </Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-white">
                            CVV
                          </Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                            className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                          />
                        </div>
                      </div>

                      {/* Cardholder Name */}
                      <div>
                        <Label htmlFor="cardName" className="text-white">
                          Cardholder Name
                        </Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={formData.cardName}
                          onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                          className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                        />
                      </div>

                      {/* Billing Address */}
                      <div>
                        <Label htmlFor="billingAddress" className="text-white">
                          Billing Address
                        </Label>
                        <Input
                          id="billingAddress"
                          placeholder="123 Main Street"
                          value={formData.billingAddress}
                          onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
                          className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                        />
                      </div>

                      {/* City and Zip */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city" className="text-white">
                            City
                          </Label>
                          <Input
                            id="city"
                            placeholder="New York"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode" className="text-white">
                            Zip Code
                          </Label>
                          <Input
                            id="zipCode"
                            placeholder="10001"
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                            className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3"
                  >
                    Complete Payment - ${jobDetails.finalTotal}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Technician Info */}
                <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                  <img
                    src="/placeholder.svg?height=50&width=50"
                    alt={jobDetails.technician}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="text-white font-medium">{jobDetails.technician}</h3>
                    <p className="text-gray-300 text-sm">{jobDetails.service}</p>
                    <Badge className="bg-green-600 text-white text-xs">Verified Professional</Badge>
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-white">
                    <span>Service Duration</span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {jobDetails.duration}
                    </span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Hourly Rate</span>
                    <span>${jobDetails.hourlyRate}/hr</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span>Subtotal</span>
                    <span>${jobDetails.total}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Service Fee</span>
                    <span>${jobDetails.serviceFee}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${jobDetails.tax}</span>
                  </div>
                  <Separator className="bg-white/20" />
                  <div className="flex justify-between text-white font-bold text-lg">
                    <span>Total</span>
                    <span>${jobDetails.finalTotal}</span>
                  </div>
                </div>

                {/* Security Features */}
                <div className="space-y-2 pt-4">
                  <div className="flex items-center text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Money-back guarantee</span>
                  </div>
                  <div className="flex items-center text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span>24/7 customer support</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="pt-4">
                  <p className="text-gray-300 text-sm mb-2">We accept:</p>
                  <div className="flex space-x-2">
                    {["Visa", "Mastercard", "PayPal", "Apple Pay"].map((method) => (
                      <div key={method} className="bg-white/20 px-3 py-1 rounded text-xs text-white">
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

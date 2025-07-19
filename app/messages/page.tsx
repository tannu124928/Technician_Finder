"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Phone, Video, MoreVertical, Search } from "lucide-react"

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  type: "text" | "image" | "file"
}

interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: Date
  unread: number
  online: boolean
  userType: "client" | "technician"
}

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data
  const mockConversations: Conversation[] = [
    {
      id: "1",
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "I can help you with that plumbing issue",
      timestamp: new Date(),
      unread: 2,
      online: true,
      userType: "technician",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "When would be a good time to schedule?",
      timestamp: new Date(Date.now() - 3600000),
      unread: 0,
      online: false,
      userType: "technician",
    },
    {
      id: "3",
      name: "Mike Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "The repair is complete!",
      timestamp: new Date(Date.now() - 7200000),
      unread: 1,
      online: true,
      userType: "technician",
    },
  ]

  const mockMessages: Message[] = [
    {
      id: "1",
      senderId: "1",
      content: "Hi! I saw your request for plumbing help. I can assist you with that.",
      timestamp: new Date(Date.now() - 3600000),
      type: "text",
    },
    {
      id: "2",
      senderId: "me",
      content: "Great! I have a leaky faucet in my kitchen. How soon can you come?",
      timestamp: new Date(Date.now() - 3500000),
      type: "text",
    },
    {
      id: "3",
      senderId: "1",
      content: "I can be there this afternoon around 2 PM. Would that work for you?",
      timestamp: new Date(Date.now() - 3400000),
      type: "text",
    },
    {
      id: "4",
      senderId: "me",
      content: "Perfect! See you then.",
      timestamp: new Date(Date.now() - 3300000),
      type: "text",
    },
  ]

  useEffect(() => {
    setConversations(mockConversations)
    if (mockConversations.length > 0) {
      setSelectedConversation(mockConversations[0].id)
      setMessages(mockMessages)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: "me",
        content: newMessage,
        timestamp: new Date(),
        type: "text",
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const selectedConv = conversations.find((c) => c.id === selectedConversation)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-6 py-8 h-screen">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {/* Conversations List */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 flex flex-col">
            <CardHeader>
              <CardTitle className="text-white">Messages</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-2">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedConversation === conversation.id ? "bg-purple-600/50" : "hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-medium truncate">{conversation.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className="bg-purple-600/50 text-white text-xs">
                              {conversation.userType}
                            </Badge>
                            {conversation.unread > 0 && (
                              <Badge className="bg-red-500 text-white text-xs">{conversation.unread}</Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm truncate">{conversation.lastMessage}</p>
                        <p className="text-gray-400 text-xs">
                          {conversation.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <div className="md:col-span-2">
            {selectedConv ? (
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={selectedConv.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{selectedConv.name[0]}</AvatarFallback>
                        </Avatar>
                        {selectedConv.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{selectedConv.name}</h3>
                        <p className="text-gray-300 text-sm">{selectedConv.online ? "Online" : "Last seen recently"}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === "me"
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                              : "bg-white/20 text-white"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t border-white/20">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Select a conversation</h3>
                  <p className="text-gray-300">Choose a conversation to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

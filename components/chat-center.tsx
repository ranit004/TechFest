"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, MessageCircle, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Conversation {
  id: number
  customer: {
    name: string
    avatar: string
  }
  unread: number
  lastMessage: string
  lastMessageTime: string
}

interface Message {
  id: string
  content: string
  sender: "shop" | "customer"
  timestamp: Date
}

interface ChatCenterProps {
  conversations: Conversation[]
  onClose: () => void
}

export function ChatCenter({ conversations, onClose }: ChatCenterProps) {
  const [activeConversation, setActiveConversation] = useState<number | null>(null)
  const [messages, setMessages] = useState<Record<number, Message[]>>({})
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize mock messages for each conversation
    const initialMessages: Record<number, Message[]> = {}

    conversations.forEach((convo) => {
      initialMessages[convo.id] = [
        {
          id: `${convo.id}-1`,
          content: convo.lastMessage,
          sender: "customer",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        },
        {
          id: `${convo.id}-2`,
          content: "Thank you for your message. How can I help you today?",
          sender: "shop",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
        },
      ]
    })

    setMessages(initialMessages)

    // Set first conversation as active if none selected
    if (conversations.length > 0 && activeConversation === null) {
      setActiveConversation(conversations[0].id)
    }
  }, [conversations])

  useEffect(() => {
    scrollToBottom()
  }, [activeConversation, messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || activeConversation === null) return

    // Add shop message
    const shopMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "shop",
      timestamp: new Date(),
    }

    setMessages((prev) => ({
      ...prev,
      [activeConversation]: [...(prev[activeConversation] || []), shopMessage],
    }))
    setNewMessage("")

    // Simulate customer typing
    setIsTyping(true)

    // Simulate customer response after delay
    setTimeout(() => {
      setIsTyping(false)

      const customerResponses = [
        `Thanks for the information!`,
        `That's exactly what I needed to know.`,
        `Great, I'll check that out.`,
        `Do you have any other recommendations?`,
      ]

      const randomResponse = customerResponses[Math.floor(Math.random() * customerResponses.length)]

      const customerMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "customer",
        timestamp: new Date(),
      }

      setMessages((prev) => ({
        ...prev,
        [activeConversation]: [...(prev[activeConversation] || []), customerMessage],
      }))
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:p-6">
      <div className="container h-full max-w-6xl flex flex-col md:rounded-lg md:border md:shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Messages</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Conversations sidebar */}
          <div className="w-80 border-r hidden md:block">
            <div className="p-4">
              <Input placeholder="Search conversations..." />
            </div>
            <div className="overflow-auto h-[calc(100vh-13rem)]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                    activeConversation === conversation.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setActiveConversation(conversation.id)}
                >
                  <Avatar>
                    <AvatarImage src={conversation.customer.avatar} />
                    <AvatarFallback>{conversation.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{conversation.customer.name}</p>
                      <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && <Badge>{conversation.unread}</Badge>}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile view - show conversation list or active conversation */}
          <div className="md:hidden flex-1 flex flex-col">
            {activeConversation === null ? (
              <div className="overflow-auto flex-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b"
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <Avatar>
                      <AvatarImage src={conversation.customer.avatar} />
                      <AvatarFallback>{conversation.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{conversation.customer.name}</p>
                        <span className="text-xs text-muted-foreground">{conversation.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && <Badge>{conversation.unread}</Badge>}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="p-4 border-b flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setActiveConversation(null)}>
                    <ArrowLeft className="h-5 w-5" />
                    <span className="sr-only">Back</span>
                  </Button>
                  {(() => {
                    const conversation = conversations.find((c) => c.id === activeConversation)
                    if (!conversation) return null

                    return (
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={conversation.customer.avatar} />
                          <AvatarFallback>{conversation.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{conversation.customer.name}</span>
                      </div>
                    )
                  })()}
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {activeConversation !== null &&
                    messages[activeConversation]?.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "shop" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "shop" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                            className="h-2 w-2 rounded-full bg-muted-foreground"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
                            className="h-2 w-2 rounded-full bg-muted-foreground"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
                            className="h-2 w-2 rounded-full bg-muted-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Desktop view - active conversation */}
          <div className="hidden md:flex flex-1 flex-col">
            {activeConversation === null ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Select a Conversation</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choose a conversation from the sidebar to start chatting
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 border-b">
                  {(() => {
                    const conversation = conversations.find((c) => c.id === activeConversation)
                    if (!conversation) return null

                    return (
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={conversation.customer.avatar} />
                          <AvatarFallback>{conversation.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{conversation.customer.name}</p>
                          <p className="text-xs text-muted-foreground">Customer</p>
                        </div>
                      </div>
                    )
                  })()}
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {activeConversation !== null &&
                    messages[activeConversation]?.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "shop" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === "shop" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                            className="h-2 w-2 rounded-full bg-muted-foreground"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
                            className="h-2 w-2 rounded-full bg-muted-foreground"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
                            className="h-2 w-2 rounded-full bg-muted-foreground"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  content: string
  sender: "user" | "shop"
  timestamp: Date
}

export default function ProductInquiryPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello! I'm interested in learning more about this product. Can you provide additional details?`,
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
    {
      id: "2",
      content: `Of course! This is one of our most popular items. What specific information would you like to know?`,
      sender: "shop",
      timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
    },
  ]);
  
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample product data
  const product = {
    id: Number.parseInt(params.id),
    name: "Premium Dog Food",
    description: "High-quality nutrition for your canine companion",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200&text=Dog+Food",
    shopName: "Paws & Claws",
    shopAvatar: "/placeholder.svg?height=40&width=40&text=P",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    
    // Simulate shop typing
    setIsTyping(true);
    
    // Simulate shop response after delay
    setTimeout(() => {
      setIsTyping(false);
      
      const shopResponses = [
        `Thank you for your interest in ${product.name}! What would you like to know?`,
        `We have several options available for ${product.name}. Would you like more details?`,
        `${product.name} is one of our best sellers. Is there anything specific you'd like to know about it?`,
        `Feel free to ask any questions about ${product.name} or our other products.`,
      ];
      
      const randomResponse = shopResponses[Math.floor(Math.random() * shopResponses.length)];
      
      const shopMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "shop",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, shopMessage]);
    }, 1500);
  };

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-700 text-white hover:bg-gray-800 mr-4"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Product Inquiry</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={product.shopAvatar} />
                <AvatarFallback>{product.shopName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium">{product.shopName}</h2>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <Link href={`/marketplace/shop/${product.id}`}>
              <Button variant="outline" size="sm">
                Visit Shop
              </Button>
            </Link>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.description}</p>
                <p className="text-sm font-medium mt-1">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="h-[400px] overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </motion.div>
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
          </div>
          
          <Separator />
          
          <form onSubmit={handleSendMessage} className="p-4">
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
        </div>
      </div>
    </div>
  );
} 
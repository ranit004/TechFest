"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetPortal,
  SheetOverlay
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface ChatDrawerProps {
  open: boolean
  onClose: () => void
  shopName: string
}

interface Message {
  id: string
  content: string
  sender: "user" | "shop"
  timestamp: Date
}

export function ChatDrawer({ open, onClose, shopName }: ChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello! Welcome to ${shopName}. How can I help you today?`,
      sender: "shop",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        `Thank you for your message! We'll be happy to help with that.`,
        `We have several options available for what you're looking for.`,
        `Would you like to know more about our products or services?`,
        `Feel free to ask any questions about our items or policies.`,
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
    <Sheet open={open} onOpenChange={onClose}>
      <SheetPortal>
        <SheetOverlay className="backdrop-blur-sm" />
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full bg-gradient-to-br from-gray-900/90 to-black/95 backdrop-blur-md border-l border-white/10 shadow-xl">
          <SheetHeader className="p-4 border-b border-white/10 bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Avatar className="border-2 border-primary/50 shadow-lg shadow-primary/20">
                <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${shopName.charAt(0)}`} />
                <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary/50">{shopName.charAt(0)}</AvatarFallback>
              </Avatar>
              <SheetTitle className="text-white/90 text-xl font-medium">{shopName}</SheetTitle>
            </div>
          </SheetHeader>
          
          <div className="flex-1 overflow-auto p-4 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm">
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
                    className={`max-w-[80%] rounded-lg p-3 shadow-lg ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-primary/90 to-primary/70 text-primary-foreground backdrop-blur-sm border border-primary/20"
                        : "bg-gradient-to-br from-gray-800/90 to-gray-900/80 text-white/90 backdrop-blur-sm border border-white/10"
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
                  <div className="max-w-[80%] rounded-lg p-3 bg-gradient-to-br from-gray-800/90 to-gray-900/80 backdrop-blur-sm border border-white/10 shadow-lg">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                        className="h-2 w-2 rounded-full bg-primary/70"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
                        className="h-2 w-2 rounded-full bg-primary/70"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
                        className="h-2 w-2 rounded-full bg-primary/70"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <Separator className="bg-white/10" />
          
          <form onSubmit={handleSendMessage} className="p-4 bg-gradient-to-t from-gray-900/90 to-black/90 backdrop-blur-sm border-t border-white/5">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-gray-800/50 border-white/10 focus:border-primary/50 backdrop-blur-sm text-white placeholder:text-gray-400"
              />
              <Button type="submit" size="icon" className="bg-gradient-to-br from-primary/90 to-primary/70 hover:from-primary hover:to-primary/80 shadow-md shadow-primary/20">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, MessageCircle, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChatDrawer } from "@/components/chat-drawer"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

// Sample chat data
const chatData = [
  {
    id: 1,
    shopId: 1,
    shopName: "Paws & Claws",
    lastMessage: "Do you have any special offers on premium dog food?",
    timestamp: "10:30 AM",
    unread: 2,
    avatar: "/placeholder.svg?height=40&width=40&text=P",
  },
  {
    id: 2,
    shopId: 2,
    shopName: "Furry Friends",
    lastMessage: "Your order #12345 has been shipped!",
    timestamp: "Yesterday",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40&text=F",
  },
  {
    id: 3,
    shopId: 4,
    shopName: "Pet Paradise",
    lastMessage: "Thank you for your purchase. How is your pet enjoying the new toy?",
    timestamp: "2 days ago",
    unread: 1,
    avatar: "/placeholder.svg?height=40&width=40&text=P",
  },
  {
    id: 4,
    shopId: 5,
    shopName: "Healthy Paws",
    lastMessage: "We have restocked the supplements you were asking about.",
    timestamp: "3 days ago",
    unread: 0,
    avatar: "/placeholder.svg?height=40&width=40&text=H",
  },
]

export default function ChatsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [chatOpen, setChatOpen] = useState(false)
  const [selectedShop, setSelectedShop] = useState<{ id: number; name: string } | null>(null)

  const filteredChats = chatData.filter(
    (chat) => chat.shopName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const openChat = (shop: { id: number; name: string }) => {
    setSelectedShop(shop)
    setChatOpen(true)
  }

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
          <h1 className="text-3xl font-bold tracking-tight">My Chats</h1>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {filteredChats.length === 0 ? (
          <motion.div variants={itemVariants} className="text-center py-12">
            <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No conversations found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchQuery ? "Try a different search term" : "Start chatting with shops to see conversations here"}
            </p>
            <Link href="/marketplace">
              <Button className="mt-4">Browse Marketplace</Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="space-y-2">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className="bg-card rounded-lg border p-4 hover:border-primary transition-colors cursor-pointer"
                onClick={() => openChat({ id: chat.shopId, name: chat.shopName })}
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>{chat.shopName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{chat.shopName}</h3>
                      <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <Badge className="bg-primary">{chat.unread}</Badge>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {selectedShop && (
        <ChatDrawer 
          open={chatOpen} 
          onClose={() => setChatOpen(false)} 
          shopName={selectedShop.name} 
        />
      )}
    </div>
  )
} 
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatCenter } from "@/components/chat-center"

export function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      customer: {
        name: "My Pet Shop",
        avatar: "/placeholder.svg?height=40&width=40&text=MP",
      },
      unread: 2,
      lastMessage: "Do you have this in a different size?",
      lastMessageTime: "10:23 AM",
    },
    {
      id: 2,
      customer: {
        name: "Furry Friends",
        avatar: "/placeholder.svg?height=40&width=40&text=FF",
      },
      unread: 0,
      lastMessage: "Thanks for the quick delivery!",
      lastMessageTime: "Yesterday",
    },
    {
      id: 3,
      customer: {
        name: "Wild Nature",
        avatar: "/placeholder.svg?height=40&width=40&text=WN",
      },
      unread: 1,
      lastMessage: "Is this product suitable for kittens?",
      lastMessageTime: "Mar 14",
    },
  ]

  return (
    <>
      <AnimatePresence>
        {isOpen && <ChatCenter conversations={conversations} onClose={() => setIsOpen(false)} />}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button size="lg" className="h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>

        {/* Notification badge */}
        {conversations.reduce((count, convo) => count + convo.unread, 0) > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-medium text-destructive-foreground">
            {conversations.reduce((count, convo) => count + convo.unread, 0)}
          </span>
        )}
      </motion.div>
    </>
  )
}


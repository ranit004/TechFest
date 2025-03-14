"use client"

import type React from "react"

import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}

export function FeatureCard({ icon, title, description, link }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div className="overflow-hidden backdrop-blur-sm bg-card/80 border-muted border rounded-xl shadow-md h-full flex flex-col">
        <div className="p-6 pb-2 relative">
          {/* Multiple layered glows for dramatic effect */}
          <div className="absolute top-6 left-6 w-24 h-24 rounded-full bg-primary/10 blur-2xl animate-pulse" />
          <div className="absolute top-6 left-6 w-20 h-20 rounded-full bg-primary/20 blur-xl animate-pulse" style={{ animationDelay: "0.5s" }} />
          <div className="absolute top-6 left-6 w-16 h-16 rounded-full bg-primary/30 blur-lg animate-pulse" style={{ animationDelay: "0.25s" }} />
          
          {/* Icon container with dramatic animation */}
          <motion.div 
            className="rounded-full w-16 h-16 flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary/10 relative z-10 border border-primary/30 shadow-lg"
            whileHover={{ 
              scale: 1.2,
              rotate: [0, 10, -10, 0],
              boxShadow: "0 0 25px rgba(var(--primary), 0.8)",
              transition: { duration: 0.5 }
            }}
            animate={{ 
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0],
              boxShadow: [
                "0 0 0px rgba(var(--primary), 0.3)",
                "0 0 30px rgba(var(--primary), 0.8)",
                "0 0 0px rgba(var(--primary), 0.3)"
              ]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            {/* Rotating ring with glow */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40"
              animate={{ 
                rotate: 360,
                boxShadow: [
                  "inset 0 0 5px rgba(var(--primary), 0.2)",
                  "inset 0 0 15px rgba(var(--primary), 0.6)",
                  "inset 0 0 5px rgba(var(--primary), 0.2)"
                ]
              }}
              transition={{ 
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
              }}
            />
            
            {/* Icon with dramatic pulse and glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                filter: [
                  "drop-shadow(0 0 0px rgba(var(--primary), 0.5))",
                  "drop-shadow(0 0 15px rgba(var(--primary), 1))",
                  "drop-shadow(0 0 0px rgba(var(--primary), 0.5))"
                ]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
              className="text-primary"
            >
              {icon}
            </motion.div>
            
            {/* Enhanced particle effects with glow */}
            <motion.div
              className="absolute top-0 right-0 w-3 h-3 rounded-full bg-primary/70 shadow-[0_0_10px_rgba(var(--primary),0.8)]"
              animate={{
                y: [0, -15, 0],
                x: [0, 8, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            />
            <motion.div
              className="absolute bottom-2 left-0 w-2 h-2 rounded-full bg-primary/70 shadow-[0_0_8px_rgba(var(--primary),0.8)]"
              animate={{
                y: [0, 12, 0],
                x: [0, -8, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          </motion.div>
        </div>
        <div className="px-6 py-4 flex-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="px-6 pb-6 pt-0">
          <Link href={link} className="group flex items-center text-sm font-medium text-primary">
            Learn more
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}


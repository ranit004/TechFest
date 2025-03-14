"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string
  description: string
}

export function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div className="overflow-hidden backdrop-blur-sm bg-card/80 border-muted border rounded-xl shadow-md h-full">
        <div className="p-6">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-3xl font-bold mt-2">{value}</p>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}


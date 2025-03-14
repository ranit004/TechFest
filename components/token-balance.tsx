"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Coins, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TokenBalance() {
  const [balance] = useState(250)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <TooltipProvider>
      <motion.div
        className="flex items-center gap-2 rounded-full border bg-background px-3 py-1.5"
        whileHover={{ scale: 1.05 }}
        animate={isHovering ? { y: [0, -5, 0] } : {}}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex items-center gap-1.5">
          <Coins className="h-4 w-4 text-primary" />
          <span className="font-medium">{balance}</span>
          <span className="text-xs text-muted-foreground">PFC</span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
              <Info className="h-3 w-3" />
              <span className="sr-only">Token info</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">PetFoodChain Tokens</p>
            <p className="text-xs text-muted-foreground">Use tokens to purchase items or trade them</p>
          </TooltipContent>
        </Tooltip>
      </motion.div>
    </TooltipProvider>
  )
}


"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Star, Award, Sparkles, Leaf, Footprints, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface NFTRewardsAnimationProps {
  className?: string
}

export function NFTRewardsAnimation({ className = "" }: NFTRewardsAnimationProps) {
  const [currentNFT, setCurrentNFT] = useState(0)
  const [logoAnimationStep, setLogoAnimationStep] = useState(0)
  
  // Sample NFT data
  const nfts = [
    {
      id: 1,
      name: "Golden Paw",
      rarity: "Rare",
      color: "from-amber-500 to-yellow-300",
      icon: Footprints,
    },
    {
      id: 2,
      name: "Silver Whisker",
      rarity: "Uncommon",
      color: "from-blue-500 to-cyan-300",
      icon: Star,
    },
    {
      id: 3,
      name: "Bronze Collar",
      rarity: "Common",
      color: "from-orange-500 to-amber-300",
      icon: Award,
    },
    {
      id: 4,
      name: "Diamond Heart",
      rarity: "Legendary",
      color: "from-purple-500 to-pink-300",
      icon: Heart,
    },
  ]

  // Auto-rotate NFTs
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNFT((prev) => (prev + 1) % nfts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [nfts.length])

  // Logo animation sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setLogoAnimationStep((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-xl ${className}`}>
      {/* Background animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.25,
              }}
              animate={{
                y: [null, Math.random() * 100 + "%"],
                opacity: [null, Math.random() * 0.5 + 0.25],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="border-[0.5px] border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ delay: i * 0.005, duration: 0.5 }}
          />
        ))}
      </div>

      {/* Logo Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="relative w-48 h-48 md:w-56 md:h-56"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Rotating outer circle */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-primary/30"
            animate={{ 
              rotate: 360,
              borderColor: ['rgba(var(--primary), 0.3)', 'rgba(var(--primary), 0.6)', 'rgba(var(--primary), 0.3)']
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              borderColor: { duration: 3, repeat: Infinity }
            }}
          />
          
          {/* Pulsing middle circle */}
          <motion.div
            className="absolute inset-6 rounded-full border-2 border-white/20 backdrop-blur-sm"
            animate={{ 
              scale: [1, 1.05, 1],
              borderColor: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)']
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          
          {/* Central logo */}
          <motion.div 
            className="absolute inset-12 flex items-center justify-center"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity 
            }}
          >
            <Leaf className="absolute h-16 w-16 text-primary" />
            
            {/* Orbiting elements */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`orbit-${i}`}
                className="absolute"
                initial={{ 
                  rotate: i * 90,
                  translateX: 50
                }}
                animate={{ 
                  rotate: [i * 90, i * 90 + 360],
                  scale: logoAnimationStep === i ? 1.2 : 1
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 0.5 }
                }}
              >
                <motion.div 
                  className={`flex items-center justify-center h-8 w-8 rounded-full 
                    ${logoAnimationStep === i ? 'bg-primary text-white' : 'bg-gray-800/80 text-primary'}`}
                  animate={{ 
                    boxShadow: logoAnimationStep === i ? 
                      ['0 0 0px rgba(var(--primary), 0.5)', '0 0 20px rgba(var(--primary), 0.8)', '0 0 0px rgba(var(--primary), 0.5)'] : 
                      '0 0 0px rgba(var(--primary), 0.3)'
                  }}
                  transition={{ duration: 2 }}
                >
                  {React.createElement([Footprints, Gift, Heart, Star][i], { 
                    className: "h-4 w-4", 
                    strokeWidth: 2 
                  })}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* NFT Showcase at bottom */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNFT}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className={`h-8 w-8 rounded-full bg-gradient-to-br ${nfts[currentNFT].color} p-0.5 flex items-center justify-center`}
              animate={{ 
                boxShadow: ["0 0 0px rgba(255,255,255,0.2)", "0 0 10px rgba(255,255,255,0.4)", "0 0 0px rgba(255,255,255,0.2)"] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {React.createElement(nfts[currentNFT].icon, { 
                className: "h-4 w-4 text-white", 
                strokeWidth: 2 
              })}
            </motion.div>
            
            <div>
              <p className="text-xs font-medium text-white">{nfts[currentNFT].name}</p>
              <Badge variant="outline" className="text-[10px]">
                {nfts[currentNFT].rarity}
              </Badge>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Text overlay at bottom */}
      <div className="absolute bottom-1 left-0 right-0 text-center">
        <motion.p 
          className="text-[10px] text-white/70"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Donate to earn unique NFT rewards
        </motion.p>
      </div>
    </div>
  )
} 
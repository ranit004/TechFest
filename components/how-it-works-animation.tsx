"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Leaf, Gift, ShoppingBag, Coins, ArrowRight, Heart, Dog, Shield } from "lucide-react"

interface HowItWorksAnimationProps {
  className?: string
}

export function HowItWorksAnimation({ className = "" }: HowItWorksAnimationProps) {
  // Use state to ensure particles are only rendered client-side
  const [isClient, setIsClient] = useState(false);
  
  // Generate fixed particle data to avoid hydration mismatch
  const [particles] = useState(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: 2 + (i % 4),
      initialX: `${(i * 3.7) % 100}%`,
      initialY: `${(i * 4.3) % 100}%`,
      targetX: `${((i * 7.5) + 30) % 100}%`,
      targetY: `${((i * 6.2) + 20) % 100}%`,
      opacity: 0.3 + (i % 7) / 10,
      duration: 10 + (i % 10),
      delay: i * 0.2
    }));
  });

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={`relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm ${className}`}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute h-px w-full bg-white/30" style={{ top: `${i * 10}%` }} />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute w-px h-full bg-white/30" style={{ left: `${i * 10}%` }} />
          ))}
        </div>
        
        {/* Animated particles - only rendered client-side */}
        {isClient && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: particle.initialX,
              top: particle.initialY,
              opacity: particle.opacity,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              opacity: [particle.opacity, particle.opacity * 0.6, particle.opacity],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.div 
        className="absolute top-4 left-0 right-0 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h3 className="text-xl font-bold text-white">How PetFoodChain Works</h3>
        <p className="text-xs text-white/70 mt-1">A blockchain-powered animal food donation platform</p>
      </motion.div>

      {/* Workflow diagram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-xs">
          {/* Central platform icon */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center z-10"
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              boxShadow: ["0 0 0px rgba(var(--primary), 0.5)", "0 0 30px rgba(var(--primary), 0.8)", "0 0 0px rgba(var(--primary), 0.5)"]
            }}
            transition={{ 
              scale: { duration: 0.8, ease: "backOut" },
              boxShadow: { duration: 3, repeat: Infinity }
            }}
          >
            <Leaf className="h-10 w-10 text-white" />
          </motion.div>

          {/* Rotating orbit */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-full border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ opacity: { duration: 1 }, rotate: { duration: 40, repeat: Infinity, ease: "linear" } }}
          />

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            <motion.path
              d="M100,60 L60,30"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeDasharray="5,3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            <motion.path
              d="M100,60 L140,30"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeDasharray="5,3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.4 }}
            />
            <motion.path
              d="M100,140 L60,170"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeDasharray="5,3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
            />
            <motion.path
              d="M100,140 L140,170"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeDasharray="5,3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
            
            {/* Animated data flow - only rendered client-side */}
            {isClient && (
              <>
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={`flow-1-${i}`}
                    cx="0"
                    cy="0"
                    r="3"
                    fill="url(#gradient1)"
                    animate={{
                      cx: [60, 100],
                      cy: [30, 100],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: i * 0.7,
                    }}
                  />
                ))}
                
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={`flow-2-${i}`}
                    cx="0"
                    cy="0"
                    r="3"
                    fill="url(#gradient2)"
                    animate={{
                      cx: [140, 100],
                      cy: [30, 100],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: i * 0.7,
                    }}
                  />
                ))}
                
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={`flow-3-${i}`}
                    cx="0"
                    cy="0"
                    r="3"
                    fill="url(#gradient3)"
                    animate={{
                      cx: [100, 60],
                      cy: [100, 170],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: i * 0.7,
                    }}
                  />
                ))}
                
                {[0, 1, 2].map((i) => (
                  <motion.circle
                    key={`flow-4-${i}`}
                    cx="0"
                    cy="0"
                    r="3"
                    fill="url(#gradient4)"
                    animate={{
                      cx: [100, 140],
                      cy: [100, 170],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: i * 0.7,
                    }}
                  />
                ))}
              </>
            )}
            
            {/* Gradients for particles */}
            <defs>
              <radialGradient id="gradient1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="1" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="gradient2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="gradient3" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="gradient4" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Workflow nodes */}
          {/* Donors */}
          <motion.div
            className="absolute left-[30%] top-[15%] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "backOut" }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-2 shadow-lg shadow-green-500/20"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: ["0 0 0px rgba(74,222,128,0.5)", "0 0 15px rgba(74,222,128,0.8)", "0 0 0px rgba(74,222,128,0.5)"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                whileHover={{ scale: 1.1 }}
              >
                <Heart className="h-7 w-7 text-white" />
              </motion.div>
              <motion.span 
                className="text-sm font-medium text-white bg-green-500/20 px-3 py-1 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                Donors
              </motion.span>
            </div>
          </motion.div>

          {/* Animal Shelters */}
          <motion.div
            className="absolute left-[70%] top-[15%] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-2 shadow-lg shadow-blue-500/20"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: ["0 0 0px rgba(59,130,246,0.5)", "0 0 15px rgba(59,130,246,0.8)", "0 0 0px rgba(59,130,246,0.5)"]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <Dog className="h-7 w-7 text-white" />
              </motion.div>
              <motion.span 
                className="text-sm font-medium text-white bg-blue-500/20 px-3 py-1 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
              >
                Shelters
              </motion.span>
            </div>
          </motion.div>

          {/* Marketplace */}
          <motion.div
            className="absolute left-[30%] top-[85%] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "backOut" }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-2 shadow-lg shadow-purple-500/20"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: ["0 0 0px rgba(168,85,247,0.5)", "0 0 15px rgba(168,85,247,0.8)", "0 0 0px rgba(168,85,247,0.5)"]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                whileHover={{ scale: 1.1 }}
              >
                <ShoppingBag className="h-7 w-7 text-white" />
              </motion.div>
              <motion.span 
                className="text-sm font-medium text-white bg-purple-500/20 px-3 py-1 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
              >
                Marketplace
              </motion.span>
            </div>
          </motion.div>

          {/* NFT Rewards */}
          <motion.div
            className="absolute left-[70%] top-[85%] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: "backOut" }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-2 shadow-lg shadow-amber-500/20"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: ["0 0 0px rgba(245,158,11,0.5)", "0 0 15px rgba(245,158,11,0.8)", "0 0 0px rgba(245,158,11,0.5)"]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <Gift className="h-7 w-7 text-white" />
              </motion.div>
              <motion.span 
                className="text-sm font-medium text-white bg-amber-500/20 px-3 py-1 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1 }}
              >
                NFT Rewards
              </motion.span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom description */}
      <motion.div 
        className="absolute bottom-4 left-4 right-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="p-3 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
          <p className="text-sm text-white/90">
            PetFoodChain connects donors with animal shelters through blockchain technology, 
            rewarding generosity with NFTs that can be used in our marketplace.
          </p>
        </div>
      </motion.div>
    </div>
  )
} 
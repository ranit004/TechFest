"use client"

import React from "react"
import { Gift } from "lucide-react"
import { NFTRewardsAnimation } from "@/components/nft-rewards-animation"

interface NFTRewardsBoxProps {
  className?: string
  hideLabel?: boolean
}

export function NFTRewardsBox({ className = "", hideLabel = false }: NFTRewardsBoxProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      {!hideLabel && (
        <div className="absolute -top-5 left-4 z-10 flex items-center gap-2 rounded-full bg-black px-4 py-2 shadow-lg">
          <Gift className="h-5 w-5 text-primary" />
          <div>
            <div className="text-sm font-bold text-white">NFT Rewards</div>
            <div className="text-xs text-gray-400">For every donation</div>
          </div>
        </div>
      )}
      
      {/* Animation container */}
      <div className="overflow-hidden backdrop-blur-sm bg-card/80 border-muted border rounded-xl shadow-md h-full">
        <div className="w-full h-full">
          <NFTRewardsAnimation />
        </div>
      </div>
    </div>
  )
} 
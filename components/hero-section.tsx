"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NFTRewardsBox } from "@/components/nft-rewards-box"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

      {/* Animated circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Donate Food, <span className="text-primary">Earn Rewards</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:w-[90%]">
              Join our blockchain-powered platform to donate animal food, receive NFT rewards, and trade tokens in our
              marketplace.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="w-full sm:w-auto group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/donate">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Donate Now
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto" style={{ height: "400px" }}>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 blur-xl" />
              <div className="absolute inset-1 rounded-xl backdrop-blur-sm bg-card/80 border-muted border shadow-md overflow-hidden">
                <NFTRewardsBox className="h-full w-full" hideLabel={true} />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              className="absolute -top-4 -left-4 md:-left-10 bg-background rounded-lg p-3 shadow-md border border-muted"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-sm font-bold">🎁</span>
                </div>
                <div>
                  <p className="text-xs font-medium">NFT Rewards</p>
                  <p className="text-xs text-muted-foreground">For every donation</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 md:-right-10 bg-background rounded-lg p-3 shadow-md border border-muted"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-sm font-bold">🔄</span>
                </div>
                <div>
                  <p className="text-xs font-medium">Trade Tokens</p>
                  <p className="text-xs text-muted-foreground">In our marketplace</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


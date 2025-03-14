"use client";

import Link from "next/link"
import { ArrowRight, Leaf, ShoppingBag, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { StatsCard } from "@/components/stats-card"
import { HeroSection } from "@/components/hero-section"
import { FeatureCard } from "@/components/feature-card"
import { motion } from "framer-motion"
import GridDotBackground from "@/components/ui/grid-dot-background"
import { WorkflowAnimation } from "@/components/workflow-animation"

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

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col relative">
      <GridDotBackground />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  rotate: [0, 15, 0, -15, 0],
                  scale: [1, 1.3, 1],
                  filter: ["drop-shadow(0 0 0px rgba(var(--primary), 0.5))", "drop-shadow(0 0 15px rgba(var(--primary), 1))", "drop-shadow(0 0 0px rgba(var(--primary), 0.5))"]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                whileHover={{
                  rotate: [0, 360],
                  transition: { duration: 1 }
                }}
                className="relative"
              >
                <div className="absolute inset-0 scale-150 bg-primary/10 rounded-full blur-xl animate-pulse" />
                <div className="absolute inset-0 scale-125 bg-primary/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: "0.5s" }} />
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-md animate-pulse" style={{ animationDelay: "0.25s" }} />
                <Leaf className="h-8 w-8 text-primary relative z-10" />
              </motion.div>
              <span className="text-2xl font-bold text-primary">
                PetFoodChain
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white">
                Home
              </Link>
              <Link href="/donate" className="text-sm font-medium text-gray-300 hover:text-white">
                Donate
              </Link>
              <div className="relative group">
                <Link href="/campaigns" className="text-sm font-medium text-gray-300 hover:text-white flex items-center gap-1">
                  Campaigns
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </Link>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link href="/campaigns/manage" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Manage Campaigns
                    </Link>
                    <Link href="/campaigns/create" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white">
                      Create Campaign
                    </Link>
                  </div>
                </div>
              </div>
              <Link href="/marketplace" className="text-sm font-medium text-gray-300 hover:text-white">
                Marketplace
              </Link>
              <Link href="/wallet" className="text-sm font-medium text-gray-300 hover:text-white">
                Wallet
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white">
                About
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroSection />

            <section className="container py-12 md:py-24">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <motion.div variants={itemVariants} className="h-[150px]">
                  <StatsCard title="Total Donations" value="$125,430" description="From 3,245 donors" />
                </motion.div>
                <motion.div variants={itemVariants} className="h-[150px]">
                  <StatsCard title="NFTs Distributed" value="1,872" description="Unique collectibles" />
                </motion.div>
                <motion.div variants={itemVariants} className="h-[150px]">
                  <StatsCard title="Active Shops" value="342" description="In our marketplace" />
                </motion.div>
              </div>
            </section>

            <section className="container py-12 md:py-24">
              <motion.div variants={itemVariants} className="flex flex-col items-center justify-center text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mt-4 text-muted-foreground md:w-3/4">
                  Join our community to donate food, earn rewards, and make a difference in animal welfare.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <motion.div variants={itemVariants} className="h-[250px]">
                  <FeatureCard
                    icon={<Leaf className="h-10 w-10 text-primary" />}
                    title="Donate Food"
                    description="Donate animal food and receive NFTs as rewards for your generosity. Your donations directly help animals in need."
                    link="/donate"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="h-[250px]">
                  <FeatureCard
                    icon={<ShoppingBag className="h-10 w-10 text-primary" />}
                    title="Shop Marketplace"
                    description="Browse our marketplace for animal products or set up your own shop to sell pet supplies and food."
                    link="/marketplace"
                  />
                </motion.div>
                <motion.div variants={itemVariants} className="h-[250px]">
                  <FeatureCard
                    icon={<Zap className="h-10 w-10 text-primary" />}
                    title="Trade Tokens"
                    description="Earn and trade tokens with every purchase in the marketplace, building a sustainable ecosystem for animal welfare."
                    link="/tokens"
                  />
                </motion.div>
              </div>
            </section>

            <section className="container py-12 md:py-24">
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Ready to make a difference?
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    Join our community today and start donating, earning rewards, and helping animals in need.
                  </p>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/auth/signup">
                      <Button size="lg" className="w-full sm:w-auto">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        </main>

        <footer className="border-t bg-muted/50">
          <div className="container py-8 md:py-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">PetFoodChain</span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Connecting animal lovers with shelters through blockchain technology.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Platform</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link href="/donate" className="text-muted-foreground hover:text-foreground">
                      Donate
                    </Link>
                  </li>
                  <li>
                    <Link href="/marketplace" className="text-muted-foreground hover:text-foreground">
                      Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link href="/tokens" className="text-muted-foreground hover:text-foreground">
                      Tokens
                    </Link>
                  </li>
                  <li>
                    <Link href="/wallet" className="text-muted-foreground hover:text-foreground">
                      My Wallet
                    </Link>
                  </li>
                  <li>
                    <Link href="/nfts" className="text-muted-foreground hover:text-foreground">
                      NFT Rewards
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium">Company</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link href="/about" className="text-muted-foreground hover:text-foreground">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/team" className="text-muted-foreground hover:text-foreground">
                      Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium">Legal</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} PetFoodChain. All rights reserved.
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">GitHub</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}


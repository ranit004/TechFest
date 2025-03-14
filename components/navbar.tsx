"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Leaf className="h-6 w-6 text-primary" />
          </motion.div>
          <span className="text-xl font-bold" style={{ animation: 'none' }}>PetFoodChain</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="/donate" className="text-sm font-medium hover:text-primary">
            Donate
          </Link>
          <Link href="/marketplace" className="text-sm font-medium hover:text-primary">
            Marketplace
          </Link>
          <Link href="/wallet" className="text-sm font-medium hover:text-primary">
            Wallet
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary">
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
  );
} 
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

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
};

// Sample campaign data
const campaigns = [
  {
    id: 1,
    title: "Emergency Food for Shelter Dogs",
    description: "Help us provide emergency food supplies for 50 dogs at the local shelter.",
    image: "/placeholder.svg?height=200&width=300&text=Shelter+Dogs",
    goal: 5000,
    raised: 3200,
    daysLeft: 12,
    category: "Food Donation"
  },
  {
    id: 2,
    title: "Medical Care for Rescued Cats",
    description: "Support our efforts to provide medical treatment for cats rescued from abandonment.",
    image: "/placeholder.svg?height=200&width=300&text=Rescued+Cats",
    goal: 7500,
    raised: 4100,
    daysLeft: 18,
    category: "Medical Care"
  },
  {
    id: 3,
    title: "Winter Shelter for Stray Animals",
    description: "Help us build winter shelters for stray animals before the cold season arrives.",
    image: "/placeholder.svg?height=200&width=300&text=Winter+Shelter",
    goal: 10000,
    raised: 6800,
    daysLeft: 25,
    category: "Shelter"
  }
];

export default function CampaignsPage() {
  return (
    <div className="flex min-h-screen flex-col relative bg-black text-white">
      <div className="relative z-10">
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">PetFoodChain</span>
            </Link>
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
                <Button variant="outline" size="sm" className="text-white border-gray-700 hover:bg-gray-800">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm" className="bg-white text-black hover:bg-gray-200">Sign Up</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container py-12 md:py-24"
          >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Animal Welfare Campaigns
                </h1>
                <p className="mt-4 text-gray-400 max-w-2xl">
                  Browse ongoing campaigns or start your own to help animals in need. Every contribution makes a difference.
                </p>
              </div>
              <Link href="/campaigns/create" className="mt-6 md:mt-0">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Create Campaign
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search campaigns..." 
                    className="pl-9 bg-gray-900 border-gray-700 text-white"
                  />
                </div>
                <select className="md:w-48 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900">
                  <option value="">All Categories</option>
                  <option value="food">Food Donation</option>
                  <option value="medical">Medical Care</option>
                  <option value="shelter">Shelter</option>
                  <option value="education">Education</option>
                  <option value="other">Other</option>
                </select>
                <select className="md:w-48 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900">
                  <option value="newest">Newest First</option>
                  <option value="ending-soon">Ending Soon</option>
                  <option value="most-funded">Most Funded</option>
                  <option value="least-funded">Least Funded</option>
                </select>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
                  <div className="relative h-48 w-full">
                    <img 
                      src={campaign.image} 
                      alt={campaign.title} 
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {campaign.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{campaign.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{Math.round((campaign.raised / campaign.goal) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${Math.round((campaign.raised / campaign.goal) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-400 mb-4">
                      <div>
                        <span className="block text-white font-medium">${campaign.raised}</span>
                        <span>raised of ${campaign.goal}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-white font-medium">{campaign.daysLeft}</span>
                        <span>days left</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-white text-black hover:bg-gray-200">
                        Donate
                      </Button>
                      <Button variant="outline" className="flex-1 border-gray-700 text-white hover:bg-gray-800">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 text-center">
              <Link href="/campaigns/create">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Start Your Campaign
                </Button>
              </Link>
              <p className="mt-4 text-gray-400">
                Have a cause you're passionate about? Create your own campaign and start making a difference today.
              </p>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
} 
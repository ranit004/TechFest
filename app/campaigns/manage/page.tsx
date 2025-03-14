"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Edit, Trash2, Eye, Search, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";

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

// Sample user campaigns data
const userCampaigns = [
  {
    id: 1,
    title: "Emergency Food for Shelter Dogs",
    description: "Help us provide emergency food supplies for 50 dogs at the local shelter.",
    image: "/placeholder.svg?height=200&width=300&text=Shelter+Dogs",
    goal: 5000,
    raised: 3200,
    daysLeft: 12,
    status: "active",
    category: "Food Donation",
    createdAt: "2023-10-15"
  },
  {
    id: 2,
    title: "Medical Care for Rescued Cats",
    description: "Support our efforts to provide medical treatment for cats rescued from abandonment.",
    image: "/placeholder.svg?height=200&width=300&text=Rescued+Cats",
    goal: 7500,
    raised: 4100,
    daysLeft: 18,
    status: "active",
    category: "Medical Care",
    createdAt: "2023-09-28"
  },
  {
    id: 3,
    title: "Winter Shelter for Stray Animals",
    description: "Help us build winter shelters for stray animals before the cold season arrives.",
    image: "/placeholder.svg?height=200&width=300&text=Winter+Shelter",
    goal: 10000,
    raised: 10000,
    daysLeft: 0,
    status: "completed",
    category: "Shelter",
    createdAt: "2023-08-05"
  }
];

export default function ManageCampaignsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter campaigns based on status and search query
  const filteredCampaigns = userCampaigns.filter(campaign => {
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
                <div className="flex items-center gap-2 mb-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-gray-700 text-white hover:bg-gray-800"
                    onClick={() => window.history.back()}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Manage Your Campaigns
                </h1>
                <p className="mt-4 text-gray-400 max-w-2xl">
                  View, edit, and track the progress of your animal welfare campaigns.
                </p>
              </div>
              <Link href="/campaigns/create" className="mt-6 md:mt-0">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 flex items-center gap-2">
                  <span>New Campaign</span>
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-12">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search your campaigns..." 
                    className="pl-9 bg-gray-900 border-gray-700 text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select 
                  className="md:w-48 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Campaigns</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="draft">Drafts</option>
                </select>
              </div>
            </motion.div>

            {filteredCampaigns.length === 0 ? (
              <motion.div variants={itemVariants} className="text-center py-16">
                <p className="text-gray-400 mb-6">No campaigns found matching your criteria.</p>
                <Link href="/campaigns/create">
                  <Button className="bg-white text-black hover:bg-gray-200">
                    Create Your First Campaign
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div variants={itemVariants} className="space-y-6">
                {filteredCampaigns.map((campaign) => (
                  <div key={campaign.id} className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-48 md:h-auto">
                        <img 
                          src={campaign.image} 
                          alt={campaign.title} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-5 flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold mb-2">{campaign.title}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                campaign.status === 'active' ? 'bg-green-900 text-green-300' : 
                                campaign.status === 'completed' ? 'bg-blue-900 text-blue-300' : 
                                'bg-gray-800 text-gray-300'
                              }`}>
                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                              </span>
                              <span className="text-xs text-gray-400">Created on {campaign.createdAt}</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">{campaign.description}</p>
                          </div>
                        </div>
                        
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
                            <span>{campaign.daysLeft > 0 ? 'days left' : 'completed'}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <Button variant="outline" className="flex-1 border-gray-700 text-white hover:bg-gray-800 flex items-center justify-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </Button>
                          <Button variant="outline" className="flex-1 border-gray-700 text-white hover:bg-gray-800 flex items-center justify-center gap-2">
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </Button>
                          <Button variant="outline" className="flex-1 border-gray-700 text-white hover:bg-gray-800 flex items-center justify-center gap-2">
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
} 
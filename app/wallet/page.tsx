"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, ArrowLeft, Wallet, CreditCard, History, Plus, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

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

// Sample wallet data
const walletData = {
  balance: 1250.75,
  tokenBalance: 325,
  recentTransactions: [
    {
      id: 1,
      type: "Donation",
      amount: 50,
      recipient: "Emergency Food for Shelter Dogs",
      date: "2023-11-15",
      status: "completed"
    },
    {
      id: 2,
      type: "Purchase",
      amount: 25.50,
      recipient: "Premium Dog Food - 5kg",
      date: "2023-11-10",
      status: "completed"
    },
    {
      id: 3,
      type: "Deposit",
      amount: 100,
      recipient: "Wallet Funding",
      date: "2023-11-05",
      status: "completed"
    }
  ],
  nfts: [
    {
      id: 1,
      name: "Golden Paw",
      image: "/placeholder.svg?height=150&width=150&text=Golden+Paw",
      rarity: "Rare",
      acquired: "2023-10-20"
    },
    {
      id: 2,
      name: "Silver Whisker",
      image: "/placeholder.svg?height=150&width=150&text=Silver+Whisker",
      rarity: "Common",
      acquired: "2023-09-15"
    }
  ]
}

export default function WalletPage() {
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
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start mb-12">
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
                  Your Wallet
                </h1>
                <p className="mt-4 text-gray-400 max-w-2xl">
                  Manage your funds, view transaction history, and collect NFT rewards.
                </p>
              </div>
              <div className="mt-6 md:mt-0 flex gap-3">
                <Button className="bg-white text-black hover:bg-gray-200 flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Funds
                </Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Connect Wallet
                </Button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="md:col-span-2">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Wallet className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold">Balance</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Available Balance</p>
                      <p className="text-3xl font-bold">${walletData.balance.toFixed(2)}</p>
                      <div className="mt-4">
                        <Button className="w-full bg-white text-black hover:bg-gray-200">
                          Withdraw
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-4">
                      <p className="text-gray-400 text-sm mb-1">Token Balance</p>
                      <p className="text-3xl font-bold">{walletData.tokenBalance} PFC</p>
                      <div className="mt-4">
                        <Button className="w-full bg-white text-black hover:bg-gray-200">
                          Trade Tokens
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mt-8">
                  <div className="flex items-center gap-4 mb-6">
                    <History className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold">Recent Transactions</h2>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="text-left py-3 px-2 text-gray-400 font-medium">Type</th>
                          <th className="text-left py-3 px-2 text-gray-400 font-medium">Amount</th>
                          <th className="text-left py-3 px-2 text-gray-400 font-medium">Recipient</th>
                          <th className="text-left py-3 px-2 text-gray-400 font-medium">Date</th>
                          <th className="text-left py-3 px-2 text-gray-400 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {walletData.recentTransactions.map((transaction) => (
                          <tr key={transaction.id} className="border-b border-gray-800">
                            <td className="py-3 px-2">{transaction.type}</td>
                            <td className="py-3 px-2">${transaction.amount.toFixed(2)}</td>
                            <td className="py-3 px-2">{transaction.recipient}</td>
                            <td className="py-3 px-2">{transaction.date}</td>
                            <td className="py-3 px-2">
                              <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-900 text-green-300">
                                {transaction.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                      View All Transactions
                    </Button>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="md:col-span-1">
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <h2 className="text-2xl font-bold">Payment Methods</h2>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-400">Expires 12/25</p>
                      </div>
                      <div className="bg-gray-700 p-2 rounded">
                        <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="32" height="20" rx="4" fill="#252525"/>
                          <circle cx="12" cy="10" r="4" fill="#EB001B" fillOpacity="0.8"/>
                          <circle cx="20" cy="10" r="4" fill="#F79E1B" fillOpacity="0.8"/>
                          <path d="M16 13C17.3333 11.6667 17.3333 8.33333 16 7" stroke="white" strokeOpacity="0.8" strokeWidth="1.5"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-white text-black hover:bg-gray-200 flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
                
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mt-8">
                  <div className="flex items-center gap-4 mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <h2 className="text-2xl font-bold">NFT Rewards</h2>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {walletData.nfts.map((nft) => (
                      <div key={nft.id} className="bg-gray-800 rounded-lg overflow-hidden">
                        <img src={nft.image} alt={nft.name} className="w-full aspect-square object-cover" />
                        <div className="p-3">
                          <p className="font-medium">{nft.name}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-400">{nft.acquired}</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-purple-900 text-purple-300">
                              {nft.rarity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                      View All NFTs
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}


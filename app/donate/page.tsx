"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronRight, Gift, Leaf, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { NFTPreviewModal } from "@/components/nft-preview-modal"
import { NFTRewardsBox } from "@/components/nft-rewards-box"

export default function DonatePage() {
  const [amount, setAmount] = useState("")
  const [showNFTPreview, setShowNFTPreview] = useState(false)
  const [donationComplete, setDonationComplete] = useState(false)

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would process the payment
    setDonationComplete(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="container py-12 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-700 text-white hover:bg-gray-800/50 transition-all"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Make a Difference</h1>
              <p className="mt-3 text-lg text-gray-300">
                Your donation helps provide food for animals in need and earns you unique NFT rewards.
              </p>
            </motion.div>

            {donationComplete ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-gray-700 bg-gray-900/50 backdrop-blur-sm p-10 text-center shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Thank You For Your Donation!</h2>
                <p className="mt-4 text-lg text-gray-300">
                  Your donation of ${amount} will help feed animals in need. We've sent your NFT reward to your wallet.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
                  <Link href="/profile/nfts">
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-black font-medium px-6 py-2">
                      View My NFTs
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/marketplace">
                    <Button variant="outline" className="w-full sm:w-auto border-gray-600 hover:bg-gray-800 px-6 py-2">
                      Explore Marketplace
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-gray-700 bg-gray-900/50 backdrop-blur-sm shadow-xl overflow-hidden">
                  <CardHeader className="border-b border-gray-800 bg-black/30">
                    <CardTitle className="text-2xl">Make a Donation</CardTitle>
                    <CardDescription className="text-gray-400">Choose a campaign and donation amount to receive an NFT reward</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleDonate} className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="campaign" className="text-gray-200 text-sm font-medium">Select Campaign</Label>
                        <RadioGroup defaultValue="shelter-dogs" id="campaign" className="space-y-3">
                          <div className="flex items-center space-x-3 rounded-lg border border-gray-800 p-4 hover:bg-gray-800/30 transition-colors">
                            <RadioGroupItem value="shelter-dogs" id="shelter-dogs" />
                            <Label htmlFor="shelter-dogs" className="flex-1 cursor-pointer">
                              Help Shelter Dogs
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 rounded-lg border border-gray-800 p-4 hover:bg-gray-800/30 transition-colors">
                            <RadioGroupItem value="rescue-cats" id="rescue-cats" />
                            <Label htmlFor="rescue-cats" className="flex-1 cursor-pointer">
                              Rescue Cats Food Drive
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 rounded-lg border border-gray-800 p-4 hover:bg-gray-800/30 transition-colors">
                            <RadioGroupItem value="wildlife" id="wildlife" />
                            <Label htmlFor="wildlife" className="flex-1 cursor-pointer">
                              Wildlife Rehabilitation
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="amount" className="text-gray-200 text-sm font-medium">Donation Amount ($)</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="25"
                          min="5"
                          required
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="bg-gray-800/50 border-gray-700 focus:border-primary focus:ring-primary"
                        />
                        <div className="flex flex-wrap gap-2 mt-3">
                          {["10", "25", "50", "100"].map((value) => (
                            <Button
                              key={value}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setAmount(value)}
                              className={amount === value 
                                ? "border-primary bg-primary/20 text-white" 
                                : "border-gray-700 bg-gray-800/30 text-gray-300 hover:bg-gray-800 hover:text-white"}
                            >
                              ${value}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="message" className="text-gray-200 text-sm font-medium">Message (Optional)</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Add a personal message to your donation" 
                          className="bg-gray-800/50 border-gray-700 focus:border-primary focus:ring-primary min-h-[100px]"
                        />
                      </div>

                      <div className="flex justify-center mt-6">
                        <motion.div 
                          className="flex items-center gap-3 rounded-full bg-gray-900 border border-gray-800 py-2 px-4 cursor-pointer hover:bg-gray-800/80 transition-colors"
                          onClick={() => setShowNFTPreview(true)}
                          whileHover={{ scale: 1.03, borderColor: "rgba(var(--primary), 0.5)" }}
                        >
                          <div className="flex items-center justify-center rounded-full bg-gray-800 p-2">
                            <Gift className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white">NFT Rewards</div>
                            <div className="text-xs text-gray-400">For every donation</div>
                          </div>
                        </motion.div>
                      </div>

                      <Tabs defaultValue="crypto" className="mt-6">
                        <TabsList className="grid w-full grid-cols-2 bg-gray-800/70">
                          <TabsTrigger value="crypto" className="data-[state=active]:bg-primary data-[state=active]:text-black">Crypto</TabsTrigger>
                          <TabsTrigger value="card" className="data-[state=active]:bg-primary data-[state=active]:text-black">Credit Card</TabsTrigger>
                        </TabsList>
                        <TabsContent value="crypto" className="space-y-4 mt-4">
                          <div className="space-y-3">
                            <Label className="text-gray-200 text-sm font-medium">Select Wallet</Label>
                            <RadioGroup defaultValue="connected" className="space-y-3">
                              <div className="flex items-center space-x-3 rounded-lg border border-gray-800 p-4 hover:bg-gray-800/30 transition-colors">
                                <RadioGroupItem value="connected" id="connected" />
                                <Label htmlFor="connected" className="flex-1 cursor-pointer font-medium">
                                  Connected Wallet
                                </Label>
                                <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-md">0x1a2...3b4c</span>
                              </div>
                              <div className="flex items-center space-x-3 rounded-lg border border-gray-800 p-4 hover:bg-gray-800/30 transition-colors">
                                <RadioGroupItem value="new" id="new" />
                                <Label htmlFor="new" className="flex-1 cursor-pointer font-medium">
                                  Connect New Wallet
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </TabsContent>
                        <TabsContent value="card" className="space-y-4 mt-4">
                          <div className="space-y-3">
                            <Label htmlFor="card-number" className="text-gray-200 text-sm font-medium">Card Number</Label>
                            <Input 
                              id="card-number" 
                              placeholder="1234 5678 9012 3456" 
                              className="bg-gray-800/50 border-gray-700 focus:border-primary focus:ring-primary"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <Label htmlFor="expiry" className="text-gray-200 text-sm font-medium">Expiry Date</Label>
                              <Input 
                                id="expiry" 
                                placeholder="MM/YY" 
                                className="bg-gray-800/50 border-gray-700 focus:border-primary focus:ring-primary"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label htmlFor="cvc" className="text-gray-200 text-sm font-medium">CVC</Label>
                              <Input 
                                id="cvc" 
                                placeholder="123" 
                                className="bg-gray-800/50 border-gray-700 focus:border-primary focus:ring-primary"
                              />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <Button 
                        type="submit" 
                        className="w-full mt-6 bg-primary hover:bg-primary/90 text-black font-medium py-6 text-lg"
                      >
                        <Gift className="mr-2 h-5 w-5" />
                        Complete Donation
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="sticky top-20 border-gray-700 bg-gray-900/50 backdrop-blur-sm shadow-xl">
                <CardHeader className="border-b border-gray-800 bg-black/30">
                  <CardTitle className="text-xl">Active Campaigns</CardTitle>
                  <CardDescription className="text-gray-400">Choose a campaign to support</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {[
                    {
                      title: "Help Shelter Dogs",
                      description: "Provide food for dogs in local shelters",
                      goal: 5000,
                      raised: 3245,
                      icon: "🐕",
                    },
                    {
                      title: "Rescue Cats Food Drive",
                      description: "Help feed rescued cats awaiting adoption",
                      goal: 3000,
                      raised: 1872,
                      icon: "🐈",
                    },
                    {
                      title: "Wildlife Rehabilitation",
                      description: "Support food for injured wildlife",
                      goal: 8000,
                      raised: 4320,
                      icon: "🦊",
                    },
                  ].map((campaign, index) => (
                    <motion.div 
                      key={index} 
                      whileHover={{ scale: 1.02 }} 
                      className="rounded-lg border border-gray-700 p-4 hover:border-gray-600 hover:bg-gray-800/30 transition-all cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-primary/20 p-3 text-2xl">{campaign.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{campaign.title}</h3>
                          <p className="text-sm text-gray-400">{campaign.description}</p>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="text-primary font-medium">${campaign.raised} raised</span>
                              <span className="text-gray-400">Goal: ${campaign.goal}</span>
                            </div>
                            <div className="h-2.5 w-full rounded-full bg-gray-800">
                              <div
                                className="h-2.5 rounded-full bg-gradient-to-r from-primary to-purple-500"
                                style={{
                                  width: `${(campaign.raised / campaign.goal) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
                <CardFooter className="pt-2 pb-6 px-6">
                  <div className="rounded-lg bg-black/30 border border-gray-800 p-4 w-full">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-2.5">
                        <Leaf className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Impact Stats</h3>
                        <p className="text-sm text-gray-400">
                          Your donations have helped feed 1,200+ animals this month
                        </p>
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>

        <NFTPreviewModal open={showNFTPreview} onClose={() => setShowNFTPreview(false)} />
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Gift, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TokenBalance } from "@/components/token-balance"
import { NFTRewardsBox } from "@/components/nft-rewards-box"

export default function NFTsPage() {
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null)

  const nfts = [
    {
      id: 1,
      name: "Animal Helper #1",
      description: "Donated to Help Shelter Dogs campaign",
      image: "/placeholder.svg?height=300&width=300&text=Animal+Helper+%231",
      rarity: "Common",
      redeemable: true,
      dateAcquired: "2023-12-15",
    },
    {
      id: 2,
      name: "Animal Helper #2",
      description: "Donated to Rescue Cats Food Drive",
      image: "/placeholder.svg?height=300&width=300&text=Animal+Helper+%232",
      rarity: "Uncommon",
      redeemable: true,
      dateAcquired: "2024-01-22",
    },
    {
      id: 3,
      name: "Animal Helper #3",
      description: "Donated to Wildlife Rehabilitation",
      image: "/placeholder.svg?height=300&width=300&text=Animal+Helper+%233",
      rarity: "Rare",
      redeemable: true,
      dateAcquired: "2024-02-10",
    },
    {
      id: 4,
      name: "Animal Helper #4",
      description: "Donated to Help Shelter Dogs campaign",
      image: "/placeholder.svg?height=300&width=300&text=Animal+Helper+%234",
      rarity: "Common",
      redeemable: false,
      dateAcquired: "2024-03-05",
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-700 text-white hover:bg-gray-800 mr-4"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">My NFTs</h1>
        </div>
        <TokenBalance />
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All NFTs</TabsTrigger>
              <TabsTrigger value="redeemable">Redeemable</TabsTrigger>
              <TabsTrigger value="redeemed">Redeemed</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {nfts.map((nft) => (
                  <motion.div
                    key={nft.id}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedNFT(nft.id)}
                    className="cursor-pointer"
                  >
                    <Card className={`overflow-hidden h-full ${selectedNFT === nft.id ? "ring-2 ring-primary" : ""}`}>
                      <div className="aspect-square w-full bg-muted relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.name}
                          className="object-cover w-full h-full relative z-10"
                        />
                        <Badge className="absolute top-2 right-2 bg-primary">{nft.rarity}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{nft.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{nft.description}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <div className="w-full">
                          <p className="text-xs text-muted-foreground mb-2">
                            Acquired: {new Date(nft.dateAcquired).toLocaleDateString()}
                          </p>
                          <Badge variant={nft.redeemable ? "default" : "outline"} className="w-full justify-center">
                            {nft.redeemable ? "Redeemable" : "Redeemed"}
                          </Badge>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="redeemable">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {nfts
                  .filter((nft) => nft.redeemable)
                  .map((nft) => (
                    <motion.div
                      key={nft.id}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedNFT(nft.id)}
                      className="cursor-pointer"
                    >
                      <Card className={`overflow-hidden h-full ${selectedNFT === nft.id ? "ring-2 ring-primary" : ""}`}>
                        <div className="aspect-square w-full bg-muted relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
                          <img
                            src={nft.image || "/placeholder.svg"}
                            alt={nft.name}
                            className="object-cover w-full h-full relative z-10"
                          />
                          <Badge className="absolute top-2 right-2 bg-primary">{nft.rarity}</Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">{nft.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{nft.description}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <div className="w-full">
                            <p className="text-xs text-muted-foreground mb-2">
                              Acquired: {new Date(nft.dateAcquired).toLocaleDateString()}
                            </p>
                            <Badge variant="default" className="w-full justify-center">
                              Redeemable
                            </Badge>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="redeemed">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {nfts
                  .filter((nft) => !nft.redeemable)
                  .map((nft) => (
                    <motion.div
                      key={nft.id}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setSelectedNFT(nft.id)}
                      className="cursor-pointer"
                    >
                      <Card className={`overflow-hidden h-full ${selectedNFT === nft.id ? "ring-2 ring-primary" : ""}`}>
                        <div className="aspect-square w-full bg-muted relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
                          <img
                            src={nft.image || "/placeholder.svg"}
                            alt={nft.name}
                            className="object-cover w-full h-full relative z-10 opacity-70"
                          />
                          <Badge className="absolute top-2 right-2 bg-muted-foreground">{nft.rarity}</Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">{nft.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{nft.description}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <div className="w-full">
                            <p className="text-xs text-muted-foreground mb-2">
                              Acquired: {new Date(nft.dateAcquired).toLocaleDateString()}
                            </p>
                            <Badge variant="outline" className="w-full justify-center">
                              Redeemed
                            </Badge>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          {selectedNFT ? (
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>NFT Details</CardTitle>
                <CardDescription>View and manage your selected NFT</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const nft = nfts.find((n) => n.id === selectedNFT)
                  if (!nft) return null

                  return (
                    <>
                      <div className="aspect-square w-full bg-muted relative overflow-hidden rounded-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.name}
                          className="object-cover w-full h-full relative z-10"
                        />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold">{nft.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{nft.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="rounded-lg border p-2">
                          <span className="text-muted-foreground">Rarity</span>
                          <p className="font-medium">{nft.rarity}</p>
                        </div>
                        <div className="rounded-lg border p-2">
                          <span className="text-muted-foreground">Status</span>
                          <p className="font-medium">{nft.redeemable ? "Redeemable" : "Redeemed"}</p>
                        </div>
                        <div className="rounded-lg border p-2">
                          <span className="text-muted-foreground">Collection</span>
                          <p className="font-medium">Animal Helpers</p>
                        </div>
                        <div className="rounded-lg border p-2">
                          <span className="text-muted-foreground">Acquired</span>
                          <p className="font-medium">{new Date(nft.dateAcquired).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {nft.redeemable ? (
                        <div className="space-y-2">
                          <Button className="w-full">
                            <Gift className="h-4 w-4 mr-2" />
                            Redeem NFT
                          </Button>
                          <Button variant="outline" className="w-full">
                            <ShoppingBag className="h-4 w-4 mr-2" />
                            View Eligible Items
                          </Button>
                        </div>
                      ) : (
                        <div className="rounded-lg bg-muted p-4">
                          <p className="text-sm font-medium">This NFT has been redeemed</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            You've already used this NFT to claim an item from the marketplace.
                          </p>
                        </div>
                      )}
                    </>
                  )
                })()}
              </CardContent>
            </Card>
          ) : (
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>NFT Details</CardTitle>
                <CardDescription>Select an NFT to view details</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Gift className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="mt-4 text-muted-foreground">Click on an NFT to view its details and redemption options</p>
              </CardContent>
            </Card>
          )}
          
          {/* NFT Rewards Box */}
          <div className="mt-8">
            <NFTRewardsBox />
          </div>
        </div>
      </div>
    </div>
  )
}


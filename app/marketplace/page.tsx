"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Filter, MessageCircle, Plus, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { TokenBalance } from "@/components/token-balance"
import { ChatDrawer } from "@/components/chat-drawer"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [chatOpen, setChatOpen] = useState(false)
  const [selectedShop, setSelectedShop] = useState<{ id: number; name: string } | null>(null)

  const openChat = (shop: { id: number; name: string }) => {
    setSelectedShop(shop)
    setChatOpen(true)
  }

  const shops = [
    {
      id: 1,
      name: "Paws & Claws",
      description: "Premium pet food and accessories",
      image: "/placeholder.svg?height=200&width=200&text=Paws+%26+Claws",
      rating: 4.8,
      reviews: 124,
      nftAccepted: true,
      categories: ["Food", "Toys"],
    },
    {
      id: 2,
      name: "Furry Friends",
      description: "Organic and natural pet supplies",
      image: "/placeholder.svg?height=200&width=200&text=Furry+Friends",
      rating: 4.5,
      reviews: 89,
      nftAccepted: true,
      categories: ["Food", "Grooming"],
    },
    {
      id: 3,
      name: "Wild Nature",
      description: "Specialized wildlife food and care products",
      image: "/placeholder.svg?height=200&width=200&text=Wild+Nature",
      rating: 4.7,
      reviews: 56,
      nftAccepted: false,
      categories: ["Food", "Supplements"],
    },
    {
      id: 4,
      name: "Pet Paradise",
      description: "All-in-one pet shop for every need",
      image: "/placeholder.svg?height=200&width=200&text=Pet+Paradise",
      rating: 4.9,
      reviews: 210,
      nftAccepted: true,
      categories: ["Food", "Toys", "Accessories"],
    },
    {
      id: 5,
      name: "Healthy Paws",
      description: "Health-focused pet nutrition",
      image: "/placeholder.svg?height=200&width=200&text=Healthy+Paws",
      rating: 4.6,
      reviews: 78,
      nftAccepted: true,
      categories: ["Food", "Supplements"],
    },
    {
      id: 6,
      name: "Exotic Pets",
      description: "Specialized food for exotic animals",
      image: "/placeholder.svg?height=200&width=200&text=Exotic+Pets",
      rating: 4.4,
      reviews: 42,
      nftAccepted: false,
      categories: ["Food", "Accessories"],
    },
  ]

  const filteredShops = shops.filter(
    (shop) =>
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        </div>
        <TokenBalance />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 lg:w-72 space-y-6">
          <div className="hidden md:block space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {["Food", "Toys", "Accessories", "Grooming", "Supplements"].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={`category-${category}`} />
                        <Label htmlFor={`category-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-2">NFT Acceptance</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nft-accepted" />
                      <Label htmlFor="nft-accepted">Accepts NFTs</Label>
                    </div>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium mb-2">Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox id={`rating-${rating}`} />
                        <Label htmlFor={`rating-${rating}`} className="flex items-center">
                          {rating}+ <Star className="h-3 w-3 ml-1 fill-primary text-primary" />
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Filter shops by category, NFT acceptance, and rating</SheetDescription>
                </SheetHeader>
                <div className="space-y-6 mt-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Categories</h4>
                    <div className="space-y-2">
                      {["Food", "Toys", "Accessories", "Grooming", "Supplements"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox id={`mobile-category-${category}`} />
                          <Label htmlFor={`mobile-category-${category}`}>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">NFT Acceptance</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-nft-accepted" />
                        <Label htmlFor="mobile-nft-accepted">Accepts NFTs</Label>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium mb-2">Rating</h4>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox id={`mobile-rating-${rating}`} />
                          <Label htmlFor={`mobile-rating-${rating}`} className="flex items-center">
                            {rating}+ <Star className="h-3 w-3 ml-1 fill-primary text-primary" />
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="space-y-4">
            <Link href="/marketplace/create">
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Shop
              </Button>
            </Link>
            <Link href="/marketplace/my-shop">
              <Button variant="outline" className="w-full">
                <ShoppingBag className="h-4 w-4 mr-2" />
                My Shop
              </Button>
            </Link>
            <Link href="/marketplace/chats">
              <Button variant="outline" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                My Chats
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search shops and products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="shops">
            <TabsList className="mb-6">
              <TabsTrigger value="shops">Shops</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="nft-redeemable">NFT Redeemable</TabsTrigger>
            </TabsList>

            <TabsContent value="shops">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShops.map((shop) => (
                  <motion.div key={shop.id} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                    <Card className="overflow-hidden h-full">
                      <div className="aspect-video w-full bg-muted relative overflow-hidden">
                        <img
                          src={shop.image || "/placeholder.svg"}
                          alt={shop.name}
                          className="object-cover w-full h-full"
                        />
                        {shop.nftAccepted && <Badge className="absolute top-2 right-2 bg-primary">NFT Accepted</Badge>}
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle>{shop.name}</CardTitle>
                        <CardDescription>{shop.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center text-sm">
                          <Star className="h-4 w-4 mr-1 fill-primary text-primary" />
                          <span className="font-medium">{shop.rating}</span>
                          <span className="text-muted-foreground ml-1">({shop.reviews} reviews)</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {shop.categories.map((category) => (
                            <Badge key={category} variant="outline">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex w-full gap-2">
                          <Link href={`/marketplace/shop/${shop.id}`} className="flex-1">
                            <Button className="w-full">
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              Visit Shop
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            className="border-gray-700 text-white hover:bg-gray-800"
                            onClick={() => openChat({ id: shop.id, name: shop.name })}
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span className="sr-only">Chat with shop</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="rounded-lg border p-8 text-center">
                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Browse Products</h3>
                <p className="mt-2 text-sm text-muted-foreground">Select a shop first to browse their products</p>
              </div>
            </TabsContent>

            <TabsContent value="nft-redeemable">
              <div className="rounded-lg border p-8 text-center">
                <Star className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">NFT Redeemable Items</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Connect your wallet to view items you can redeem with your NFTs
                </p>
                <Button className="mt-4">Connect Wallet</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {selectedShop && (
        <ChatDrawer 
          open={chatOpen} 
          onClose={() => setChatOpen(false)} 
          shopName={selectedShop.name} 
        />
      )}
    </div>
  )
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


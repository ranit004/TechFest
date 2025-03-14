"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, MessageCircle, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { TokenBalance } from "@/components/token-balance"
import { ChatDrawer } from "@/components/chat-drawer"

export default function ShopPage({ params }: { params: { id: string } }) {
  const [chatOpen, setChatOpen] = useState(false)

  // Mock shop data
  const shop = {
    id: Number.parseInt(params.id),
    name: "Paws & Claws",
    description:
      "Premium pet food and accessories for all your furry friends. We offer high-quality products that prioritize animal health and happiness.",
    image: "/placeholder.svg?height=400&width=800&text=Paws+%26+Claws",
    rating: 4.8,
    reviews: 124,
    nftAccepted: true,
    categories: ["Food", "Toys", "Accessories"],
    products: [
      {
        id: 1,
        name: "Premium Dog Food",
        description: "High-quality nutrition for your canine companion",
        price: 29.99,
        image: "/placeholder.svg?height=200&width=200&text=Dog+Food",
        nftRedeemable: true,
        tokenPrice: 150,
      },
      {
        id: 2,
        name: "Cat Treats",
        description: "Delicious treats your feline will love",
        price: 12.99,
        image: "/placeholder.svg?height=200&width=200&text=Cat+Treats",
        nftRedeemable: false,
        tokenPrice: 65,
      },
      {
        id: 3,
        name: "Interactive Toy",
        description: "Keep your pet entertained for hours",
        price: 19.99,
        image: "/placeholder.svg?height=200&width=200&text=Pet+Toy",
        nftRedeemable: true,
        tokenPrice: 100,
      },
      {
        id: 4,
        name: "Grooming Brush",
        description: "Gentle brush for all coat types",
        price: 15.99,
        image: "/placeholder.svg?height=200&width=200&text=Brush",
        nftRedeemable: false,
        tokenPrice: 80,
      },
      {
        id: 5,
        name: "Pet Bed",
        description: "Comfortable bed for your furry friend",
        price: 49.99,
        image: "/placeholder.svg?height=200&width=200&text=Pet+Bed",
        nftRedeemable: true,
        tokenPrice: 250,
      },
      {
        id: 6,
        name: "Water Fountain",
        description: "Fresh flowing water for your pet",
        price: 39.99,
        image: "/placeholder.svg?height=200&width=200&text=Water+Fountain",
        nftRedeemable: false,
        tokenPrice: 200,
      },
    ],
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link
            href="/marketplace"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to marketplace
          </Link>
        </div>
        <TokenBalance />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="relative rounded-xl overflow-hidden aspect-[21/9] bg-muted">
          <img src={shop.image || "/placeholder.svg"} alt={shop.name} className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl font-bold tracking-tight">{shop.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 fill-primary text-primary" />
                <span className="font-medium">{shop.rating}</span>
                <span className="text-muted-foreground ml-1">({shop.reviews} reviews)</span>
              </div>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <div className="flex flex-wrap gap-1">
                {shop.categories.map((category) => (
                  <Badge key={category} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {shop.nftAccepted && <Badge className="absolute top-4 right-4 bg-primary">NFT Accepted</Badge>}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 lg:w-1/4 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <h3 className="text-lg font-medium">About {shop.name}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{shop.description}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setChatOpen(true)}>
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat with Shop
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <h3 className="text-lg font-medium">Payment Options</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Regular Purchase</p>
                    <p className="text-xs text-muted-foreground">Credit card or crypto</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Coins className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Token Purchase</p>
                    <p className="text-xs text-muted-foreground">Use PFC tokens</p>
                  </div>
                </div>
                {shop.nftAccepted && (
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Gift className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">NFT Redemption</p>
                      <p className="text-xs text-muted-foreground">Redeem with your NFTs</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <Tabs defaultValue="all">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Products</TabsTrigger>
                <TabsTrigger value="nft-redeemable">NFT Redeemable</TabsTrigger>
                <TabsTrigger value="token-purchase">Token Purchase</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shop.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="nft-redeemable">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shop.products
                    .filter((product) => product.nftRedeemable)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="token-purchase">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shop.products.map((product) => (
                    <ProductCard key={product.id} product={product} showTokenPrice />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} shopName={shop.name} />
    </div>
  )
}

function Coins(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  )
}

function Gift(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" x2="12" y1="22" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    image: string
    nftRedeemable: boolean
    tokenPrice: number
  }
  showTokenPrice?: boolean
}

function ProductCard({ product, showTokenPrice = false }: ProductCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden h-full">
        <div className="aspect-square w-full bg-muted relative overflow-hidden">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="object-cover w-full h-full" />
          {product.nftRedeemable && <Badge className="absolute top-2 right-2 bg-primary">NFT Redeemable</Badge>}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{product.description}</p>
          <div className="mt-2">
            {showTokenPrice ? (
              <div className="flex items-center">
                <Coins className="h-4 w-4 mr-1 text-primary" />
                <span className="font-medium">{product.tokenPrice}</span>
                <span className="text-xs text-muted-foreground ml-1">PFC</span>
              </div>
            ) : (
              <p className="font-medium">${product.price.toFixed(2)}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex w-full gap-2">
            <Button className="flex-1">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Link href={`/marketplace/product-inquiry/${product.id}`}>
              <Button 
                variant="outline" 
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">Inquire about product</span>
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}


"use client"

import type React from "react"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BarChart3,
  Edit,
  MessageCircle,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  Store,
  Trash2,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { TokenBalance } from "@/components/token-balance"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ChatCenter } from "@/components/chat-center"

export default function MyShopPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showChat, setShowChat] = useState(false)

  // Mock shop data
  const shop = {
    id: 1,
    name: "My Pet Shop",
    description: "Quality pet food and accessories for all your furry friends.",
    image: "/placeholder.svg?height=400&width=800&text=My+Pet+Shop",
    rating: 4.7,
    reviews: 28,
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
        stock: 25,
        sales: 12,
      },
      {
        id: 2,
        name: "Cat Treats",
        description: "Delicious treats your feline will love",
        price: 12.99,
        image: "/placeholder.svg?height=200&width=200&text=Cat+Treats",
        nftRedeemable: false,
        tokenPrice: 65,
        stock: 40,
        sales: 8,
      },
      {
        id: 3,
        name: "Interactive Toy",
        description: "Keep your pet entertained for hours",
        price: 19.99,
        image: "/placeholder.svg?height=200&width=200&text=Pet+Toy",
        nftRedeemable: true,
        tokenPrice: 100,
        stock: 15,
        sales: 5,
      },
    ],
    stats: {
      totalSales: 25,
      revenue: 549.75,
      visitors: 342,
      conversionRate: 7.3,
    },
    orders: [
      {
        id: "ORD-001",
        customer: "John Doe",
        date: "2024-03-10",
        status: "Completed",
        total: 42.98,
        items: 2,
      },
      {
        id: "ORD-002",
        customer: "Jane Smith",
        date: "2024-03-12",
        status: "Processing",
        total: 29.99,
        items: 1,
      },
      {
        id: "ORD-003",
        customer: "Mike Johnson",
        date: "2024-03-15",
        status: "Shipped",
        total: 52.97,
        items: 3,
      },
    ],
    messages: [
      {
        id: 1,
        customer: {
          name: "Sarah Wilson",
          avatar: "/placeholder.svg?height=40&width=40&text=SW",
        },
        unread: 2,
        lastMessage: "Do you have this in a different size?",
        lastMessageTime: "10:23 AM",
      },
      {
        id: 2,
        customer: {
          name: "Robert Brown",
          avatar: "/placeholder.svg?height=40&width=40&text=RB",
        },
        unread: 0,
        lastMessage: "Thanks for the quick delivery!",
        lastMessageTime: "Yesterday",
      },
      {
        id: 3,
        customer: {
          name: "Emily Davis",
          avatar: "/placeholder.svg?height=40&width=40&text=ED",
        },
        unread: 0,
        lastMessage: "Is this product suitable for kittens?",
        lastMessageTime: "Mar 14",
      },
    ],
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar>
        <SidebarHeader className="flex items-center gap-2 px-4">
          <Store className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Shop Manager</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")}>
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "products"} onClick={() => setActiveTab("products")}>
                <Package className="h-4 w-4" />
                <span>Products</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "orders"} onClick={() => setActiveTab("orders")}>
                <ShoppingBag className="h-4 w-4" />
                <span>Orders</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "customers"} onClick={() => setActiveTab("customers")}>
                <Users className="h-4 w-4" />
                <span>Customers</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={activeTab === "messages"}
                onClick={() => {
                  setActiveTab("messages")
                  setShowChat(true)
                }}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Messages</span>
                {shop.messages.reduce((count, msg) => count + msg.unread, 0) > 0 && (
                  <Badge className="ml-auto">{shop.messages.reduce((count, msg) => count + msg.unread, 0)}</Badge>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={activeTab === "settings"} onClick={() => setActiveTab("settings")}>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="p-4">
            <Link href="/marketplace">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Marketplace
              </Button>
            </Link>
          </div>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 overflow-auto">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{shop.name}</h1>
              <p className="text-muted-foreground">Manage your shop and products</p>
            </div>
            <TokenBalance />
          </div>

          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Sales</p>
                        <h3 className="text-2xl font-bold mt-1">{shop.stats.totalSales}</h3>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <h3 className="text-2xl font-bold mt-1">${shop.stats.revenue.toFixed(2)}</h3>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Visitors</p>
                        <h3 className="text-2xl font-bold mt-1">{shop.stats.visitors}</h3>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Conversion Rate</p>
                        <h3 className="text-2xl font-bold mt-1">{shop.stats.conversionRate}%</h3>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Your most recent orders</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {shop.orders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>{order.customer}</span>
                              <span className="mx-2">•</span>
                              <span>{new Date(order.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant={
                                order.status === "Completed"
                                  ? "default"
                                  : order.status === "Processing"
                                    ? "outline"
                                    : "secondary"
                              }
                            >
                              {order.status}
                            </Badge>
                            <p className="text-sm mt-1">${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Orders
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Messages</CardTitle>
                    <CardDescription>Your latest customer inquiries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {shop.messages.map((message) => (
                        <div key={message.id} className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0">
                          <div className="h-10 w-10 rounded-full overflow-hidden">
                            <img
                              src={message.customer.avatar || "/placeholder.svg"}
                              alt={message.customer.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{message.customer.name}</p>
                              <span className="text-xs text-muted-foreground">{message.lastMessageTime}</span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{message.lastMessage}</p>
                          </div>
                          {message.unread > 0 && <Badge className="ml-auto">{message.unread}</Badge>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setActiveTab("messages")
                        setShowChat(true)
                      }}
                    >
                      View All Messages
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Products</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search products..." className="pl-10" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {shop.categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-4 font-medium border-b">
                  <div className="col-span-5">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Stock</div>
                  <div className="col-span-2 text-center">Sales</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
                {shop.products.map((product) => (
                  <div key={product.id} className="grid grid-cols-12 p-4 items-center border-b last:border-0">
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-muted overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.description}</p>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <p>${product.price.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{product.tokenPrice} PFC</p>
                    </div>
                    <div className="col-span-2 text-center">
                      <p>{product.stock}</p>
                    </div>
                    <div className="col-span-2 text-center">
                      <p>{product.sales}</p>
                    </div>
                    <div className="col-span-1 flex justify-end gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Orders</h2>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-12 p-4 font-medium border-b">
                  <div className="col-span-2">Order ID</div>
                  <div className="col-span-3">Customer</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Total</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
                {shop.orders.map((order) => (
                  <div key={order.id} className="grid grid-cols-12 p-4 items-center border-b last:border-0">
                    <div className="col-span-2">
                      <p className="font-medium">{order.id}</p>
                    </div>
                    <div className="col-span-3">
                      <p>{order.customer}</p>
                    </div>
                    <div className="col-span-2">
                      <p>{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="col-span-2">
                      <p>${order.total.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{order.items} items</p>
                    </div>
                    <div className="col-span-2">
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "default"
                            : order.status === "Processing"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6 max-w-3xl">
              <Card>
                <CardHeader>
                  <CardTitle>Shop Settings</CardTitle>
                  <CardDescription>Manage your shop details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="shop-name">Shop Name</Label>
                    <Input id="shop-name" defaultValue={shop.name} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shop-description">Shop Description</Label>
                    <Textarea id="shop-description" defaultValue={shop.description} className="min-h-[100px]" />
                  </div>

                  <div className="space-y-2">
                    <Label>Shop Categories</Label>
                    <div className="flex flex-wrap gap-2">
                      {shop.categories.map((category) => (
                        <Badge key={category} variant="secondary" className="flex items-center gap-1">
                          {category}
                          <button className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5">
                            <Trash2 className="h-3 w-3" />
                            <span className="sr-only">Remove {category}</span>
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="nft-acceptance">Accept NFT Redemptions</Label>
                      <Switch id="nft-acceptance" defaultChecked={shop.nftAccepted} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Allow customers to redeem their NFTs for products in your shop
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="token-payments">Accept Token Payments</Label>
                      <Switch id="token-payments" defaultChecked />
                    </div>
                    <p className="text-sm text-muted-foreground">Allow customers to pay using PFC tokens</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto">Save Changes</Button>
                </CardFooter>
              </Card>
            </div>
          )}

          {showChat && <ChatCenter conversations={shop.messages} onClose={() => setShowChat(false)} />}
        </div>
      </div>
    </div>
  )
}

function DollarSign(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="12" x2="12" y1="2" y2="22"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
  )
}

function Search(props: React.SVGProps<SVGSVGElement>) {
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


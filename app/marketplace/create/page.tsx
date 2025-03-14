"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Check, ImagePlus, Loader2, Plus, Store, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TokenBalance } from "@/components/token-balance"

export default function CreateShopPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [shopCreated, setShopCreated] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [currentStep, setCurrentStep] = useState(1)

  type Product = {
    id: number
    name: string
    description: string
    price: string
    tokenPrice: string
    nftRedeemable: boolean
    image: string
  }

  const handleAddCategory = () => {
    if (newCategory && !selectedCategories.includes(newCategory)) {
      setSelectedCategories([...selectedCategories, newCategory])
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter((c) => c !== category))
  }

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: Date.now(),
      name: "",
      description: "",
      price: "",
      tokenPrice: "",
      nftRedeemable: false,
      image: `/placeholder.svg?height=200&width=200&text=Product+${products.length + 1}`,
    }
    setProducts([...products, newProduct])
  }

  const handleUpdateProduct = (id: number, field: keyof Product, value: string | boolean) => {
    setProducts(products.map((product) => (product.id === id ? { ...product, [field]: value } : product)))
  }

  const handleRemoveProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShopCreated(true)
    }, 1500)
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  const availableCategories = [
    "Food",
    "Toys",
    "Accessories",
    "Grooming",
    "Supplements",
    "Bedding",
    "Clothing",
    "Health",
    "Training",
  ]

  if (shopCreated) {
    return (
      <div className="container py-10">
        <div className="flex items-center mb-8">
          <Link
            href="/marketplace"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary mr-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to marketplace
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto rounded-lg border bg-card p-8 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Shop Created Successfully!</h2>
          <p className="mt-2 text-muted-foreground">
            Your shop has been created and is now live on the marketplace. You can now manage your shop and add more
            products.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace/my-shop">
              <Button>Manage My Shop</Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="outline">Go to Marketplace</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
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
          <h1 className="text-3xl font-bold tracking-tight">Create Your Shop</h1>
        </div>
        <TokenBalance />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex flex-col items-center ${currentStep === step ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep >= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
                <span className="text-sm font-medium">
                  {step === 1 ? "Shop Details" : step === 2 ? "Add Products" : "Review & Submit"}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
              <div
                className="h-1 bg-primary transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Shop Details</CardTitle>
              <CardDescription>Provide information about your shop</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="shop-name">Shop Name</Label>
                <Input id="shop-name" placeholder="Enter your shop name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shop-description">Shop Description</Label>
                <Textarea
                  id="shop-description"
                  placeholder="Describe your shop and what you sell"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Shop Banner Image</Label>
                <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50">
                  <ImagePlus className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop an image, or click to browse</p>
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Shop Categories</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      {category}
                      <button
                        onClick={() => handleRemoveCategory(category)}
                        className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Remove {category}</span>
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Select onValueChange={(value) => setNewCategory(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCategories
                        .filter((category) => !selectedCategories.includes(category))
                        .map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={handleAddCategory} disabled={!newCategory}>
                    Add
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="nft-acceptance">Accept NFT Redemptions</Label>
                  <Switch id="nft-acceptance" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow customers to redeem their NFTs for products in your shop
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={nextStep} className="ml-auto">
                Next: Add Products
              </Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Add Products</CardTitle>
              <CardDescription>Add products to your shop</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {products.length > 0 ? (
                <div className="space-y-6">
                  {products.map((product, index) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Product {index + 1}</h3>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveProduct(product.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove product</span>
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`product-name-${product.id}`}>Product Name</Label>
                          <Input
                            id={`product-name-${product.id}`}
                            value={product.name}
                            onChange={(e) => handleUpdateProduct(product.id, "name", e.target.value)}
                            placeholder="Enter product name"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`product-price-${product.id}`}>Price ($)</Label>
                          <Input
                            id={`product-price-${product.id}`}
                            value={product.price}
                            onChange={(e) => handleUpdateProduct(product.id, "price", e.target.value)}
                            placeholder="29.99"
                            type="number"
                            step="0.01"
                            min="0"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`product-token-price-${product.id}`}>Token Price (PFC)</Label>
                          <Input
                            id={`product-token-price-${product.id}`}
                            value={product.tokenPrice}
                            onChange={(e) => handleUpdateProduct(product.id, "tokenPrice", e.target.value)}
                            placeholder="150"
                            type="number"
                            min="0"
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`product-nft-${product.id}`}>NFT Redeemable</Label>
                            <Switch
                              id={`product-nft-${product.id}`}
                              checked={product.nftRedeemable}
                              onCheckedChange={(checked) => handleUpdateProduct(product.id, "nftRedeemable", checked)}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">Allow this product to be redeemed with NFTs</p>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor={`product-description-${product.id}`}>Description</Label>
                          <Textarea
                            id={`product-description-${product.id}`}
                            value={product.description}
                            onChange={(e) => handleUpdateProduct(product.id, "description", e.target.value)}
                            placeholder="Describe your product"
                          />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                          <Label>Product Image</Label>
                          <div className="border border-dashed rounded-lg p-4 flex items-center justify-center bg-muted/50">
                            <div className="text-center">
                              <ImagePlus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground mb-2">Upload product image</p>
                              <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-lg p-8 text-center">
                  <Store className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Products Added Yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">Add products to your shop to start selling</p>
                </div>
              )}

              <Button type="button" variant="outline" className="w-full" onClick={handleAddProduct}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep} disabled={products.length === 0}>
                Next: Review
              </Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Review your shop details before submitting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Shop Details</h3>
                <div className="rounded-lg border p-4 space-y-4">
                  <div>
                    <span className="text-sm font-medium">Shop Name:</span>
                    <p className="text-sm">My Pet Shop</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Description:</span>
                    <p className="text-sm">Quality pet food and accessories for all your furry friends.</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Categories:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCategories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">NFT Acceptance:</span>
                    <p className="text-sm">Enabled</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Products ({products.length})</h3>
                {products.length > 0 ? (
                  <div className="space-y-4">
                    <Tabs defaultValue="grid" className="w-full">
                      <TabsList className="mb-4">
                        <TabsTrigger value="grid">Grid View</TabsTrigger>
                        <TabsTrigger value="list">List View</TabsTrigger>
                      </TabsList>

                      <TabsContent value="grid">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {products.map((product) => (
                            <div key={product.id} className="border rounded-lg overflow-hidden">
                              <div className="aspect-square bg-muted">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name || "Product"}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="p-3">
                                <h4 className="font-medium truncate">{product.name || "Untitled Product"}</h4>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-sm">${product.price || "0.00"}</span>
                                  {product.nftRedeemable && (
                                    <Badge variant="outline" className="text-xs">
                                      NFT
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="list">
                        <div className="space-y-2">
                          {products.map((product) => (
                            <div key={product.id} className="flex items-center border rounded-lg p-3">
                              <div className="w-12 h-12 bg-muted rounded-md overflow-hidden mr-3">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name || "Product"}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium truncate">{product.name || "Untitled Product"}</h4>
                                <p className="text-sm text-muted-foreground truncate">
                                  {product.description || "No description"}
                                </p>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">${product.price || "0.00"}</div>
                                {product.nftRedeemable && (
                                  <Badge variant="outline" className="text-xs">
                                    NFT
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                ) : (
                  <div className="rounded-lg border p-4 text-center">
                    <p className="text-sm text-muted-foreground">No products added</p>
                  </div>
                )}
              </div>

              <div className="rounded-lg bg-muted p-4">
                <h3 className="text-sm font-medium mb-2">Terms & Conditions</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  By creating a shop, you agree to our marketplace terms and conditions, including commission fees and
                  content policies.
                </p>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="terms" className="rounded border-muted-foreground" required />
                  <label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      terms and conditions
                    </Link>
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Shop...
                  </>
                ) : (
                  "Create Shop"
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}


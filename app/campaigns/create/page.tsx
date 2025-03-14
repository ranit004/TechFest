"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Leaf, Upload, Calendar, DollarSign, Users, ArrowLeft } from "lucide-react";
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

export default function CreateCampaign() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement campaign creation logic
    // This is where you would send the form data to your backend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    router.push("/campaigns");
  };

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
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-700 text-white hover:bg-gray-800"
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </div>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Create a Campaign
                </h1>
                <p className="mt-4 text-gray-400">
                  Start a campaign to raise funds and awareness for animal welfare causes.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="title" className="text-white">Campaign Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter campaign title"
                    required
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your campaign and its goals"
                    className="min-h-[150px] bg-gray-900 border-gray-700 text-white"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="target" className="text-white">Funding Goal</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="target"
                      type="number"
                      placeholder="Enter funding goal"
                      className="pl-9 bg-gray-900 border-gray-700 text-white"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="deadline" className="text-white">Campaign Deadline</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="deadline"
                      type="date"
                      className="pl-9 bg-gray-900 border-gray-700 text-white"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="image" className="text-white">Campaign Image</Label>
                  <div className="relative">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                    <Label
                      htmlFor="image"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-400">
                          Click to upload campaign image
                        </span>
                      </div>
                    </Label>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="beneficiaries" className="text-white">Number of Beneficiaries</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="beneficiaries"
                      type="number"
                      placeholder="Enter number of beneficiaries"
                      className="pl-9 bg-gray-900 border-gray-700 text-white"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="location" className="text-white">Location</Label>
                  <Input
                    id="location"
                    placeholder="Enter campaign location"
                    className="bg-gray-900 border-gray-700 text-white"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="category" className="text-white">Category</Label>
                  <select
                    id="category"
                    className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="food">Food Donation</option>
                    <option value="medical">Medical Care</option>
                    <option value="shelter">Shelter</option>
                    <option value="education">Education</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="tags" className="text-white">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Enter tags separated by commas"
                    className="bg-gray-900 border-gray-700 text-white"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-4 mt-8">
                  <Button
                    type="submit"
                    className="flex-1 bg-white text-black hover:bg-gray-200"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create Campaign"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
} 
"use client"

import React from "react"
import { PawPrint, Package, Truck, Home } from "lucide-react"

interface WorkflowAnimationProps {
  className?: string
}

export function WorkflowAnimation({ className = "" }: WorkflowAnimationProps) {
  const steps = [
    {
      icon: <Package className="h-8 w-8 text-white" />,
      label: "Collect Food",
      description: "Donors provide animal food"
    },
    {
      icon: <Truck className="h-8 w-8 text-white" />,
      label: "Transport",
      description: "Food is delivered to shelters"
    },
    {
      icon: <Home className="h-8 w-8 text-white" />,
      label: "Distribute",
      description: "Shelters receive donations"
    },
    {
      icon: <PawPrint className="h-8 w-8 text-white" />,
      label: "Feed Animals",
      description: "Animals get the nutrition they need"
    }
  ]

  return (
    <div 
      className={`relative w-full h-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm ${className}`}
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      </div>
      
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12">
        {Array.from({ length: 144 }).map((_, i) => (
          <div
            key={i}
            className="border-[0.5px] border-white/5"
          />
        ))}
      </div>
      
      {/* Main content container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-md px-4">
          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Animal Food Donation</h3>
            <p className="text-sm text-muted-foreground">From donors to animals in need</p>
          </div>
          
          {/* Steps container */}
          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-10 left-0 w-full h-1 bg-gray-800/50 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-full" />
            </div>
            
            {/* Steps */}
            <div className="flex justify-between relative">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center"
                >
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center z-10 bg-primary shadow-md"
                  >
                    {step.icon}
                  </div>
                  
                  <div className="mt-3 text-center">
                    <div className="text-sm font-medium text-white">{step.label}</div>
                    <div className="text-xs text-muted-foreground mt-1 max-w-[100px] mx-auto">
                      {step.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Description */}
          <div className="mt-8 text-center bg-card/30 backdrop-blur-sm p-3 rounded-lg border border-primary/20 shadow-md">
            <p className="text-muted-foreground text-sm">
              Our platform connects donors with animal shelters, ensuring food donations reach animals in need efficiently and transparently.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
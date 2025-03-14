"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface NFTPreviewModalProps {
  open: boolean
  onClose: () => void
}

export function NFTPreviewModal({ open, onClose }: NFTPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>NFT Reward Preview</DialogTitle>
          <DialogDescription>This is the NFT you'll receive for your donation</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="relative aspect-square w-full max-w-xs overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=300&width=300&text=Animal+Helper+NFT"
                alt="NFT Preview"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-bold">Animal Helper NFT</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This unique NFT represents your contribution to animal welfare. It can be redeemed for special items in
              our marketplace.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg border p-2">
                <span className="text-muted-foreground">Rarity</span>
                <p className="font-medium">Uncommon</p>
              </div>
              <div className="rounded-lg border p-2">
                <span className="text-muted-foreground">Benefits</span>
                <p className="font-medium">Store Discounts</p>
              </div>
              <div className="rounded-lg border p-2">
                <span className="text-muted-foreground">Collection</span>
                <p className="font-medium">Animal Helpers</p>
              </div>
              <div className="rounded-lg border p-2">
                <span className="text-muted-foreground">Redeemable</span>
                <p className="font-medium">Yes</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose}>Close Preview</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}


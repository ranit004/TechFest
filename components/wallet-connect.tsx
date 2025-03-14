"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WalletConnect() {
  const [connecting, setConnecting] = useState<string | null>(null)
  const [connected, setConnected] = useState<string | null>(null)

  const handleConnect = (wallet: string) => {
    setConnecting(wallet)

    // Simulate connection
    setTimeout(() => {
      setConnecting(null)
      setConnected(wallet)
    }, 1500)
  }

  const wallets = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "🦊",
      description: "Connect to your MetaMask wallet",
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: "🔗",
      description: "Scan with WalletConnect to connect",
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "💰",
      description: "Connect to your Coinbase wallet",
    },
  ]

  return (
    <div className="space-y-3">
      {wallets.map((wallet) => (
        <motion.div key={wallet.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="relative w-full justify-start gap-3 py-6"
            disabled={!!connecting || !!connected}
            onClick={() => handleConnect(wallet.id)}
          >
            <div className="flex h-6 w-6 items-center justify-center text-lg">{wallet.icon}</div>
            <div className="flex flex-col items-start gap-1 text-left">
              <span className="text-sm font-medium">{wallet.name}</span>
              <span className="text-xs text-muted-foreground">{wallet.description}</span>
            </div>
            {connecting === wallet.id && (
              <div className="absolute right-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
            {connected === wallet.id && (
              <div className="absolute right-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
            )}
          </Button>
        </motion.div>
      ))}

      {connected && (
        <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-center text-sm">
          <p className="font-medium text-primary">Wallet Connected!</p>
          <p className="mt-1 text-xs text-muted-foreground">You can now proceed with your account creation</p>
        </div>
      )}
    </div>
  )
}


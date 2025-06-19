"use client"

import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/components/wallet-provider"
import { Wallet } from "lucide-react"

export function WalletStatus() {
  const { address, balance, isConnected, walletType } = useWallet()

  if (!isConnected) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
            <Wallet className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Wallet Not Connected</h3>
            <p className="text-sm text-muted-foreground">Connect your wallet to access all features</p>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
        >
          Disconnected
        </Badge>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
          <Wallet className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">
            {walletType === 'metamask' ? 'MetaMask' : 'Circle'} Connected
          </h3>
          <p className="text-sm text-muted-foreground">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Loading...'} • Balance: {balance} USDC
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
        >
          Active
        </Badge>
      </div>
    </div>
  )
}

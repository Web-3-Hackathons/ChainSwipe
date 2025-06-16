"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { Wallet, LogOut } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function WalletConnectButton() {
  const { isConnected, address, balance, connect, disconnect } = useWallet()

  if (!isConnected) {
    return (
      <Button onClick={connect} className="w-full">
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Wallet className="mr-2 h-4 w-4" />
          <div className="flex flex-col items-start">
            <span className="text-xs">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </span>
            <span className="text-xs text-muted-foreground">${balance} USDC</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem onClick={disconnect}>
          <LogOut className="mr-2 h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

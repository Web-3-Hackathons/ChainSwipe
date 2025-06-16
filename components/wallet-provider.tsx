"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: string
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState("0.00")

  const connect = async () => {
    // Mock wallet connection
    setIsConnected(true)
    setAddress("0x742d35Cc6634C0532925a3b8D4C9db96590c6C87")
    setBalance("1,234.56")
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance("0.00")
  }

  return (
    <WalletContext.Provider value={{ isConnected, address, balance, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

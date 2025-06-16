"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LayoutDashboard, CreditCard, Coins, Gift, FileCheck, HelpCircle, ArrowLeftRight, Wallet } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { WalletConnectButton } from "@/components/wallet-connect-button"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Borrow",
    url: "/borrow",
    icon: CreditCard,
  },
  {
    title: "Stake",
    url: "/stake",
    icon: Coins,
  },
  {
    title: "Rewards",
    url: "/rewards",
    icon: Gift,
  },
  {
    title: "KYC",
    url: "/kyc",
    icon: FileCheck,
  },
  {
    title: "Bridge",
    url: "/bridge",
    icon: ArrowLeftRight,
  },
  {
    title: "Support",
    url: "/support",
    icon: HelpCircle,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <Wallet className="h-6 w-6" />
          <span className="font-bold text-lg">ChainSwipe</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <WalletConnectButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

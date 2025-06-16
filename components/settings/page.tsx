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
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  CreditCard,
  Coins,
  Gift,
  FileCheck,
  HelpCircle,
  ArrowLeftRight,
  Wallet,
  Zap,
  Shield,
  TrendingUp,
  Globe,
  Star,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { WalletConnectButton } from "@/components/wallet-connect-button"

const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    description: "Overview & Analytics",
    badge: null,
  },
  {
    title: "Borrow",
    url: "/borrow",
    icon: CreditCard,
    description: "DeFi Loans",
    badge: "2 Active",
  },
  {
    title: "Stake",
    url: "/stake",
    icon: Coins,
    description: "Earn Rewards",
    badge: "12.5% APY",
  },
  {
    title: "Rewards",
    url: "/rewards",
    icon: Gift,
    description: "Claim & NFTs",
    badge: "$45.67",
  },
]

const toolsMenuItems = [
  {
    title: "Bridge",
    url: "/bridge",
    icon: ArrowLeftRight,
    description: "Cross-chain Swaps",
    badge: null,
  },
  {
    title: "KYC",
    url: "/kyc",
    icon: FileCheck,
    description: "Identity Verification",
    badge: "75%",
  },
]

const supportMenuItems = [
  {
    title: "Support",
    url: "/support",
    icon: HelpCircle,
    description: "Help & FAQ",
    badge: null,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    description: "Preferences",
    badge: null,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="inset" className="border-r-0">
      <SidebarHeader className="border-b border-sidebar-border bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ChainSwipe
            </span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Globe className="h-3 w-3" />
                <span>Ethereum</span>
              </div>
              <Badge
                variant="secondary"
                className="text-xs px-2 py-0 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
              >
                Live
              </Badge>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {/* Main Navigation */}
        <SidebarGroup className="py-2">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 px-2 mb-2 flex items-center gap-2">
            <TrendingUp className="h-3 w-3" />
            DeFi Platform
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="group relative overflow-hidden transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 dark:hover:from-purple-950/20 dark:hover:to-blue-950/20 h-auto p-0"
                  >
                    <Link href={item.url} className="flex items-center gap-3 p-2 w-full">
                      <div
                        className={`p-1.5 rounded-md transition-colors flex-shrink-0 ${
                          pathname === item.url
                            ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-md"
                            : "bg-muted group-hover:bg-gradient-to-br group-hover:from-purple-100 group-hover:to-blue-100 dark:group-hover:from-purple-900/30 dark:group-hover:to-blue-900/30"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium truncate text-sm">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="text-xs flex-shrink-0 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 dark:from-purple-900/30 dark:to-blue-900/30 dark:text-purple-300"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{item.description}</p>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        {/* Tools Section */}
        <SidebarGroup className="py-2">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 px-2 mb-2 flex items-center gap-2">
            <Zap className="h-3 w-3" />
            Web3 Tools
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {toolsMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="group relative overflow-hidden transition-all duration-200 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 dark:hover:from-cyan-950/20 dark:hover:to-emerald-950/20 h-auto p-0"
                  >
                    <Link href={item.url} className="flex items-center gap-3 p-2 w-full">
                      <div
                        className={`p-1.5 rounded-md transition-colors flex-shrink-0 ${
                          pathname === item.url
                            ? "bg-gradient-to-br from-cyan-500 to-emerald-500 text-white shadow-md"
                            : "bg-muted group-hover:bg-gradient-to-br group-hover:from-cyan-100 group-hover:to-emerald-100 dark:group-hover:from-cyan-900/30 dark:group-hover:to-emerald-900/30"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium truncate text-sm">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="text-xs flex-shrink-0 bg-gradient-to-r from-cyan-100 to-emerald-100 text-cyan-800 dark:from-cyan-900/30 dark:to-emerald-900/30 dark:text-cyan-300"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{item.description}</p>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-3" />

        {/* Support Section */}
        <SidebarGroup className="py-2">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 px-2 mb-2 flex items-center gap-2">
            <Shield className="h-3 w-3" />
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {supportMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="group relative overflow-hidden transition-all duration-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-950/20 dark:hover:to-red-950/20 h-auto p-0"
                  >
                    <Link href={item.url} className="flex items-center gap-3 p-2 w-full">
                      <div
                        className={`p-1.5 rounded-md transition-colors flex-shrink-0 ${
                          pathname === item.url
                            ? "bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-md"
                            : "bg-muted group-hover:bg-gradient-to-br group-hover:from-orange-100 group-hover:to-red-100 dark:group-hover:from-orange-900/30 dark:group-hover:to-red-900/30"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium truncate text-sm">{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="text-xs flex-shrink-0 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 dark:from-orange-900/30 dark:to-red-900/30 dark:text-orange-300"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{item.description}</p>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats */}
        <div className="mt-4 mx-2 p-3 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-950/20 dark:via-blue-950/20 dark:to-cyan-950/20 rounded-lg border border-purple-200/50 dark:border-purple-800/50">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-semibold">Civil Score</span>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            750
          </div>
          <div className="text-xs text-muted-foreground">Gold Tier • +25 this month</div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-cyan-500/5 p-2">
        <WalletConnectButton />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScoreCard } from "@/components/score-card"
import { ActivityFeed } from "@/components/activity-feed"
import { QuickActions } from "@/components/quick-actions"
import { StatsOverview } from "@/components/stats-overview"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Sparkles,
  Shield,
  TrendingUp,
  DollarSign,
  Coins,
  Gift,
  Wallet,
  Zap,
  Star,
  Globe,
  Lock,
  ArrowUpRight,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-sm">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h1 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Web3 Dashboard
          </h1>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/50 dark:to-purple-950/30 min-h-screen">
        {/* Hero Welcome Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="absolute top-4 right-4 flex items-center gap-2 text-xs bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            <Globe className="w-3 h-3" />
            <span>Ethereum Mainnet</span>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <Wallet className="h-6 w-6 text-yellow-300" />
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Web3 Native
                </Badge>
              </div>

              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                  Own Your Credit.
                  <br />
                  <span className="text-yellow-300">Earn from Spending.</span>
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
                  Your decentralized credit score is building. Connect, stake, borrow, and earn rewards in the new
                  financial ecosystem.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                  <Shield className="h-4 w-4 text-green-300" />
                  <span>Non-Custodial</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                  <Lock className="h-4 w-4 text-green-300" />
                  <span>Fully Secured</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                  <TrendingUp className="h-4 w-4 text-green-300" />
                  <span>DeFi Rewards</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg">
                <Zap className="w-4 h-4 mr-2" />
                Quick Loan
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Star className="w-4 h-4 mr-2" />
                Boost Score
              </Button>
            </div>
          </div>
        </div>

        {/* MetaMask Connection Status */}
        <Card className="border-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full">
                  <Wallet className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">MetaMask Connected</h3>
                  <p className="text-sm text-muted-foreground">0x742d...6C87 • Balance: 1,234.56 USDC</p>
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
          </CardContent>
        </Card>

        {/* Enhanced Metrics Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-2 right-2 p-1 bg-white/20 rounded-full">
              <ArrowUpRight className="h-3 w-3" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-green-100">Portfolio Value</CardTitle>
              <DollarSign className="h-5 w-5 text-green-200" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold mb-1">$1,234.56</div>
              <div className="flex items-center text-xs text-green-200">
                <TrendingUp className="h-3 w-3 mr-1" />
                <span>+12.5% (24h)</span>
              </div>
              <Progress value={75} className="h-1 mt-3 bg-green-400/30" />
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-2 right-2 p-1 bg-white/20 rounded-full">
              <ArrowUpRight className="h-3 w-3" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-blue-100">Active Positions</CardTitle>
              <Coins className="h-5 w-5 text-blue-200" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold mb-1">$500.00</div>
              <div className="text-xs text-blue-200 mb-3">2 loans • 1 stake</div>
              <div className="flex gap-1">
                <div className="h-1 bg-blue-300 rounded flex-1"></div>
                <div className="h-1 bg-blue-400/50 rounded flex-1"></div>
                <div className="h-1 bg-blue-500/30 rounded flex-1"></div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-2 right-2 p-1 bg-white/20 rounded-full">
              <Zap className="h-3 w-3" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-purple-100">Staking Rewards</CardTitle>
              <Coins className="h-5 w-5 text-purple-200" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold mb-1">$750.00</div>
              <div className="text-xs text-purple-200 mb-3">12.5% APY • 45 days left</div>
              <div className="w-full bg-purple-400/30 rounded-full h-1">
                <div className="bg-purple-200 h-1 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-2 right-2 p-1 bg-white/20 rounded-full animate-pulse">
              <Gift className="h-3 w-3" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-orange-100">Claimable Rewards</CardTitle>
              <Gift className="h-5 w-5 text-orange-200" />
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-bold mb-1">$45.67</div>
              <div className="text-xs text-orange-200 mb-3">Ready to claim</div>
              <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-0 w-full">
                Claim Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6">
            <ScoreCard />
            <QuickActions />
          </div>

          {/* Middle Column */}
          <div className="space-y-6">
            <Card className="border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  DeFi Performance
                </CardTitle>
                <CardDescription>Your Web3 portfolio growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">+23.4%</div>
                    <p className="text-sm text-muted-foreground">Total Growth (30d)</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg">
                      <div className="text-lg font-bold text-green-600">$234</div>
                      <div className="text-xs text-muted-foreground">Profit</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">$1,234</div>
                      <div className="text-xs text-muted-foreground">Total</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">23.4%</div>
                      <div className="text-xs text-muted-foreground">ROI</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <StatsOverview />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card className="border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Live Activity
                </CardTitle>
                <CardDescription>Real-time blockchain transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityFeed />
              </CardContent>
            </Card>

            <Card className="border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-blue-500" />
                  Wallet Overview
                </CardTitle>
                <CardDescription>Your connected wallet details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                      <div>
                        <p className="font-medium">MetaMask</p>
                        <p className="text-xs text-muted-foreground">0x742d...6C87</p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    >
                      Connected
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ETH Balance</span>
                      <span className="font-semibold">2.45 ETH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>USDC Balance</span>
                      <span className="font-semibold">1,234.56 USDC</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>CHAIN Tokens</span>
                      <span className="font-semibold">1,000 CHAIN</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarInset>
  )
}

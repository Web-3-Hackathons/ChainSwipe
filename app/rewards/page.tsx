import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Gift, Star, Trophy, Zap } from "lucide-react"

export default function RewardsPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Rewards</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">$45.67</div>
              <p className="text-xs text-muted-foreground">Ready to claim</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reward Tier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-lg font-bold">Gold</span>
              </div>
              <p className="text-xs text-muted-foreground">2.5% cashback rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Next Tier Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={75} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">75% to Platinum</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="claim" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="claim">Claim Rewards</TabsTrigger>
            <TabsTrigger value="nfts">NFT Collection</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="claim" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cashback Rewards</CardTitle>
                  <CardDescription>Claim your earned cashback</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Gift className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="font-semibold">$45.67 USDC</p>
                        <p className="text-sm text-muted-foreground">Available to claim</p>
                      </div>
                    </div>
                    <Button>Claim Now</Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>This Month</span>
                      <span>$45.67</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Month</span>
                      <span>$38.92</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Earned</span>
                      <span className="font-semibold">$234.56</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bonus Rewards</CardTitle>
                  <CardDescription>Special achievements and bonuses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm">First Loan Repaid</span>
                    </div>
                    <Badge variant="secondary">$10.00</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">Staking Milestone</span>
                    </div>
                    <Badge variant="secondary">$25.00</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-purple-500" />
                      <span className="text-sm">Referral Bonus</span>
                    </div>
                    <Badge variant="secondary">$15.00</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="nfts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your NFT Collection</CardTitle>
                <CardDescription>Exclusive NFTs earned through achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center">
                    <Star className="h-8 w-8 text-white" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div className="aspect-square bg-muted border-2 border-dashed rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Locked</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reward History</CardTitle>
                <CardDescription>Your past rewards and claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Cashback Claim</p>
                      <p className="text-sm text-muted-foreground">Dec 15, 2024</p>
                    </div>
                    <Badge variant="outline">+$38.92</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Staking Bonus</p>
                      <p className="text-sm text-muted-foreground">Dec 10, 2024</p>
                    </div>
                    <Badge variant="outline">+$25.00</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Achievement NFT</p>
                      <p className="text-sm text-muted-foreground">Dec 5, 2024</p>
                    </div>
                    <Badge variant="outline">NFT</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}

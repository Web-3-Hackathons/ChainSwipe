import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StakePage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Stake</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Tabs defaultValue="stake" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stake">Stake Tokens</TabsTrigger>
            <TabsTrigger value="positions">My Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="stake" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Stake CHAIN Tokens</CardTitle>
                  <CardDescription>Earn rewards and boost your civil score</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="stake-amount">Amount to Stake</Label>
                    <Input id="stake-amount" placeholder="Enter CHAIN amount" />
                    <p className="text-xs text-muted-foreground">Available: 1,000 CHAIN</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Staking Period</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm">
                        30 days
                      </Button>
                      <Button variant="outline" size="sm">
                        90 days
                      </Button>
                      <Button variant="outline" size="sm">
                        180 days
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3 p-3 bg-muted rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>APY</span>
                      <span className="font-semibold text-green-600">12.5%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Score Boost</span>
                      <span className="font-semibold">+15 points</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estimated Rewards</span>
                      <span className="font-semibold">125 CHAIN</span>
                    </div>
                  </div>
                  <Button className="w-full">Stake Tokens</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Staking Benefits</CardTitle>
                  <CardDescription>Unlock perks by staking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Civil Score Boost</span>
                      <Badge variant="secondary">+15 points</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Loan Interest Discount</span>
                      <Badge variant="secondary">-0.5%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Priority Support</span>
                      <Badge variant="secondary">✓</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Exclusive NFTs</span>
                      <Badge variant="secondary">✓</Badge>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      💡 Longer staking periods offer higher rewards and bigger score boosts!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="positions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Staking Positions</CardTitle>
                <CardDescription>Manage your active stakes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">500 CHAIN</p>
                      <p className="text-sm text-muted-foreground">90 days • 12.5% APY</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">45 days remaining</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          Claim Rewards
                        </Button>
                        <Button size="sm" variant="outline">
                          Unstake
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">250 CHAIN</p>
                      <p className="text-sm text-muted-foreground">30 days • 10% APY</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">5 days remaining</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">
                          Claim Rewards
                        </Button>
                        <Button size="sm" variant="outline">
                          Unstake
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staking Summary</CardTitle>
                <CardDescription>Your overall staking performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">750</p>
                    <p className="text-sm text-muted-foreground">Total Staked</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">93.75</p>
                    <p className="text-sm text-muted-foreground">Rewards Earned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">+15</p>
                    <p className="text-sm text-muted-foreground">Score Boost</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">11.8%</p>
                    <p className="text-sm text-muted-foreground">Avg APY</p>
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

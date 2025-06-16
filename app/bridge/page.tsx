import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Zap } from "lucide-react"

export default function BridgePage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Bridge</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Cross-Chain Bridge</CardTitle>
            <CardDescription>Swap tokens across different blockchains with the best rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>From</Label>
                <div className="flex gap-2">
                  <Select defaultValue="ethereum">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="arbitrum">Arbitrum</SelectItem>
                      <SelectItem value="optimism">Optimism</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="usdc">
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="eth">ETH</SelectItem>
                      <SelectItem value="wbtc">WBTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input placeholder="0.00" className="text-right text-lg" />
                <p className="text-xs text-muted-foreground text-right">Balance: 1,234.56 USDC</p>
              </div>

              <div className="flex justify-center">
                <Button variant="outline" size="icon" className="rounded-full">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Label>To</Label>
                <div className="flex gap-2">
                  <Select defaultValue="polygon">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="arbitrum">Arbitrum</SelectItem>
                      <SelectItem value="optimism">Optimism</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="usdc">
                    <SelectTrigger className="flex-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                      <SelectItem value="matic">MATIC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Input placeholder="0.00" className="text-right text-lg" disabled />
                <p className="text-xs text-muted-foreground text-right">You will receive: ~999.50 USDC</p>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-muted rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Exchange Rate</span>
                <span>1 USDC = 0.9995 USDC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Bridge Fee</span>
                <span>$0.50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Gas Fee</span>
                <span>~$2.50</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Estimated Time</span>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3 text-yellow-500" />
                  <span>~2 minutes</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total Cost</span>
                <span>$3.00</span>
              </div>
            </div>

            <Button className="w-full" size="lg">
              Bridge Tokens
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bridges</CardTitle>
            <CardDescription>Your cross-chain transaction history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">500 USDC</p>
                  <p className="text-sm text-muted-foreground">Ethereum → Polygon</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">1,000 USDT</p>
                  <p className="text-sm text-muted-foreground">Arbitrum → Ethereum</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Pending
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">5 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}

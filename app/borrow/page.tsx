import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function BorrowPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Borrow</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Apply for Loan</CardTitle>
              <CardDescription>Get instant loans based on your civil score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Loan Amount (USDC)</Label>
                <Input id="amount" placeholder="Enter amount" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="term">Loan Term</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="collateral">Collateral Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select collateral" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="btc">BTC</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="text-sm">Interest Rate</span>
                <Badge variant="secondary">8.5% APR</Badge>
              </div>
              <Button className="w-full">Apply for Loan</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Loan Eligibility</CardTitle>
              <CardDescription>Based on your civil score and history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Civil Score</span>
                  <span className="font-semibold">750</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Max Loan Amount</span>
                  <span className="font-semibold">$2,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Min Interest Rate</span>
                  <span className="font-semibold">7.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Max Loan Term</span>
                  <span className="font-semibold">90 days</span>
                </div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  ✓ You qualify for premium rates due to your excellent score!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Loans</CardTitle>
            <CardDescription>Manage your current loans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">$500.00 USDC</p>
                  <p className="text-sm text-muted-foreground">30 days • 8.5% APR</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Due in 15 days</p>
                  <Button size="sm" variant="outline">
                    Repay
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-semibold">$1,000.00 USDC</p>
                  <p className="text-sm text-muted-foreground">60 days • 7.8% APR</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Due in 45 days</p>
                  <Button size="sm" variant="outline">
                    Repay
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}

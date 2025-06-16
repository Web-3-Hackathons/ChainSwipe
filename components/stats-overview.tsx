import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

export function StatsOverview() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Monthly Stats</CardTitle>
        <CardDescription>Your performance this month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs">Cashback Earned</span>
          <div className="flex items-center text-green-600">
            <ArrowUpRight className="h-3 w-3" />
            <span className="text-sm font-semibold">$45.67</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">Loans Repaid</span>
          <div className="flex items-center text-blue-600">
            <ArrowDownRight className="h-3 w-3" />
            <span className="text-sm font-semibold">$200.00</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">Staking Rewards</span>
          <div className="flex items-center text-green-600">
            <ArrowUpRight className="h-3 w-3" />
            <span className="text-sm font-semibold">$8.92</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

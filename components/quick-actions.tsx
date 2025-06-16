import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Coins, Gift } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
        <CardDescription>Common tasks</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button asChild variant="outline" size="sm" className="w-full justify-start">
          <Link href="/borrow">
            <CreditCard className="mr-2 h-3 w-3" />
            Apply for Loan
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="w-full justify-start">
          <Link href="/stake">
            <Coins className="mr-2 h-3 w-3" />
            Stake Tokens
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="w-full justify-start">
          <Link href="/rewards">
            <Gift className="mr-2 h-3 w-3" />
            Claim Rewards
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

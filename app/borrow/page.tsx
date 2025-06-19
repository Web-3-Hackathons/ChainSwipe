import { useWallet } from "@/components/wallet-provider"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { AlertCircle, CreditCard, Wallet } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Credit line calculation constants
const BASE_CREDIT_MULTIPLIER = 0.7 // 70% of card-linked assets
const ACTIVITY_BONUS_MULTIPLIER = 0.1 // Additional 10% per month of activity
const MAX_CREDIT_MULTIPLIER = 0.9 // Maximum 90% total

export default function BorrowPage() {
  const { address, circleWallet, isConnected, chainId } = useWallet()
  const { toast } = useToast()
  const [linkedAssets, setLinkedAssets] = useState(0)
  const [creditLine, setCreditLine] = useState(0)
  const [loanAmount, setLoanAmount] = useState("")
  const [loanTerm, setLoanTerm] = useState("30")
  const [isLoading, setIsLoading] = useState(false)

  // Calculate credit line based on card-linked assets and activity
  useEffect(() => {
    if (circleWallet?.balances) {
      const totalAssets = circleWallet.balances.reduce((sum, balance) => {
        return sum + parseFloat(balance.amount)
      }, 0)
      setLinkedAssets(totalAssets)
      
      // Calculate credit line with activity bonus
      const activityMonths = 1 // TODO: Get actual card activity duration
      const activityBonus = Math.min(
        ACTIVITY_BONUS_MULTIPLIER * activityMonths,
        MAX_CREDIT_MULTIPLIER - BASE_CREDIT_MULTIPLIER
      )
      const totalMultiplier = BASE_CREDIT_MULTIPLIER + activityBonus
      setCreditLine(totalAssets * totalMultiplier)
    }
  }, [circleWallet?.balances])

  const handleBorrow = async () => {
    if (!isConnected || !address) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to borrow",
        variant: "destructive",
      })
      return
    }

    if (parseFloat(loanAmount) > creditLine) {
      toast({
        title: "Invalid Amount",
        description: "Loan amount exceeds your credit line",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      // TODO: Implement borrowing logic
      toast({
        title: "Success!",
        description: `Borrowed ${loanAmount} USDC for ${loanTerm} days`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process loan. Please try again.",
        variant: "destructive",
      })
    }
    setIsLoading(false)
  }

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Borrow</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {!isConnected ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connect Wallet</AlertTitle>
            <AlertDescription>
              Please connect your wallet to view your borrowing options
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Credit Line</CardTitle>
                <CardDescription>Based on your card-linked assets and activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Linked Assets</span>
                  <Badge variant="secondary">{linkedAssets.toFixed(2)} USDC</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Available Credit</span>
                    <Badge variant="default">{creditLine.toFixed(2)} USDC</Badge>
                  </div>
                  <Progress value={(creditLine / linkedAssets) * 100} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Get a Loan</CardTitle>
                <CardDescription>Borrow against your credit line instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Loan Amount (USDC)</Label>
                  <Input 
                    id="amount" 
                    placeholder="Enter amount" 
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="term">Loan Term</Label>
                  <Select value={loanTerm} onValueChange={setLoanTerm}>
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
                  <Label>Interest Rate</Label>
                  <div className="text-2xl font-bold">
                    {(parseFloat(loanTerm) / 30 * 0.5).toFixed(1)}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    0.5% per month, paid at maturity
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleBorrow}
                  disabled={!loanAmount || isLoading || parseFloat(loanAmount) > creditLine}
                >
                  {isLoading ? "Processing..." : "Borrow Now"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </SidebarInset>
  )
}

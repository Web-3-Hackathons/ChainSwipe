import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ArrowDownLeft, Coins, Gift } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "loan_repayment",
    description: "Loan repayment",
    amount: "$100.00",
    time: "2 hours ago",
    icon: ArrowDownLeft,
    color: "text-red-600",
  },
  {
    id: 2,
    type: "staking_reward",
    description: "Staking reward",
    amount: "$5.67",
    time: "1 day ago",
    icon: Coins,
    color: "text-green-600",
  },
  {
    id: 3,
    type: "cashback",
    description: "Cashback earned",
    amount: "$12.34",
    time: "2 days ago",
    icon: Gift,
    color: "text-blue-600",
  },
  {
    id: 4,
    type: "loan_disbursement",
    description: "Loan disbursement",
    amount: "$500.00",
    time: "3 days ago",
    icon: ArrowUpRight,
    color: "text-green-600",
  },
]

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
          <Badge variant="outline">{activity.amount}</Badge>
        </div>
      ))}
    </div>
  )
}

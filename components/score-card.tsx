"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Star, Zap, Shield } from "lucide-react"
import { useState, useEffect } from "react"

export function ScoreCard() {
  const [score, setScore] = useState(0)
  const maxScore = 850
  const targetScore = 750
  const tier = "Gold"
  const progress = (targetScore / maxScore) * 100

  // Animate score counting up
  useEffect(() => {
    const timer = setInterval(() => {
      setScore((prev) => {
        if (prev < targetScore) {
          return prev + 5
        }
        clearInterval(timer)
        return targetScore
      })
    }, 20)
    return () => clearInterval(timer)
  }, [targetScore])

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-950/20 dark:via-orange-950/20 dark:to-red-950/20 shadow-xl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-300/10 to-orange-300/10 rounded-full translate-y-12 -translate-x-12" />

      <CardHeader className="relative z-10 pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Civil Score
            </CardTitle>
            <CardDescription>Your Web3 reputation</CardDescription>
          </div>
          <div className="p-2 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-full">
            <Star className="h-5 w-5 text-yellow-600" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        <div className="text-center space-y-3">
          <div className="text-6xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
            {score}
          </div>
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 dark:from-yellow-900/30 dark:to-orange-900/30 dark:text-yellow-300 font-semibold px-4 py-2 text-sm"
          >
            <Star className="w-4 h-4 mr-1" />
            {tier} Tier
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">Progress to Platinum</span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="relative">
            <Progress value={progress} className="h-3 bg-gray-200 dark:bg-gray-700" />
            <div
              className="absolute top-0 left-0 h-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-green-600 dark:text-green-400">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span className="font-semibold">+25 this month</span>
          </div>
          <Button
            size="sm"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0"
          >
            <Zap className="w-3 h-3 mr-1" />
            Boost Score
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-yellow-200/50 dark:border-yellow-800/50">
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">850</div>
            <div className="text-xs text-muted-foreground">Max Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-orange-600">100</div>
            <div className="text-xs text-muted-foreground">To Next Tier</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function SupportPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Support</h1>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How does the civil score work?</AccordionTrigger>
                    <AccordionContent>
                      Your civil score is calculated based on your on-chain activity, loan repayment history, 
                      staking participation, and KYC verification status. Higher scores unlock better loan terms 
                      and higher reward tiers.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What are the loan requirements?</AccordionTrigger>
                    <AccordionContent>
                      To apply for a loan, you need a minimum civil score of 500, completed KYC verification, 
                      and sufficient collateral. Loan amounts and terms depend on your score and tier level.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I earn cashback rewards?</AccordionTrigger>
                    <AccordionContent>
                      Cashback is earned on all DeFi activities including loan repayments, staking, and 
                      cross-chain bridges. Your reward rate depends on your tier level - Bronze (1%), 
                      Silver (1.5%), Gold (2.5%), and Platinum (4%).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>What is staking and how does it work?</AccordionTrigger>
                    <AccordionContent>
                      Staking allows you to lock up CHAIN tokens for a fixed period to earn rewards and 
                      boost your civil score. Longer staking periods offer higher APY and bigger score boosts.
                    </AccordionContent>
                  </AccordionItem>\

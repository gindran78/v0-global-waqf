"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Wallet, CreditCard, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface DemoContributionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: {
    id: string
    title: string
    institution?: {
      name: string
    }
  }
}

export function DemoContributionDialog({ open, onOpenChange, project }: DemoContributionDialogProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [step, setStep] = useState<"info" | "amount" | "processing" | "success">("info")
  const [amount, setAmount] = useState("100")
  const [loading, setLoading] = useState(false)

  const handleDemoContribution = async () => {
    if (!user) return

    setLoading(true)
    setStep("processing")

    // Simulate Stripe processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate successful demo transaction
    setStep("success")
    setLoading(false)

    toast({
      title: "Demo Contribution Successful",
      description: `Demo contribution of RM ${amount} processed successfully. No real funds were charged.`,
    })
  }

  const resetDialog = () => {
    setStep("info")
    setAmount("100")
    setLoading(false)
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      resetDialog()
    }
    onOpenChange(open)
  }

  if (!user) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogDescription>You need to sign in to try the demo contribution feature.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button variant="outline" onClick={() => handleClose(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === "info" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Demo Contribution Flow
              </DialogTitle>
              <DialogDescription>
                Experience how future contributions may work with our Stripe-powered demo system.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>by {project.institution?.name}</CardDescription>
                </CardHeader>
              </Card>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800 mb-1">Demo Mode Only</p>
                    <p className="text-amber-700">
                      This is a demonstration using Stripe test mode. No real funds will be processed or charged to your
                      account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => setStep("amount")} className="flex-1">
                  Continue to Demo
                </Button>
                <Button variant="outline" onClick={() => handleClose(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "amount" && (
          <>
            <DialogHeader>
              <DialogTitle>Demo Contribution Amount</DialogTitle>
              <DialogDescription>Select an amount for your demo contribution.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount (MYR)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="10"
                  max="10000"
                  step="10"
                />
                <p className="text-xs text-muted-foreground mt-1">Demo amounts between RM 10 - RM 10,000</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {["50", "100", "250"].map((preset) => (
                  <Button
                    key={preset}
                    variant={amount === preset ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAmount(preset)}
                  >
                    RM {preset}
                  </Button>
                ))}
              </div>

              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4" />
                    <span>Stripe Test Mode - No real charges</span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button onClick={handleDemoContribution} disabled={!amount || Number.parseInt(amount) < 10}>
                  Process Demo Contribution
                </Button>
                <Button variant="outline" onClick={() => setStep("info")}>
                  Back
                </Button>
              </div>
            </div>
          </>
        )}

        {step === "processing" && (
          <>
            <DialogHeader>
              <DialogTitle>Processing Demo Contribution</DialogTitle>
              <DialogDescription>Simulating Stripe payment processing...</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
              <p className="text-sm text-muted-foreground">Processing RM {amount} demo contribution...</p>
            </div>
          </>
        )}

        {step === "success" && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Demo Contribution Successful
              </DialogTitle>
              <DialogDescription>Your demo contribution has been processed successfully.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Transaction Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">RM {amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Project:</span>
                    <span className="font-medium">{project.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant="default">Demo Completed</Badge>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-green-800 mb-1">Demo Complete</p>
                    <p className="text-green-700">
                      This was a demonstration only. No real funds were processed. In the future, this flow will support
                      real contributions with full Shariah compliance.
                    </p>
                  </div>
                </div>
              </div>

              <Button onClick={() => handleClose(false)} className="w-full">
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

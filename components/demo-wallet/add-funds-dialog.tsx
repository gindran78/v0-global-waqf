"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createBrowserClient } from "@supabase/ssr"
import { CreditCard, Info } from "lucide-react"

interface AddFundsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  walletId?: string
  onSuccess: () => void
}

export function AddFundsDialog({ open, onOpenChange, walletId, onSuccess }: AddFundsDialogProps) {
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const handleAddFunds = async () => {
    if (!walletId || !amount) return

    const numAmount = Number.parseFloat(amount)
    if (numAmount <= 0 || numAmount > 10000) {
      setError("Amount must be between RM 1 and RM 10,000")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simulate Stripe payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update wallet balance
      const { error: updateError } = await supabase.rpc("add_demo_funds", {
        wallet_id: walletId,
        amount: numAmount,
      })

      if (updateError) throw updateError

      // Record transaction
      await supabase.from("demo_transactions").insert([
        {
          wallet_id: walletId,
          type: "deposit",
          amount: numAmount,
          description: `Demo funds added via test payment`,
          status: "completed",
        },
      ])

      onSuccess()
    } catch (error: any) {
      setError(error.message || "Failed to add funds")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Add Demo Funds
          </DialogTitle>
          <DialogDescription>Add funds to your demo wallet using test payment processing</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              This uses Stripe test mode. Use card 4242 4242 4242 4242 with any future date and CVC.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (RM)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="100.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              max="10000"
              step="0.01"
            />
            <p className="text-xs text-slate-600">Minimum: RM 1, Maximum: RM 10,000</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3">
            <Button onClick={handleAddFunds} disabled={loading || !amount} className="flex-1">
              {loading ? "Processing..." : `Add RM ${amount || "0.00"}`}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createBrowserClient } from "@supabase/ssr"
import { Heart, AlertCircle } from "lucide-react"

interface Project {
  id: string
  title: string
  institution_name: string
  status: string
}

interface ContributeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  walletId?: string
  currentBalance: number
  onSuccess: () => void
}

export function ContributeDialog({ open, onOpenChange, walletId, currentBalance, onSuccess }: ContributeDialogProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState("")
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    if (open) {
      fetchProjects()
    }
  }, [open])

  const fetchProjects = async () => {
    try {
      const { data } = await supabase
        .from("projects")
        .select(`
          id,
          title,
          institutions (name)
        `)
        .eq("status", "active")
        .limit(10)

      const formattedProjects =
        data?.map((p) => ({
          id: p.id,
          title: p.title,
          institution_name: p.institutions?.name || "Unknown Institution",
          status: "active",
        })) || []

      setProjects(formattedProjects)
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  const handleContribute = async () => {
    if (!walletId || !selectedProject || !amount) return

    const numAmount = Number.parseFloat(amount)
    if (numAmount <= 0 || numAmount > currentBalance) {
      setError(`Amount must be between RM 1 and RM ${currentBalance.toFixed(2)}`)
      return
    }

    setLoading(true)
    setError("")

    try {
      // Update wallet balance
      const { error: updateError } = await supabase.rpc("subtract_demo_funds", {
        wallet_id: walletId,
        amount: numAmount,
      })

      if (updateError) throw updateError

      // Record transaction
      await supabase.from("demo_transactions").insert([
        {
          wallet_id: walletId,
          type: "contribution",
          amount: numAmount,
          description: `Contribution to waqf project`,
          project_id: selectedProject,
          status: "completed",
        },
      ])

      onSuccess()
    } catch (error: any) {
      setError(error.message || "Failed to process contribution")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Make Contribution
          </DialogTitle>
          <DialogDescription>Support a waqf project with your demo wallet funds</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-emerald-50 p-3 rounded-lg">
            <p className="text-sm text-emerald-700">
              Available Balance: <span className="font-medium">RM {currentBalance.toFixed(2)}</span>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Select Project</Label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a waqf project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    <div className="text-left">
                      <div className="font-medium">{project.title}</div>
                      <div className="text-xs text-slate-600">{project.institution_name}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Contribution Amount (RM)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="50.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              max={currentBalance}
              step="0.01"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3">
            <Button onClick={handleContribute} disabled={loading || !selectedProject || !amount} className="flex-1">
              {loading ? "Processing..." : `Contribute RM ${amount || "0.00"}`}
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

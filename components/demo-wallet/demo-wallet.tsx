"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createBrowserClient } from "@supabase/ssr"
import { Plus, History, Info, ArrowUpRight, ArrowDownLeft, Coins, HandHeart } from "lucide-react"
import { AddFundsDialog } from "./add-funds-dialog"
import { ContributeDialog } from "./contribute-dialog"

interface DemoWalletData {
  id: string
  balance: number
  created_at: string
}

interface Transaction {
  id: string
  type: "deposit" | "contribution"
  amount: number
  description: string
  project_title?: string
  created_at: string
  status: "completed" | "pending" | "failed"
}

export function DemoWallet() {
  const [wallet, setWallet] = useState<DemoWalletData | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddFunds, setShowAddFunds] = useState(false)
  const [showContribute, setShowContribute] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchWalletData()
  }, [])

  const fetchWalletData = async () => {
    try {
      // Get or create demo wallet
      let { data: walletData, error: walletError } = await supabase
        .from("demo_wallets")
        .select("*")
        .eq("user_session", "demo-user")
        .single()

      if (!walletData && !walletError) {
        const { data: newWallet, error: insertError } = await supabase
          .from("demo_wallets")
          .insert([{ user_session: "demo-user", balance: 1000 }])
          .select()
          .single()

        if (insertError) {
          console.error("Error creating wallet:", insertError)
          return
        }

        walletData = newWallet
      }

      if (!walletData || !walletData.id) {
        console.error("No wallet data available")
        return
      }

      setWallet(walletData)

      // Fetch transactions
      const { data: transactionsData } = await supabase
        .from("demo_transactions")
        .select(`
          *,
          projects (title)
        `)
        .eq("wallet_id", walletData.id)
        .order("created_at", { ascending: false })

      const formattedTransactions =
        transactionsData?.map((t) => ({
          id: t.id,
          type: t.type,
          amount: t.amount,
          description: t.description,
          project_title: t.projects?.title,
          created_at: t.created_at,
          status: t.status,
        })) || []

      setTransactions(formattedTransactions)
    } catch (error) {
      console.error("Error fetching wallet data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFundsAdded = () => {
    fetchWalletData()
    setShowAddFunds(false)
  }

  const handleContribution = () => {
    fetchWalletData()
    setShowContribute(false)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading wallet...</div>
  }

  return (
    <div className="space-y-6">
      {/* Educational Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This is a demo wallet using test payments. No real money will be charged. Use test card number 4242 4242 4242
          4242 for testing.
        </AlertDescription>
      </Alert>

      {/* Wallet Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <Coins className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <CardTitle>Demo Wallet Balance</CardTitle>
                <CardDescription>Available for waqf contributions</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600">RM {wallet?.balance?.toFixed(2) || "0.00"}</div>
              <p className="text-sm text-slate-600">Demo Currency</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button onClick={() => setShowAddFunds(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Demo Funds
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowContribute(true)}
              disabled={!wallet?.balance || wallet.balance <= 0}
              className="flex items-center gap-2"
            >
              <HandHeart className="w-4 h-4" />
              Make Contribution
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Transactions and Info */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          <TabsTrigger value="info">How It Works</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="w-5 h-5" />
                Recent Transactions
              </CardTitle>
              <CardDescription>Your demo wallet activity</CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No transactions yet</p>
                  <p className="text-sm">Add funds or make a contribution to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "deposit" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {transaction.type === "deposit" ? (
                            <ArrowDownLeft className="w-5 h-5" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.type === "deposit" ? "Funds Added" : "Contribution"}
                          </p>
                          <p className="text-sm text-slate-600">
                            {transaction.project_title || transaction.description}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${
                            transaction.type === "deposit" ? "text-green-600" : "text-blue-600"
                          }`}
                        >
                          {transaction.type === "deposit" ? "+" : "-"}RM {transaction.amount.toFixed(2)}
                        </p>
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : transaction.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>How Demo Wallet Works</CardTitle>
              <CardDescription>Understanding the waqf contribution process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">Demo Environment</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Uses Stripe test mode - no real charges</li>
                    <li>• Test card: 4242 4242 4242 4242</li>
                    <li>• Any future date and CVC works</li>
                    <li>• Simulates real payment flow</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">Waqf Principles</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Permanent endowment for Islamic causes</li>
                    <li>• Benefits continue in perpetuity</li>
                    <li>• Supports education, healthcare, social welfare</li>
                    <li>• Transparent project tracking</li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg">
                <h4 className="font-medium text-emerald-900 mb-2">Ready to Contribute?</h4>
                <p className="text-sm text-emerald-700">
                  Explore verified waqf projects and make meaningful contributions to Islamic institutions across
                  Malaysia. Your support helps build lasting impact for communities.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddFundsDialog
        open={showAddFunds}
        onOpenChange={setShowAddFunds}
        walletId={wallet?.id}
        onSuccess={handleFundsAdded}
      />

      <ContributeDialog
        open={showContribute}
        onOpenChange={setShowContribute}
        walletId={wallet?.id}
        currentBalance={wallet?.balance || 0}
        onSuccess={handleContribution}
      />
    </div>
  )
}

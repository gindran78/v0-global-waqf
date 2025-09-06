import { Suspense } from "react"
import { DemoWallet } from "@/components/demo-wallet/demo-wallet"

export default function DemoWalletPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Demo Wallet</h1>
            <p className="text-slate-600">
              Experience waqf contributions in a safe sandbox environment using test payments
            </p>
          </div>

          <Suspense fallback={<div>Loading wallet...</div>}>
            <DemoWallet />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

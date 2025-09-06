import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Shield, CreditCard, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      step: 1,
      title: "Create Demo Wallet",
      description: "Set up your test wallet with Stripe sandbox integration - no real money required.",
      icon: Wallet,
    },
    {
      step: 2,
      title: "Add Demo Funds",
      description: "Use test credit card numbers to add sandbox funds to your demo wallet.",
      icon: CreditCard,
    },
    {
      step: 3,
      title: "Explore Projects",
      description: "Browse verified waqf projects and experience the contribution flow.",
      icon: CheckCircle,
    },
    {
      step: 4,
      title: "Make Test Contributions",
      description: "Contribute demo funds to projects and see how the system tracks donations.",
      icon: ArrowRight,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mx-auto w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
              <Wallet className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-4xl font-bold mb-4">How Demo Wallets Work</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of waqf contributions with our Stripe-powered demo environment. Test the complete
              flow with sandbox funds - no real money involved.
            </p>
          </div>

          {/* Important Notice */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-amber-800 dark:text-amber-200">Demo Environment Only</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700 dark:text-amber-300">
                  This is a demonstration environment using Stripe's test mode. No real payments are processed, and no
                  actual funds are transferred. This feature showcases potential future functionality.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How It Works Steps */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {steps.map((step) => (
                <Card key={step.step} className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">
                          Step {step.step}
                        </Badge>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Test Card Information */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Test Card Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Use these test card numbers in the demo environment:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Successful Payment</h4>
                    <p className="font-mono text-sm">4242 4242 4242 4242</p>
                    <p className="text-xs text-muted-foreground mt-1">Any future date, any CVC</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Declined Payment</h4>
                    <p className="font-mono text-sm">4000 0000 0000 0002</p>
                    <p className="text-xs text-muted-foreground mt-1">Any future date, any CVC</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security & Compliance */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Shariah Compliance</h4>
                    <p className="text-sm text-muted-foreground">
                      All demo transactions follow Islamic finance principles and are reviewed by our Shariah advisory
                      panel.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Demo environment uses the same security standards as production, with encrypted data transmission.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Transparency</h4>
                    <p className="text-sm text-muted-foreground">
                      All demo transactions are logged and can be viewed in your wallet history for complete
                      transparency.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Future Ready</h4>
                    <p className="text-sm text-muted-foreground">
                      This demo showcases the infrastructure for future real payment processing capabilities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Try It?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create your demo wallet and experience how future waqf contributions might work on our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/demo-wallet/create">
                  Create Demo Wallet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/demo-wallet">View Existing Wallet</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Crown, CreditCard, Shield, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState("individual")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    agreeToTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const plans = {
    individual: {
      name: "Individual",
      price: "RM 29",
      period: "per month",
      description: "Perfect for researchers and students",
    },
    institutional: {
      name: "Institutional",
      price: "RM 199",
      period: "per month",
      description: "Ideal for universities and organizations",
    },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate subscription process
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("[v0] Subscription simulated:", { selectedPlan, formData })

      // In a real implementation, this would integrate with Stripe
      alert("Subscription successful! (Demo mode)")
    } catch (error) {
      console.error("Subscription error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = formData.name && formData.email && formData.agreeToTerms

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-6">
                <Crown className="h-8 w-8 text-amber-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Subscribe to Premium Research</h1>
              <p className="text-muted-foreground">
                Get unlimited access to exclusive research papers and expert analysis
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Plan Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Choose Your Plan</CardTitle>
                  <CardDescription>Select the plan that best fits your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                    {Object.entries(plans).map(([key, plan]) => (
                      <div key={key} className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value={key} id={key} />
                        <div className="flex-1">
                          <Label htmlFor={key} className="cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-semibold">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground">{plan.description}</p>
                              </div>
                              <div className="text-right">
                                <div className="font-bold">{plan.price}</div>
                                <div className="text-sm text-muted-foreground">{plan.period}</div>
                              </div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>We'll use this information for your subscription</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {selectedPlan === "institutional" && (
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization Name</Label>
                      <Input
                        id="organization"
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData((prev) => ({ ...prev, organization: e.target.value }))}
                        placeholder="Enter your organization name"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                  <CardDescription>Secure payment processing powered by Stripe</CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>This is a demo environment. No real payments will be processed.</AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="agree-terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))
                      }
                    />
                    <Label htmlFor="agree-terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg" disabled={!isFormValid || isLoading}>
                {isLoading ? (
                  "Processing..."
                ) : (
                  <>
                    Subscribe Now - {plans[selectedPlan as keyof typeof plans].price}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Benefits Reminder */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-lg">What You'll Get</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ 7-day free trial</li>
                  <li>✓ Access to all premium research papers</li>
                  <li>✓ Expert analysis and commentary</li>
                  <li>✓ Early access to new publications</li>
                  <li>✓ Download rights for offline reading</li>
                  {selectedPlan === "institutional" && (
                    <>
                      <li>✓ Multi-user access (up to 50 users)</li>
                      <li>✓ Custom research requests</li>
                      <li>✓ Quarterly research briefings</li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

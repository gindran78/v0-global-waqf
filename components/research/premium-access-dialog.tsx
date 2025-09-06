"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Check, BookOpen, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { Document } from "@/lib/supabase"

interface PremiumAccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document: Document
}

export function PremiumAccessDialog({ open, onOpenChange, document }: PremiumAccessDialogProps) {
  const features = [
    "Access to 50+ premium research papers",
    "Exclusive policy analysis and reports",
    "Early access to new publications",
    "Advanced search and filtering",
    "Download unlimited documents",
    "Expert commentary and insights",
  ]

  const pricingPlans = [
    {
      name: "Individual",
      price: "RM 1,000",
      period: "per year",
      description: "Perfect for researchers and academics",
      features: ["All premium content", "Unlimited downloads", "Email support"],
    },
    {
      name: "Institutional",
      price: "RM 5,000",
      period: "per year",
      description: "For universities and organizations",
      features: ["All premium content", "Multi-user access", "Priority support", "Custom reports"],
      popular: true,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-secondary" />
            Premium Research Access
          </DialogTitle>
          <DialogDescription>
            Unlock access to "{document.title}" and our entire premium research library.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Document */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Premium</Badge>
                <Badge variant="outline">{document.doc_type}</Badge>
              </div>
              <CardTitle className="text-lg">{document.title}</CardTitle>
              <CardDescription>
                {document.source_org} • {document.year}
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-3">What's included in Premium Access:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h4 className="font-semibold mb-3">Choose Your Plan:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pricingPlans.map((plan) => (
                <Card key={plan.name} className={plan.popular ? "border-secondary" : ""}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      {plan.popular && <Badge variant="secondary">Popular</Badge>}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-3 w-3 text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                      <Link href={`/research/subscribe?plan=${plan.name.toLowerCase()}`}>Subscribe Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <BookOpen className="h-6 w-6 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold">50+</div>
              <div className="text-xs text-muted-foreground">Premium Papers</div>
            </div>
            <div className="text-center">
              <Users className="h-6 w-6 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold">100+</div>
              <div className="text-xs text-muted-foreground">Institutions</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold">2024</div>
              <div className="text-xs text-muted-foreground">Latest Research</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link href="/research/subscribe">Subscribe Now</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/research/premium">Learn More</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Crown, BookOpen, Users, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PremiumResearchPage() {
  const premiumFeatures = [
    {
      title: "Exclusive Research Papers",
      description: "Access to premium research studies and policy papers from leading Islamic institutions",
      icon: BookOpen,
    },
    {
      title: "Expert Analysis",
      description: "In-depth analysis and commentary from renowned Islamic scholars and researchers",
      icon: Users,
    },
    {
      title: "Early Access",
      description: "Get early access to new research publications before they're publicly available",
      icon: Crown,
    },
    {
      title: "Download Rights",
      description: "Download and save premium documents for offline reading and reference",
      icon: Download,
    },
  ]

  const pricingPlans = [
    {
      name: "Individual",
      price: "RM 29",
      period: "per month",
      description: "Perfect for researchers and students",
      features: [
        "Access to all premium research papers",
        "Download up to 10 documents per month",
        "Email support",
        "Early access to new publications",
      ],
      popular: false,
    },
    {
      name: "Institutional",
      price: "RM 199",
      period: "per month",
      description: "Ideal for universities and organizations",
      features: [
        "Unlimited access to all premium content",
        "Unlimited downloads",
        "Priority support",
        "Multi-user access (up to 50 users)",
        "Custom research requests",
        "Quarterly research briefings",
      ],
      popular: true,
    },
  ]

  const samplePremiumContent = [
    {
      title: "Advanced Waqf Governance Models: A Comparative Study",
      author: "Prof. Dr. Ahmad Rahman",
      institution: "International Islamic University Malaysia",
      year: 2024,
      type: "Research Study",
      pages: 45,
    },
    {
      title: "Digital Transformation in Islamic Endowments",
      author: "Dr. Fatimah Al-Zahra",
      institution: "University of Malaya",
      year: 2024,
      type: "Policy Paper",
      pages: 32,
    },
    {
      title: "Sustainable Waqf Investment Strategies",
      author: "Islamic Development Bank Research Team",
      institution: "Islamic Development Bank",
      year: 2023,
      type: "Best Practices Guide",
      pages: 67,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mx-auto w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center mb-6">
              <Crown className="h-8 w-8 text-amber-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Premium Research Access</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Unlock exclusive research papers, expert analysis, and in-depth studies from leading Islamic institutions
              worldwide.
            </p>
          </div>

          {/* Premium Features */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Premium Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {premiumFeatures.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sample Premium Content */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Sample Premium Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {samplePremiumContent.map((content, index) => (
                <Card key={index} className="relative">
                  <Badge className="absolute top-4 right-4 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    Premium
                  </Badge>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {content.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{content.year}</span>
                    </div>
                    <CardTitle className="text-lg leading-tight">{content.title}</CardTitle>
                    <CardDescription>
                      <div className="space-y-1">
                        <p>by {content.author}</p>
                        <p className="text-xs">{content.institution}</p>
                        <p className="text-xs">{content.pages} pages</p>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" disabled>
                      Premium Access Required
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                      <Link href="/research/subscribe">
                        Subscribe Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's included in premium access?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Premium access includes exclusive research papers, expert analysis, early access to new
                    publications, and download rights for offline reading. Institutional plans also include multi-user
                    access and custom research requests.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I cancel my subscription anytime?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, you can cancel your subscription at any time. You'll continue to have access to premium content
                    until the end of your current billing period.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is there a free trial available?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We offer a 7-day free trial for new subscribers. You can explore all premium features and content
                    before committing to a paid plan.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Search, BookOpen, Wallet, Users, BarChart3, Globe, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const features = [
    {
      icon: Shield,
      title: "Verified Institutions",
      description: "Rigorous verification process with Shariah compliance badges",
      benefits: [
        "Official registration verification",
        "Shariah compliance review",
        "Ongoing monitoring",
        "Trust badges",
      ],
    },
    {
      icon: Search,
      title: "Advanced Search & Filters",
      description: "Find institutions and projects by location, type, and focus area",
      benefits: ["State-based filtering", "Waqf type categories", "Governance model filters", "Real-time search"],
    },
    {
      icon: BookOpen,
      title: "Research Repository",
      description: "Curated collection of policy papers and research studies",
      benefits: ["Academic publications", "Policy frameworks", "Best practices", "Premium content access"],
    },
    {
      icon: Wallet,
      title: "Demo Wallet System",
      description: "Experience contribution flows with Stripe test integration",
      benefits: ["Sandbox environment", "Test payments", "Contribution tracking", "Educational purpose"],
    },
    {
      icon: Users,
      title: "Direct Institution Contact",
      description: "Connect directly with verified waqf institutions",
      benefits: ["Inquiry system", "Contact information", "Project collaboration", "Partnership opportunities"],
    },
    {
      icon: BarChart3,
      title: "Project Tracking",
      description: "Monitor project progress and outcomes transparently",
      benefits: ["Timeline visualization", "Progress tracking", "Outcome reporting", "Impact measurement"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">Platform Features</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how Global Waqf connects verified institutions, researchers, and supporters through innovative
              technology and transparent processes.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Platform Benefits */}
          <div className="bg-muted/30 rounded-lg p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Why Choose Global Waqf?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform bridges the gap between traditional waqf institutions and modern technology, creating
                transparency and trust.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
                <p className="text-muted-foreground">
                  Connect Malaysian waqf institutions with international researchers and diaspora donors worldwide.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Trust & Transparency</h3>
                <p className="text-muted-foreground">
                  Rigorous verification processes and Shariah compliance ensure credibility and religious authenticity.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Building</h3>
                <p className="text-muted-foreground">
                  Foster collaboration between institutions, researchers, policymakers, and supporters.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/institutions">Browse Institutions</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/onboard">Join as Institution</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

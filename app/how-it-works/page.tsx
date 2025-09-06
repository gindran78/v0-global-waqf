import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Search, BookOpen, Users, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      step: 1,
      title: "Discover Institutions",
      description:
        "Browse our verified directory of Malaysian waqf institutions with detailed profiles and verification badges.",
      icon: Search,
      features: ["Advanced search filters", "Verification badges", "Detailed profiles", "Contact information"],
    },
    {
      step: 2,
      title: "Explore Projects",
      description:
        "View active and completed projects with transparent reporting on objectives, timelines, and outcomes.",
      icon: CheckCircle,
      features: ["Project timelines", "Progress tracking", "Outcome reports", "Photo documentation"],
    },
    {
      step: 3,
      title: "Access Research",
      description:
        "Explore our curated library of research papers, policy documents, and best practices from leading institutions.",
      icon: BookOpen,
      features: ["Policy papers", "Research studies", "Best practices", "Expert analysis"],
    },
    {
      step: 4,
      title: "Connect & Collaborate",
      description: "Connect directly with institutions, submit inquiries, and explore demo contribution flows.",
      icon: Users,
      features: ["Direct inquiries", "Demo wallets", "Collaboration tools", "Community network"],
    },
  ]

  const userTypes = [
    {
      title: "Waqf Institutions",
      description: "Showcase your organization and projects to a global audience",
      benefits: [
        "Verified institution profile",
        "Project showcase platform",
        "Direct inquiry system",
        "Research collaboration opportunities",
      ],
      cta: "Onboard Your Institution",
      ctaLink: "/onboard",
    },
    {
      title: "Researchers & Academics",
      description: "Access comprehensive research and connect with institutions",
      benefits: [
        "Curated research library",
        "Premium content access",
        "Institution collaboration",
        "Policy framework insights",
      ],
      cta: "Explore Research",
      ctaLink: "/research",
    },
    {
      title: "Diaspora & Supporters",
      description: "Discover trusted institutions and explore contribution opportunities",
      benefits: [
        "Verified institution directory",
        "Transparent project reporting",
        "Demo wallet experience",
        "Direct institution contact",
      ],
      cta: "Browse Institutions",
      ctaLink: "/institutions",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">How Global Waqf Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how our platform connects verified Malaysian waqf institutions with global stakeholders through
              transparency, research, and collaboration.
            </p>
          </div>

          {/* How It Works Steps */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Platform Overview</h2>
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
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">{step.description}</CardDescription>
                    <div className="space-y-2">
                      {step.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* User Types */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Who We Serve</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {userTypes.map((userType, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <CardTitle className="text-xl">{userType.title}</CardTitle>
                    <CardDescription className="text-base">{userType.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {userType.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span className="text-left">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full">
                      <Link href={userType.ctaLink}>
                        {userType.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Verification Process */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Verification Process</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Ensuring Trust & Credibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Institution Verification</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Legal registration verification</li>
                      <li>• Shariah compliance assessment</li>
                      <li>• Governance structure review</li>
                      <li>• Financial transparency check</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Ongoing Monitoring</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Annual compliance reviews</li>
                      <li>• Project progress monitoring</li>
                      <li>• Community feedback integration</li>
                      <li>• Continuous improvement process</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Getting Started */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our growing community of verified institutions, researchers, and supporters working together to
              advance Islamic endowment development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/institutions">
                  Explore Institutions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/onboard">Join as Institution</Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

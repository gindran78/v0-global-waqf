import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, BookOpen, Wallet, CheckCircle, MapPin, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredInstitutions = [
    {
      id: 1,
      name: "Yayasan Waqf Malaysia",
      state: "Kuala Lumpur",
      type: "National Waqf Foundation",
      verified: true,
      description: "Leading national waqf institution promoting Islamic endowment development across Malaysia.",
      logo: "/placeholder-jcl9o.png",
    },
    {
      id: 2,
      name: "Waqf Selangor",
      state: "Selangor",
      type: "State Waqf Council",
      verified: true,
      description: "State waqf institution managing endowments for education and healthcare in Selangor.",
      logo: "/placeholder-ja96x.png",
    },
    {
      id: 3,
      name: "IIUM Endowment Fund",
      state: "Selangor",
      type: "Educational Waqf",
      verified: true,
      description: "University endowment supporting Islamic higher education and research excellence.",
      logo: "/university-book-logo.jpg",
    },
  ]

  const highlightedProjects = [
    {
      id: 1,
      title: "Waqf Hospital Kuala Lumpur",
      institution: "Yayasan Waqf Malaysia",
      status: "Active",
      progress: 80,
      description: "Modern healthcare facility serving underprivileged communities in KL.",
      image: "/modern-hospital.png",
    },
    {
      id: 2,
      title: "Islamic School Network",
      institution: "Waqf Selangor",
      status: "Completed",
      progress: 100,
      description: "Network of 5 Islamic schools providing quality education to 1,800 students.",
      image: "/placeholder-rosqq.png",
    },
    {
      id: 3,
      title: "Research Excellence Fund",
      institution: "IIUM Endowment",
      status: "Active",
      progress: 45,
      description: "Supporting 50 research projects in Islamic studies and sciences.",
      image: "/placeholder-2sc3m.png",
    },
  ]

  const recentResearch = [
    {
      title: "Waqf Development Policy Framework 2024",
      source: "Department of Islamic Development Malaysia",
      year: 2024,
      type: "Policy Paper",
    },
    {
      title: "Impact Assessment of Educational Waqf Projects",
      source: "International Islamic University Malaysia",
      year: 2023,
      type: "Research Study",
    },
    {
      title: "Sustainable Waqf Management Practices",
      source: "Malaysian Waqf Foundation",
      year: 2024,
      type: "Best Practices Guide",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative py-12 sm:py-16 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-balance leading-tight">
                Discover Trusted Waqf Institutions and Projects in <span className="text-primary">Malaysia</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto px-2">
                Verified directories, research, and demo wallets — all in one place. Connect with credible Islamic
                endowment organizations and support meaningful causes.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center px-4 sm:px-0">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/institutions">
                    Browse Institutions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                  <Link href="/projects">Browse Projects</Link>
                </Button>
                <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                  <Link href="/onboard">Onboard My Institution</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Verified Institutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    All institutions undergo rigorous verification with Shariah compliance badges for complete trust and
                    transparency.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Project Showcase</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Detailed project profiles with objectives, timelines, outcomes, and direct connection to
                    implementing institutions.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Curated Research</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Access policy papers, research studies, and best practices from leading Islamic institutions and
                    scholars.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                <Link href="/features">
                  Explore All Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Institutions */}
        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Featured Institutions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto px-2">
                Discover verified waqf institutions across Malaysia, each committed to transparency and Islamic
                principles.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredInstitutions.map((institution) => (
                <Card key={institution.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <img
                        src={institution.logo || "/placeholder.svg"}
                        alt={`${institution.name} logo`}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-2">
                          <CardTitle className="text-base sm:text-lg leading-tight">{institution.name}</CardTitle>
                          {institution.verified && (
                            <Badge variant="secondary" className="text-xs flex-shrink-0">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {institution.state}
                          </span>
                          <span className="truncate">{institution.type}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 text-sm">{institution.description}</CardDescription>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent" asChild>
                      <Link href={`/institutions/${institution.id}`}>
                        View Profile
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                <Link href="/institutions">See All Institutions</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Highlighted Projects */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Highlighted Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto px-2">
                Explore impactful waqf projects making a difference in education, healthcare, and community development.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {highlightedProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3] sm:aspect-video relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge
                      className="absolute top-2 sm:top-3 right-2 sm:right-3 text-xs"
                      variant={project.status === "Completed" ? "default" : "secondary"}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base sm:text-lg leading-tight">{project.title}</CardTitle>
                    <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                      by {project.institution}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent" asChild>
                      <Link href={`/projects/${project.id}`}>
                        Explore Project
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                <Link href="/projects">See All Projects</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Research Library Preview */}
        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Research Library</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto px-2">
                Access curated research papers, policy frameworks, and best practices from leading Islamic institutions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {recentResearch.map((paper, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs w-fit">
                        {paper.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {paper.year}
                      </span>
                    </div>
                    <CardTitle className="text-base sm:text-lg leading-tight">{paper.title}</CardTitle>
                    <CardDescription className="text-sm">{paper.source}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent" asChild>
                      <Link href={`/research/${index + 1}`}>
                        View Document
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              <Button variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                <Link href="/research">Browse Research Library</Link>
              </Button>
              <div>
                <Button variant="secondary" className="w-full sm:w-auto" asChild>
                  <Link href="/research/premium">Subscribe for Premium Access</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Wallets Preview */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6 sm:mb-8">
                <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                  <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Demo Wallet Experience</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
                  Experience how future contributions may work with our Stripe-powered demo wallets. Test the flow with
                  sandbox funds - no real money involved.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Create Demo Wallet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-sm">
                      Set up a test wallet with Stripe sandbox integration to explore the contribution experience.
                    </CardDescription>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent" asChild>
                      <Link href="/demo-wallet/create">Create Demo Wallet</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base sm:text-lg">Learn How It Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-sm">
                      Understand the future vision for secure, compliant waqf contributions through our platform.
                    </CardDescription>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent" asChild>
                      <Link href="/demo-wallet/how-it-works">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Governance Strip */}
        <section className="py-8 sm:py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Public Shariah Advisory Panel</h3>
              <p className="text-primary-foreground/90 mb-4 sm:mb-6 text-sm sm:text-base px-2">
                Our platform operates under the guidance of respected Islamic scholars ensuring all activities comply
                with Shariah principles and Islamic finance guidelines.
              </p>
              <Button variant="secondary" className="w-full sm:w-auto" asChild>
                <Link href="/governance">Meet the Panel</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Onboarding CTA Strip */}
        <section className="py-12 sm:py-16 bg-secondary text-secondary-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Are you a waqf institution?</h3>
              <p className="text-secondary-foreground/90 mb-6 sm:mb-8 text-sm sm:text-base px-2">
                Join Global Waqf today and connect with researchers, policymakers, and supporters worldwide. Showcase
                your projects and build trust through our verification process.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto bg-transparent border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary"
                  asChild
                >
                  <Link href="/onboard">Onboard My Institution</Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full sm:w-auto text-secondary-foreground hover:bg-secondary-foreground/10"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

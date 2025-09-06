import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, BookOpen, Globe, Target, Heart } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      title: "Trust & Transparency",
      description: "Every institution undergoes rigorous verification to ensure credibility and Shariah compliance.",
      icon: Shield,
    },
    {
      title: "Community Focus",
      description: "Connecting Malaysian waqf institutions with global supporters and researchers.",
      icon: Users,
    },
    {
      title: "Knowledge Sharing",
      description: "Promoting research and best practices in Islamic endowment management.",
      icon: BookOpen,
    },
    {
      title: "Global Reach",
      description: "Bridging local institutions with international diaspora communities.",
      icon: Globe,
    },
  ]

  const team = [
    {
      name: "Prof. Dr. Ahmad Rahman",
      role: "Shariah Advisory Board Chair",
      institution: "International Islamic University Malaysia",
      expertise: "Islamic Finance & Waqf Law",
    },
    {
      name: "Dr. Fatimah Al-Zahra",
      role: "Research Director",
      institution: "University of Malaya",
      expertise: "Waqf Management & Policy",
    },
    {
      name: "Ustaz Muhammad Yusuf",
      role: "Compliance Officer",
      institution: "Department of Islamic Development Malaysia",
      expertise: "Shariah Compliance & Governance",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">About Global Waqf</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The trusted hub for Malaysian waqf institutions, connecting verified organizations with researchers,
              policymakers, and diaspora supporters worldwide.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To create a trusted platform that connects verified Malaysian waqf institutions with global
                    stakeholders, promoting transparency, research collaboration, and sustainable Islamic endowment
                    development.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle>Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    To be the leading global platform for Islamic endowment institutions, fostering trust,
                    collaboration, and innovation in waqf management while serving communities worldwide.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Our Values */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* What We Do */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Institution Verification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We maintain a comprehensive directory of verified Malaysian waqf institutions, each undergoing
                    rigorous verification processes to ensure Shariah compliance and operational transparency.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Research Repository
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our curated research library provides access to policy papers, academic studies, and best practices
                    from leading Islamic institutions, supporting evidence-based decision making.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Community Connection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We facilitate connections between institutions, researchers, policymakers, and diaspora communities,
                    fostering collaboration and knowledge sharing across borders.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Advisory Team */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Advisory Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-primary">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {member.role}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">{member.institution}</p>
                    <p className="text-xs text-muted-foreground">{member.expertise}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">150+</CardTitle>
                  <CardDescription>Verified Institutions</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">500+</CardTitle>
                  <CardDescription>Active Projects</CardDescription>
                </CardHeader>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">1,200+</CardTitle>
                  <CardDescription>Research Documents</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

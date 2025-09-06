import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, BookOpen, Users, Award } from "lucide-react"
import Link from "next/link"

export default function GovernancePage() {
  const panelMembers = [
    {
      name: "Prof. Dr. Ahmad Hidayat Buang",
      title: "Chairman",
      institution: "University of Malaya",
      expertise: "Islamic Law & Waqf Jurisprudence",
      credentials: "PhD Islamic Law, 25+ years experience",
    },
    {
      name: "Dr. Siti Mashitoh Mahamood",
      title: "Deputy Chairman",
      institution: "International Islamic University Malaysia",
      expertise: "Waqf Management & Development",
      credentials: "PhD Islamic Studies, Former JAWHAR Director",
    },
    {
      name: "Ustaz Zaharuddin Abd Rahman",
      title: "Shariah Advisor",
      institution: "Darul Ifta Malaysia",
      expertise: "Contemporary Islamic Finance",
      credentials: "MA Islamic Studies, Certified Mufti",
    },
    {
      name: "Prof. Dr. Magda Ismail Abdel Mohsin",
      title: "Research Advisor",
      institution: "INCEIF",
      expertise: "Islamic Social Finance",
      credentials: "PhD Economics, International Waqf Expert",
    },
  ]

  const principles = [
    {
      title: "Shariah Compliance",
      description: "All platform activities must comply with Islamic principles and jurisprudence",
      icon: Shield,
    },
    {
      title: "Transparency",
      description: "Open and clear processes for institution verification and project monitoring",
      icon: BookOpen,
    },
    {
      title: "Accountability",
      description: "Regular oversight and reporting to ensure platform integrity",
      icon: Users,
    },
    {
      title: "Excellence",
      description: "Commitment to highest standards in waqf management and development",
      icon: Award,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-6">Shariah Advisory Panel</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform operates under the guidance of respected Islamic scholars ensuring all activities comply with
              Shariah principles and Islamic finance guidelines.
            </p>
          </div>

          {/* Governance Principles */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Governance Principles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((principle, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <principle.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{principle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{principle.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Panel Members */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Advisory Panel Members</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {panelMembers.map((member, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{member.name}</CardTitle>
                        <CardDescription className="text-base font-medium text-primary mt-1">
                          {member.title}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{member.institution}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">Expertise</h4>
                        <p className="text-sm">{member.expertise}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-muted-foreground mb-1">Credentials</h4>
                        <p className="text-sm">{member.credentials}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Oversight Process */}
          <div className="bg-muted/30 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Oversight Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Institution Review</h3>
                <p className="text-muted-foreground">
                  All institutions undergo Shariah compliance review before verification approval.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Ongoing Monitoring</h3>
                <p className="text-muted-foreground">
                  Regular assessment of platform activities and institutional compliance.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Annual Reporting</h3>
                <p className="text-muted-foreground">
                  Comprehensive annual reports on platform governance and compliance.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Questions about Governance?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              For inquiries about our Shariah compliance processes or governance framework, please contact our advisory
              panel.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Contact Advisory Panel</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

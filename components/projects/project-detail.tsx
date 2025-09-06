"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  MapPin,
  Calendar,
  DollarSign,
  Target,
  TrendingUp,
  FileText,
  ExternalLink,
  Mail,
  Globe,
  Wallet,
  Building,
} from "lucide-react"
import type { Document } from "@/lib/supabase"
import { DemoContributionDialog } from "./demo-contribution-dialog"

interface ProjectDetailProps {
  project: {
    id: string
    title: string
    description?: string
    status: string
    objectives?: string
    outcomes?: string
    timeline_start?: string
    timeline_end?: string
    budget_amount?: number
    image_url?: string
    institution?: {
      id: string
      name: string
      state_code: string
      waqf_type: string
      verification_badge: boolean
      contact_email?: string
      website?: string
    }
  }
  documents: Document[]
}

export function ProjectDetail({ project, documents }: ProjectDetailProps) {
  const [demoContributionOpen, setDemoContributionOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "default"
      case "active":
        return "secondary"
      case "paused":
        return "outline"
      default:
        return "secondary"
    }
  }

  const formatBudget = (amount?: number) => {
    if (!amount) return "Not disclosed"
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not specified"
    return new Date(dateString).toLocaleDateString("en-MY", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Calculate progress based on timeline (simplified)
  const calculateProgress = () => {
    if (!project.timeline_start || !project.timeline_end) return 0
    if (project.status === "completed") return 100

    const start = new Date(project.timeline_start).getTime()
    const end = new Date(project.timeline_end).getTime()
    const now = Date.now()

    if (now < start) return 0
    if (now > end) return 100

    return Math.round(((now - start) / (end - start)) * 100)
  }

  const progress = calculateProgress()

  return (
    <div className="container mx-auto px-4">
      {/* Project Header */}
      <div className="mb-8">
        <Card>
          <div className="aspect-video md:aspect-[3/1] relative bg-muted overflow-hidden">
            {project.image_url ? (
              <img
                src={project.image_url || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building className="h-16 w-16 text-muted-foreground" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant={getStatusColor(project.status)} className="bg-white/20 text-white border-white/30">
                  {project.status}
                </Badge>
                {project.institution?.verification_badge && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified Institution
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">{project.title}</h1>
              {project.institution && (
                <p className="text-white/90">
                  by{" "}
                  <Link href={`/institutions/${project.institution.id}`} className="font-medium hover:underline">
                    {project.institution.name}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Project Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {project.description || "No description available for this project."}
              </p>
            </CardContent>
          </Card>

          {/* Objectives & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Objectives & Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {project.objectives && (
                <div>
                  <h4 className="font-semibold mb-3">Project Objectives</h4>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground">{project.objectives}</p>
                  </div>
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Timeline
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Start Date:</span>{" "}
                      <span className="font-medium">{formatDate(project.timeline_start)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">End Date:</span>{" "}
                      <span className="font-medium">{formatDate(project.timeline_end)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Outcomes & Impact */}
          {project.outcomes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Outcomes & Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{project.outcomes}</p>
              </CardContent>
            </Card>
          )}

          {/* Linked Documents */}
          {documents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Related Documents
                </CardTitle>
                <CardDescription>Research papers and reports related to this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((document) => (
                    <div key={document.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">{document.title}</h5>
                        <p className="text-sm text-muted-foreground">
                          {document.doc_type} • {document.year}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/research/${document.id}`}>
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Status</span>
                  <div className="mt-1">
                    <Badge variant={getStatusColor(project.status)}>{project.status}</Badge>
                  </div>
                </div>

                {project.institution && (
                  <div>
                    <span className="text-sm text-muted-foreground">Location</span>
                    <p className="font-medium flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {project.institution.state_code}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-sm text-muted-foreground">Budget</span>
                  <p className="font-medium flex items-center gap-1 mt-1">
                    <DollarSign className="w-4 h-4" />
                    {formatBudget(project.budget_amount)}
                  </p>
                </div>

                {project.institution && (
                  <div>
                    <span className="text-sm text-muted-foreground">Institution Type</span>
                    <p className="font-medium mt-1">{project.institution.waqf_type}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Institution Contact */}
          {project.institution && (
            <Card>
              <CardHeader>
                <CardTitle>Contact Institution</CardTitle>
                <CardDescription>Get in touch with {project.institution.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {project.institution.contact_email && (
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{project.institution.contact_email}</span>
                    </div>
                  )}

                  {project.institution.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <Link
                        href={project.institution.website}
                        target="_blank"
                        className="text-sm text-primary hover:underline"
                      >
                        Visit Website
                      </Link>
                    </div>
                  )}
                </div>

                <Button className="w-full" asChild>
                  <Link href={`/institutions/${project.institution.id}`}>View Institution Profile</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Demo Contribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Demo Contribution
              </CardTitle>
              <CardDescription>Try our demo contribution flow with test funds</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Experience how future contributions may work with our Stripe-powered demo wallet. No real funds are
                processed.
              </p>
              <Button variant="outline" className="w-full bg-transparent" onClick={() => setDemoContributionOpen(true)}>
                Try Demo Contribution
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Demo Contribution Dialog */}
      <DemoContributionDialog open={demoContributionOpen} onOpenChange={setDemoContributionOpen} project={project} />
    </div>
  )
}

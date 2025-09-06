"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  MapPin,
  Building,
  Globe,
  Mail,
  ArrowRight,
  Calendar,
  TrendingUp,
  FileText,
  MessageSquare,
} from "lucide-react"
import type { Institution, Project, Document } from "@/lib/supabase"
import { InquiryDialog } from "./inquiry-dialog"

interface InstitutionProfileProps {
  institution: Institution
  projects: Project[]
  documents: Document[]
}

export function InstitutionProfile({ institution, projects, documents }: InstitutionProfileProps) {
  const [inquiryOpen, setInquiryOpen] = useState(false)

  const activeProjects = projects.filter((p) => p.status === "active")
  const completedProjects = projects.filter((p) => p.status === "completed")

  return (
    <div className="container mx-auto px-4">
      {/* Institution Header */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                {institution.logo_url ? (
                  <img
                    src={institution.logo_url || "/placeholder.svg"}
                    alt={`${institution.name} logo`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Building className="h-12 w-12 text-muted-foreground" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold">{institution.name}</h1>
                      {institution.verification_badge && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {institution.state_code}
                      </span>
                      <span>{institution.waqf_type}</span>
                      <span>{institution.governance_model}</span>
                    </div>
                  </div>

                  <Button onClick={() => setInquiryOpen(true)} className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Send Inquiry
                  </Button>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {institution.description || "No description available."}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects ({projects.length})</TabsTrigger>
          <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProjects.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Completed Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedProjects.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Research Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{documents.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About This Institution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Waqf Type</h4>
                  <p className="text-muted-foreground">{institution.waqf_type}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Governance Model</h4>
                  <p className="text-muted-foreground">{institution.governance_model}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">State/Region</h4>
                  <p className="text-muted-foreground">{institution.state_code}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Verification Status</h4>
                  <Badge variant={institution.verification_status === "verified" ? "default" : "secondary"}>
                    {institution.verification_status === "verified" ? "Verified" : "Pending Verification"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects Preview */}
          {projects.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Projects</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="#projects">View All Projects</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.slice(0, 3).map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                        <Badge variant="outline" className="mt-2">
                          {project.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          {projects.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Projects Yet</h3>
                <p className="text-muted-foreground">This institution hasn't published any projects yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge variant={project.status === "completed" ? "default" : "secondary"}>{project.status}</Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {project.objectives && (
                        <div>
                          <h5 className="font-medium text-sm mb-1">Objectives</h5>
                          <p className="text-sm text-muted-foreground">{project.objectives}</p>
                        </div>
                      )}
                      {project.timeline_start && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(project.timeline_start).toLocaleDateString()}
                            {project.timeline_end && ` - ${new Date(project.timeline_end).toLocaleDateString()}`}
                          </span>
                        </div>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/projects/${project.id}`}>
                          Explore Project
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          {documents.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Documents Available</h3>
                <p className="text-muted-foreground">This institution hasn't published any research documents yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {documents.map((document) => (
                <Card key={document.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{document.title}</CardTitle>
                        <CardDescription>
                          {document.source_org} • {document.year} • {document.doc_type}
                        </CardDescription>
                      </div>
                      {document.is_premium && <Badge variant="secondary">Premium</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    {document.abstract && <p className="text-sm text-muted-foreground mb-4">{document.abstract}</p>}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/research/${document.id}`}>
                        View Document
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Get in touch with {institution.name} directly through the following channels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {institution.contact_email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">{institution.contact_email}</p>
                    </div>
                  </div>
                )}

                {institution.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Website</p>
                      <Link href={institution.website} target="_blank" className="text-primary hover:underline">
                        {institution.website}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Send Direct Inquiry</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about their projects or want to explore collaboration opportunities? Send a direct
                  inquiry through our secure messaging system.
                </p>
                <Button onClick={() => setInquiryOpen(true)} className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Send Inquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Inquiry Dialog */}
      <InquiryDialog open={inquiryOpen} onOpenChange={setInquiryOpen} institution={institution} />
    </div>
  )
}

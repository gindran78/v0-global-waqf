"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Calendar, Building, Globe, Lock, Download, ArrowRight, FileText, Crown } from "lucide-react"
import type { Document } from "@/lib/supabase"
import { PremiumAccessDialog } from "./premium-access-dialog"

interface DocumentDetailProps {
  document: Document
  relatedDocuments: Document[]
}

export function DocumentDetail({ document, relatedDocuments }: DocumentDetailProps) {
  const [premiumDialogOpen, setPremiumDialogOpen] = useState(false)

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case "en":
        return "English"
      case "ms":
        return "Bahasa Malaysia"
      case "zh":
        return "Chinese"
      default:
        return lang
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "research":
        return "default"
      case "policy":
        return "secondary"
      case "report":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="container mx-auto px-4">
      {/* Document Header */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant={getTypeColor(document.doc_type)}>{document.doc_type}</Badge>
              {document.is_premium && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Premium Content
                </Badge>
              )}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{document.year}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Globe className="w-4 h-4" />
                <span>{getLanguageLabel(document.language)}</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-balance">{document.title}</h1>

            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Building className="w-5 h-5" />
              <span className="font-medium">{document.source_org}</span>
            </div>

            {document.theme && (
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">Research Theme:</span> {document.theme}
              </div>
            )}
          </CardHeader>
        </Card>
      </div>

      {/* Document Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Abstract */}
          <Card>
            <CardHeader>
              <CardTitle>Abstract</CardTitle>
            </CardHeader>
            <CardContent>
              {document.abstract ? (
                <p className="text-muted-foreground leading-relaxed">{document.abstract}</p>
              ) : (
                <p className="text-muted-foreground italic">No abstract available for this document.</p>
              )}
            </CardContent>
          </Card>

          {/* Access Options */}
          <Card>
            <CardHeader>
              <CardTitle>Access Document</CardTitle>
              <CardDescription>
                {document.is_premium
                  ? "This is premium content. Subscribe to access the full document."
                  : "This document is freely available for download."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {document.is_premium ? (
                <div className="space-y-4">
                  <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Crown className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-secondary mb-1">Premium Content</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          This research paper is part of our premium collection. Subscribe to access this and 50+ other
                          exclusive documents.
                        </p>
                        <div className="flex gap-2">
                          <Button onClick={() => setPremiumDialogOpen(true)}>Subscribe for Access</Button>
                          <Button variant="outline" asChild>
                            <Link href="/research/premium">Learn More</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">Free Access</p>
                      <p className="text-sm text-green-700">This document is freely available for download.</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {document.file_url ? (
                      <Button asChild>
                        <Link href={document.file_url} target="_blank">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Link>
                      </Button>
                    ) : (
                      <Button disabled>
                        <Download className="w-4 h-4 mr-2" />
                        Download Not Available
                      </Button>
                    )}
                    <Button variant="outline" asChild>
                      <Link href="/research">Browse More Research</Link>
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Document Details */}
          <Card>
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Document Type</span>
                  <p className="font-medium">{document.doc_type}</p>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Publication Year</span>
                  <p className="font-medium">{document.year}</p>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Language</span>
                  <p className="font-medium">{getLanguageLabel(document.language)}</p>
                </div>

                {document.theme && (
                  <div>
                    <span className="text-sm text-muted-foreground">Research Theme</span>
                    <p className="font-medium">{document.theme}</p>
                  </div>
                )}

                <div>
                  <span className="text-sm text-muted-foreground">Source Organization</span>
                  <p className="font-medium">{document.source_org}</p>
                </div>

                <div>
                  <span className="text-sm text-muted-foreground">Access Level</span>
                  <Badge variant={document.is_premium ? "secondary" : "default"}>
                    {document.is_premium ? "Premium" : "Free"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Documents */}
          {relatedDocuments.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related Research</CardTitle>
                <CardDescription>Other documents you might find interesting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedDocuments.map((doc) => (
                    <div key={doc.id} className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-medium text-sm leading-tight line-clamp-2">{doc.title}</h5>
                        {doc.is_premium && <Lock className="w-3 h-3 text-muted-foreground flex-shrink-0 mt-0.5" />}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {doc.source_org} • {doc.year}
                      </p>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs" asChild>
                        <Link href={`/research/${doc.id}`}>
                          View Document
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                      <Separator />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Browse More */}
          <Card>
            <CardHeader>
              <CardTitle>Explore More</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/research">
                  <FileText className="w-4 h-4 mr-2" />
                  Browse All Research
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/research/premium">
                  <Crown className="w-4 h-4 mr-2" />
                  Premium Content
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                <Link href="/institutions">
                  <Building className="w-4 h-4 mr-2" />
                  Research Institutions
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Premium Access Dialog */}
      <PremiumAccessDialog open={premiumDialogOpen} onOpenChange={setPremiumDialogOpen} document={document} />
    </div>
  )
}

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Building2, Globe, Lock, ArrowRight } from "lucide-react"
import type { Document } from "@/lib/supabase"

interface ResearchCardProps {
  document: Document
}

export function ResearchCard({ document }: ResearchCardProps) {
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
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant={getTypeColor(document.doc_type)}>{document.doc_type}</Badge>
            {document.is_premium && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Premium
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            <span>{document.year}</span>
          </div>
        </div>

        <CardTitle className="text-lg leading-tight line-clamp-2">{document.title}</CardTitle>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="w-4 h-4" />
          <span className="truncate">{document.source_org}</span>
        </div>

        {document.theme && (
          <CardDescription className="text-xs">
            <span className="font-medium">Theme:</span> {document.theme}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1">
          {document.abstract && <p className="text-sm text-muted-foreground line-clamp-4 mb-4">{document.abstract}</p>}

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>{getLanguageLabel(document.language)}</span>
            </div>
          </div>
        </div>

        <Button
          variant={document.is_premium ? "secondary" : "outline"}
          size="sm"
          className="w-full mt-auto bg-transparent"
          asChild
        >
          <Link href={`/research/${document.id}`}>
            {document.is_premium ? "View Premium" : "View Document"}
            <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

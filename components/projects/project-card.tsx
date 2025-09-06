import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, MapPin, Calendar, ArrowRight, Building } from "lucide-react"

interface ProjectCardProps {
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
      verification_badge: boolean
    }
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
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
    if (!amount) return null
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col overflow-hidden">
      {/* Project Image */}
      <div className="aspect-video relative bg-muted">
        {project.image_url ? (
          <img
            src={project.image_url || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Building className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <Badge className={`absolute top-3 right-3`} variant={getStatusColor(project.status)}>
          {project.status}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg leading-tight line-clamp-2">{project.title}</CardTitle>
        {project.institution && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>by</span>
            <Link
              href={`/institutions/${project.institution.id}`}
              className="font-medium hover:text-foreground transition-colors flex items-center gap-1"
            >
              {project.institution.name}
              {project.institution.verification_badge && <CheckCircle className="w-3 h-3" />}
            </Link>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 space-y-3">
          {project.description && <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>}

          <div className="space-y-2">
            {project.institution?.state_code && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span>{project.institution.state_code}</span>
              </div>
            )}

            {project.timeline_start && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(project.timeline_start).toLocaleDateString()}
                  {project.timeline_end && ` - ${new Date(project.timeline_end).toLocaleDateString()}`}
                </span>
              </div>
            )}

            {project.budget_amount && (
              <div className="text-xs text-muted-foreground">
                <span className="font-medium">Budget:</span> {formatBudget(project.budget_amount)}
              </div>
            )}
          </div>

          {project.outcomes && (
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium">Key Outcomes:</span> {project.outcomes}
              </p>
            </div>
          )}
        </div>

        <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent" asChild>
          <Link href={`/projects/${project.id}`}>
            Explore Project
            <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

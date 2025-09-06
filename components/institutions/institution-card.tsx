import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Building2, ArrowRight, Shield } from "lucide-react"
import type { Institution } from "@/lib/supabase"

interface InstitutionCardProps {
  institution: Institution
}

export function InstitutionCard({ institution }: InstitutionCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
            {institution.logo_url ? (
              <img
                src={institution.logo_url || "/placeholder.svg"}
                alt={`${institution.name} logo`}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Building2 className="h-6 w-6 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <CardTitle className="text-lg leading-tight">{institution.name}</CardTitle>
              {institution.verification_badge && (
                <Badge variant="secondary" className="text-xs flex-shrink-0">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{institution.state_code}</span>
              </div>
              <div className="text-xs text-muted-foreground">{institution.waqf_type}</div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
            {institution.description || "No description available."}
          </p>

          <div className="space-y-2 mb-4">
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Governance:</span> {institution.governance_model}
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={institution.verification_status === "verified" ? "default" : "secondary"}
                className="text-xs"
              >
                {institution.verification_status === "verified" ? "Verified" : "Pending Verification"}
              </Badge>
            </div>
          </div>
        </div>

        <Button variant="outline" size="sm" className="w-full mt-auto bg-transparent" asChild>
          <Link href={`/institutions/${institution.id}`}>
            View Profile
            <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

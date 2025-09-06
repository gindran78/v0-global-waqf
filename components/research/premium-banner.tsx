import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, BookOpen, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export function PremiumBanner() {
  return (
    <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="h-5 w-5 text-secondary" />
              <Badge variant="secondary" className="text-xs">
                Premium Access
              </Badge>
            </div>
            <h3 className="text-xl font-bold mb-2">Unlock Premium Research Content</h3>
            <p className="text-muted-foreground mb-4">
              Get access to exclusive research papers, detailed policy analysis, and comprehensive reports from leading
              Islamic institutions and universities.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-secondary" />
                <span>50+ Premium Papers</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-secondary" />
                <span>Expert Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-secondary" />
                <span>Latest Research</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" asChild>
              <Link href="/research/premium">Learn More</Link>
            </Button>
            <Button asChild>
              <Link href="/research/subscribe">Subscribe Now</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

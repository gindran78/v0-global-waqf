import { Suspense } from "react"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { InstitutionsDirectory } from "@/components/institutions/institutions-directory"
import { InstitutionsFilters } from "@/components/institutions/institutions-filters"

export const metadata = {
  title: "Institutions Directory - Global Waqf",
  description: "Discover verified waqf institutions across Malaysia. Browse by state, type, and governance model.",
}

interface SearchParams {
  state?: string
  type?: string
  governance?: string
  search?: string
  page?: string
}

export default function InstitutionsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Institutions Directory</h1>
            <p className="text-muted-foreground max-w-2xl">
              Discover verified waqf institutions across Malaysia. All institutions undergo rigorous verification to
              ensure transparency and Shariah compliance.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <InstitutionsFilters />
          </div>

          {/* Directory */}
          <Suspense fallback={<div className="text-center py-8">Loading institutions...</div>}>
            <InstitutionsDirectory searchParams={searchParams} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}

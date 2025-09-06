import { Suspense } from "react"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { ResearchDirectory } from "@/components/research/research-directory"
import { ResearchFilters } from "@/components/research/research-filters"
import { PremiumBanner } from "@/components/research/premium-banner"

export const metadata = {
  title: "Research Library - Global Waqf",
  description:
    "Access curated research papers, policy frameworks, and best practices from leading Islamic institutions.",
}

interface SearchParams {
  theme?: string
  year?: string
  type?: string
  language?: string
  search?: string
  page?: string
}

export default function ResearchPage({
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
            <h1 className="text-3xl font-bold mb-4">Research Library</h1>
            <p className="text-muted-foreground max-w-2xl">
              Access curated research papers, policy frameworks, and best practices from leading Islamic institutions
              and scholars worldwide.
            </p>
          </div>

          {/* Premium Banner */}
          <div className="mb-8">
            <PremiumBanner />
          </div>

          {/* Filters */}
          <div className="mb-8">
            <ResearchFilters />
          </div>

          {/* Directory */}
          <Suspense fallback={<div className="text-center py-8">Loading research documents...</div>}>
            <ResearchDirectory searchParams={searchParams} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}

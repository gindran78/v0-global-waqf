import { Suspense } from "react"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { ProjectsDirectory } from "@/components/projects/projects-directory"
import { ProjectsFilters } from "@/components/projects/projects-filters"

export const metadata = {
  title: "Projects Showcase - Global Waqf",
  description: "Explore impactful waqf projects across Malaysia in education, healthcare, and community development.",
}

interface SearchParams {
  status?: string
  state?: string
  theme?: string
  search?: string
  page?: string
}

export default function ProjectsPage({
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
            <h1 className="text-3xl font-bold mb-4">Projects Showcase</h1>
            <p className="text-muted-foreground max-w-2xl">
              Discover impactful waqf projects making a difference in education, healthcare, and community development
              across Malaysia.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <ProjectsFilters />
          </div>

          {/* Directory */}
          <Suspense fallback={<div className="text-center py-8">Loading projects...</div>}>
            <ProjectsDirectory searchParams={searchParams} />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  )
}

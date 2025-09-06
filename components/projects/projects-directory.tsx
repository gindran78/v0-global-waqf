import { createServerSupabaseClient } from "@/lib/supabase"
import { ProjectCard } from "./project-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SearchParams {
  status?: string
  state?: string
  theme?: string
  search?: string
  page?: string
}

export async function ProjectsDirectory({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createServerSupabaseClient()
  const page = Number.parseInt(searchParams.page || "1")
  const limit = 12
  const offset = (page - 1) * limit

  // Build query with institution join
  let query = supabase
    .from("projects")
    .select(
      `
      *,
      institution:institutions(
        id,
        name,
        state_code,
        verification_badge
      )
    `,
      { count: "exact" },
    )
    .order("status", { ascending: true }) // Active first
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  // Apply filters
  if (searchParams.search) {
    query = query.or(
      `title.ilike.%${searchParams.search}%,description.ilike.%${searchParams.search}%,objectives.ilike.%${searchParams.search}%,outcomes.ilike.%${searchParams.search}%`,
    )
  }
  if (searchParams.status) {
    query = query.eq("status", searchParams.status)
  }

  const { data: projects, error, count } = await query

  if (error) {
    console.error("Error fetching projects:", error)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Error loading projects. Please try again.</p>
      </div>
    )
  }

  // Filter by state and theme on the client side since they're in the institution table
  let filteredProjects = projects || []

  if (searchParams.state) {
    filteredProjects = filteredProjects.filter((project) => project.institution?.state_code === searchParams.state)
  }

  // For theme filtering, we'll need to implement a theme field or derive it from project data
  // For now, we'll skip theme filtering in the backend and handle it differently

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No projects found</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your search criteria or browse all projects.</p>
        <Button variant="outline" asChild>
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    )
  }

  const totalPages = Math.ceil((count || 0) / limit)
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  return (
    <div className="space-y-8">
      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {offset + 1}-{Math.min(offset + limit, filteredProjects.length)} of {filteredProjects.length} projects
        </p>
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {hasPrevPage && (
            <Button variant="outline" asChild>
              <Link
                href={`/projects?${new URLSearchParams({ ...searchParams, page: (page - 1).toString() }).toString()}`}
              >
                Previous
              </Link>
            </Button>
          )}

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i
              return (
                <Button key={pageNum} variant={pageNum === page ? "default" : "outline"} size="sm" asChild>
                  <Link
                    href={`/projects?${new URLSearchParams({ ...searchParams, page: pageNum.toString() }).toString()}`}
                  >
                    {pageNum}
                  </Link>
                </Button>
              )
            })}
          </div>

          {hasNextPage && (
            <Button variant="outline" asChild>
              <Link
                href={`/projects?${new URLSearchParams({ ...searchParams, page: (page + 1).toString() }).toString()}`}
              >
                Next
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

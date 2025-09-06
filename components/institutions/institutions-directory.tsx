import { createServerSupabaseClient } from "@/lib/supabase"
import { InstitutionCard } from "./institution-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SearchParams {
  state?: string
  type?: string
  governance?: string
  search?: string
  page?: string
}

export async function InstitutionsDirectory({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createServerSupabaseClient()
  const page = Number.parseInt(searchParams.page || "1")
  const limit = 12
  const offset = (page - 1) * limit

  // Build query
  let query = supabase
    .from("institutions")
    .select("*", { count: "exact" })
    .order("verification_status", { ascending: false }) // Verified first
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  // Apply filters
  if (searchParams.search) {
    query = query.or(`name.ilike.%${searchParams.search}%,description.ilike.%${searchParams.search}%`)
  }
  if (searchParams.state) {
    query = query.eq("state_code", searchParams.state)
  }
  if (searchParams.type) {
    query = query.eq("waqf_type", searchParams.type)
  }
  if (searchParams.governance) {
    query = query.eq("governance_model", searchParams.governance)
  }

  const { data: institutions, error, count } = await query

  if (error) {
    console.error("Error fetching institutions:", error)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Error loading institutions. Please try again.</p>
      </div>
    )
  }

  if (!institutions || institutions.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No institutions found</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your search criteria or browse all institutions.</p>
        <Button variant="outline" asChild>
          <Link href="/institutions">View All Institutions</Link>
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
          Showing {offset + 1}-{Math.min(offset + limit, count || 0)} of {count || 0} institutions
        </p>
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
      </div>

      {/* Institution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {institutions.map((institution) => (
          <InstitutionCard key={institution.id} institution={institution} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {hasPrevPage && (
            <Button variant="outline" asChild>
              <Link
                href={`/institutions?${new URLSearchParams({ ...searchParams, page: (page - 1).toString() }).toString()}`}
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
                    href={`/institutions?${new URLSearchParams({ ...searchParams, page: pageNum.toString() }).toString()}`}
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
                href={`/institutions?${new URLSearchParams({ ...searchParams, page: (page + 1).toString() }).toString()}`}
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

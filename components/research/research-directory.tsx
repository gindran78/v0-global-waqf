import { createServerSupabaseClient } from "@/lib/supabase"
import { ResearchCard } from "./research-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SearchParams {
  theme?: string
  year?: string
  type?: string
  language?: string
  search?: string
  page?: string
}

export async function ResearchDirectory({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createServerSupabaseClient()
  const page = Number.parseInt(searchParams.page || "1")
  const limit = 12
  const offset = (page - 1) * limit

  // Build query
  let query = supabase
    .from("documents")
    .select("*", { count: "exact" })
    .order("is_premium", { ascending: true }) // Free content first
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1)

  // Apply filters
  if (searchParams.search) {
    query = query.or(
      `title.ilike.%${searchParams.search}%,abstract.ilike.%${searchParams.search}%,source_org.ilike.%${searchParams.search}%`,
    )
  }
  if (searchParams.theme) {
    query = query.eq("theme", searchParams.theme)
  }
  if (searchParams.year) {
    query = query.eq("year", Number.parseInt(searchParams.year))
  }
  if (searchParams.type) {
    query = query.eq("doc_type", searchParams.type)
  }
  if (searchParams.language) {
    query = query.eq("language", searchParams.language)
  }

  const { data: documents, error, count } = await query

  if (error) {
    console.error("Error fetching documents:", error)
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Error loading research documents. Please try again.</p>
      </div>
    )
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No documents found</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your search criteria or browse all research.</p>
        <Button variant="outline" asChild>
          <Link href="/research">View All Research</Link>
        </Button>
      </div>
    )
  }

  const totalPages = Math.ceil((count || 0) / limit)
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  // Separate free and premium content
  const freeDocuments = documents.filter((doc) => !doc.is_premium)
  const premiumDocuments = documents.filter((doc) => doc.is_premium)

  return (
    <div className="space-y-8">
      {/* Results Summary */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing {offset + 1}-{Math.min(offset + limit, count || 0)} of {count || 0} documents
          {freeDocuments.length > 0 && premiumDocuments.length > 0 && (
            <span className="ml-2">
              ({freeDocuments.length} free, {premiumDocuments.length} premium)
            </span>
          )}
        </p>
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
      </div>

      {/* Free Documents */}
      {freeDocuments.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Free Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeDocuments.map((document) => (
              <ResearchCard key={document.id} document={document} />
            ))}
          </div>
        </div>
      )}

      {/* Premium Documents */}
      {premiumDocuments.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Premium Content</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/research/subscribe">Subscribe for Access</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumDocuments.map((document) => (
              <ResearchCard key={document.id} document={document} />
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {hasPrevPage && (
            <Button variant="outline" asChild>
              <Link
                href={`/research?${new URLSearchParams({ ...searchParams, page: (page - 1).toString() }).toString()}`}
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
                    href={`/research?${new URLSearchParams({ ...searchParams, page: pageNum.toString() }).toString()}`}
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
                href={`/research?${new URLSearchParams({ ...searchParams, page: (page + 1).toString() }).toString()}`}
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

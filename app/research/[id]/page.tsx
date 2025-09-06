import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { DocumentDetail } from "@/components/research/document-detail"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()
  const { data: document } = await supabase
    .from("documents")
    .select("title, abstract, source_org")
    .eq("id", params.id)
    .single()

  if (!document) {
    return {
      title: "Document Not Found - Global Waqf",
    }
  }

  return {
    title: `${document.title} - Global Waqf Research`,
    description: document.abstract || `Research document from ${document.source_org}`,
  }
}

export default async function DocumentDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()

  // Fetch document details
  const { data: document, error } = await supabase.from("documents").select("*").eq("id", params.id).single()

  if (error || !document) {
    notFound()
  }

  // Fetch related documents from the same organization or theme
  const { data: relatedDocuments } = await supabase
    .from("documents")
    .select("*")
    .or(`source_org.eq.${document.source_org},theme.eq.${document.theme}`)
    .neq("id", params.id)
    .limit(3)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <DocumentDetail document={document} relatedDocuments={relatedDocuments || []} />
      </main>

      <Footer />
    </div>
  )
}

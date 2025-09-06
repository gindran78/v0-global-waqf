import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { InstitutionProfile } from "@/components/institutions/institution-profile"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()
  const { data: institution } = await supabase
    .from("institutions")
    .select("name, description")
    .eq("id", params.id)
    .single()

  if (!institution) {
    return {
      title: "Institution Not Found - Global Waqf",
    }
  }

  return {
    title: `${institution.name} - Global Waqf`,
    description:
      institution.description || `Learn more about ${institution.name}, a verified waqf institution in Malaysia.`,
  }
}

export default async function InstitutionDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()

  // Fetch institution details
  const { data: institution, error } = await supabase.from("institutions").select("*").eq("id", params.id).single()

  if (error || !institution) {
    notFound()
  }

  // Fetch institution's projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("institution_id", params.id)
    .order("created_at", { ascending: false })

  // Fetch institution's documents (if any)
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("source_org", institution.name)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <InstitutionProfile institution={institution} projects={projects || []} documents={documents || []} />
      </main>

      <Footer />
    </div>
  )
}

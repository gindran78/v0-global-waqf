import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { ProjectDetail } from "@/components/projects/project-detail"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()
  const { data: project } = await supabase
    .from("projects")
    .select("title, description, institution:institutions(name)")
    .eq("id", params.id)
    .single()

  if (!project) {
    return {
      title: "Project Not Found - Global Waqf",
    }
  }

  return {
    title: `${project.title} - Global Waqf`,
    description: project.description || `Learn more about ${project.title} by ${project.institution?.name}.`,
  }
}

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()

  // Fetch project details with institution
  const { data: project, error } = await supabase
    .from("projects")
    .select(
      `
      *,
      institution:institutions(
        id,
        name,
        state_code,
        waqf_type,
        verification_badge,
        contact_email,
        website
      )
    `,
    )
    .eq("id", params.id)
    .single()

  if (error || !project) {
    notFound()
  }

  // Fetch related documents (if any)
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("source_org", project.institution?.name || "")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8">
        <ProjectDetail project={project} documents={documents || []} />
      </main>

      <Footer />
    </div>
  )
}

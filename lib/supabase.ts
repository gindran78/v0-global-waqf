import { createBrowserClient, createServerClient } from "@supabase/ssr"

// Browser client for client-side operations
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// Server client for server-side operations
export async function createServerSupabaseClient() {
  const { cookies } = await import("next/headers")
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}

// Types for our database schema
export interface Institution {
  id: string
  name: string
  state_code: string
  waqf_type: string
  governance_model: string
  website?: string
  contact_email?: string
  description?: string
  logo_url?: string
  verification_status: "pending" | "verified" | "rejected"
  verification_badge: boolean
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  institution_id: string
  title: string
  description?: string
  status: "active" | "completed" | "paused"
  objectives?: string
  outcomes?: string
  timeline_start?: string
  timeline_end?: string
  budget_amount?: number
  image_url?: string
  documents_bundle_id?: string
  created_at: string
  updated_at: string
  institution?: Institution
}

export interface Document {
  id: string
  title: string
  source_org?: string
  doc_type: "research" | "policy" | "report" | "other"
  year?: number
  theme?: string
  abstract?: string
  file_url?: string
  is_premium: boolean
  language: "en" | "ms" | "zh"
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin" | "institution"
  institution_id?: string
  locale: "en" | "ms" | "zh"
  created_at: string
  updated_at: string
}

export interface Inquiry {
  id: string
  from_user_id: string
  to_institution_id: string
  subject: string
  body: string
  status: "pending" | "responded" | "closed"
  created_at: string
  updated_at: string
  from_user?: User
  to_institution?: Institution
}

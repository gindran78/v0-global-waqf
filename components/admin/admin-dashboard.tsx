"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { createBrowserClient } from "@supabase/ssr"
import { Building2, Target, GraduationCap, MessageSquare, Shield, AlertCircle } from "lucide-react"

interface DashboardStats {
  totalInstitutions: number
  pendingInstitutions: number
  totalProjects: number
  activeProjects: number
  totalDocuments: number
  totalInquiries: number
  pendingInquiries: number
}

export function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalInstitutions: 0,
    pendingInstitutions: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalDocuments: 0,
    totalInquiries: 0,
    pendingInquiries: 0,
  })
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const [
        institutionsResult,
        pendingInstitutionsResult,
        projectsResult,
        activeProjectsResult,
        documentsResult,
        inquiriesResult,
        pendingInquiriesResult,
      ] = await Promise.all([
        supabase.from("institutions").select("id", { count: "exact" }),
        supabase.from("institutions").select("id", { count: "exact" }).eq("verification_status", "pending"),
        supabase.from("projects").select("id", { count: "exact" }),
        supabase.from("projects").select("id", { count: "exact" }).eq("status", "active"),
        supabase.from("documents").select("id", { count: "exact" }),
        supabase.from("inquiries").select("id", { count: "exact" }),
        supabase.from("inquiries").select("id", { count: "exact" }).eq("status", "pending"),
      ])

      setStats({
        totalInstitutions: institutionsResult.count || 0,
        pendingInstitutions: pendingInstitutionsResult.count || 0,
        totalProjects: projectsResult.count || 0,
        activeProjects: activeProjectsResult.count || 0,
        totalDocuments: documentsResult.count || 0,
        totalInquiries: inquiriesResult.count || 0,
        pendingInquiries: pendingInquiriesResult.count || 0,
      })
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading dashboard...</div>
  }

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Institutions</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInstitutions}</div>
            {stats.pendingInstitutions > 0 && (
              <p className="text-xs text-muted-foreground">{stats.pendingInstitutions} pending approval</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">{stats.totalProjects} total projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Research Documents</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDocuments}</div>
            <p className="text-xs text-muted-foreground">Available in repository</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingInquiries}</div>
            <p className="text-xs text-muted-foreground">{stats.totalInquiries} total inquiries</p>
          </CardContent>
        </Card>
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="institutions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="institutions">Institutions</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
        </TabsList>

        <TabsContent value="institutions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Institution Management</CardTitle>
              <CardDescription>Review and manage waqf institution registrations and profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Pending Approvals</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {stats.pendingInstitutions} pending
                    </Badge>
                  </div>
                </div>
                <Button>Review Applications</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>Monitor project submissions and manage project lifecycle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Project Status</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {stats.activeProjects} active
                    </Badge>
                    <Badge variant="secondary">{stats.totalProjects - stats.activeProjects} completed</Badge>
                  </div>
                </div>
                <Button>Manage Projects</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Management</CardTitle>
              <CardDescription>Upload and manage research documents and policy papers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Repository Status</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" />
                      {stats.totalDocuments} documents
                    </Badge>
                  </div>
                </div>
                <Button>Upload Document</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inquiry Management</CardTitle>
              <CardDescription>Review and respond to user inquiries and support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Inquiry Status</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {stats.pendingInquiries} pending
                    </Badge>
                    <Badge variant="secondary">{stats.totalInquiries - stats.pendingInquiries} resolved</Badge>
                  </div>
                </div>
                <Button>Review Inquiries</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

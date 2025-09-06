"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

export function ProjectsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [status, setStatus] = useState(searchParams.get("status") || "All Status")
  const [state, setState] = useState(searchParams.get("state") || "All States")
  const [theme, setTheme] = useState(searchParams.get("theme") || "All Themes")

  const states = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Kuala Lumpur",
    "Labuan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Penang",
    "Perak",
    "Perlis",
    "Putrajaya",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
  ]

  const projectThemes = [
    "Education",
    "Healthcare",
    "Religious",
    "Social Welfare",
    "Economic Development",
    "Infrastructure",
    "Community Development",
    "Research & Innovation",
    "Environmental",
    "Youth Development",
  ]

  const statusOptions = ["Active", "Completed", "Paused"]

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (status !== "All Status") params.set("status", status.toLowerCase())
    if (state !== "All States") params.set("state", state)
    if (theme !== "All Themes") params.set("theme", theme)

    router.push(`/projects?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch("")
    setStatus("All Status")
    setState("All States")
    setTheme("All Themes")
    router.push("/projects")
  }

  const hasActiveFilters = search || status !== "All Status" || state !== "All States" || theme !== "All Themes"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by title, objectives, or outcomes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            />
          </div>

          {/* Filter Selects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Project Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Status">All Status</SelectItem>
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={state} onValueChange={setState}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All States">All States</SelectItem>
                {states.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Project Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Themes">All Themes</SelectItem>
                {projectThemes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <div className="flex gap-2">
              <Button onClick={applyFilters} className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Apply Filters
              </Button>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="flex items-center gap-2 bg-transparent">
                  <X className="h-4 w-4" />
                  Clear All
                </Button>
              )}
            </div>
            <div className="text-sm text-muted-foreground flex items-center">
              {hasActiveFilters && (
                <span>
                  Filters active:{" "}
                  {[
                    search && "search",
                    status !== "All Status" && "status",
                    state !== "All States" && "state",
                    theme !== "All Themes" && "theme",
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

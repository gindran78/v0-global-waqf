"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

export function ResearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [theme, setTheme] = useState(searchParams.get("theme") || "All Themes")
  const [year, setYear] = useState(searchParams.get("year") || "All Years")
  const [type, setType] = useState(searchParams.get("type") || "All Types")
  const [language, setLanguage] = useState(searchParams.get("language") || "All Languages")

  const themes = [
    "Policy Development",
    "Education",
    "Healthcare",
    "Management",
    "Technology",
    "Finance",
    "Governance",
    "Social Impact",
    "Sustainability",
    "Innovation",
  ]

  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString())

  const documentTypes = ["Research", "Policy", "Report", "Other"]

  const languages = [
    { value: "en", label: "English" },
    { value: "ms", label: "Bahasa Malaysia" },
    { value: "zh", label: "Chinese" },
  ]

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (theme !== "All Themes") params.set("theme", theme)
    if (year !== "All Years") params.set("year", year)
    if (type !== "All Types") params.set("type", type.toLowerCase())
    if (language !== "All Languages") params.set("language", language)

    router.push(`/research?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch("")
    setTheme("All Themes")
    setYear("All Years")
    setType("All Types")
    setLanguage("All Languages")
    router.push("/research")
  }

  const hasActiveFilters =
    search || theme !== "All Themes" || year !== "All Years" || type !== "All Types" || language !== "All Languages"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search research papers by title, abstract, or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            />
          </div>

          {/* Filter Selects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger>
                <SelectValue placeholder="Research Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Themes">All Themes</SelectItem>
                {themes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue placeholder="Publication Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Years">All Years</SelectItem>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Document Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                {documentTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Languages">All Languages</SelectItem>
                {languages.map((l) => (
                  <SelectItem key={l.value} value={l.value}>
                    {l.label}
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
                    theme !== "All Themes" && "theme",
                    year !== "All Years" && "year",
                    type !== "All Types" && "type",
                    language !== "All Languages" && "language",
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

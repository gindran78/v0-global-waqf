"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

export function InstitutionsFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [state, setState] = useState(searchParams.get("state") || "All States")
  const [type, setType] = useState(searchParams.get("type") || "All Types")
  const [governance, setGovernance] = useState(searchParams.get("governance") || "All Models")

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

  const waqfTypes = [
    "General Waqf",
    "Educational Waqf",
    "Healthcare Waqf",
    "Religious Waqf",
    "Social Waqf",
    "Economic Waqf",
    "State Waqf",
    "Corporate Waqf",
  ]

  const governanceModels = [
    "Board of Trustees",
    "State Council",
    "University Board",
    "Corporate Structure",
    "Religious Council",
    "Community Board",
    "Foundation Board",
  ]

  const applyFilters = () => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (state !== "All States") params.set("state", state)
    if (type !== "All Types") params.set("type", type)
    if (governance !== "All Models") params.set("governance", governance)

    router.push(`/institutions?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch("")
    setState("All States")
    setType("All Types")
    setGovernance("All Models")
    router.push("/institutions")
  }

  const hasActiveFilters = search || state !== "All States" || type !== "All Types" || governance !== "All Models"

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search institutions by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            />
          </div>

          {/* Filter Selects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Waqf Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                {waqfTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={governance} onValueChange={setGovernance}>
              <SelectTrigger>
                <SelectValue placeholder="Governance Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Models">All Models</SelectItem>
                {governanceModels.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
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
                    state !== "All States" && "state",
                    type !== "All Types" && "type",
                    governance !== "All Models" && "governance",
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

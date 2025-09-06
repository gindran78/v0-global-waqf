"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"
import { CheckCircle, Building, FileText, Shield } from "lucide-react"

export default function OnboardPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    institutionName: "",
    state: "",
    waqfType: "",
    governanceModel: "",
    description: "",
    contactEmail: "",
    website: "",
    registrationNumber: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically submit to your API
    console.log("Institution onboarding data:", formData)
    setSubmitted(true)
  }

  const steps = [
    { number: 1, title: "Basic Information", icon: Building },
    { number: 2, title: "Documentation", icon: FileText },
    { number: 3, title: "Verification", icon: Shield },
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Application Submitted!</h1>
              <p className="text-muted-foreground">
                Thank you for your interest in joining Global Waqf. Our team will review your application and contact
                you within 5-7 business days.
              </p>
            </div>
            <Button asChild>
              <a href="/">Return to Home</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Join Global Waqf</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with researchers, policymakers, and supporters worldwide. Showcase your projects and build trust
              through our verification process.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      step >= stepItem.number ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <stepItem.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{stepItem.title}</span>
                  </div>
                  {index < steps.length - 1 && <div className="w-8 h-px bg-muted mx-2" />}
                </div>
              ))}
            </div>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Institution Information</CardTitle>
              <CardDescription>
                Please provide accurate information about your waqf institution. All details will be verified during our
                review process.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="institutionName">Institution Name *</Label>
                    <Input
                      id="institutionName"
                      value={formData.institutionName}
                      onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                      required
                      placeholder="e.g., Yayasan Waqf Malaysia"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => setFormData({ ...formData, state: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="KL">Kuala Lumpur</SelectItem>
                        <SelectItem value="SEL">Selangor</SelectItem>
                        <SelectItem value="JHR">Johor</SelectItem>
                        <SelectItem value="PNG">Penang</SelectItem>
                        <SelectItem value="PRK">Perak</SelectItem>
                        <SelectItem value="KDH">Kedah</SelectItem>
                        <SelectItem value="KTN">Kelantan</SelectItem>
                        <SelectItem value="TRG">Terengganu</SelectItem>
                        <SelectItem value="PHG">Pahang</SelectItem>
                        <SelectItem value="MLK">Melaka</SelectItem>
                        <SelectItem value="NSN">Negeri Sembilan</SelectItem>
                        <SelectItem value="SBH">Sabah</SelectItem>
                        <SelectItem value="SWK">Sarawak</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="waqfType">Waqf Type *</Label>
                    <Select
                      value={formData.waqfType}
                      onValueChange={(value) => setFormData({ ...formData, waqfType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="educational">Educational Waqf</SelectItem>
                        <SelectItem value="healthcare">Healthcare Waqf</SelectItem>
                        <SelectItem value="social">Social Welfare Waqf</SelectItem>
                        <SelectItem value="religious">Religious Waqf</SelectItem>
                        <SelectItem value="mixed">Mixed Purpose Waqf</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="governanceModel">Governance Model *</Label>
                    <Select
                      value={formData.governanceModel}
                      onValueChange={(value) => setFormData({ ...formData, governanceModel: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="state">State-Managed</SelectItem>
                        <SelectItem value="private">Private Foundation</SelectItem>
                        <SelectItem value="corporate">Corporate Waqf</SelectItem>
                        <SelectItem value="community">Community-Based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Institution Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    placeholder="Describe your institution's mission, activities, and impact..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email *</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      required
                      placeholder="contact@institution.org"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://www.institution.org"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="registrationNumber">Registration Number *</Label>
                  <Input
                    id="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    required
                    placeholder="Official registration number"
                  />
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    All information will be verified against official records. Please ensure accuracy to avoid delays in
                    the approval process.
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Search, Globe, MSquare as Mosque, Building2, BookOpen, Coins } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  const navigation = [
    { name: "Institutions", href: "/institutions", icon: Mosque }, // Changed to Mosque for Islamic institutions
    { name: "Projects", href: "/projects", icon: Building2 }, // Building2 for waqf projects
    { name: "Research", href: "/research", icon: BookOpen }, // BookOpen for Islamic research
    { name: "Demo Wallet", href: "/demo-wallet", icon: Coins }, // Coins for Islamic donations
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-border/20 islamic-pattern">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image src="/waqf-logo.png" alt="Global Waqf" width={40} height={40} className="h-10 w-10" />
          <span className="text-xl font-bold text-foreground font-arabic">Global Waqf</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 group crescent-accent"
              >
                <IconComponent className="h-4 w-4 group-hover:text-primary transition-colors" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hover:bg-muted/50 transition-colors">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-muted/50 transition-colors">
            <Globe className="h-4 w-4" />
            <span className="sr-only">Language</span>
          </Button>
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Welcome back</span>
              <Button variant="outline" size="sm" onClick={() => signOut()} className="hover:bg-muted/50">
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild className="hover:bg-muted/50">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button className="btn-primary" size="sm" asChild>
                <Link href="/onboard">Join Platform</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm" className="hover:bg-muted/50">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white">
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-center gap-3">
                <Image src="/waqf-logo.png" alt="Global Waqf" width={32} height={32} className="h-8 w-8" />
                <span className="text-xl font-bold font-arabic">Global Waqf</span>
              </div>

              <nav className="flex flex-col gap-4">
                {navigation.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className="h-4 w-4" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>

              <div className="flex flex-col gap-3 pt-4 border-t border-border/20">
                {user ? (
                  <>
                    <span className="text-sm text-muted-foreground">Welcome back</span>
                    <Button variant="outline" onClick={() => signOut()} className="hover:bg-muted/50">
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="hover:bg-muted/50">
                      <Link href="/auth/signin">Sign In</Link>
                    </Button>
                    <Button className="btn-primary" asChild>
                      <Link href="/onboard">Join Platform</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

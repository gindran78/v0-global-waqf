import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const footerLinks = {
    Platform: [
      { name: "Institutions Directory", href: "/institutions" },
      { name: "Projects Showcase", href: "/projects" },
      { name: "Research Library", href: "/research" },
      { name: "Demo Wallet", href: "/demo-wallet" },
    ],
    About: [
      { name: "About Global Waqf", href: "/about" },
      { name: "Shariah Advisory Panel", href: "/governance" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Contact Us", href: "/contact" },
    ],
    Resources: [
      { name: "Institution Onboarding", href: "/onboard" },
      { name: "Policy Framework", href: "/policy" },
      { name: "FAQ", href: "/faq" },
      { name: "Support", href: "/support" },
    ],
  }

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-sm font-bold">GW</span>
              </div>
              <span className="text-xl font-bold">Global Waqf</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The trusted hub for Malaysian waqf institutions, connecting verified organizations with researchers,
              policymakers, and diaspora supporters worldwide.
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium text-foreground">Subscribe for Updates</p>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="text-sm" />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>© 2025 Global Waqf. All rights reserved.</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Languages:</span>
            <button className="hover:text-foreground transition-colors">English</button>
            <button className="hover:text-foreground transition-colors">Bahasa Malaysia</button>
            <button className="hover:text-foreground transition-colors">中文</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

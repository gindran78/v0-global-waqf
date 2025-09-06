import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing and using Global Waqf platform, you accept and agree to be bound by the terms and provision
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Platform Purpose</h2>
              <p className="mb-4">Global Waqf is a platform designed to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Connect verified Malaysian waqf institutions with researchers and supporters</li>
                <li>Provide transparent information about waqf projects and outcomes</li>
                <li>Facilitate access to research and policy documents</li>
                <li>Demonstrate contribution processes through demo wallet functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <h3 className="text-xl font-medium mb-2">For All Users</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide accurate and truthful information</li>
                <li>Respect Islamic principles and values</li>
                <li>Use the platform for legitimate purposes only</li>
                <li>Maintain confidentiality of account credentials</li>
              </ul>
              <h3 className="text-xl font-medium mb-2">For Institutions</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Maintain valid registration and compliance status</li>
                <li>Provide accurate project and financial information</li>
                <li>Respond to inquiries in a timely manner</li>
                <li>Adhere to Shariah compliance requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Verification Process</h2>
              <p className="mb-4">Institution verification involves:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Review of official registration documents</li>
                <li>Shariah compliance assessment by our advisory panel</li>
                <li>Ongoing monitoring of institutional activities</li>
                <li>Right to revoke verification for non-compliance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Demo Wallet Disclaimer</h2>
              <p className="mb-4">The demo wallet feature is for educational purposes only:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Uses Stripe test mode with no real money transactions</li>
                <li>Demonstrates potential future contribution processes</li>
                <li>Does not constitute actual financial services</li>
                <li>No real funds are collected or distributed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="mb-4">The platform and its content are protected by intellectual property laws:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Platform design and functionality are proprietary</li>
                <li>Research documents remain property of their authors</li>
                <li>Institution information is provided with permission</li>
                <li>Users may not reproduce content without authorization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Prohibited Activities</h2>
              <p className="mb-4">Users may not:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide false or misleading information</li>
                <li>Attempt to circumvent security measures</li>
                <li>Use the platform for illegal activities</li>
                <li>Violate Islamic principles or values</li>
                <li>Interfere with platform operations</li>
                <li>Harvest or collect user information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="mb-4">Global Waqf platform:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provides information "as is" without warranties</li>
                <li>Is not liable for decisions based on platform information</li>
                <li>Does not guarantee continuous availability</li>
                <li>Is not responsible for third-party content or actions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
              <p className="mb-4">We reserve the right to terminate or suspend access to the platform:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>For violation of these terms</li>
                <li>For suspicious or fraudulent activity</li>
                <li>For non-compliance with Shariah principles</li>
                <li>At our discretion with reasonable notice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
              <p className="mb-4">
                These terms are governed by the laws of Malaysia and are subject to the jurisdiction of Malaysian
                courts. Disputes will be resolved in accordance with Islamic principles where applicable.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
              <p className="mb-4">
                We may modify these terms at any time. Users will be notified of significant changes through platform
                announcements. Continued use constitutes acceptance of modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
              <p className="mb-4">For questions about these terms, please contact us:</p>
              <ul className="list-none mb-4">
                <li>Email: legal@globalwaqf.org</li>
                <li>Phone: +60 3-2123 4567</li>
                <li>Address: Level 15, Menara Waqf, Jalan Ampang, 50450 Kuala Lumpur, Malaysia</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

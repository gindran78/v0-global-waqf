import { Header } from "@/components/navigation/header"
import { Footer } from "@/components/navigation/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                Global Waqf collects information to provide better services to our users, including waqf institutions,
                researchers, and supporters.
              </p>
              <h3 className="text-xl font-medium mb-2">Personal Information</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Name and contact information when you register or contact us</li>
                <li>Institution details for verification purposes</li>
                <li>Communication preferences and inquiry history</li>
              </ul>
              <h3 className="text-xl font-medium mb-2">Usage Information</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Pages visited and features used on our platform</li>
                <li>Search queries and filter preferences</li>
                <li>Device and browser information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Verify and maintain institutional profiles</li>
                <li>Facilitate connections between institutions and supporters</li>
                <li>Improve platform functionality and user experience</li>
                <li>Send important updates about platform changes</li>
                <li>Ensure Shariah compliance and platform integrity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="mb-4">
                We do not sell, trade, or rent personal information to third parties. We may share information in the
                following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>With verified institutions when you submit inquiries</li>
                <li>With our Shariah Advisory Panel for compliance review</li>
                <li>When required by law or to protect platform integrity</li>
                <li>With service providers who assist in platform operations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="mb-4">We implement appropriate security measures to protect your information:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Encrypted data transmission and storage</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication requirements</li>
                <li>Compliance with international data protection standards</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Opt out of non-essential communications</li>
                <li>Request data portability where applicable</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
              <p className="mb-4">We use cookies and similar technologies to enhance your experience:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Essential cookies for platform functionality</li>
                <li>Analytics cookies to understand usage patterns</li>
                <li>Preference cookies to remember your settings</li>
              </ul>
              <p>You can control cookie settings through your browser preferences.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. International Transfers</h2>
              <p className="mb-4">
                As a platform serving Malaysian institutions and international users, data may be processed in different
                countries. We ensure appropriate safeguards are in place for international data transfers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this privacy policy periodically. We will notify users of significant changes through
                platform announcements or email notifications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
              <p className="mb-4">
                For questions about this privacy policy or your personal information, please contact us:
              </p>
              <ul className="list-none mb-4">
                <li>Email: privacy@globalwaqf.org</li>
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

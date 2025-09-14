import type React from "react"
import type { Metadata } from "next"
import { Open_Sans, Noto_Sans_Arabic } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Suspense } from "react"
import "./globals.css"

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
})

const notoArabic = Noto_Sans_Arabic({
  subsets: ["latin", "arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Global Waqf - Trusted Malaysian Waqf Platform",
  description:
    "Discover verified waqf institutions, projects, and research in Malaysia. Connect with credible Islamic endowment organizations and support meaningful causes.",
  generator: "Global Waqf Platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${openSans.variable} ${notoArabic.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>{children}</AuthProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}

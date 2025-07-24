import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { clsx } from "clsx"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import Footer from "./components/footer"
import { Navbar } from "./components/nav"
import "./global.css"
import { baseUrl } from "./sitemap"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Kaisei Yoneyama",
    template: "%s | Kaisei Yoneyama",
  },
  description: "米山魁星のポートフォリオサイトです。",
  openGraph: {
    title: "Kaisei Yoneyama",
    description: "米山魁星のポートフォリオサイトです。",
    url: baseUrl,
    siteName: "Kaisei Yoneyama",
    locale: "ja_JP",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={clsx(GeistSans.variable, GeistMono.variable)}>
      <body className="min-h-screen bg-base-100 text-base-content">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="container mx-auto px-4 py-8 max-w-4xl flex-1">
            {children}
          </main>
          <Footer />
        </div>
        {process.env.VERCEL && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}

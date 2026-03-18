import "./globals.css"
import { Geist } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider" // Import it here
import type { ReactNode } from "react"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="antialiased">
        {/* ThemeProvider must wrap everything to work on Login AND Dashboard */}
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
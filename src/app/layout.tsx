import "./globals.css"
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { Geist } from "next/font/google"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is key for dark mode stability
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider delayDuration={0}>
            <SidebarProvider>
              <div className="flex min-h-screen w-full bg-background text-foreground">
                <AppSidebar />
                <main className="flex-1 overflow-auto">
                  <div className="p-6">
                    <SidebarTrigger className="mb-4" />
                    {children}
                  </div>
                </main>
              </div>
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}








// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
// import { Geist } from "next/font/google";

// const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <SidebarProvider>
//       <div className="flex min-h-screen w-full">
//         <AppSidebar />
//         <main className="flex-1 p-6">
//           <SidebarTrigger className="mb-4" />
//           {children}
//         </main>
//       </div>
//     </SidebarProvider>
//   )
// }
import { TooltipProvider } from "@/components/ui/tooltip"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import type { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background text-foreground transition-colors duration-300">
          <AppSidebar />
          
          <main className="flex-1 flex flex-col min-w-0">
            {/* STICKY HEADER */}
            <header className="sticky top-0 z-40 flex h-14 items-center bg-background/80 px-6 backdrop-blur-md border-b border-border/40">
              <SidebarTrigger />
            </header>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-auto p-6 lg:p-10">
              {children}
            </div>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}
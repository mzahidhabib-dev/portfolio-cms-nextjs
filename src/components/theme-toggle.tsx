"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { SidebarMenuButton } from "@/components/ui/sidebar"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <SidebarMenuButton 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      tooltip="Toggle Theme"
      className="w-full justify-start"
    >
      <div className="flex items-center gap-2">
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="font-medium">Theme Mode</span>
      </div>
    </SidebarMenuButton>
  )
}
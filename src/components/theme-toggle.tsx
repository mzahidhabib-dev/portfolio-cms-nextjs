"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SidebarMenuButton } from "@/components/ui/sidebar";

type ThemeToggleProps = {
  variant?: "sidebar" | "floating";
  className?: string;
};

export function ThemeToggle({
  variant = "sidebar",
  className,
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const content = (
    <>
      <span className="relative h-5 w-5">
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute left-0 top-0 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </span>
      <span className="font-medium">Theme Mode</span>
    </>
  );

  if (variant === "floating") {
    return (
      <button
        type="button"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={`inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur ${className ?? ""}`}
      >
        {content}
      </button>
    );
  }

  return (
    <SidebarMenuButton
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      tooltip="Toggle Theme"
      className={`w-full justify-start ${className ?? ""}`}
    >
      <div className="flex items-center gap-2">{content}</div>
    </SidebarMenuButton>
  );
}

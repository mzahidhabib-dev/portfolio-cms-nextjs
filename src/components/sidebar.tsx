"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./theme-provider";

// Icons as simple SVG components
function IconUser({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconBriefcase({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function IconCode({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function IconSun({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function IconMoon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function IconLogOut({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}

const navItems = [
  { href: "/about", label: "About", icon: IconUser },
  { href: "/projects", label: "Projects", icon: IconBriefcase },
  { href: "/skills", label: "Skills", icon: IconCode },
  { href: "/contact", label: "Contact", icon: IconMail },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <aside
      className={`
        flex flex-col h-screen
        bg-[var(--sidebar)] border-r border-[var(--sidebar-border)]
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"}
      `}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--sidebar-border)]">
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Logo placeholder - swap for dark/light mode */}
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
            <span className="text-[var(--primary-foreground)] font-bold text-sm">
              P
            </span>
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-[var(--sidebar-foreground)] whitespace-nowrap">
              Portfolio CMS
            </span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`
            p-1.5 rounded-md 
            hover:bg-[var(--sidebar-accent)] 
            text-[var(--muted-foreground)]
            transition-colors
            ${isCollapsed ? "mx-auto" : ""}
          `}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <IconChevronRight /> : <IconChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg
                transition-colors duration-200
                ${
                  isActive
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]"
                }
                ${isCollapsed ? "justify-center" : ""}
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section - Theme Toggle & User */}
      <div className="p-3 border-t border-[var(--sidebar-border)] space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`
            flex items-center gap-3 w-full px-3 py-2.5 rounded-lg
            text-[var(--sidebar-foreground)]
            hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]
            transition-colors duration-200
            ${isCollapsed ? "justify-center" : ""}
          `}
          title={isCollapsed ? "Toggle theme" : undefined}
        >
          {resolvedTheme === "dark" ? (
            <IconSun className="flex-shrink-0" />
          ) : (
            <IconMoon className="flex-shrink-0" />
          )}
          {!isCollapsed && (
            <span className="font-medium">
              {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div
          className={`
          flex items-center gap-3 px-3 py-2.5 rounded-lg
          bg-[var(--sidebar-accent)]
          ${isCollapsed ? "justify-center" : ""}
        `}
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--muted)] flex items-center justify-center">
            <IconUser className="w-4 h-4 text-[var(--muted-foreground)]" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--sidebar-foreground)] truncate">
                Admin User
              </p>
              <p className="text-xs text-[var(--muted-foreground)] truncate">
                admin@example.com
              </p>
            </div>
          )}
          {!isCollapsed && (
            <button
              className="p-1.5 rounded-md hover:bg-[var(--sidebar-border)] text-[var(--muted-foreground)] transition-colors"
              title="Sign out"
            >
              <IconLogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

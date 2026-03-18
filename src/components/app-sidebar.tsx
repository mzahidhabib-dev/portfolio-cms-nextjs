"use client";

import {
  LayoutDashboard,
  Briefcase,
  Code2,
  User2,
  Settings2,
  Home,
  Mail,
  PanelsTopLeft,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const items = [
  { title: "Dashboard", url: "/states", icon: LayoutDashboard },
  { title: "Site Config", url: "/site-config", icon: Settings2 }, 
  { title: "Home", url: "/hero", icon: Home }, 
  { title: "About", url: "/about", icon: User2 },
  { title: "Skills", url: "/skills", icon: Code2 },
  { title: "Projects", url: "/projects", icon: Briefcase },
  { title: "Contact", url: "/contact", icon: Mail }, 
  { title: "Footer", url: "/footer", icon: PanelsTopLeft }, 
{ title: "Security", url: "/security", icon: ShieldCheck },];


export function AppSidebar() {
const pathname = usePathname();
  const router = useRouter(); // Initialize router

  const handleLogout = () => {
    // Manually remove the cookie
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    
    // Redirect to login
    router.push("/login");
    
    // Force a refresh to ensure middleware catches the empty cookie
    router.refresh();
  };
  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-black/5 bg-white/60 backdrop-blur-xl dark:bg-black/40 dark:border-white/10"
    >
      {/* 1. HEADER - Logo Alignment Fixed */}
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center gap-3 px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Code2 className="size-5 text-white" />
          </div>
          <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden">
            <span className="font-bold leading-none tracking-tight truncate">Portfolio CMS</span>
            <span className="text-[10px] text-muted-foreground font-medium truncate">Production-Grade</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="p-3 gap-3 group-data-[collapsible=icon]:p-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                tooltip={item.title}
                className={`
                  h-11 transition-all duration-200
                  hover:bg-black/5 dark:hover:bg-white/10 
                  data-[active=true]:bg-black/10 dark:data-[active=true]:bg-white/20 
                  data-[active=true]:text-primary 
                  data-[active=true]:shadow-sm
                  data-[active=true]:border-l-4 data-[active=true]:border-primary
                `}
              >
                <Link href={item.url} className="flex items-center gap-3">
                  <item.icon
                    className={`size-5 shrink-0 transition-colors ${
                      pathname === item.url ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span className="font-semibold group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* 2. FOOTER - Fixed for Both States */}
      <SidebarFooter className="border-t border-black/5 dark:border-white/10 p-4 group-data-[collapsible=icon]:p-2">
        <SidebarMenu className="gap-4">
          
          {/* Theme Toggle - Left aligned when open, Centered when closed */}
          <SidebarMenuItem className="flex items-center justify-start group-data-[collapsible=icon]:justify-center px-2 group-data-[collapsible=icon]:px-0">
            <ThemeToggle />
          
          </SidebarMenuItem>

          

          <SidebarMenuItem>
      <SidebarMenuButton 
        onClick={handleLogout}
        className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive transition-all group-data-[collapsible=icon]:justify-center"
      >
        <LogOut className="size-5 shrink-0" />
        <span className="font-bold group-data-[collapsible=icon]:hidden"  >
          Logout
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
          
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}



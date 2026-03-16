"use client";

import {
  LayoutDashboard,
  Briefcase,
  Code2,
  User2,
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
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Projects", url: "/projects", icon: Briefcase },
  { title: "Skills", url: "/skills", icon: Code2 },
  { title: "About", url: "/about", icon: User2 },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-black/5 bg-white/60 backdrop-blur-xl dark:bg-black/40 dark:border-white/10"
    >
      {/* 1. PROFESSIONAL LOGO PLACEMENT */}
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3 px-2">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
            <Code2 className="size-5 text-white" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-bold leading-none tracking-tight">Portfolio CMS</span>
            <span className="text-[10px] text-muted-foreground font-medium">Production-Grade</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="p-3 gap-3">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.url}
                tooltip={item.title}
                className={`
                  h-11 transition-all duration-200
                  hover:bg-black/5 dark:hover:bg-white/10 
                  /* ENHANCED ACTIVE STATE */
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
                  <span
                    className={`font-semibold ${
                      pathname === item.url ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* 2. ADJUSTED FOOTER SPACING */}
      <SidebarFooter className=" border-black/5 dark:border-white/10">
        <SidebarMenu className="gap-6 p-4 border-t"> {/* Increased gap from 4 to 6 for better breathing room */}
          <SidebarMenuItem>
            <ThemeToggle />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              size="lg" 
              className="hover:bg-black/5 dark:hover:bg-white/10 transition-colors group-data-[collapsible=icon]:p-0"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                <span className="text-xs font-bold">M</span>
              </div>
              <div className="flex flex-col overflow-hidden text-left group-data-[collapsible=icon]:hidden">
                <span className="truncate text-sm font-bold">Mohammad</span>
                <span className="truncate text-[10px] text-muted-foreground uppercase tracking-wider font-extrabold">Admin</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

// export function AppSidebar() {
//   const pathname = usePathname();

//   return (
//     <Sidebar collapsible="icon">
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Portfolio CMS</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton asChild isActive={pathname === item.url}>
//                     <Link href={item.url}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//               <SidebarMenuItem>
//                 <ThemeToggle />
//               </SidebarMenuItem>
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

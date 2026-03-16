"use client";

import {
  LayoutDashboard,
  Briefcase,
  Code2,
  User2,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Portfolio CMS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <ThemeToggle />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

// "use client"

// import {
//   Home, User2, Code2, Briefcase, Mail,
//   ChevronUp, LogOut, Settings, ExternalLink
// } from "lucide-react"
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// const items = [
//   { title: "Home", url: "/", icon: Home },
//   { title: "About", url: "/about", icon: User2 },
//   { title: "Skills", url: "/skills", icon: Code2 },
//   { title: "Projects", url: "/projects", icon: Briefcase },
//   { title: "Contact", url: "/contact", icon: Mail },
// ]

// export function AppSidebar() {
//   const pathname = usePathname()

//   return (
//     <Sidebar collapsible="icon" className="border-r">
//       {/* 1. NAVBAR SECTION (The Header) */}
//       <SidebarHeader className="border-b py-4">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <Link href="/">
//                 <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
//                   <Code2 className="size-5" />
//                 </div>
//                 <div className="flex flex-col gap-0.5 leading-none">
//                   <span className="font-semibold">Mohammad.dev</span>
//                   <span className="text-xs text-muted-foreground">CMS v1.0</span>
//                 </div>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>

//       {/* 2. MENU SECTION (The Content) */}
//       <SidebarContent>
//         <SidebarMenu className="p-2">
//           {items.map((item) => (
//             <SidebarMenuItem key={item.title}>
//               <SidebarMenuButton
//                 asChild
//                 tooltip={item.title}
//                 isActive={pathname === item.url}
//                 className="hover:bg-accent hover:text-accent-foreground"
//               >
//                 <Link href={item.url}>
//                   <item.icon className="size-5" />
//                   <span className="font-medium">{item.title}</span>
//                 </Link>
//               </SidebarMenuButton>
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarContent>

//       {/* 3. FOOTER SECTION (The Profile/Account) */}
//       <SidebarFooter className="border-t p-2">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
//                   <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-muted border">
//                     <User2 className="size-5" />
//                   </div>
//                   <div className="grid flex-1 text-left text-sm leading-tight">
//                     <span className="truncate font-semibold">Mohammad</span>
//                     <span className="truncate text-xs text-muted-foreground underline flex items-center gap-1">
//                       Live Portfolio <ExternalLink className="size-2" />
//                     </span>
//                   </div>
//                   <ChevronUp className="ml-auto size-4" />
//                 </SidebarMenuButton>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent side="top" className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg">
//                 <DropdownMenuItem asChild>
//                    <Link href="/settings" className="cursor-pointer">
//                     <Settings className="mr-2 size-4" /> Settings
//                    </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className="text-destructive cursor-pointer">
//                   <LogOut className="mr-2 size-4" /> Logout
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   )
// }

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ReactNode } from "react";
import { GoProjectRoadmap } from "react-icons/go";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menus</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menus.map((menu, idx) => (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton asChild>
                      <Link href={menu.path}>
                        {menu.icon} {menu.label}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main className="w-full h-full">
        <div className="p-5">
          <SidebarTrigger />
        </div>
        <div className="p-5">{children}</div>
      </main>
    </SidebarProvider>
  );
}

const menus = [
  {
    label: "Projects",
    path: "/projects",
    icon: <GoProjectRoadmap />,
  },
];

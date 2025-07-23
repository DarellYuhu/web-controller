"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Link from "next/link";
import { ReactNode, Suspense, useEffect } from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { AiOutlineTool } from "react-icons/ai";
import { SessionProvider, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Globe, Key } from "lucide-react";
import { SidebarHeader } from "@/components/sidebar-header";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}

export default function MainLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    window.__TANSTACK_QUERY_CLIENT__ = queryClient;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader />
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
          <div className="w-full h-full">
            <div className="p-4 flex flex-row justify-between sticky top-0 backdrop-blur-sm bg-white/80 z-10 border-b">
              <SidebarTrigger />
              <Button
                className=""
                onClick={() => signOut()}
                variant={"destructive"}
                size={"sm"}
              >
                <Key />
                Sign Out
              </Button>
            </div>
            <main className="p-5">
              <Suspense fallback={"Loading..."}>{children}</Suspense>
            </main>
          </div>
        </SidebarProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

const menus = [
  {
    label: "Website",
    path: "/projects",
    icon: <Globe />,
  },
  {
    label: "Draft Articles",
    path: "/draft-articles",
    icon: <FaRegNewspaper />,
  },
  {
    label: "Additional Config",
    path: "/configuration",
    icon: <AiOutlineTool />,
  },
];

"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  ChevronRight,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Wallet,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { signOut } from "next-auth/react";

export function AppSidebar({
  wallets,
}: {
  wallets: {
    id: number;
    name: string;
    url: string;
  }[];
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <a href="/dashboard">
                <SidebarMenuButton className="text-blue-700 font-semibold">
                  <LayoutDashboard />
                  <span>Dahsboard</span>
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
            <Collapsible
              asChild
              defaultOpen={true}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Wallets">
                    <Wallet />
                    <span>Wallets</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {wallets.map((item) => (
                      <SidebarMenuSubItem key={item.name}>
                        <SidebarMenuSubButton asChild>
                          <a href={`/dashboard/wallets/${item.id}`}>
                            <span>{item.name}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => {
                  console.log("Open CREATE MODAL");
                }}
              >
                <PlusCircle />

                <span>Create Wallet</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-1">
              <SidebarMenuButton
                onClick={async () => {
                  signOut();
                }}
              >
                <LogOut /> Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

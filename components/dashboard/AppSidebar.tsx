"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  ChartNoAxesCombined,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Settings,
  Wallet,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { WalletProps } from "@/types/types";
import Link from "next/link";
import { useRefreshStore } from "@/stores/refresh";
import { useEffect, useState } from "react";
import { getWallets } from "@/actions/wallet";

// export function AppSidebar({ wallets }: { wallets?: WalletProps[] | null }) {
export function AppSidebar() {
  const [dataWallets, setDataWallets] = useState<WalletProps[]>();
  const { refreshCount } = useRefreshStore();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wallets = await getWallets();

        if (wallets) setDataWallets(wallets);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [refreshCount]);
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-slate-900 py-6 text-white">
        <SidebarGroup>
          <SidebarMenu>
            <Link href={"/dashboard"} className="mb-4">
              <img src="/images/logo-dark.svg" alt="Spendwise" className="h-10" />
            </Link>

            <SidebarMenuItem
              className={clsx(" text-white", {
                "bg-emerald-600/30 rounded-md": pathname === "/dashboard",
              })}
            >
              <a href="/dashboard">
                <SidebarMenuButton>
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
                    {dataWallets &&
                      dataWallets.map((item) => (
                        <SidebarMenuSubItem key={item.name}>
                          <SidebarMenuSubButton
                            className={clsx("text-white", {
                              "bg-emerald-600/30 rounded-md":
                                pathname === `/dashboard/wallets/${item.id}`,
                            })}
                            asChild
                          >
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
            <SidebarMenuItem
              className={clsx("", {
                "bg-emerald-600/30 rounded-md": pathname === "/dashboard/stats",
              })}
            >
              <a href="/dashboard/stats">
                <SidebarMenuButton>
                  <ChartNoAxesCombined />
                  <span>Stats</span>
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
            {/* <SidebarMenuItem
              className={clsx("", {
                "bg-emerald-600/30 rounded-md": pathname === "/settings",
              })}
            >
              <SidebarMenuButton>
                <Settings />
                <a href="/settings">Settings</a>
              </SidebarMenuButton>
            </SidebarMenuItem> */}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-1">
              <SidebarMenuButton
                onClick={async () => {
                  signOut({ callbackUrl: process.env.NEXT_PUBLIC_FRONT });
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

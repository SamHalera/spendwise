import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?prevUrl=dashboard");
  }
  const wallets = [
    {
      id: 1,
      name: "LaBanquePostale",
      url: `/dashboard/wallets/`,
    },
    {
      id: 2,
      name: "SocieteGenerale",
      url: `/dashboard/wallets/`,
    },
  ];
  return (
    <SidebarProvider>
      <div className="p-4">
        <AppSidebar wallets={wallets} />
      </div>
      <div className="w-full">
        <div className="flex gap-3 items-start">
          <SidebarTrigger className="my-4" />
          <h1 className="text-blue-700 text-2xl font-semibold my-4">
            SpendWise
          </h1>
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}

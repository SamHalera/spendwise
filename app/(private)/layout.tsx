import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getWallets } from "@/actions/wallet";
import { HeaderLogged } from "@/components/dashboard/HeaderLogged";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin?prevUrl=dashboard");
  }

  // const wallets = await getWallets();
  return (
    <SidebarProvider>
      <div className="">
        <AppSidebar />

      </div>
      <div className="w-full bg-neutral-light/60 ">
        <div className="flex gap-3 items-start">

          <HeaderLogged userName={session.user?.name} />
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}

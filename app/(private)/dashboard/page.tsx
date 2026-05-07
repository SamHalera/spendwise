import DashboardContent from "@/components/dashboard/DashboardContent";
import { LayoutDashboardIcon } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="py-10">
      <div className="flex items-center justify-center gap-6 mb-10 text-primary">
        <LayoutDashboardIcon />
        <h2 className="text-center text-2xl">TABLEAU DE BORD</h2>
      </div>

      <DashboardContent />
    </div>
  );
};

export default page;

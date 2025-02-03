import DashboardContent from "@/components/dashboard/DashboardContent";
import React from "react";

const page = () => {
  return (
    <div className="flex-1">
      <h2 className="text-center text-2xl mb-10">DASHBOARD</h2>

      <DashboardContent />
    </div>
  );
};

export default page;

import { getWallets } from "@/actions/wallet";
import StatsContent from "@/components/dashboard/stats/StatsContent";
import { ChartNoAxesCombined } from "lucide-react";
import React from "react";

const page = async () => {
  return (
    <div className="py-10">
      <div className="flex items-center justify-center gap-6 mb-10 text-primary">
        <ChartNoAxesCombined />
        <h1 className="text-2xl text-center">
          STATISTIQUES
        </h1>
      </div>
      <h2 className="text-center text-muted-foreground italic font-semibold">
        (Les montants sont exprimés en {process.env.NEXT_PUBLIC_CURRENCY})
      </h2>
      <StatsContent />
    </div>
  );
};

export default page;

import WalletContentComponent from "@/components/dashboard/wallets/WalletContentComponent";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  console.log(params);
  const wallet = {
    name: "LaBanquePostale",
    url: "/dashboard/",
  };

  return (
    <div className="w-full">
      <WalletContentComponent wallet={wallet} />
    </div>
  );
};

export default page;

import { getWalletById } from "@/actions/wallet";
import WalletContentComponent from "@/components/dashboard/wallets/WalletContentComponent";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  console.log(params);
  const { id } = params;
  const wallet = await getWalletById(parseFloat(id));

  if (!wallet) return notFound();

  return (
    <div className="w-full">
      <WalletContentComponent wallet={wallet} />
    </div>
  );
};

export default page;

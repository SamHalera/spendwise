import { getWalletById } from "@/actions/wallet";
import WalletContentComponent from "@/components/dashboard/wallets/WalletContentComponent";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const wallet = await getWalletById(parseFloat(id));

  if (!wallet) return notFound();

  return (
    <div className="w-full">
      <h1 className="text-3xl text-blue-500 font-bold text-center my-6">
        Wallet
      </h1>
      <WalletContentComponent walletId={parseFloat(id)} />
    </div>
  );
};

export default page;

"use client";
import React, { useEffect, useState } from "react";

import CardItemWalletList from "./CardItemWalletList";

import dynamic from "next/dynamic";
import { getWallets } from "@/actions/wallet";

import { SkeletonCard } from "../skeletons/SkeletonCard";
import { useRefreshStore } from "@/stores/refresh";
import { WalletProps } from "@/types/types";

const CreateOrEditWalletModal = dynamic(
  () => import("@/components/dashboard/wallets/CreateOrEditWalletModal")
);

const DashboardContent = () => {
  const [dataWallets, setDataWallets] = useState<WalletProps[]>();

  const { refresh } = useRefreshStore();
  console.log("refresh=>", refresh);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const wallets = await getWallets();
        console.log(wallets);
        if (wallets) {
          setDataWallets(wallets);
        } else {
          setDataWallets([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [refresh]);
  return (
    <div className="flex flex-col items-center px-3 w-full">
      <h2 className="text-2xl text-blue-500 mb-4">My Wallets</h2>
      <div className="flex flex-col items-center">
        <span className="mb-2">add a wallet</span>
        <CreateOrEditWalletModal />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-6 my-10 w-full">
        {dataWallets ? (
          dataWallets.map((wallet) => {
            return <CardItemWalletList key={wallet.id} wallet={wallet} />;
          })
        ) : (
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;

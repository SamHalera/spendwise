"use client";
import React, { useEffect, useState } from "react";
import ChartExpenseIncome from "./ChartExpenseIncome";

import ChartTransacionsByMethod from "./ChartTransacionsByMethod";
import FilterData from "./FilterByWallet";
import ChartExpenseIncomeByMonth from "./ChartExpenseIncomeByMonth";
import { WalletProps } from "@/types/types";
import { getWallets } from "@/actions/wallet";
import Loader from "@/components/Loader";

const StatsContent = () => {
  const [wallets, setWallets] = useState<WalletProps[]>();
  const [walletData, setWalletData] = useState<
    WalletProps | null | undefined
  >();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletsFromDB = await getWallets();

        if (walletsFromDB) setWallets(walletsFromDB);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return !wallets ? (
    <Loader />
  ) : (
    <div className="m-10">
      {wallets ? (
        <>
          <div className="w-full max-w-xs mb-2">
            <FilterData wallets={wallets} setWalletData={setWalletData} />
          </div>
          <h1 className="text-xl text-primary font-semibold text-center mb-8">
            {walletData?.name}
          </h1>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartExpenseIncome walletData={walletData} />
              <ChartExpenseIncomeByMonth walletData={walletData} />
            </div>
            <ChartTransacionsByMethod walletData={walletData} />
          </div>
        </>
      ) : (
        <div>Aucune donnée disponible</div>
      )}
    </div>
  );
};

export default StatsContent;

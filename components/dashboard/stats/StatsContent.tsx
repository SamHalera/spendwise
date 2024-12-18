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
    <div>
      {wallets ? (
        <>
          <div className="flex">
            <FilterData wallets={wallets} setWalletData={setWalletData} />
          </div>
          <h1 className="text-xl text-blue-700 font-semibold text-center mb-4">
            {walletData?.name}
          </h1>

          <div className="flex flex-col items-center flex-nowrap gap-8">
            <div className="flex gap-8">
              <ChartExpenseIncome walletData={walletData} />
              <ChartExpenseIncomeByMonth walletData={walletData} />
            </div>
            <ChartTransacionsByMethod walletData={walletData} />
          </div>
        </>
      ) : (
        <div>No values yes</div>
      )}
    </div>
  );
};

export default StatsContent;

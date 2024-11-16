"use client";
import clsx from "clsx";
import { BadgeEuro, HandCoins } from "lucide-react";
import React, { useState } from "react";
import TableDataFromWallet from "./TableDataFromWallet";

const WalletContentComponent = ({
  wallet,
}: {
  wallet: {
    name: string;
    url: string;
  };
}) => {
  const [showExpenses, setShowExpenses] = useState<boolean>(true);
  const [datalabel, setDataLabel] = useState<string>("expenses");
  return (
    <div className="w-full flex flex-col justify-center">
      <h1 className="text-blue-700 font-semibold text-3xl mb-10">
        {wallet.name}
      </h1>

      <div className="flex items-center gap-6 mb-10 mx-auto text-center">
        <div
          onClick={() => {
            setShowExpenses(true);
            setDataLabel("expenses");
          }}
          className={clsx(
            "flex items-center gap-4 text-xl hover:text-blue-700 duration-500 font-semibold cursor-pointer",
            {
              "text-blue-700": showExpenses,
            }
          )}
        >
          <BadgeEuro /> Expenses
        </div>
        <div
          onClick={() => {
            setShowExpenses(false);
            setDataLabel("incomes");
          }}
          className={clsx(
            "flex items-center gap-4 text-xl hover:text-blue-700 duration-500 font-semibold cursor-pointer",
            {
              "text-blue-700": !showExpenses,
            }
          )}
        >
          <HandCoins /> Incomes
        </div>
      </div>

      <div className="p-10">
        <TableDataFromWallet label={datalabel} />
      </div>
    </div>
  );
};

export default WalletContentComponent;

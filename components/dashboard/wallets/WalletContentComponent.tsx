"use client";
import clsx from "clsx";
import { BadgeEuro, HandCoins } from "lucide-react";
import React, { useState } from "react";
import TableDataFromWallet from "./TableDataFromWallet";
import CardSingleWallet from "./CardSingleWallet";
import { Button } from "@/components/ui/button";

const WalletContentComponent = ({ wallet }: { wallet: WalletProps }) => {
  const [showExpenses, setShowExpenses] = useState<boolean>(true);
  const [datalabel, setDataLabel] = useState<string>("expense");
  const [dataForTable, setDataForTable] = useState<
    ExpenseProps[] | IncomeProps[]
  >(wallet.expense);

  return (
    <div className="w-full flex flex-col justify-center">
      <CardSingleWallet wallet={wallet} />

      <div className="flex items-center gap-6 mb-4 mx-auto text-center">
        <div
          onClick={() => {
            setShowExpenses(true);
            setDataLabel("expense");
            setDataForTable(wallet.expense);
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
            setDataLabel("income");
            setDataForTable(wallet.income);
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
        <Button
          className={clsx("mb-4", {
            "bg-red-200 text-red-500 hover:bg-red-500 hover:text-red-200":
              datalabel === "expense",
            "bg-blue-200 text-blue-500 hover:bg-blue-500 hover:text-blue-200":
              datalabel === "income",
          })}
        >
          New {datalabel}
        </Button>
        <TableDataFromWallet label={datalabel} dataForTable={dataForTable} />
      </div>
    </div>
  );
};

export default WalletContentComponent;

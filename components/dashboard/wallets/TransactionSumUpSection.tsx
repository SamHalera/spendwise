import clsx from "clsx";
import { ArrowDown, ArrowUp, BadgeEuro, HandCoins } from "lucide-react";
import React from "react";

const TransactionSumUpSection = ({
  pastBalance,
  upcomingBalance,
  label,
}: {
  pastBalance: number;
  upcomingBalance: number;
  label: string;
}) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className={clsx(
          "relative w-10 h-10 mb-2 flex items-center justify-center rounded-full p-2",
          {
            "bg-blue-200": label === "Incomes",
            "bg-red-200": label === "Expenses",
          }
        )}
      >
        {label === "Incomes" ? (
          <>
            <ArrowUp className="absolute text-blue-200 -top-4" />
            <HandCoins className=" text-blue-700" size={30} />
          </>
        ) : (
          <>
            <ArrowDown className="absolute text-red-200 -bottom-4" />
            <BadgeEuro className=" text-red-700" size={30} />
          </>
        )}
      </div>
      <span className="text-blue-500">{label}</span>
      <div className="font-semibold text-slate-700 flex flex-col">
        <div className="flex justify-between">
          <span className="italic text-sm">Past:</span>
          <span className="text-blue-500">{pastBalance.toFixed(2)}€</span>
        </div>
        <div className="flex gap-2 justify-between">
          <span className="italic text-sm">Upcoming:</span>{" "}
          <span className="text-blue-500">{upcomingBalance.toFixed(2)}€</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionSumUpSection;

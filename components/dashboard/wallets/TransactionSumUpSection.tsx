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
            "bg-emerald-200": label === "Incomes",
            "bg-tertiary/20": label === "Expenses",
          }
        )}
      >
        {label === "Incomes" ? (
          <>
            <ArrowUp className="absolute text-emerald-200 -top-4" />
            <HandCoins className=" text-emerald-700" size={30} />
          </>
        ) : (
          <>
            <ArrowDown className="absolute text-tertiary/60 -bottom-4" />
            <BadgeEuro className=" text-tertiary-dark" size={30} />
          </>
        )}
      </div>
      <span className="text-white">{label}</span>
      <div className="font-semibold text-slate-700 flex flex-col">
        <div className="flex justify-between">
          <span className="italic text-sm text-slate-300">Past:</span>
          <span className={clsx({ "text-emerald-200": label === "Incomes", "text-tertiary/60": label === "Expenses" })}>{pastBalance.toFixed(2)}€</span>
        </div>
        <div className="flex gap-2 justify-between">
          <span className="italic text-sm text-slate-300">Upcoming:</span>{" "}
          <span className={clsx({ "text-emerald-200": label === "Incomes", "text-tertiary/60": label === "Expenses" })}>{upcomingBalance.toFixed(2)}€</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionSumUpSection;

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
            "bg-indigo-700": label === "Revenus",
            "bg-tertiary": label === "Dépenses",
          }
        )}
      >
        {label === "Revenus" ? (
          <>
            <ArrowUp className="absolute text-indigo-700 -top-4" />
            <HandCoins className=" text-white" size={30} />
          </>
        ) : (
          <>
            <ArrowDown className="absolute text-tertiary -bottom-4" />
            <BadgeEuro className=" text-white" size={30} />
          </>
        )}
      </div>
      <span className={clsx({
        "text-indigo-700": label === "Revenus",
        "text-tertiary": label === "Dépenses",
      })}>{label}</span>
      <div className="font-semibold text-slate-700 flex flex-col">
        <div className="flex justify-between">
          <span className="italic text-sm text-slate-300">Passé :</span>
          <span className={clsx({ "text-indigo-200": label === "Revenus", "text-tertiary/60": label === "Dépenses" })}>{pastBalance.toFixed(2)}€</span>
        </div>
        <div className="flex gap-2 justify-between">
          <span className="italic text-sm text-slate-300">À venir :</span>{" "}
          <span className={clsx({ "text-indigo-200": label === "Revenus", "text-tertiary/60": label === "Dépenses" })}>{upcomingBalance.toFixed(2)}€</span>
        </div>
      </div>
    </div >
  );
};

export default TransactionSumUpSection;

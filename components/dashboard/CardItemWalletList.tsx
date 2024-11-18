import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp, BadgeEuro, Coins, HandCoins } from "lucide-react";
import Link from "next/link";

const CardItemWalletList = ({ wallet }: { wallet: WalletProps }) => {
  let expensesBalance = 0;
  let incomesBalance = 0;
  wallet.expense.forEach((item) => {
    expensesBalance += item.amount;
  });
  wallet.income.forEach((item) => {
    incomesBalance += item.amount;
  });

  const walletComputedBalance =
    wallet.balance + incomesBalance - expensesBalance;
  return (
    <div>
      <Link href={`/dashboard/wallets/${wallet.id}`} className="group">
        <Card className=" shadow-sm border border-slate-100 group-hover:bg-blue-50 duration-500">
          <CardHeader>
            <CardTitle className="text-center mb-4">
              <span className="">{wallet.name}</span>
            </CardTitle>
            <CardDescription>
              <div className="flex gap-3 items-center text-blue-700 font-semibold text-xl">
                <Coins size={30} /> Balance :{" "}
                <span>{walletComputedBalance.toFixed(2)}€</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-6 justify-around">
            <div className="flex flex-col gap-2 items-center">
              <div className="relative w-10 h-10 bg-blue-200 mb-2 flex items-center justify-center rounded-full p-2">
                <ArrowUp className="absolute text-blue-200 -top-4" />
                <HandCoins className=" text-blue-700" size={30} />
              </div>
              <span className="text-blue-500">Incomes</span>
              <span className="font-semibold text-slate-700">
                {incomesBalance.toFixed(2)}€
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <div className="relative w-10 h-10 bg-red-200 mb-2 flex items-center justify-center rounded-full p-2">
                <ArrowDown className="absolute text-red-200 -bottom-4" />
                <BadgeEuro className=" text-red-700" size={30} />
              </div>
              <span className="text-blue-500">Expenses</span>
              <span className="font-semibold text-slate-700">
                {expensesBalance.toFixed(2)}€
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default CardItemWalletList;

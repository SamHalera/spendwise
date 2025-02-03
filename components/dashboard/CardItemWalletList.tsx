import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins } from "lucide-react";
import Link from "next/link";
import { computeWalletBalances } from "@/lib/walletHelpelrs";
import TransactionSumUpSection from "./wallets/TransactionSumUpSection";
import { WalletProps } from "@/types/types";
import dayjs from "dayjs";

const CardItemWalletList = ({ wallet }: { wallet: WalletProps }) => {
  const balances = computeWalletBalances(wallet);
  const {
    walletBalance,
    incomesPastBalance,
    incomesUpcomingBalance,
    expensesPastBalance,
    expensesUpcomingBalance,
  } = balances;
  return (
    <div className="">
      <Link href={`/dashboard/wallets/${wallet.id}`} className="group">
        <Card className=" shadow-sm border border-slate-100 group-hover:bg-blue-500 duration-500 bg-gradient-to-b from-blue-950/90 via-blue-800/90 to-indigo-800/50">
          <CardHeader>
            <CardTitle className="text-center mb-4 text-white">
              <span className="">{wallet.name}</span>
            </CardTitle>
            <CardDescription>
              <div className="flex flex-col md:flex-row gap-3 justify-center items-center text-blue-200 font-semibold text-xl">
                <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
                  <Coins size={30} /> Balance :{" "}
                  <span>{walletBalance.toFixed(2)}€</span>
                </div>
                <span className="italic text-sm text-white">
                  (at the {dayjs(new Date()).format("DD/MM/YYYY")})
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6 justify-around">
            <TransactionSumUpSection
              label="Incomes"
              pastBalance={incomesPastBalance}
              upcomingBalance={incomesUpcomingBalance}
            />
            <TransactionSumUpSection
              label="Expenses"
              pastBalance={expensesPastBalance}
              upcomingBalance={expensesUpcomingBalance}
            />
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default CardItemWalletList;

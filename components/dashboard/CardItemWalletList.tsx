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
                <span>{walletBalance.toFixed(2)}€</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-6 justify-around">
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

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
        <Card className=" shadow-lg group-hover:-translate-y-2 duration-700 bg-white">
          <CardHeader>
            <CardTitle className="text-center mb-4 text-primary">
              <span className="">{wallet.name}</span>
            </CardTitle>
            <CardDescription>
              <div className="flex gap-3 items-center  justify-center text-primary font-semibold text-xl">
                {/* <Coins size={30} /> */}
                <span>{walletBalance.toFixed(2)}€</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-6 justify-around">
            <TransactionSumUpSection
              label="Revenus"
              pastBalance={incomesPastBalance}
              upcomingBalance={incomesUpcomingBalance}
            />
            <TransactionSumUpSection
              label="Dépenses"
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

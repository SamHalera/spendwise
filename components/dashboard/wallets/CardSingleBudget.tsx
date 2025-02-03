import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar1,
  CalendarClock,
  CalendarDays,
  Coins,
  Euro,
} from "lucide-react";
import { deleteWallet } from "@/actions/wallet";
import { toast } from "@/hooks/use-toast";
import AlertDeleteAction from "@/components/AlertDeleteAction";
import CreateOrEditWalletModal from "./CreateOrEditWalletModal";
import {
  calculateBudgets,
  computeWalletBalances,
  parseFiltersFromLocalStorage,
} from "@/lib/walletHelpelrs";
import { WalletProps } from "@/types/types";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import clsx from "clsx";

dayjs.extend(localeData);

const CardSingleBudget = ({ wallet }: { wallet: WalletProps }) => {
  const balances = computeWalletBalances(wallet);
  const { walletBalance } = balances;
  const { perDay, perWeek, perMonth } = calculateBudgets(wallet, new Date());
  const months: string[] = dayjs.months();
  const currentMonth = dayjs().month();

  const handleDeleteWallet = async (id: number) => {
    try {
      const response = await deleteWallet(id);
      if (response.success) {
        toast({
          variant: "default",
          description: response.success,
        });
      }
      if (response.error) {
        toast({
          variant: "destructive",
          description: response.error,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description:
          "Oups! something went wrong while deleting wallet! Try to submit the form again...",
      });
    }
  };

  return (
    // className="bg-gradient-to-b from-blue-950 via-blue-800 to-indigo-800 py-6 text-white"
    <Card className="lg:sticky lg:top-20 shadow-sm border border-slate-100 flex flex-col items-center  lg:w-72 mb-10 bg-gradient-to-b from-blue-950/90 via-blue-800/90 to-indigo-800/50">
      <div className="flex justify-around w-full pt-4">
        <CreateOrEditWalletModal wallet={wallet} />
        <AlertDeleteAction
          deleteToContinue={handleDeleteWallet}
          id={wallet.id}
          pathToRedirect="/dashboard"
        />
      </div>
      <CardHeader className="flex felx-col">
        <CardTitle className="text-center">
          <div className="flex items-center gap-2 text-blue-200 text-xl">
            <Euro size={30} /> Budgets ({months[currentMonth]}):
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6 justify-around">
        <CardDescription>
          <div className="flex flex-col gap-3 items-center font-semibold ">
            <div className="flex flex-row lg:flex-col gap-2">
              <div className="flex flex-col gap-2 items-center bg-slate-300 p-3 rounded-md">
                <div className="text-indigo-600 flex items-center gap-2">
                  <CalendarClock /> Per day
                </div>
                <span
                  className={clsx({
                    "text-blue-800": parseFloat(perDay) > 0,
                    "text-red-500": parseFloat(perDay) < 0,
                  })}
                >
                  {perDay}
                </span>
              </div>
              <div className="flex flex-col gap-2 items-center bg-slate-300 p-3 rounded-md">
                <div className="text-indigo-600 flex items-center gap-2">
                  <Calendar1 /> Per week
                </div>
                <span
                  className={clsx({
                    "text-blue-800": parseFloat(perWeek) > 0,
                    "text-red-500": parseFloat(perWeek) < 0,
                  })}
                >
                  {perWeek}
                </span>
              </div>
              <div className="flex flex-col gap-2 items-center bg-slate-300 p-3 rounded-md">
                <div className="text-indigo-600 flex items-center gap-2">
                  <CalendarDays /> Per month:
                </div>
                <span
                  className={clsx({
                    "text-blue-800": parseFloat(perMonth) > 0,
                    "text-red-500": parseFloat(perMonth) < 0,
                  })}
                >
                  {perMonth}
                </span>
              </div>
            </div>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardSingleBudget;

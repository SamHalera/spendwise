"use client";
import { getWallets } from "@/actions/wallet";
import Loader from "@/components/Loader";
import { calculateBudgets } from "@/lib/walletHelpelrs";
import { WalletProps } from "@/types/types";
import React, { useEffect, useState } from "react";
import FilterByWallet from "../stats/FilterByWallet";
import { Calendar1, CalendarClock, CalendarDays, Euro } from "lucide-react";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import clsx from "clsx";

dayjs.extend(localeData);

const BudgetContent = () => {
  const [wallets, setWallets] = useState<WalletProps[]>();
  const [walletData, setWalletData] = useState<
    WalletProps | null | undefined
  >();
  const [budgetsData, setBudgetsData] = useState<{
    perMonth: string;
    perWeek: string;
    perDay: string;
  }>();
  const months: string[] = dayjs.months();
  const currentMonth = dayjs().month();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletsFromDB = await getWallets();
        if (walletsFromDB) {
          setWallets(walletsFromDB);
        }
        if (walletData) {
          const bugdets = calculateBudgets(walletData, new Date());
          setBudgetsData(bugdets);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [walletData]);

  return !wallets ? (
    <Loader />
  ) : (
    <>
      <div className="flex justify-center mb-10 text-3xl items-center text-center gap-2 text-blue-700">
        <Euro size={30} /> Budgets ({months[currentMonth]}):
      </div>
      <div className="flex ">
        <FilterByWallet
          wallets={wallets}
          setWalletData={setWalletData}
          label="Choose your wallet"
        />
      </div>

      {walletData && (
        <div>
          <h2 className="text-center text-3xl text-indigo-600 mb-4">
            Wallet : {walletData?.name}
          </h2>
          <div className="mb-6">
            <p className="text-2xl text-center">
              These budgets are regularly updated as and when you record
              transactions (deposits and receipts).
            </p>
          </div>
          <div className="flex justify-center gap-5">
            <div className="flex flex-col gap-2 items-center bg-slate-300 p-3 rounded-md flex-1">
              <div className="text-indigo-600 flex items-center gap-2">
                <h3 className="flex items-center gap-2 text-2xl">
                  <CalendarClock /> Per day
                </h3>
              </div>
              <span
                className={clsx("text-3xl font-semibold", {
                  "text-blue-700":
                    budgetsData?.perDay && parseFloat(budgetsData.perDay) > 0,
                  "text-red-500":
                    budgetsData?.perDay && parseFloat(budgetsData.perDay) < 0,
                })}
              >
                {budgetsData?.perDay}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center bg-slate-300 p-3 rounded-md flex-1">
              <div className="text-indigo-600 flex items-center gap-2">
                <h3 className="flex items-center gap-2 text-2xl">
                  <Calendar1 /> Per week
                </h3>
              </div>
              <span
                className={clsx("text-3xl font-semibold", {
                  "text-blue-700":
                    budgetsData?.perWeek && parseFloat(budgetsData.perWeek) > 0,
                  "text-red-500":
                    budgetsData?.perWeek && parseFloat(budgetsData.perWeek) < 0,
                })}
              >
                {budgetsData?.perWeek}
              </span>
            </div>
            <div className="flex flex-col gap-2 items-center bg-slate-300 p-3 rounded-md flex-1">
              <div className="text-indigo-600 flex items-center gap-2">
                <h3 className="flex items-center gap-2 text-2xl">
                  <CalendarDays /> Per month:
                </h3>
              </div>
              <span
                className={clsx("text-3xl font-semibold", {
                  "text-blue-700":
                    budgetsData?.perMonth &&
                    parseFloat(budgetsData.perMonth) > 0,
                  "text-red-500":
                    budgetsData?.perMonth &&
                    parseFloat(budgetsData.perMonth) < 0,
                })}
              >
                {budgetsData?.perMonth}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BudgetContent;

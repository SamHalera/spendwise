"use client";
import React, { useEffect, useRef } from "react";
import {
  Calendar1,
  CalendarClock,
  CalendarDays,
  Coins,
  Euro,
  Minus,
  Plus,
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { WalletProps } from "@/types/types";
import CardSingleWallet from "./CardSingleWallet";
import CardSingleBudget from "./CardSingleBudget";
import { calculateBudgets, computeWalletBalances } from "@/lib/walletHelpelrs";
import dayjs from "dayjs";
import localeData from "dayjs/plugin/localeData";
import clsx from "clsx";

dayjs.extend(localeData);
const DrawerForMobile = ({
  openDrawer,
  setOpenDrawer,
  wallet,
}: {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  wallet: WalletProps;
}) => {
  const balances = computeWalletBalances(wallet);
  const { walletBalance } = balances;
  const { perDay, perWeek, perMonth } = calculateBudgets(wallet, new Date());
  const months: string[] = dayjs.months();
  const currentMonth = dayjs().month();

  return (
    <div className="mx-auto">
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="text-2xl"
            onClick={() => {
              console.log("open drower");
              setOpenDrawer(!openDrawer);
            }}
            variant="custom"
          >
            Balance and Budgets
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="w-full test">
            <DrawerHeader>
              <DrawerTitle className="text-center">
                Balance and Budgets
              </DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="mt-3 h-[400px] md:h-[200px] lg:h-[160px]">
                <ResponsiveContainer width="100%" height="100%">
                  <div className="flex flex-col md:flex-row justify-around w-full gap-6">
                    <div className="  bg-gray-100 flex-1 py-4">
                      <div className="flex items-center justify-center gap-2 text-blue-600 text-xl mb-3">
                        <Coins size={30} /> Balance:
                      </div>
                      <div
                        className={clsx(
                          "text-2xl font-semibold flex flex-col gap-2 items-center",
                          {
                            "text-indigo-600 ": walletBalance > 0,
                            "text-red-500 ": walletBalance < 0,
                          }
                        )}
                      >
                        {walletBalance.toFixed(2)}€
                        <span className="italic text-sm">
                          at the {dayjs(new Date()).format("DD/MM/YYYY")}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-100 flex-1 py-4">
                      <div className="flex items-center justify-center gap-2 mb-3 text-blue-600 text-xl">
                        <Euro size={30} /> Budgets ({months[currentMonth]}):
                      </div>
                      <div className="flex flex-row flex-wrap justify-center gap-2">
                        <div className="flex flex-col gap-2 items-center p-3 rounded-md">
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
                        <div className="flex flex-col gap-2 items-center p-3 rounded-md">
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
                        <div className="flex flex-col gap-2 items-center p-3 rounded-md">
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
                  </div>
                </ResponsiveContainer>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button
                  className="self-center"
                  onClick={() => setOpenDrawer(!openDrawer)}
                  variant="outline"
                >
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerForMobile;

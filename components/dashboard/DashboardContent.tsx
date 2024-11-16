import React from "react";

import CardWallet from "./CardWallet";
import { Plus } from "lucide-react";

const DashboardContent = () => {
  const wallets = [
    {
      id: 1,
      name: "La Banque Postale",
      balance: 2300,
      expense: [
        {
          label: "Vêtements",
          date: new Date("11/11/2014"),
          amount: 300,
          expenseStatus: "MADE",
          walletId: 1,
        },
        {
          label: "Courses Marché",
          date: new Date("13/11/2014"),
          amount: 100,
          expenseStatus: "MADE",
          walletId: 1,
        },
      ],
      income: [
        {
          label: "Job",
          date: new Date("01/11/2014"),
          amount: 2300,
          expenseStatus: "MADE",
          walletId: 1,
        },
      ],
    },
    {
      id: 2,
      name: "Société Générale",

      balance: 1000,
      expense: [
        {
          label: "Livres",
          date: new Date("14/11/2014"),
          amount: 80,
          expenseStatus: "MADE",
          walletId: 2,
        },
        {
          label: "Courses Marché",
          date: new Date("15/11/2014"),
          amount: 100,
          expenseStatus: "MADE",
          walletId: 2,
        },
      ],
      income: [
        {
          label: "Job",
          date: new Date("01/11/2014"),
          amount: 1000,
          expenseStatus: "MADE",
          walletId: 1,
        },
      ],
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-3  mb-10">
        <span className="text-xs font-semibold "> add a wallet</span>
        <div className="bg-blue-300  rounded-full flex justify-center items-center w-12 h-12 cursor-pointer hover:bg-blue-400 duration-500 ">
          <Plus
            className="text-blue-800 hover:rotate-180 duration-300"
            size={40}
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-6">
        {wallets.map((wallet) => {
          return <CardWallet key={wallet.id} wallet={wallet} />;
        })}
      </div>
    </div>
  );
};

export default DashboardContent;

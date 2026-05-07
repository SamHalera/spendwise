import React, { useState } from "react";
import { Calendar, Calendar1Icon, CalendarDays, Coins, Dot, EllipsisVertical, LucideCalendar1 } from "lucide-react";
import { deleteWallet } from "@/actions/wallet";
import { toast } from "@/hooks/use-toast";
import AlertDeleteAction from "@/components/AlertDeleteAction";
import CreateOrEditWalletModal from "./CreateOrEditWalletModal";
import { computeWalletBalances } from "@/lib/walletHelpelrs";
import { WalletProps } from "@/types/types";

const CardSingleWallet = ({ wallet }: { wallet: WalletProps }) => {
  const [showBtns, setShowBtns] = useState(false)
  const balances = computeWalletBalances(wallet);
  const { walletBalance, incomesPastBalance, incomesUpcomingBalance, expensesPastBalance, expensesUpcomingBalance, } = balances;

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
    <div className="lg:w-1/3 relative shadow-md flex flex-col gap-6  justify-between px-10 py-8 my-9 bg-white rounded-xl mb-4">
      <EllipsisVertical onClick={() => setShowBtns(!showBtns)} className="absolute top-4 right-2 cursor-pointer hover:bg-slate-100 duration-700 rounded-md py-2 w-7 h-7" size={20} />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-2 font-semibold ">
          <h2 className="text-primary font-bold ">{wallet.name}</h2>
          <span className="  text-primary">{walletBalance.toFixed(2)}€</span>
        </div>
        <div className="h-[1px] w-full bg-primary mb-2"></div>
        <div className="text-primary text-lg font-bold flex gap-3 w-full justify-between">
          <span>Aperçu Mensuel</span>
          <CalendarDays />
        </div>
        <div className="text-primary text-xs  flex gap-3 w-full justify-between">
          <span>Total des Revenues passés</span>
          <span className="text-secondary font-bold">{incomesPastBalance.toFixed(2)}</span>
        </div>
        <div className="text-primary  text-xs flex gap-3 w-full justify-between">
          <span>Total des Dépenses passées</span>
          <span className="text-tertiary font-bold">{expensesPastBalance.toFixed(2)}</span>
        </div>
        <div className="text-primary text-xs  flex gap-3 w-full justify-between">
          <span>Total des Revenues à venir</span>
          <span className="text-secondary/60 font-semibold">{incomesUpcomingBalance.toFixed(2)}</span>
        </div>
        <div className="text-primary text-xs  flex gap-3 w-full justify-between">
          <span>Total des Dépenses à venir</span>
          <span className="text-tertiary/60 font-semibold">{expensesUpcomingBalance.toFixed(2)}</span>
        </div>
      </div>

      {showBtns &&
        <div className="flex items-center justify-between gap-2 absolute -top-4 -right-32 shadow-sm bg-white p-4 rounded-sm">
          <CreateOrEditWalletModal wallet={wallet} showBtns={showBtns} setShowBtns={setShowBtns} />
          <AlertDeleteAction
            deleteToContinue={handleDeleteWallet}
            id={wallet.id}
            pathToRedirect="/dashboard"
          />
        </div>
      }

    </div>
  );
};

export default CardSingleWallet;

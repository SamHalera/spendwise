import React from "react";
import { Coins } from "lucide-react";
import { deleteWallet } from "@/actions/wallet";
import { toast } from "@/hooks/use-toast";
import AlertDeleteAction from "@/components/AlertDeleteAction";
import CreateOrEditWalletModal from "./CreateOrEditWalletModal";
import { computeWalletBalances } from "@/lib/walletHelpelrs";
import { WalletProps } from "@/types/types";

const CardSingleWallet = ({ wallet }: { wallet: WalletProps }) => {
  const balances = computeWalletBalances(wallet);
  const { walletBalance } = balances;

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
    <div className="w-full flex items-center justify-between px-6 py-4 bg-slate-900 rounded-xl mb-4">
      <span className="text-white font-bold text-xl">{wallet.name}</span>
      <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
        <Coins size={20} />
        <span>{walletBalance.toFixed(2)}€</span>
      </div>
      <div className="flex items-center gap-2">
        <CreateOrEditWalletModal wallet={wallet} />
        <AlertDeleteAction
          deleteToContinue={handleDeleteWallet}
          id={wallet.id}
          pathToRedirect="/dashboard"
        />
      </div>
    </div>
  );
};

export default CardSingleWallet;

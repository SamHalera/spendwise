import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins } from "lucide-react";
import { deleteWallet } from "@/actions/wallet";
import { toast } from "@/hooks/use-toast";
import AlertDeleteAction from "@/components/AlertDeleteAction";
import CreateOrEditWalletModal from "./CreateOrEditWalletModal";

const CardSingleWallet = ({ wallet }: { wallet: WalletProps }) => {
  const [refresh, setRefresh] = useState<boolean>(false);
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

  const handleDeleteWallet = async (id: number) => {
    try {
      const response = await deleteWallet(id);
      if (response.succes) {
        toast({
          variant: "default",
          description: response.succes,
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
    <Card className=" shadow-sm border border-slate-100 flex flex-col items-center w-72 mb-10">
      <div className="flex justify-around w-full pt-4">
        <CreateOrEditWalletModal setRefresh={setRefresh} wallet={wallet} />
        <AlertDeleteAction
          deleteToContinue={handleDeleteWallet}
          id={wallet.id}
        />
      </div>
      <CardHeader className="flex felx-col">
        <CardTitle className="text-center">
          <span className="text-blue-700 font-semibold text-xl mb-10">
            {wallet.name}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6 justify-around">
        <CardDescription>
          <div className="flex flex-col gap-3 items-center text-blue-700 font-semibold text-xl">
            <div className="flex items-center gap-2">
              <Coins size={30} /> Balance
            </div>
            <span className="border px-6 py-2 bg-blue-300 rounded-full">
              {walletComputedBalance.toFixed(2)}€
            </span>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardSingleWallet;

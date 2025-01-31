"use client";
import React, { useEffect, useState } from "react";
import TableDataFromWallet from "./TableDataFromWallet";
import CardSingleWallet from "./CardSingleWallet";

import CreateOrEditModal from "../transaction/CreateOrEditModal";
import { getWalletById } from "@/actions/wallet";
import MenuTabTransactions from "./MenuTabTransactions";

import { SkeletonWalletContent } from "@/components/skeletons/SkeletonWalletContent";

import { useRefreshStore } from "@/stores/refresh";
import { TransactionProps, WalletProps } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteAllTransactions } from "@/actions/transaction";
import { TransactionType } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import AlertDeleteAction from "@/components/AlertDeleteAction";
import CardSingleBudget from "./CardSingleBudget";

const WalletContentComponent = ({ walletId }: { walletId: number }) => {
  const [dataWallet, setDataWallet] = useState<WalletProps>();
  const [showExpenses, setShowExpenses] = useState<boolean>(true);
  const [dataLabel, setDataLabel] = useState<string>("expense");
  const [dataForTable, setDataForTable] = useState<TransactionProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { refresh, setRefresh } = useRefreshStore();
  const { toast } = useToast();
  const handleDeleteAllTransacions = async (
    walletId: number,
    type?: TransactionType
  ) => {
    const typeForTransactions = dataLabel === "expense" ? "EXPENSE" : "INCOME";
    try {
      const response = await deleteAllTransactions(
        walletId,
        typeForTransactions
      );
      if (response.success) {
        setRefresh(true);
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
          "Oups! something went wrong while deleting transaction! Try to submit the form again...",
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const wallet = await getWalletById(walletId);

        if (wallet) {
          setDataWallet(wallet);
          setDataForTable(
            wallet.transaction.filter(
              (data: TransactionProps) => data.type === dataLabel.toUpperCase()
            )
          );
        }
        setRefresh(false);

        setDataLabel(dataLabel);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <div className="w-full flex flex-col  lg:flex-row justify-around">
      {isLoading ? (
        <SkeletonWalletContent />
      ) : (
        <>
          {dataWallet && (
            <div className="flex flex-col">
              <div className="mt-8 pr-4 lg:border-r lg:border-blue-200 mx-auto">
                <CardSingleWallet wallet={dataWallet} />
              </div>
              <div className=" pr-4 lg:border-r lg:border-blue-200 mx-auto">
                <CardSingleBudget wallet={dataWallet} />
              </div>
            </div>
          )}

          <div className="flex flex-col flex-1 relative">
            <MenuTabTransactions
              dataWallet={dataWallet}
              showExpenses={showExpenses}
              setShowExpenses={setShowExpenses}
              setDataForTable={setDataForTable}
              setDataLabel={setDataLabel}
            />
            <div className="p-6">
              <div className="flex justify-between">
                <CreateOrEditModal dataLabel={dataLabel} walletId={walletId} />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-600">
                    delete all {dataLabel}s
                  </span>
                  <AlertDeleteAction
                    id={walletId}
                    deleteToContinue={handleDeleteAllTransacions}
                    pathToRedirect={`/dashboard/wallets/${walletId}`}
                  />
                </div>
              </div>
              <TableDataFromWallet
                label={dataLabel}
                dataForTable={dataForTable}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WalletContentComponent;

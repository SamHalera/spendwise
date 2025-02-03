"use client";
import React, { useEffect, useRef, useState } from "react";
import TableDataFromWallet from "./TableDataFromWallet";
import CardSingleWallet from "./CardSingleWallet";

import CreateOrEditModal from "../transaction/CreateOrEditModal";
import { getWalletById } from "@/actions/wallet";
import MenuTabTransactions from "./MenuTabTransactions";

import { SkeletonWalletContent } from "@/components/skeletons/SkeletonWalletContent";

import { useRefreshStore } from "@/stores/refresh";
import { TransactionProps, WalletProps } from "@/types/types";
import { deleteAllTransactions } from "@/actions/transaction";
import { TransactionType } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import AlertDeleteAction from "@/components/AlertDeleteAction";
import CardSingleBudget from "./CardSingleBudget";
import DrawerForMobile from "./DrawerForMobile";
import ModalFixedTransactions from "@/components/ModalFixedTransactions";

const WalletContentComponent = ({ walletId }: { walletId: number }) => {
  const [dataWallet, setDataWallet] = useState<WalletProps>();
  const [showExpenses, setShowExpenses] = useState<boolean>(true);
  const [dataLabel, setDataLabel] = useState<string>("expense");
  const [dataForTable, setDataForTable] = useState<TransactionProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { refresh, setRefresh } = useRefreshStore();
  const { toast } = useToast();
  const transitionsLength: (type: string) => TransactionProps[] = (
    type: string
  ) => {
    const transitions =
      dataWallet?.transaction.filter(
        (item) => item.type === type.toUpperCase()
      ) ?? [];
    return transitions;
  };

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
        const result = await getWalletById(walletId);

        if (result?.wallet) {
          setDataWallet(result.wallet);
          setDataForTable(
            result.wallet.transaction.filter(
              (data: TransactionProps) => data.type === dataLabel.toUpperCase()
            )
          );
        }
        if (result?.hasFixedTransactions) {
          setOpenModal(true);
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
    <div className="w-full flex flex-col lg:flex-row justify-around py-4 relative">
      {isLoading ? (
        <SkeletonWalletContent />
      ) : (
        <>
          {dataWallet && (
            <>
              <ModalFixedTransactions
                wallet={dataWallet}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
              <div className="z-50 fixed bottom-28 ">
                <DrawerForMobile
                  openDrawer={openDrawer}
                  setOpenDrawer={setOpenDrawer}
                  wallet={dataWallet}
                />
              </div>
              {/* <div className="hidden lg:flex  flex-wrap flex-col">
                <div className="lg:mt-8 lg:pr-4 lg:border-r lg:border-blue-200 mx-auto ">
                  <CardSingleWallet wallet={dataWallet} />
                </div>
                <div className=" lg:pr-4 lg:border-r lg:border-blue-200 mx-auto ">
                  <CardSingleBudget wallet={dataWallet} />
                </div>
              </div> */}
            </>
          )}

          <div className="flex flex-col flex-1 relative">
            <MenuTabTransactions
              dataWallet={dataWallet}
              showExpenses={showExpenses}
              setShowExpenses={setShowExpenses}
              setDataForTable={setDataForTable}
              setDataLabel={setDataLabel}
            />
            <div className="p-4">
              <div className="flex justify-around">
                <CreateOrEditModal dataLabel={dataLabel} walletId={walletId} />

                {transitionsLength(dataLabel).length > 0 && (
                  <div className="flex flex-col md:flex-row items-center gap-2">
                    <span className="text-xs text-red-600">
                      delete all {dataLabel}s
                    </span>
                    <AlertDeleteAction
                      id={walletId}
                      deleteToContinue={handleDeleteAllTransacions}
                      pathToRedirect={`/dashboard/wallets/${walletId}`}
                    />
                  </div>
                )}
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

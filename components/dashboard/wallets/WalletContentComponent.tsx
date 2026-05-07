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

const WalletContentComponent = ({ walletId }: { walletId: number }) => {
  const [dataWallet, setDataWallet] = useState<WalletProps>();
  const [showExpenses, setShowExpenses] = useState<boolean>(true);
  const [dataLabel, setDataLabel] = useState<string>("expense");
  const [dataForTable, setDataForTable] = useState<TransactionProps[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { refreshCount } = useRefreshStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const wallet = await getWalletById(walletId);
        if (wallet) setDataWallet(wallet);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [refreshCount, walletId]);

  useEffect(() => {
    if (dataWallet) {
      setDataForTable(
        dataWallet.transaction.filter(
          (data: TransactionProps) => data.type === dataLabel.toUpperCase()
        )
      );
    }
  }, [dataLabel, dataWallet]);

  return (
    <div className="w-full flex flex-col">
      {isLoading ? (
        <SkeletonWalletContent />
      ) : (
        <>
          {dataWallet && (
            <div className=" px-4">
              <CardSingleWallet wallet={dataWallet} />
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
            <div className="px-6">
              {/* <CreateOrEditModal dataLabel={dataLabel} walletId={walletId} /> */}
              <TableDataFromWallet
                label={dataLabel}
                dataForTable={dataForTable}
                walletId={walletId}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WalletContentComponent;

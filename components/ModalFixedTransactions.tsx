"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";
import { TransactionType } from "@prisma/client";
import { WalletProps } from "@/types/types";
import { updateWalletWithFixedTransactions } from "@/actions/wallet";

const ModalFixedTransactions = ({
  wallet,
  openModal,
  setOpenModal,
}: {
  wallet: WalletProps;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  return (
    <AlertDialog open={openModal}>
      {/* <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border-red-400 bg-red-100 w-10 h-10 p-2 flex items-center justify-center rounded-full cursor-pointer hover:bg-red-400 duration-500 group"
        >
          {" "}
          <Trash2 className="text-red-400 group-hover:text-red-200 duration-500" />
        </Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Fixed Transactions</AlertDialogTitle>
          <AlertDialogDescription>
            <p className="mb-3">
              You have registered some fixed transctions (expenses or incomes)
              for the previous months.
            </p>
            <p className="font-semibold text-blue-500">
              Do you want to create fixed transactions for this month?
            </p>
          </AlertDialogDescription>
          <div></div>
        </AlertDialogHeader>
        <AlertDialogFooter className="">
          <AlertDialogCancel
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              console.log("click fixed modal");
              try {
                await updateWalletWithFixedTransactions(wallet);
                router.refresh();
                setOpenModal(false);
              } catch (error) {}
            }}
            className="bg-blue-500 rounded-sm px-4 text-sm hover:bg-blue-200 duration-500"
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalFixedTransactions;

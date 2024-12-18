import React, { SetStateAction, useState } from "react";
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

import { BadgeEuro, HandCoins, Pencil } from "lucide-react";
import clsx from "clsx";
import CreateOrEditForm from "./CreateOrEditForm";
import { TransactionProps } from "@/types/types";

const CreateOrEditModal = ({
  data,
  dataLabel,
  walletId,
}: {
  data?: TransactionProps;
  dataLabel: string;
  walletId: number;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {data ? (
          <div className=" cursor-pointer h-10 w-10 bg-blue-200 text-blue-700 hover:bg-blue-700 hover:text-blue-200 p-3 duration-500 flex justify-center items-center rounded-full">
            <Pencil />
          </div>
        ) : (
          <Button
            className={clsx("mb-4 border bg-transparent duration-500", {
              "border-red-200 text-red-500 hover:bg-red-400 hover:text-white":
                dataLabel === "expense",
              "border-blue-200 text-blue-500 hover:bg-blue-400 hover:text-white":
                dataLabel === "income",
            })}
          >
            {dataLabel === "expense" ? (
              <BadgeEuro className=" text-red-700" />
            ) : (
              <HandCoins className=" text-blue-700" />
            )}
            New {dataLabel}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[350px]">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            {dataLabel ? `Edit ${dataLabel}` : `New ${dataLabel}`}
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div>
            <CreateOrEditForm
              setOpen={setOpen}
              data={data}
              walletId={walletId}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateOrEditModal;

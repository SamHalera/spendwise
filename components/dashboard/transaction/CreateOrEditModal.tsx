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
          <div className=" cursor-pointer h-10 w-10 bg-emerald-200 text-emerald-700 hover:bg-emerald-700 hover:text-emerald-200 p-3 duration-500 flex justify-center items-center rounded-full">
            <Pencil />
          </div>
        ) : (
          <Button
            className={clsx("border bg-transparent duration-500", {
              "bg-tertiary text-white hover:bg-tertiary-dark":
                dataLabel === "expense",
              " bg-secondary text-white hover:bg-emerald-400 hover:text-white":
                dataLabel === "income",
            })}
          >
            {dataLabel === "expense" ? (
              <BadgeEuro className="text-white" />
            ) : (
              <HandCoins className=" text-white" />
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
          <AlertDialogCancel className=" border border-tertiary text-tertiary self-start hover:bg-tertiary hover:text-tertiary-foreground transition-all">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateOrEditModal;

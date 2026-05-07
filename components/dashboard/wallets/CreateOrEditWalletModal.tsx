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
import CreateWalletForm from "./CreateWalletForm";
import { Pencil, Plus } from "lucide-react";
import clsx from "clsx";
import { WalletProps } from "@/types/types";

const CreateOrEditWalletModal = ({ wallet, showBtns, setShowBtns }: { wallet?: WalletProps; showBtns?: boolean; setShowBtns?: React.Dispatch<SetStateAction<boolean>> }) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild >
        <Button
          variant="spendwise"
          size={"icon"}
          className={clsx(
            "bg-secondary text-white w-10 h-10 p-2 flex items-center justify-center rounded-full cursor-pointer hover:bg-primary duration-500 group",
            {}
          )}
        >
          {wallet ? <Pencil size={20} /> : <Plus size={20} />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            {wallet ? "Modifier le portefeuille" : "Nouveau portefeuille"}
          </AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
          <div>
            <CreateWalletForm setOpen={setOpen} wallet={wallet} />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" border border-tertiary text-tertiary self-start hover:bg-tertiary hover:text-tertiary-foreground transition-all">Annuler</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateOrEditWalletModal;

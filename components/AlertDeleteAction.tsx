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
import { useRefreshStore } from "@/stores/refresh";

const AlertDeleteAction = ({
  deleteToContinue,
  id,
  pathToRedirect,
}: {
  deleteToContinue: (id: number) => Promise<void>;
  id: number;
  pathToRedirect: string;
}) => {
  const router = useRouter();
  const { triggerRefresh } = useRefreshStore();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="border border-tertiary/10 bg-tertiary/10 w-10 h-10 p-2 flex items-center justify-center rounded-full cursor-pointer hover:bg-tertiary/70 duration-500 group"
        >
          {" "}
          <Trash2 className="text-tertiary/80 group-hover:text-tertiary-foreground duration-500" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous absolument sûr(e) ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Vos données seront définitivement
            supprimées de nos serveurs.
          </AlertDialogDescription>
          <div></div>
        </AlertDialogHeader>
        <AlertDialogFooter className="">
          <AlertDialogCancel className="bg-slate-400">Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await deleteToContinue(id);
              triggerRefresh()
              router.push(pathToRedirect);
            }}
            className="bg-tertiary/20 rounded-sm px-4 text-tertiary text-sm hover:text-tertiary-foreground hover:bg-tertiary duration-500"
          >
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDeleteAction;

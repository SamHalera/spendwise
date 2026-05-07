"use client";
import { createWallet, editWallet } from "@/actions/wallet";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRefreshStore } from "@/stores/refresh";
import { createWalletSchema } from "@/types/zodSchemas/walletSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import React, { SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { WalletProps } from "@/types/types";

const CreateWalletForm = ({
  setOpen,

  wallet,
}: {
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  wallet?: WalletProps;
}) => {
  const { triggerRefresh } = useRefreshStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createWalletSchema>>({
    resolver: zodResolver(createWalletSchema),
    defaultValues: {
      id: wallet ? wallet.id : 0,
      name: wallet ? wallet.name : "",
      balance: wallet ? wallet.balance.toString() : "0",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof createWalletSchema>> = async (
    values: z.infer<typeof createWalletSchema>
  ) => {
    try {
      let response: { error: string | null; success: string | null } | null =
      // | { succes: string; error?: undefined }
      {
        success: "success",
        error: null,
      };
      if (wallet) {
        response = await editWallet(values);
      } else {
        response = await createWallet(values);
      }
      if (response?.success) {
        toast({
          variant: "default",
          description: response.success,
        });
        triggerRefresh();
        setOpen(false);
      }
      if (response?.error) {
        toast({
          variant: "destructive",
          description: response.error,
        });
      }
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            name="id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  ID du portefeuille{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="hidden"
                    disabled={true}
                    className={clsx("bg-neutral-light", {
                      "border-tertiary": form.formState.errors.id,
                    })}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Nom du portefeuille{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Donnez un nom à votre portefeuille"
                    className={clsx({
                      "border-tertiary": form.formState.errors.name,
                    })}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="balance"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex gap-2">
                  Solde initial{" "}
                  <FormMessage className="italic text-xs font-semibold" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="string"
                    placeholder="Saisir un montant ou 0"
                    className={clsx({
                      "border-tertiary": form.formState.errors.balance,
                    })}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className="self-end bg-slate-900 border border-slate-900 text-white transition-all hover:bg-transparent hover:text-slate-900"
            variant={"default"}
            disabled={!form.formState.isDirty}
          >
            {wallet ? "Modifier" : "Créer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateWalletForm;

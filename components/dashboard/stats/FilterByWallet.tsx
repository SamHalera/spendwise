import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WalletProps } from "@/types/types";
import React, { SetStateAction } from "react";

const FilterByWallet = ({
  wallets,
  setWalletData,
  label,
}: {
  wallets: WalletProps[] | null;
  setWalletData: React.Dispatch<SetStateAction<WalletProps | null | undefined>>;
  label?: string;
}) => {
  return (
    <div className="mb-10 self-start">
      <label className="mb-5 block">{label}</label>
      <Select
        onValueChange={(value) => {
          const selectedWallet = wallets?.find(
            (elt) => elt.id === parseFloat(value)
          );
          if (selectedWallet) setWalletData(selectedWallet);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a wallet" id="wallet" />
        </SelectTrigger>

        <SelectContent className="rounded-md shadow-md">
          {wallets &&
            wallets.map((wallet) => {
              return (
                <SelectItem key={wallet.id} value={wallet.id.toString()}>
                  {wallet.name}
                </SelectItem>
              );
            })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterByWallet;

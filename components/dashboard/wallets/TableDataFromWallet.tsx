import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";

import CreateOrEditModal from "../transaction/CreateOrEditModal";
import AlertDeleteAction from "@/components/AlertDeleteAction";
import { useToast } from "@/hooks/use-toast";
import { deleteTransaction } from "@/actions/transaction";
import FiltersTransactions from "../../filters/FiltersTransactions";
import clsx from "clsx";
import SearchBarTransactions from "./SearchBarTransactions";
import { useFiltersStore } from "@/stores/filters";

import { filterAndSortDataForTable } from "@/lib/walletHelpelrs";
import { useRefreshStore } from "@/stores/refresh";
import { TransactionProps } from "@/types/types";
import { ShoppingBasket } from "lucide-react";

const TableDataFromWallet = ({
  label,
  dataForTable,
}: {
  label: string;
  dataForTable?: TransactionProps[];
}) => {
  const { showPast, showUpcoming, method, date, searchedValue } =
    useFiltersStore();
  const [inputValue, setInputValue] = useState<string>(searchedValue);

  const { toast } = useToast();
  const { setRefresh } = useRefreshStore();

  const sortedAndFilteredData = filterAndSortDataForTable(
    dataForTable ?? [],
    showPast,
    showUpcoming,
    method,
    date,
    searchedValue
  );
  const formatAmount = (amount: number) => {
    const formatValue = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
    return formatValue;
  };
  let totalAmountTransactions = 0;

  sortedAndFilteredData?.forEach((data) => {
    totalAmountTransactions += parseFloat(data.amount.toString());
  });

  const handleDeleteTransaction = async (id: number) => {
    try {
      const response = await deleteTransaction(id);
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

  return (
    <div className="w-full flex flex-col">
      <div className="sticky top-2 flex flex-col lg:flex-row justify-around items-center gap-4 z-10 bg-slate-100 py-6 px-4 rounded-md w-full">
        <SearchBarTransactions
          inputValue={inputValue}
          setInputValue={setInputValue}
        />

        <FiltersTransactions />
      </div>
      <Table>
        <TableCaption>A list of your recent {label}s.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Date</TableHead>
            <TableHead className="w-80 text-center">Label</TableHead>
            <TableHead className=" text-center">Fixed</TableHead>
            <TableHead className=" text-center">Status</TableHead>
            <TableHead className=" text-center">Method</TableHead>
            <TableHead className="text-center flex flex-col items-center justify-center">
              Amount{" "}
              <span className="font-semibold">
                ({totalAmountTransactions}€)
              </span>
            </TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredData.map((item) => {
            return (
              <TableRow key={item.id} className="text-center">
                <TableCell className="font-medium text-center">
                  {dayjs(item.date).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="flex items-center gap-2 justify-center">
                  <ShoppingBasket />
                  {item.label}
                </TableCell>
                <TableCell>
                  <span
                    className={clsx(
                      "text-xs px-3 py-2 flex justify-center items-center rounded-full w-20",
                      {
                        "bg-orange-300": item.isFixed,
                        "bg-slate-300": !item.isFixed,
                      }
                    )}
                  >
                    {item.isFixed ? "fixed" : "variable"}
                  </span>
                </TableCell>
                <TableCell className="">
                  <span
                    className={clsx("text-xs  px-3 py-1 rounded-full", {
                      "bg-blue-300": item.transactionStatus === "PAST",
                      "bg-blue-700 text-white":
                        item.transactionStatus === "UPCOMING",
                    })}
                  >
                    {item.transactionStatus.toLowerCase()}
                  </span>
                </TableCell>
                <TableCell>{item.paymentMethod}</TableCell>
                <TableCell
                  className={clsx("text-right", {
                    "text-red-500": item.type === "EXPENSE",
                    "text-blue-500": item.type === "INCOME",
                  })}
                >
                  {item.type === "EXPENSE" ? "-" : "+"}

                  {formatAmount(parseFloat(item.amount.toString()))}
                </TableCell>
                <TableCell className="text-right flex justify-end gap-4">
                  <CreateOrEditModal
                    data={item}
                    walletId={item.walletId}
                    dataLabel={label}
                  />
                  {/* <div className=" cursor-pointer h-10 w-10 bg-red-200 text-red-700 hover:bg-red-700 hover:text-red-200 p-3 duration-500 flex justify-center items-center rounded-full"> */}
                  <AlertDeleteAction
                    id={item.id}
                    deleteToContinue={handleDeleteTransaction}
                    pathToRedirect={`/dashboard/wallets/${item.walletId}`}
                  />
                  {/* </div> */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDataFromWallet;

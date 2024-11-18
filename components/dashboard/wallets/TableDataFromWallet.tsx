import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TableDataFromWallet = ({
  label,
  dataForTable,
}: {
  label: string;
  dataForTable: ExpenseProps[] | IncomeProps[];
}) => {
  return (
    <div className="w-full">
      <Table>
        <TableCaption>A list of your recent {label}s.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataForTable.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{"item.date"}</TableCell>
                <TableCell>
                  {"expenseStatus" in item
                    ? item.expenseStatus
                    : item.incomeStatus}
                </TableCell>
                <TableCell>{item.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {item.amount.toFixed(2)}€
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

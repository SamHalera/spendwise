import { PaymentMethod } from "@prisma/client";
import { DateRange } from "react-day-picker";

type WalletProps = {
  id: number;
  name: string;
  balance: number;
  transaction: TransactionProps[];
};

type TransactionProps = {
  id: number;
  label: string;
  type: string;
  date: Date;
  amount: number;
  transactionStatus: string;
  paymentMethod: string;
  walletId: number;
};
type TransactionFormValuesProps = {
  id: number;
  label: string;
  type: string;
  date: Date;
  amount: string;
  transactionStatus: string;
  paymentMethod: string;
  walletId: number;
};

type TransactionsChartProps = {
  month: string;
  incomes: number;
  expenses: number;
};

type FiltersObjProps = {
  showPast: boolean;
  showUpcoming: boolean;
  method: string[];
  date: DateRange | undefined;
  searchedValue: string;
};

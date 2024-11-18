type WalletProps = {
  id: number;
  name: string;
  balance: number;
  expense: ExpenseProps[];
  income: IncomeProps[];
};

type ExpenseProps = {
  id: number;
  label: string;
  date: Date;
  amount: number;
  expenseStatus: string;
  paymentMethod: string;
  walletId: number;
};
type IncomeProps = {
  id: number;
  label: string;
  date: Date;
  amount: number;
  incomeStatus: string;
  paymentMethod: string;
  walletId: number;
};

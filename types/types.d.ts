type WalletProps = {
  id: number;
  name: string;
  balance: number;
  expense: ExpenseProps[];
  income: IncomeProps[];
};

type ExpenseProps = {
  label: string;
  date: Date;
  amount: number;
  expenseStatus: string;
  walletId: number;
};
type IncomeProps = {
  label: string;
  date: Date;
  amount: number;
  expenseStatus: string;
  walletId: number;
};

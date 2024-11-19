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
// type IncomeProps = {
//   id: number;
//   label: string;
//   date: Date;
//   amount: number;
//   incomeStatus: string;
//   paymentMethod: string;
//   walletId: number;
// };

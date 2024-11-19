export const computeWalletBalances = (wallet: WalletProps) => {
  console.log("wallet==>", wallet);
  let walletBalance = wallet.balance;
  const expensesPast = wallet.transaction.filter(
    (elt) => elt.type === "EXPENSE" && elt.transactionStatus === "PAST"
  );
  const incomesPast = wallet.transaction.filter(
    (elt) => elt.type === "INCOME" && elt.transactionStatus === "PAST"
  );
  const expensesUpcoming = wallet.transaction.filter(
    (elt) => elt.type === "EXPENSE" && elt.transactionStatus === "UPCOMING"
  );
  const incomesUpcoming = wallet.transaction.filter(
    (elt) => elt.type === "INCOME" && elt.transactionStatus === "UPCOMING"
  );

  let expensesPastBalance = 0;
  let incomesPastBalance = 0;
  let expensesUpcomingBalance = 0;
  let incomesUpcomingBalance = 0;

  expensesPast.forEach((item) => (expensesPastBalance += item.amount));
  expensesUpcoming.forEach((item) => (expensesUpcomingBalance += item.amount));

  incomesPast.forEach((item) => (incomesPastBalance += item.amount));
  incomesUpcoming.forEach((item) => (incomesUpcomingBalance += item.amount));

  walletBalance += incomesPastBalance - expensesPastBalance;
  return {
    walletBalance,
    incomesPastBalance,
    incomesUpcomingBalance,
    expensesPastBalance,
    expensesUpcomingBalance,
  };
};

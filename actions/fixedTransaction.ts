"use server";

import prisma from "@/db";
import { TransactionProps, WalletProps } from "@/types/types";
import { getMonth } from "date-fns";

export const getFixedTransactionFromWallet = async (wallet: WalletProps) => {
  try {
    let walletHasFixedTransactions = false;
    const fixedTransactions = await prisma.fixedTransaction.findMany({
      where: {
        walletId: wallet.id,
      },
      include: {
        transaction: true,
      },
    });

    return fixedTransactions;
  } catch (error) {
    console.error(error);
  }
};
export const persistFixedTransaction = async (
  transaction: TransactionProps
) => {
  try {
    await prisma.fixedTransaction.create({
      data: {
        transaction: {
          connect: {
            id: transaction.id,
          },
        },
        wallet: {
          connect: {
            id: transaction.walletId,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};
export const findFixedTransactionForWallet = async (wallets: WalletProps[]) => {
  console.log("wallets inside function==>", wallets);
  const currentMonth = getMonth(new Date());

  wallets.forEach(async (wallet) => {
    const fixedTransactions = await prisma.fixedTransaction.findMany({
      where: {
        walletId: wallet.id,
      },
    });

    console.log("fixedTransactions=>", fixedTransactions);
  });
  return wallets;
};

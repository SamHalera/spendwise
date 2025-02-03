"use server";

import prisma from "@/db";
import {
  TransactionFormValuesProps,
  TransactionProps,
  WalletProps,
} from "@/types/types";
import {
  PaymentMethod,
  TransactionStatus,
  TransactionType,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { getMonth } from "date-fns";

import { revalidatePath } from "next/cache";
import { persistFixedTransaction } from "./fixedTransaction";

export const createOrEditTransaction = async (
  values: TransactionFormValuesProps
) => {
  try {
    const { id, walletId, label, type, date, amount, paymentMethod, isFixed } =
      values;

    let transactionStatus = "PAST";
    if (date > new Date()) transactionStatus = "UPCOMING";

    if (id === 0) {
      console.log("create==> ", values);
      let amountStr = parseAmount(amount);

      const newTransaction = await prisma.transaction.create({
        data: {
          label,
          date,
          type: type as keyof typeof TransactionType,
          createdAt: new Date(),
          isFixed: isFixed ?? false,
          amount: new Decimal(amountStr),
          transactionStatus:
            transactionStatus as keyof typeof TransactionStatus,
          paymentMethod: paymentMethod as keyof typeof PaymentMethod,
          wallet: {
            connect: { id: walletId },
          },
        },
      });
      if (!newTransaction) {
        return {
          error: "Oups! something went wrong! Try to submit the form again...",
        };
      } else {
        if (newTransaction.isFixed) {
          await persistFixedTransaction(newTransaction);
        }
      }
    } else if (id > 0) {
      let amountStr = parseAmount(amount);
      const updatedTransaction = await prisma.transaction.update({
        where: { id },
        data: {
          label,
          date,
          type: type as keyof typeof TransactionType,
          amount: new Decimal(amountStr),
          transactionStatus:
            transactionStatus as keyof typeof TransactionStatus,
          paymentMethod: paymentMethod as keyof typeof PaymentMethod,
          wallet: {
            connect: { id: walletId },
          },
        },
      });

      if (!updatedTransaction) {
        return {
          error: "Oups! something went wrong! Try to submit the form again...",
        };
      }
    }
    revalidatePath(`/dashboard/wallets/${walletId}`);
    return {
      success: "Good news! Transaction created or update!",
    };
  } catch (error) {
    console.error(error);
    return {
      error:
        "Oups something went wrong while creating a new Transaction. Try again...",
    };
  }
};

export const deleteTransaction = async (id: number) => {
  try {
    const deleted = await prisma.transaction.delete({
      where: { id },
    });
    return {
      success: "Good news! Transaction has been deleted!",
    };
  } catch (error) {
    console.error(error);
    return {
      error:
        "Oups something went wrong while deleting a transaction. Try again...",
    };
  }
};
export const deleteAllTransactions = async (walletId: number, type: string) => {
  try {
    const fixedTransactionFromWallet = await prisma.fixedTransaction.findMany({
      where: {
        walletId,
      },
    });
    fixedTransactionFromWallet.forEach(async (item) => {
      await prisma.fixedTransaction.delete({
        where: { id: item.id },
      });
    });
    const deletedAll = await prisma.transaction.deleteMany({
      where: { walletId, type: type as keyof typeof TransactionType },
    });

    return {
      success: "Good news! Transactions have been deleted!",
    };
  } catch (error) {
    console.error(error);
    return {
      error:
        "Oups something went wrong while deleting a transaction. Try again...",
    };
  }
};

export const handleTransactionStatus = async (wallets: WalletProps[]) => {
  console.log("handle status");
  wallets.forEach((wallet) => {
    wallet.transaction.forEach(async (elt) => {
      if (elt.transactionStatus === "UPCOMING" && elt.date <= new Date()) {
        await prisma.transaction.update({
          where: { id: elt.id },
          data: {
            transactionStatus: "PAST",
          },
        });
      } else if (elt.transactionStatus === "PAST" && elt.date > new Date()) {
        await prisma.transaction.update({
          where: { id: elt.id },
          data: {
            transactionStatus: "UPCOMING",
          },
        });
      }
    });
  });

  return wallets;
};

const parseAmount = (value: string) => {
  const strToArr = value.split("");

  const parsedStr = strToArr
    .map((item, index) => {
      if (index === 0 && item === "0") {
        return;
      } else if (item === "," || item === ".") {
        return ".";
      }
      return item;
    })
    .filter((item) => {
      if (item && (!isNaN(parseInt(item)) || item === ".")) {
        return true;
      }
    })
    .join("");

  return parseFloat(parsedStr);
};

export const convertAmountDecimalToNumber = (
  transactions: TransactionProps[]
) => {
  transactions.forEach((elt) => {
    elt.amount.toNumber();
  });
  return transactions;
};

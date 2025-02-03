/*
  Warnings:

  - You are about to drop the column `isFixed` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "isFixed";

-- CreateTable
CREATE TABLE "FixedTransaction" (
    "id" SERIAL NOT NULL,
    "transactionId" INTEGER NOT NULL,

    CONSTRAINT "FixedTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FixedTransaction_transactionId_key" ON "FixedTransaction"("transactionId");

-- AddForeignKey
ALTER TABLE "FixedTransaction" ADD CONSTRAINT "FixedTransaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

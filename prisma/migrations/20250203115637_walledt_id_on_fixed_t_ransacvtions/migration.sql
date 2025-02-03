/*
  Warnings:

  - Added the required column `walletId` to the `FixedTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FixedTransaction" ADD COLUMN     "walletId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FixedTransaction" ADD CONSTRAINT "FixedTransaction_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `total_amount` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `bank_name` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courier` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_payment` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Made the column `address_id` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bank_account_id` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "BankName" AS ENUM ('BCA', 'BRI', 'MANDIRI');

-- CreateEnum
CREATE TYPE "Courier" AS ENUM ('jne', 'pos', 'tiki');

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_address_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_bank_account_id_fkey";

-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "bank_name",
ADD COLUMN     "bank_name" "BankName" NOT NULL;

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "total_amount",
ADD COLUMN     "courier" "Courier",
ADD COLUMN     "total_price" INTEGER NOT NULL,
ALTER COLUMN "shipping_cost" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "courier" "Courier" NOT NULL,
ADD COLUMN     "total_payment" INTEGER NOT NULL,
ALTER COLUMN "address_id" SET NOT NULL,
ALTER COLUMN "bank_account_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

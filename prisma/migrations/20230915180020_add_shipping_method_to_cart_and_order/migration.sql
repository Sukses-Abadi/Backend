/*
  Warnings:

  - Added the required column `shipping_method` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "shipping_method" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shipping_method" TEXT NOT NULL;

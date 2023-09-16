/*
  Warnings:

  - You are about to drop the column `shipping_method` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_method` on the `Order` table. All the data in the column will be lost.
  - Added the required column `total_weight` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "shipping_method",
ADD COLUMN     "total_weight" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shipping_method",
ADD COLUMN     "total_weight" INTEGER NOT NULL;

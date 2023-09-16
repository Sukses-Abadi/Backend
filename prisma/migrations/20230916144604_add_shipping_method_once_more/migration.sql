/*
  Warnings:

  - Added the required column `shipping_method` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_city_id_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "cityId" INTEGER;

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "shipping_method" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shipping_method" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `total_weight` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_city_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductDetails" DROP CONSTRAINT "ProductDetails_product_id_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "cityId" INTEGER;

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "total_payment" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_weight" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "total_weight" INTEGER NOT NULL,
ALTER COLUMN "payment_receipt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetails" ADD CONSTRAINT "ProductDetails_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

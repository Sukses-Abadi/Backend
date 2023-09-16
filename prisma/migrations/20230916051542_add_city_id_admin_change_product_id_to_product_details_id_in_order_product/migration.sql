/*
  Warnings:

  - You are about to drop the column `product_id` on the `OrderProduct` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[city_id]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_details_id` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductDetails" DROP CONSTRAINT "ProductDetails_product_id_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city_id" INTEGER;

-- AlterTable
ALTER TABLE "OrderProduct" DROP COLUMN "product_id",
ADD COLUMN     "product_details_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_city_id_key" ON "Admin"("city_id");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProduct" ADD CONSTRAINT "OrderProduct_product_details_id_fkey" FOREIGN KEY ("product_details_id") REFERENCES "ProductDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetails" ADD CONSTRAINT "ProductDetails_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `product_id` on the `CartProduct` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_cost` on the `City` table. All the data in the column will be lost.
  - Added the required column `product_details_id` to the `CartProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_product_id_fkey";

-- DropIndex
DROP INDEX "CartProduct_product_id_key";

-- AlterTable
ALTER TABLE "CartProduct" DROP COLUMN "product_id",
ADD COLUMN     "product_details_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "City" DROP COLUMN "shipping_cost";

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_product_details_id_fkey" FOREIGN KEY ("product_details_id") REFERENCES "ProductDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

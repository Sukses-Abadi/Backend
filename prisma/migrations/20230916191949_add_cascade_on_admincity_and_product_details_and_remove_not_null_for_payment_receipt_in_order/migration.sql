-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_cityId_fkey";

-- DropForeignKey
ALTER TABLE "ProductDetails" DROP CONSTRAINT "ProductDetails_product_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "payment_receipt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductDetails" ADD CONSTRAINT "ProductDetails_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

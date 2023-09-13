/*
  Warnings:

  - The values [waiting_payment,payment_received,payment_rejected,being_shipped] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('waiting', 'received', 'rejected', 'shipped', 'complete');
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- DropIndex
DROP INDEX "Admin_id_key";

-- AlterTable
CREATE SEQUENCE admin_id_seq;
ALTER TABLE "Admin" ALTER COLUMN "id" SET DEFAULT nextval('admin_id_seq');
ALTER SEQUENCE admin_id_seq OWNED BY "Admin"."id";

-- AlterTable
CREATE SEQUENCE cartproduct_id_seq;
ALTER TABLE "CartProduct" ALTER COLUMN "id" SET DEFAULT nextval('cartproduct_id_seq');
ALTER SEQUENCE cartproduct_id_seq OWNED BY "CartProduct"."id";

-- AlterTable
CREATE SEQUENCE productdetails_id_seq;
ALTER TABLE "ProductDetails" ALTER COLUMN "id" SET DEFAULT nextval('productdetails_id_seq');
ALTER SEQUENCE productdetails_id_seq OWNED BY "ProductDetails"."id";

-- AlterTable
CREATE SEQUENCE productgallery_id_seq;
ALTER TABLE "ProductGallery" ALTER COLUMN "id" SET DEFAULT nextval('productgallery_id_seq');
ALTER SEQUENCE productgallery_id_seq OWNED BY "ProductGallery"."id";

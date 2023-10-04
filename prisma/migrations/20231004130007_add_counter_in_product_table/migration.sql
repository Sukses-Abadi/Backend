-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "bank_account_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "counter" INTEGER DEFAULT 1;

/*
  Warnings:

  - You are about to drop the column `city_id` on the `Admin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_cityId_fkey";

-- DropIndex
DROP INDEX "Admin_city_id_key";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "city_id";

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `createAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quality` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Product_createAt_idx";

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "createAt",
DROP COLUMN "quality",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "public"."Product"("createdAt");

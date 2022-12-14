/*
  Warnings:

  - Added the required column `orderNr` to the `OrderProductsOnUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderProductsOnUsers" ADD COLUMN     "orderNr" TEXT NOT NULL;
ALTER TABLE "OrderProductsOnUsers" RENAME TO "OrderItem";
ALTER TABLE "CartProductsOnUsers" RENAME TO "CartItem";

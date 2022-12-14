/*
  Warnings:

  - Added the required column `quantity` to the `OrderProductsOnUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderProductsOnUsers" ADD COLUMN     "quantity" INTEGER NOT NULL;

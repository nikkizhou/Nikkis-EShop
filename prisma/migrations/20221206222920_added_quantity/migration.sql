/*
  Warnings:

  - Added the required column `quantity` to the `CartProductsOnUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartProductsOnUsers" ADD COLUMN     "quantity" INTEGER NOT NULL;

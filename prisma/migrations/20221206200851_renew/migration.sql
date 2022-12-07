/*
  Warnings:

  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RatingToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_bought` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_cart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_productId_fkey";

-- DropForeignKey
ALTER TABLE "_RatingToUser" DROP CONSTRAINT "_RatingToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RatingToUser" DROP CONSTRAINT "_RatingToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_bought" DROP CONSTRAINT "_bought_A_fkey";

-- DropForeignKey
ALTER TABLE "_bought" DROP CONSTRAINT "_bought_B_fkey";

-- DropForeignKey
ALTER TABLE "_cart" DROP CONSTRAINT "_cart_A_fkey";

-- DropForeignKey
ALTER TABLE "_cart" DROP CONSTRAINT "_cart_B_fkey";

-- DropTable
DROP TABLE "Rating";

-- DropTable
DROP TABLE "_RatingToUser";

-- DropTable
DROP TABLE "_bought";

-- DropTable
DROP TABLE "_cart";

-- CreateTable
CREATE TABLE "CartProductsOnUsers" (
    "productId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CartProductsOnUsers_pkey" PRIMARY KEY ("userId","productId")
);

-- CreateTable
CREATE TABLE "BoughtProductsOnUsers" (
    "productId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BoughtProductsOnUsers_pkey" PRIMARY KEY ("userId","productId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CartProductsOnUsers" ADD CONSTRAINT "CartProductsOnUsers_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartProductsOnUsers" ADD CONSTRAINT "CartProductsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoughtProductsOnUsers" ADD CONSTRAINT "BoughtProductsOnUsers_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoughtProductsOnUsers" ADD CONSTRAINT "BoughtProductsOnUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

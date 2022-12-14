-- AlterTable
ALTER TABLE "CartItem" RENAME CONSTRAINT "CartProductsOnUsers_pkey" TO "CartItem_pkey";

-- AlterTable
ALTER TABLE "OrderItem" RENAME CONSTRAINT "OrderProductsOnUsers_pkey" TO "OrderItem_pkey";

-- RenameForeignKey
ALTER TABLE "CartItem" RENAME CONSTRAINT "CartProductsOnUsers_productId_fkey" TO "CartItem_productId_fkey";

-- RenameForeignKey
ALTER TABLE "CartItem" RENAME CONSTRAINT "CartProductsOnUsers_userId_fkey" TO "CartItem_userId_fkey";

-- RenameForeignKey
ALTER TABLE "OrderItem" RENAME CONSTRAINT "OrderProductsOnUsers_productId_fkey" TO "OrderItem_productId_fkey";

-- RenameForeignKey
ALTER TABLE "OrderItem" RENAME CONSTRAINT "OrderProductsOnUsers_userId_fkey" TO "OrderItem_userId_fkey";

-- CreateTable
CREATE TABLE "_RatingToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_cart" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_bought" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RatingToUser_AB_unique" ON "_RatingToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RatingToUser_B_index" ON "_RatingToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_cart_AB_unique" ON "_cart"("A", "B");

-- CreateIndex
CREATE INDEX "_cart_B_index" ON "_cart"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_bought_AB_unique" ON "_bought"("A", "B");

-- CreateIndex
CREATE INDEX "_bought_B_index" ON "_bought"("B");

-- AddForeignKey
ALTER TABLE "_RatingToUser" ADD CONSTRAINT "_RatingToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Rating"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RatingToUser" ADD CONSTRAINT "_RatingToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cart" ADD CONSTRAINT "_cart_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_cart" ADD CONSTRAINT "_cart_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bought" ADD CONSTRAINT "_bought_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_bought" ADD CONSTRAINT "_bought_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

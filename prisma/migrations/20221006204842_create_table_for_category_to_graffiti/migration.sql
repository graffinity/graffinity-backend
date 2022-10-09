-- CreateTable
CREATE TABLE "CategoryToGraffiti" (
    "id" SERIAL NOT NULL,
    "graffitiId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "CategoryToGraffiti_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CategoryToGraffiti" ADD CONSTRAINT "CategoryToGraffiti_graffitiId_fkey" FOREIGN KEY ("graffitiId") REFERENCES "Graffiti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryToGraffiti" ADD CONSTRAINT "CategoryToGraffiti_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

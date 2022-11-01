/*
  Warnings:

  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_graffitiId_fkey";

-- DropTable
DROP TABLE "Photo";

-- CreateTable
CREATE TABLE "GraffitiPhoto" (
    "id" SERIAL NOT NULL,
    "graffitiId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GraffitiPhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GraffitiPhoto" ADD CONSTRAINT "GraffitiPhoto_graffitiId_fkey" FOREIGN KEY ("graffitiId") REFERENCES "Graffiti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Graffiti` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Graffiti" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AddForeignKey
ALTER TABLE "Graffiti" ADD CONSTRAINT "Graffiti_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `CategoryToGraffiti` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryToGraffiti" DROP CONSTRAINT "CategoryToGraffiti_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryToGraffiti" DROP CONSTRAINT "CategoryToGraffiti_graffitiId_fkey";

-- DropTable
DROP TABLE "CategoryToGraffiti";

-- DropTable
DROP TABLE "Tag";

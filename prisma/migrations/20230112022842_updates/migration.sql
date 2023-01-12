/*
  Warnings:

  - The primary key for the `ArtistToGraffiti` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ArtistToGraffiti` table. All the data in the column will be lost.
  - The primary key for the `CategoryToGraffiti` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CategoryToGraffiti` table. All the data in the column will be lost.
  - The primary key for the `Likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Likes` table. All the data in the column will be lost.
  - The primary key for the `TagToGraffiti` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `TagToGraffiti` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ArtistToGraffiti" DROP CONSTRAINT "ArtistToGraffiti_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ArtistToGraffiti_pkey" PRIMARY KEY ("graffitiId", "artistId");

-- AlterTable
ALTER TABLE "CategoryToGraffiti" DROP CONSTRAINT "CategoryToGraffiti_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CategoryToGraffiti_pkey" PRIMARY KEY ("graffitiId", "categoryId");

-- AlterTable
ALTER TABLE "Graffiti" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'SUBMITTED';

-- AlterTable
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Likes_pkey" PRIMARY KEY ("userId", "graffitiPhotoId");

-- AlterTable
ALTER TABLE "TagToGraffiti" DROP CONSTRAINT "TagToGraffiti_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "TagToGraffiti_pkey" PRIMARY KEY ("graffitiId", "tagId");

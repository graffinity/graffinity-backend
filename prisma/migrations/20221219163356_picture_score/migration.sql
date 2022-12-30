/*
  Warnings:

  - Added the required column `pictureScore` to the `GraffitiPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GraffitiPhoto" ADD COLUMN     "pictureScore" INTEGER NOT NULL;

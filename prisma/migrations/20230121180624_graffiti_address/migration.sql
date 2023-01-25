/*
 Warnings:

 - Added the required column `address` to the `Graffiti` table without a default value. This is not possible if the table is not empty.
 */
-- AlterTable
ALTER TABLE "Graffiti"
  ADD COLUMN "address" TEXT NOT NULL;


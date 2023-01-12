/*
  Warnings:

  - The `status` column on the `Graffiti` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "GraffitiStatus" AS ENUM ('SUBMITTED', 'PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Graffiti" DROP COLUMN "status",
ADD COLUMN     "status" "GraffitiStatus" NOT NULL DEFAULT 'SUBMITTED';

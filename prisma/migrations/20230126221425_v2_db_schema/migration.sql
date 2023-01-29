/*
  Warnings:

  - A unique constraint covering the columns `[graffiti_id,artist_id]` on the table `artist_to_graffiti` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[category_id,graffiti_id]` on the table `category_to_graffiti` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,graffiti_photo_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,role_id]` on the table `role_to_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[graffiti_id,tag_id]` on the table `tag_to_graffiti` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "graffiti" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "graffiti_photo" ALTER COLUMN "added_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "report" ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "artist_to_graffiti_graffiti_id_artist_id_key" ON "artist_to_graffiti"("graffiti_id", "artist_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_to_graffiti_category_id_graffiti_id_key" ON "category_to_graffiti"("category_id", "graffiti_id");

-- CreateIndex
CREATE UNIQUE INDEX "likes_user_id_graffiti_photo_id_key" ON "likes"("user_id", "graffiti_photo_id");

-- CreateIndex
CREATE UNIQUE INDEX "role_to_user_user_id_role_id_key" ON "role_to_user"("user_id", "role_id");

-- CreateIndex
CREATE UNIQUE INDEX "tag_to_graffiti_graffiti_id_tag_id_key" ON "tag_to_graffiti"("graffiti_id", "tag_id");

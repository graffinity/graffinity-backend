-- CreateTable
CREATE TABLE "Likes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "graffitiPhotoId" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_graffitiPhotoId_fkey" FOREIGN KEY ("graffitiPhotoId") REFERENCES "GraffitiPhoto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

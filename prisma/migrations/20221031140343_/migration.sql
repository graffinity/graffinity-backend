-- CreateTable
CREATE TABLE "ArtistToGraffiti" (
    "id" SERIAL NOT NULL,
    "graffitiId" INTEGER NOT NULL,
    "artistId" INTEGER NOT NULL,

    CONSTRAINT "ArtistToGraffiti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "body" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "graffitiId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArtistToGraffiti" ADD CONSTRAINT "ArtistToGraffiti_graffitiId_fkey" FOREIGN KEY ("graffitiId") REFERENCES "Graffiti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistToGraffiti" ADD CONSTRAINT "ArtistToGraffiti_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_graffitiId_fkey" FOREIGN KEY ("graffitiId") REFERENCES "Graffiti"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

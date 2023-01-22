-- CreateEnum
CREATE IF NOT EXISTS TYPE "GraffitiStatus" AS ENUM (
    'SUBMITTED',
    'PENDING',
    'APPROVED',
    'REJECTED'
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "Graffiti" (
    "id" serial NOT NULL,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "latitude" text NOT NULL,
    "longitude" text NOT NULL,
    "status" "GraffitiStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" integer NOT NULL,
    CONSTRAINT "Graffiti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "Category" (
    "id" serial NOT NULL,
    "name" text NOT NULL,
    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "CategoryToGraffiti" (
    "categoryId" integer NOT NULL,
    "graffitiId" integer NOT NULL,
    CONSTRAINT "CategoryToGraffiti_pkey" PRIMARY KEY ("graffitiId", "categoryId")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "Comment" (
    "id" serial NOT NULL,
    "body" text NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" integer NOT NULL,
    "graffitiId" integer NOT NULL,
    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "Email" (
    "id" serial NOT NULL,
    "dateSent" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "subject" text NOT NULL,
    "body" text NOT NULL,
    "status" text NOT NULL,
    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "EmailTemplate" (
    "name" text NOT NULL,
    "id" serial NOT NULL,
    "subject" text NOT NULL,
    "body" text NOT NULL,
    CONSTRAINT "EmailTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "Tag" (
    "id" serial NOT NULL,
    "name" text NOT NULL,
    "description" text NOT NULL,
    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "TagToGraffiti" (
    "graffitiId" integer NOT NULL,
    "tagId" integer NOT NULL,
    CONSTRAINT "TagToGraffiti_pkey" PRIMARY KEY ("graffitiId", "tagId")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "GraffitiPhoto" (
    "id" serial NOT NULL,
    "graffitiId" integer NOT NULL,
    "url" text NOT NULL,
    "addedAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" integer NOT NULL,
    "pictureScore" integer,
    CONSTRAINT "GraffitiPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "User" (
    "id" serial NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    "name" text NOT NULL,
    "lastname" text NOT NULL,
    "username" text NOT NULL,
    "refreshToken" text,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "Artist" (
    "id" serial NOT NULL,
    "name" text NOT NULL,
    "surname" text NOT NULL,
    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "ArtistToGraffiti" (
    "graffitiId" integer NOT NULL,
    "artistId" integer NOT NULL,
    CONSTRAINT "ArtistToGraffiti_pkey" PRIMARY KEY ("graffitiId", "artistId")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "Report" (
    "id" serial NOT NULL,
    "graffitiId" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportReason" text NOT NULL,
    "status" text NOT NULL,
    "comment" text,
    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE IF NOT EXISTS TABLE "Likes" (
    "userId" integer NOT NULL,
    "graffitiPhotoId" integer NOT NULL,
    CONSTRAINT "Likes_pkey" PRIMARY KEY ("userId", "graffitiPhotoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Graffiti_name_key" ON "Graffiti" ("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category" ("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag" ("name");

-- CreateIndex
CREATE UNIQUE INDEX "GraffitiPhoto_url_key" ON "GraffitiPhoto" ("url");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User" ("username");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist" ("name");

-- AddForeignKey
ALTER TABLE "Graffiti"
    ADD CONSTRAINT "Graffiti_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryToGraffiti"
    ADD CONSTRAINT "CategoryToGraffiti_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryToGraffiti"
    ADD CONSTRAINT "CategoryToGraffiti_graffitiId_fkey" FOREIGN KEY ("graffitiId") REFERENCES "Graffiti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment"
    ADD CONSTRAINT "Comment_graffitiId_fkey" FOREIGN KEY ("graffitiId") REFERENCES "Graffiti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagToGraffiti"
    ADD CONSTRAINT "TagToGraffiti_graffitiId_fkey" FOREIGN KEY ("graffitiId") REFERENCES "Graffiti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagToGraffiti"
    ADD CONSTRAINT "TagToGraffiti_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GraffitiPhoto"
    ADD CONSTRAINT "GraffitiPhoto_graffitiId_fkey" FOREIGN KEY ("graffitiId") REFERENCES "Graffiti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GraffitiPhoto"
    ADD CONSTRAINT "GraffitiPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistToGraffiti"
    ADD CONSTRAINT "ArtistToGraffiti_graffitiId_fkey" FOREIGN KEY ("graffitiId") REFERENCES "Graffiti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistToGraffiti"
    ADD CONSTRAINT "ArtistToGraffiti_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report"
    ADD CONSTRAINT "Report_graffitiId_fkey" FOREIGN KEY ("graffitiId") REFERENCES "Graffiti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report"
    ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes"
    ADD CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes"
    ADD CONSTRAINT "Likes_graffitiPhotoId_fkey" FOREIGN KEY ("graffitiPhotoId") REFERENCES "GraffitiPhoto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;


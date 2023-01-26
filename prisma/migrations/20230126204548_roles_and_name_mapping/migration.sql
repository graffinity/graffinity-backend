/*
 Warnings:

 - You are about to drop the `Artist` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `ArtistToGraffiti` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `CategoryToGraffiti` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `Email` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `EmailTemplate` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `Graffiti` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `GraffitiPhoto` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `Likes` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `TagToGraffiti` table. If the table is not empty, all the data it contains will be lost.
 - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
 */
-- CreateEnum
CREATE TYPE "graffiti_status" AS ENUM (
    'SUBMITTED',
    'PENDING',
    'APPROVED',
    'REJECTED'
    );

-- CreateEnum
CREATE TYPE "role_enum" AS ENUM (
    'ADMIN',
    'USER'
    );

-- DropForeignKey
ALTER TABLE "ArtistToGraffiti"
    DROP CONSTRAINT "ArtistToGraffiti_artistId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistToGraffiti"
    DROP CONSTRAINT "ArtistToGraffiti_graffitiId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryToGraffiti"
    DROP CONSTRAINT "CategoryToGraffiti_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryToGraffiti"
    DROP CONSTRAINT "CategoryToGraffiti_graffitiId_fkey";

-- DropForeignKey
ALTER TABLE "Comment"
    DROP CONSTRAINT "Comment_graffitiId_fkey";

-- DropForeignKey
ALTER TABLE "Comment"
    DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Graffiti"
    DROP CONSTRAINT "Graffiti_authorId_fkey";

-- DropForeignKey
ALTER TABLE "GraffitiPhoto"
    DROP CONSTRAINT "GraffitiPhoto_graffitiId_fkey";

-- DropForeignKey
ALTER TABLE "GraffitiPhoto"
    DROP CONSTRAINT "GraffitiPhoto_userId_fkey";

-- DropForeignKey
ALTER TABLE "Likes"
    DROP CONSTRAINT "Likes_graffitiPhotoId_fkey";

-- DropForeignKey
ALTER TABLE "Likes"
    DROP CONSTRAINT "Likes_userId_fkey";

-- DropForeignKey
ALTER TABLE "Report"
    DROP CONSTRAINT "Report_graffitiId_fkey";

-- DropForeignKey
ALTER TABLE "Report"
    DROP CONSTRAINT "Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "TagToGraffiti"
    DROP CONSTRAINT "TagToGraffiti_graffitiId_fkey";

-- DropForeignKey
ALTER TABLE "TagToGraffiti"
    DROP CONSTRAINT "TagToGraffiti_tagId_fkey";

-- DropTable
DROP TABLE "Artist";

-- DropTable
DROP TABLE "ArtistToGraffiti";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "CategoryToGraffiti";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Email";

-- DropTable
DROP TABLE "EmailTemplate";

-- DropTable
DROP TABLE "Graffiti";

-- DropTable
DROP TABLE "GraffitiPhoto";

-- DropTable
DROP TABLE "Likes";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "TagToGraffiti";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "GraffitiStatus";

-- CreateTable
CREATE TABLE IF NOT EXISTS "user"
(
    "id"            integer GENERATED ALWAYS AS IDENTITY,
    "name"          text NOT NULL,
    "lastname"      text NOT NULL,
    "email"         text NOT NULL UNIQUE,
    "username"      text NOT NULL UNIQUE,
    "password"      text NOT NULL,
    "refresh_token" text,
    --
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "graffiti"
(
    "id"          integer GENERATED ALWAYS AS IDENTITY,
    "name"        text              NOT NULL UNIQUE,
    "description" text              NOT NULL,
    "latitude"    text              NOT NULL,
    "longitude"   text              NOT NULL,
    "address"     text,
    "user_id"     integer           NOT NULL,
    "status"      "graffiti_status" NOT NULL DEFAULT 'SUBMITTED',
    "created_at"  timestamp         NOT NULL DEFAULT NOW(),
    --
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "category"
(
    "id"   integer GENERATED ALWAYS AS IDENTITY,
    "name" text NOT NULL UNIQUE,
    --
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "category_to_graffiti"
(
    "category_id" integer NOT NULL,
    "graffiti_id" integer NOT NULL,
    --
    FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("graffiti_id") REFERENCES "graffiti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "comment"
(
    "id"          integer GENERATED ALWAYS AS IDENTITY,
    "body"        text      NOT NULL,
    "created_at"  timestamp NOT NULL DEFAULT NOW(),
    "user_id"     integer   NOT NULL,
    "graffiti_id" integer   NOT NULL,
    --
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("graffiti_id") REFERENCES "graffiti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "email"
(
    "id"        integer GENERATED ALWAYS AS IDENTITY,
    "date_sent" timestamp NOT NULL DEFAULT NOW(),
    "subject"   text      NOT NULL,
    "body"      text      NOT NULL,
    "status"    text      NOT NULL,
    --
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "email_template"
(
    "id"      integer GENERATED ALWAYS AS IDENTITY,
    "name"    text NOT NULL,
    "subject" text NOT NULL,
    "body"    text NOT NULL,
    --
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "tag"
(
    "id"          integer GENERATED ALWAYS AS IDENTITY,
    "name"        text NOT NULL UNIQUE,
    "description" text NOT NULL,
    --
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "tag_to_graffiti"
(
    "graffiti_id" integer NOT NULL,
    "tag_id"      integer NOT NULL,
    --
    FOREIGN KEY ("graffiti_id") REFERENCES "graffiti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("tag_id") REFERENCES "tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "graffiti_photo"
(
    "id"            integer GENERATED ALWAYS AS IDENTITY,
    "graffiti_id"   integer   NOT NULL,
    "user_id"       integer   NOT NULL,
    "url"           text      NOT NULL UNIQUE,
    "added_at"      timestamp NOT NULL DEFAULT NOW(),
    "picture_score" integer,
    --
    PRIMARY KEY ("id"),
    FOREIGN KEY ("graffiti_id") REFERENCES "graffiti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "artist"
(
    "id"      integer GENERATED ALWAYS AS IDENTITY,
    "name"    text NOT NULL UNIQUE,
    "surname" text NOT NULL,
    --
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "artist_to_graffiti"
(
    "graffiti_id" integer NOT NULL,
    "artist_id"   integer NOT NULL,
    --
    FOREIGN KEY ("graffiti_id") REFERENCES "graffiti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("artist_id") REFERENCES "artist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "report"
(
    "id"            integer GENERATED ALWAYS AS IDENTITY,
    "report_reason" text      NOT NULL,
    "status"        text      NOT NULL,
    "comment"       text,
    "created_at"    timestamp NOT NULL DEFAULT NOW(),
    "graffiti_id"   integer   NOT NULL,
    "user_id"       integer   NOT NULL,
    --
    PRIMARY KEY ("id"),
    FOREIGN KEY ("graffiti_id") REFERENCES "graffiti" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "likes"
(
    "user_id"           integer NOT NULL,
    "graffiti_photo_id" integer NOT NULL,
    --
    FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("graffiti_photo_id") REFERENCES "graffiti_photo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "role"
(
    "id"   integer GENERATED ALWAYS AS IDENTITY,
    "name" "role_enum" NOT NULL UNIQUE,
    --
    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "role_to_user"
(
    "user_id" integer NOT NULL,
    "role_id" integer NOT NULL,
    --
    FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "location" ON "graffiti" ("latitude", "longitude");


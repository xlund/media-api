/*
  Warnings:

  - Added the required column `poster` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "poster" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Playing" (
    "id" SERIAL NOT NULL,
    "videoId" INTEGER NOT NULL,

    CONSTRAINT "Playing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Playing_videoId_key" ON "Playing"("videoId");

-- AddForeignKey
ALTER TABLE "Playing" ADD CONSTRAINT "Playing_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `emotiontag` on the `Epigram` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Epigram" DROP COLUMN "emotiontag",
ADD COLUMN     "sourceTitle" TEXT,
ADD COLUMN     "sourceUrl" TEXT;

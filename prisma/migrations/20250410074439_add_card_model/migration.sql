/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Epigram` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Epigram" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "emotiontag" JSONB NOT NULL
);
INSERT INTO "new_Epigram" ("author", "emotiontag", "id", "quote") SELECT "author", "emotiontag", "id", "quote" FROM "Epigram";
DROP TABLE "Epigram";
ALTER TABLE "new_Epigram" RENAME TO "Epigram";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

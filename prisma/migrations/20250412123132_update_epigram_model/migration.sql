/*
  Warnings:

  - The primary key for the `Epigram` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `emotiontag` on the `Epigram` table. All the data in the column will be lost.
  - You are about to drop the column `quote` on the `Epigram` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Epigram" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT,
    "author" TEXT,
    "sourceTitle" TEXT,
    "sourceUrl" TEXT,
    "tags" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Epigram" ("author", "createdAt", "id") SELECT "author", "createdAt", "id" FROM "Epigram";
DROP TABLE "Epigram";
ALTER TABLE "new_Epigram" RENAME TO "Epigram";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

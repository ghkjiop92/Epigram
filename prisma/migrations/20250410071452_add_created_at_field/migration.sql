/*
  Warnings:

  - You are about to drop the column `content` on the `Epigram` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Epigram` table. All the data in the column will be lost.
  - Added the required column `author` to the `Epigram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emotiontag` to the `Epigram` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quote` to the `Epigram` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Epigram" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "emotiontag" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Epigram" ("createdAt", "id") SELECT "createdAt", "id" FROM "Epigram";
DROP TABLE "Epigram";
ALTER TABLE "new_Epigram" RENAME TO "Epigram";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

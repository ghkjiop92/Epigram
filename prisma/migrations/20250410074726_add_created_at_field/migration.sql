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
INSERT INTO "new_Epigram" ("author", "emotiontag", "id", "quote") SELECT "author", "emotiontag", "id", "quote" FROM "Epigram";
DROP TABLE "Epigram";
ALTER TABLE "new_Epigram" RENAME TO "Epigram";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

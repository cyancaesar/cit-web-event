-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "objectKey" TEXT NOT NULL,
    "eventId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "File_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_File" ("createdAt", "eventId", "id", "objectKey", "updatedAt") SELECT "createdAt", "eventId", "id", "objectKey", "updatedAt" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

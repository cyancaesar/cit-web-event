-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL DEFAULT 'DELETED_USER',
    CONSTRAINT "UserLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE
);
INSERT INTO "new_UserLog" ("createdAt", "id", "username") SELECT "createdAt", "id", "username" FROM "UserLog";
DROP TABLE "UserLog";
ALTER TABLE "new_UserLog" RENAME TO "UserLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

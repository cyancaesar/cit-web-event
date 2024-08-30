-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "date_from" DATETIME NOT NULL,
    "date_to" DATETIME NOT NULL,
    "place" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "targetAudience" TEXT NOT NULL,
    "registrationProcess" TEXT NOT NULL,
    "advertisementProcess" TEXT NOT NULL,
    "instructorsAndGuests" TEXT NOT NULL,
    "maleAttendees" INTEGER NOT NULL,
    "femaleAttendees" INTEGER NOT NULL,
    "otherAttendees" INTEGER NOT NULL,
    "totalAttendees" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "eventGoals" TEXT NOT NULL,
    "eventPlanning" TEXT NOT NULL,
    "eventTiming" TEXT NOT NULL,
    "eventFeedbacks" TEXT NOT NULL,
    "enhancePriority" TEXT NOT NULL,
    "workTeam" TEXT NOT NULL,
    "acadAffairsPlan" TEXT NOT NULL,
    "univStratPlan" TEXT NOT NULL,
    "tuga" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL DEFAULT 'DELETED_USER',
    CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET DEFAULT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("acadAffairsPlan", "advertisementProcess", "category", "createdAt", "date_from", "date_to", "department", "enhancePriority", "eventFeedbacks", "eventGoals", "eventPlanning", "eventTiming", "femaleAttendees", "id", "instructorsAndGuests", "maleAttendees", "organizer", "otherAttendees", "place", "registrationProcess", "targetAudience", "time", "title", "totalAttendees", "tuga", "type", "univStratPlan", "updatedAt", "workTeam") SELECT "acadAffairsPlan", "advertisementProcess", "category", "createdAt", "date_from", "date_to", "department", "enhancePriority", "eventFeedbacks", "eventGoals", "eventPlanning", "eventTiming", "femaleAttendees", "id", "instructorsAndGuests", "maleAttendees", "organizer", "otherAttendees", "place", "registrationProcess", "targetAudience", "time", "title", "totalAttendees", "tuga", "type", "univStratPlan", "updatedAt", "workTeam" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

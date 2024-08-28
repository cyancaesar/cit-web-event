/*
  Warnings:

  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `objects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_events" (
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
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_events" ("acadAffairsPlan", "advertisementProcess", "category", "date_from", "date_to", "department", "enhancePriority", "eventFeedbacks", "eventGoals", "eventPlanning", "eventTiming", "femaleAttendees", "id", "instructorsAndGuests", "maleAttendees", "organizer", "otherAttendees", "place", "registrationProcess", "targetAudience", "time", "title", "totalAttendees", "tuga", "type", "univStratPlan", "workTeam") SELECT "acadAffairsPlan", "advertisementProcess", "category", "date_from", "date_to", "department", "enhancePriority", "eventFeedbacks", "eventGoals", "eventPlanning", "eventTiming", "femaleAttendees", "id", "instructorsAndGuests", "maleAttendees", "organizer", "otherAttendees", "place", "registrationProcess", "targetAudience", "time", "title", "totalAttendees", "tuga", "type", "univStratPlan", "workTeam" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
CREATE TABLE "new_objects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "objectKey" TEXT NOT NULL,
    "eventId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "objects_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_objects" ("eventId", "id", "objectKey") SELECT "eventId", "id", "objectKey" FROM "objects";
DROP TABLE "objects";
ALTER TABLE "new_objects" RENAME TO "objects";
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("createdAt", "id", "updatedAt") SELECT "createdAt", "id", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

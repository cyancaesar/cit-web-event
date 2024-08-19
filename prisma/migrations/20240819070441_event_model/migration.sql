/*
  Warnings:

  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "events" (
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
    "tuga" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("email", "id", "name") SELECT "email", "id", "name" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

/*
  Warnings:

  - You are about to drop the column `eventId` on the `placesEvent` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `placesEvent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "placesEvent" DROP CONSTRAINT "placesEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "placesEvent" DROP CONSTRAINT "placesEvent_userId_fkey";

-- AlterTable
ALTER TABLE "placesEvent" DROP COLUMN "eventId",
DROP COLUMN "userId";

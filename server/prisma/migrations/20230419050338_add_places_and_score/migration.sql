/*
  Warnings:

  - The primary key for the `judges` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "judges" DROP CONSTRAINT "judges_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "judges_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "placesEvent" (
    "id" SERIAL NOT NULL,
    "judgeId" INTEGER NOT NULL,
    "placeId" INTEGER NOT NULL,
    "userId" INTEGER,
    "eventId" INTEGER,

    CONSTRAINT "placesEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "places" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "score" (
    "id" SERIAL NOT NULL,
    "judgeId" INTEGER NOT NULL,
    "partisipantId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "score_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "placesEvent" ADD CONSTRAINT "placesEvent_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "judges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placesEvent" ADD CONSTRAINT "placesEvent_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placesEvent" ADD CONSTRAINT "placesEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "placesEvent" ADD CONSTRAINT "placesEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_judgeId_fkey" FOREIGN KEY ("judgeId") REFERENCES "judges"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_partisipantId_fkey" FOREIGN KEY ("partisipantId") REFERENCES "partisipantsIndividual"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

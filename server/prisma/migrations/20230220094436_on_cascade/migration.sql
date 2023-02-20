-- DropForeignKey
ALTER TABLE "judges" DROP CONSTRAINT "judges_eventId_fkey";

-- DropForeignKey
ALTER TABLE "partisipantsGroup" DROP CONSTRAINT "partisipantsGroup_settingsEventId_fkey";

-- DropForeignKey
ALTER TABLE "partisipantsIndividual" DROP CONSTRAINT "partisipantsIndividual_settingsEventId_fkey";

-- DropForeignKey
ALTER TABLE "raitingGroup" DROP CONSTRAINT "raitingGroup_partisipantGroupId_fkey";

-- DropForeignKey
ALTER TABLE "raitingIndividual" DROP CONSTRAINT "raitingIndividual_partisipantId_fkey";

-- DropForeignKey
ALTER TABLE "settingsEvent" DROP CONSTRAINT "settingsEvent_eventId_fkey";

-- AlterTable
ALTER TABLE "athletes" ALTER COLUMN "rankId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "settingsEvent" ALTER COLUMN "rankId" DROP DEFAULT,
ALTER COLUMN "typeId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "roleId" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "judges" ADD CONSTRAINT "judges_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settingsEvent" ADD CONSTRAINT "settingsEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partisipantsIndividual" ADD CONSTRAINT "partisipantsIndividual_settingsEventId_fkey" FOREIGN KEY ("settingsEventId") REFERENCES "settingsEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raitingIndividual" ADD CONSTRAINT "raitingIndividual_partisipantId_fkey" FOREIGN KEY ("partisipantId") REFERENCES "partisipantsIndividual"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partisipantsGroup" ADD CONSTRAINT "partisipantsGroup_settingsEventId_fkey" FOREIGN KEY ("settingsEventId") REFERENCES "settingsEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raitingGroup" ADD CONSTRAINT "raitingGroup_partisipantGroupId_fkey" FOREIGN KEY ("partisipantGroupId") REFERENCES "partisipantsGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

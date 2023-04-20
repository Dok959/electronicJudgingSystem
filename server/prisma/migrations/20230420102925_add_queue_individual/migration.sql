-- CreateTable
CREATE TABLE "queuePartisipantsIndividual" (
    "id" SERIAL NOT NULL,
    "partisipantId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "queue" INTEGER NOT NULL,

    CONSTRAINT "queuePartisipantsIndividual_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "queuePartisipantsIndividual" ADD CONSTRAINT "queuePartisipantsIndividual_partisipantId_fkey" FOREIGN KEY ("partisipantId") REFERENCES "partisipantsIndividual"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queuePartisipantsIndividual" ADD CONSTRAINT "queuePartisipantsIndividual_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

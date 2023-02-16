-- CreateEnum
CREATE TYPE "roles" AS ENUM ('Пользователь', 'Судья', 'Администратор');

-- CreateEnum
CREATE TYPE "ranks" AS ENUM ('Мастер спорта', 'Кандидат в мастера спорта', '1 разряд', '2 разряд', '3 разряд', '1 юношеский', '2 юношеский', '3 юношеский', 'Без разряда');

-- CreateEnum
CREATE TYPE "items" AS ENUM ('Мяч', 'Лента', 'Обруч', 'Булавы', 'Скакалка', 'Без предмета');

-- CreateEnum
CREATE TYPE "types" AS ENUM ('Индивидуальное', 'Групповое');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sirname" TEXT NOT NULL,
    "patronymic" TEXT,
    "role" "roles" DEFAULT 'Пользователь',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "athletes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sirname" TEXT NOT NULL,
    "patronymic" TEXT,
    "dateOfBirth" DATE,
    "rank" "ranks" DEFAULT 'Без разряда',
    "trainerId" INTEGER,

    CONSTRAINT "athletes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startDateTime" TIMESTAMPTZ,
    "duration" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "judges" (
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "judges_pkey" PRIMARY KEY ("eventId","userId")
);

-- CreateTable
CREATE TABLE "settingsEvent" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "type" "types" DEFAULT 'Индивидуальное',
    "rank" "ranks" DEFAULT 'Без разряда',

    CONSTRAINT "settingsEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partisipantsIndividual" (
    "id" SERIAL NOT NULL,
    "settingsEventId" INTEGER NOT NULL,
    "athleteId" INTEGER NOT NULL,

    CONSTRAINT "partisipantsIndividual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raitingIndividual" (
    "id" SERIAL NOT NULL,
    "partisipantId" INTEGER NOT NULL,
    "rank" "items" NOT NULL DEFAULT 'Без предмета',
    "score" INTEGER NOT NULL,

    CONSTRAINT "raitingIndividual_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groups" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "athletesGroup" (
    "groupId" INTEGER NOT NULL,
    "athleteId" INTEGER NOT NULL,

    CONSTRAINT "athletesGroup_pkey" PRIMARY KEY ("groupId","athleteId")
);

-- CreateTable
CREATE TABLE "partisipantsGroup" (
    "id" SERIAL NOT NULL,
    "settingsEventId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,

    CONSTRAINT "partisipantsGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raitingGroup" (
    "id" SERIAL NOT NULL,
    "partisipantGroupId" INTEGER NOT NULL,
    "rank" "items" NOT NULL DEFAULT 'Без предмета',
    "score" INTEGER NOT NULL,

    CONSTRAINT "raitingGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "athletes" ADD CONSTRAINT "athletes_trainerId_fkey" FOREIGN KEY ("trainerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "judges" ADD CONSTRAINT "judges_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "judges" ADD CONSTRAINT "judges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settingsEvent" ADD CONSTRAINT "settingsEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partisipantsIndividual" ADD CONSTRAINT "partisipantsIndividual_settingsEventId_fkey" FOREIGN KEY ("settingsEventId") REFERENCES "settingsEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partisipantsIndividual" ADD CONSTRAINT "partisipantsIndividual_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raitingIndividual" ADD CONSTRAINT "raitingIndividual_partisipantId_fkey" FOREIGN KEY ("partisipantId") REFERENCES "partisipantsIndividual"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "athletesGroup" ADD CONSTRAINT "athletesGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "athletesGroup" ADD CONSTRAINT "athletesGroup_athleteId_fkey" FOREIGN KEY ("athleteId") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partisipantsGroup" ADD CONSTRAINT "partisipantsGroup_settingsEventId_fkey" FOREIGN KEY ("settingsEventId") REFERENCES "settingsEvent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "partisipantsGroup" ADD CONSTRAINT "partisipantsGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raitingGroup" ADD CONSTRAINT "raitingGroup_partisipantGroupId_fkey" FOREIGN KEY ("partisipantGroupId") REFERENCES "partisipantsGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

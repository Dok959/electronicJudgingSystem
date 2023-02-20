/*
  Warnings:

  - You are about to drop the column `rank` on the `athletes` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `raitingGroup` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `raitingIndividual` table. All the data in the column will be lost.
  - You are about to drop the column `rank` on the `settingsEvent` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `settingsEvent` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `raitingGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `raitingIndividual` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `settingsEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "athletes" DROP COLUMN "rank",
ADD COLUMN     "rankId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "raitingGroup" DROP COLUMN "rank",
ADD COLUMN     "itemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "raitingIndividual" DROP COLUMN "rank",
ADD COLUMN     "itemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "settingsEvent" DROP COLUMN "rank",
DROP COLUMN "type",
ADD COLUMN     "rankId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role",
ADD COLUMN     "roleId" INTEGER NOT NULL DEFAULT 1;

-- DropEnum
DROP TYPE "items";

-- DropEnum
DROP TYPE "ranks";

-- DropEnum
DROP TYPE "roles";

-- DropEnum
DROP TYPE "types";

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ranks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ranks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "athletes" ADD CONSTRAINT "athletes_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "ranks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settingsEvent" ADD CONSTRAINT "settingsEvent_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "settingsEvent" ADD CONSTRAINT "settingsEvent_rankId_fkey" FOREIGN KEY ("rankId") REFERENCES "ranks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raitingIndividual" ADD CONSTRAINT "raitingIndividual_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "raitingGroup" ADD CONSTRAINT "raitingGroup_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

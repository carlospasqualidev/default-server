/*
  Warnings:

  - You are about to drop the `usersAccesses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_personId_fkey";

-- DropForeignKey
ALTER TABLE "usersAccesses" DROP CONSTRAINT "usersAccesses_accessId_fkey";

-- DropForeignKey
ALTER TABLE "usersAccesses" DROP CONSTRAINT "usersAccesses_userId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "personId" DROP NOT NULL;

-- DropTable
DROP TABLE "usersAccesses";

-- CreateTable
CREATE TABLE "userAccesses" (
    "id" TEXT NOT NULL,
    "accessId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userAccesses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userAccesses_id_key" ON "userAccesses"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_personId_fkey" FOREIGN KEY ("personId") REFERENCES "persons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAccesses" ADD CONSTRAINT "userAccesses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userAccesses" ADD CONSTRAINT "userAccesses_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "accesses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

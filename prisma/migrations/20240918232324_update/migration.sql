/*
  Warnings:

  - Added the required column `Priority` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "Priority" INTEGER NOT NULL,
ADD COLUMN     "Status" TEXT NOT NULL;

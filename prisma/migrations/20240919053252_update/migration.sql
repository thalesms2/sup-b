/*
  Warnings:

  - You are about to drop the column `Priority` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `Status` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `priority` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "Priority",
DROP COLUMN "Status",
ADD COLUMN     "priority" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

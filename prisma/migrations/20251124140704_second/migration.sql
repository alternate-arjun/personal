/*
  Warnings:

  - You are about to drop the column `actorId` on the `code_to_link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "code_to_link" DROP CONSTRAINT "code_to_link_actorId_fkey";

-- DropIndex
DROP INDEX "code_to_link_actorId_key";

-- AlterTable
ALTER TABLE "code_to_link" DROP COLUMN "actorId";

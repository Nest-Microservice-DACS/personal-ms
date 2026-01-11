/*
  Warnings:

  - You are about to drop the column `estado` on the `Personal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "estado",
ADD COLUMN     "status" "PersonalEstado" NOT NULL DEFAULT 'ACTIVE';

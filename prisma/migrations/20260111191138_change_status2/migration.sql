/*
  Warnings:

  - The `status` column on the `Personal` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PersonalStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "status",
ADD COLUMN     "status" "PersonalStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "PersonalEstado";

/*
  Warnings:

  - You are about to drop the column `date` on the `lesson` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `lesson` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."lesson" DROP COLUMN "date",
DROP COLUMN "end_time",
DROP COLUMN "start_time",
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "start_date" TIMESTAMP(3);

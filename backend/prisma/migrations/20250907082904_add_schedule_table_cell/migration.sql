/*
  Warnings:

  - You are about to drop the column `day_of_week` on the `schedule` table. All the data in the column will be lost.
  - Added the required column `date` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."schedule" DROP COLUMN "day_of_week",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

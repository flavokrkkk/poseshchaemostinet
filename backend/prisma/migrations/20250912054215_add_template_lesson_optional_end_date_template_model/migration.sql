/*
  Warnings:

  - The `daysOfWeek` column on the `template_lesson` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."template_lesson" DROP COLUMN "daysOfWeek",
ADD COLUMN     "daysOfWeek" JSONB;

/*
  Warnings:

  - Made the column `daysOfWeek` on table `template_lesson` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."template_lesson" ALTER COLUMN "daysOfWeek" SET NOT NULL,
ALTER COLUMN "daysOfWeek" SET DEFAULT '[]';

/*
  Warnings:

  - You are about to drop the column `endDate` on the `template_lesson` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `template_lesson` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."template_lesson" DROP COLUMN "endDate",
DROP COLUMN "startDate";

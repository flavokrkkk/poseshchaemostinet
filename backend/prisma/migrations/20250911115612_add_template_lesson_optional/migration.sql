/*
  Warnings:

  - Added the required column `endDate` to the `template_lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."template_lesson" ADD COLUMN     "endDate" TEXT NOT NULL,
ADD COLUMN     "startDate" TEXT,
ALTER COLUMN "typeLesson" DROP NOT NULL;

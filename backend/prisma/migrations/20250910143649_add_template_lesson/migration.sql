/*
  Warnings:

  - Made the column `end_date` on table `lesson` required. This step will fail if there are existing NULL values in that column.
  - Made the column `start_date` on table `lesson` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "public"."lesson" ALTER COLUMN "end_date" SET NOT NULL,
ALTER COLUMN "start_date" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."template_lesson" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "typeLesson" "public"."LessonType" NOT NULL,
    "room" TEXT,
    "teacherName" TEXT,
    "group_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "template_lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "template_lesson_group_id_idx" ON "public"."template_lesson"("group_id");

-- AddForeignKey
ALTER TABLE "public"."template_lesson" ADD CONSTRAINT "template_lesson_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

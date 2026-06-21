/*
  Warnings:

  - You are about to drop the column `group_id` on the `lesson` table. All the data in the column will be lost.
  - Added the required column `schedule_id` to the `lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."lesson" DROP CONSTRAINT "lesson_group_id_fkey";

-- AlterTable
ALTER TABLE "public"."lesson" DROP COLUMN "group_id",
ADD COLUMN     "schedule_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."schedule" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "day_of_week" TEXT NOT NULL,
    "time_start" TEXT NOT NULL,
    "time_end" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."schedule" ADD CONSTRAINT "schedule_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."lesson" ADD CONSTRAINT "lesson_schedule_id_fkey" FOREIGN KEY ("schedule_id") REFERENCES "public"."schedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `schedule_id` on the `lesson` table. All the data in the column will be lost.
  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `group_id` to the `lesson` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."lesson" DROP CONSTRAINT "lesson_schedule_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."schedule" DROP CONSTRAINT "schedule_group_id_fkey";

-- AlterTable
ALTER TABLE "public"."lesson" DROP COLUMN "schedule_id",
ADD COLUMN     "group_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."schedule";

-- AddForeignKey
ALTER TABLE "public"."lesson" ADD CONSTRAINT "lesson_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

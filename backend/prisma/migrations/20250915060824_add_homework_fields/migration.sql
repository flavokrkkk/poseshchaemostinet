-- CreateEnum
CREATE TYPE "public"."HomeworkStatus" AS ENUM ('ISSUED', 'SUBMITTED', 'GRADED');

-- AlterTable
ALTER TABLE "public"."lesson" ADD COLUMN     "homeworkFiles" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "homework_description" TEXT,
ADD COLUMN     "homework_due_date" TIMESTAMP(3),
ADD COLUMN     "homework_status" "public"."HomeworkStatus";

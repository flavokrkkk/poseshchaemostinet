-- AlterTable
ALTER TABLE "public"."lesson" ADD COLUMN     "template_lesson_id" TEXT;

-- AlterTable
ALTER TABLE "public"."template_lesson" ADD COLUMN     "daysOfWeek" "public"."DayOfWeek"[] DEFAULT ARRAY[]::"public"."DayOfWeek"[],
ADD COLUMN     "periodEnd" TIMESTAMP(3),
ADD COLUMN     "periodStart" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "public"."lesson" ADD CONSTRAINT "lesson_template_lesson_id_fkey" FOREIGN KEY ("template_lesson_id") REFERENCES "public"."template_lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "public"."Role" ADD VALUE 'ADMIN';

-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_creator_id_fkey";

-- DropTable
DROP TABLE "public"."Event";

-- CreateTable
CREATE TABLE "public"."event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "university_id" TEXT NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."event" ADD CONSTRAINT "event_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "public"."university"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

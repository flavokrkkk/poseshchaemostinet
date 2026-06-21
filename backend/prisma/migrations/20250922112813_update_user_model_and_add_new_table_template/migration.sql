/*
  Warnings:

  - You are about to drop the column `description` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `achievement` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `achievement` table. All the data in the column will be lost.
  - Added the required column `template_id` to the `achievement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."achievement" DROP COLUMN "description",
DROP COLUMN "image_url",
DROP COLUMN "title",
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "template_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."achievement_template" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "achievement_template_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."achievement" ADD CONSTRAINT "achievement_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."achievement_template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

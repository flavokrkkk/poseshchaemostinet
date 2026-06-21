/*
  Warnings:

  - You are about to drop the `user_to_group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."user_to_group" DROP CONSTRAINT "user_to_group_group_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_to_group" DROP CONSTRAINT "user_to_group_user_id_fkey";

-- DropTable
DROP TABLE "public"."user_to_group";

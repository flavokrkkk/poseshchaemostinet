/*
  Warnings:

  - Added the required column `gender` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."CustomerGender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "gender" "public"."CustomerGender" NOT NULL;

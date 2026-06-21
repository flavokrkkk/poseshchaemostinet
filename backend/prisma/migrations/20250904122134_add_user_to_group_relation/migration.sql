-- CreateTable
CREATE TABLE "public"."user_to_group" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,

    CONSTRAINT "user_to_group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_to_group_user_id_group_id_key" ON "public"."user_to_group"("user_id", "group_id");

-- AddForeignKey
ALTER TABLE "public"."user_to_group" ADD CONSTRAINT "user_to_group_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_to_group" ADD CONSTRAINT "user_to_group_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

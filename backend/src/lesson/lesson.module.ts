import { Module } from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { LessonController } from "./lesson.controller";
import { PrismaService } from "src/prisma.service";
import { FileModule } from "src/file/file.module";

@Module({
  imports: [FileModule],
  controllers: [LessonController],
  providers: [LessonService, PrismaService],
  exports: [LessonService],
})
export class LessonModule {}

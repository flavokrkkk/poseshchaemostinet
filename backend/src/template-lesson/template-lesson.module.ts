import { Module } from "@nestjs/common";
import { TemplateLessonService } from "./template-lesson.service";
import { TemplateLessonController } from "./template-lesson.controller";
import { PrismaService } from "src/prisma.service";
import { LessonModule } from "src/lesson/lesson.module";

@Module({
  imports: [LessonModule],
  controllers: [TemplateLessonController],
  providers: [TemplateLessonService, PrismaService],
})
export class TemplateLessonModule {}

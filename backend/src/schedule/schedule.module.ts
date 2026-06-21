import { Module } from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { ScheduleController } from "./schedule.controller";
import { PrismaService } from "src/prisma.service";
import { LessonModule } from "src/lesson/lesson.module";

@Module({
  imports: [LessonModule],
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
})
export class ScheduleModule {}

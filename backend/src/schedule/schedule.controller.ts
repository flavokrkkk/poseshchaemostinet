import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
  Query,
} from "@nestjs/common";
import { ScheduleService } from "./schedule.service";
import { Schedule } from "@prisma/client";
import { Auth } from "../auth/decorators/auth.decorator";
import { Roles } from "../user/decorators/role.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";

import { CreateScheduleDto } from "./dto/schedule.dto";
import { CreateRegularScheduleDto } from "./dto/create-regular-schedule.dto";
import { LessonService } from "src/lesson/lesson.service";

@Controller("schedule")
export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,

    private readonly lessonService: LessonService
  ) {}

  @Post()
  @Auth()
  @Roles("ELDER")
  @UsePipes(new ValidationPipe({ transform: true }))
  async createSchedule(
    @Body() dto: CreateScheduleDto,
    @CurrentUser("id") userId: string
  ): Promise<Schedule> {
    return this.scheduleService.createSchedule(dto, userId);
  }

  @Post("regular")
  @Auth()
  @Roles("ELDER")
  @UsePipes(new ValidationPipe({ transform: true }))
  async createRegularSchedule(
    @Body() dto: CreateRegularScheduleDto,
    @CurrentUser("id") userId: string
  ): Promise<{
    message: string;
    generatedLessons: number;
  }> {
    return this.lessonService.generateRegularLessons(dto, userId);
  }

  @Get(":groupId")
  @Auth()
  async getSchedules(
    @Param("groupId") groupId: string,
    @Query("date") date: string,
    @CurrentUser("id") userId: string
  ): Promise<Schedule | null> {
    return this.scheduleService.getSchedules(groupId, date, userId);
  }
}

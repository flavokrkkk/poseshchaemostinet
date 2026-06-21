import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Delete,
  Query,
} from "@nestjs/common";
import { TemplateLessonService } from "./template-lesson.service";
import { CreateTemplateLessonDto } from "./dto/create-template-lesson.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import { Roles } from "../user/decorators/role.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { TemplateLesson } from "@prisma/client";
import { LessonService } from "src/lesson/lesson.service";
import { DeleteRegularSlotsDto } from "src/lesson/dto/deleteRegularSlot.dto";

@Controller("template-lessons")
export class TemplateLessonController {
  constructor(
    private readonly templateLessonService: TemplateLessonService,
    private readonly lessonService: LessonService
  ) {}

  @Post()
  @Auth()
  @Roles("ELDER")
  @UsePipes(new ValidationPipe({ transform: true }))
  async createTemplateLesson(
    @Body() dto: CreateTemplateLessonDto,
    @CurrentUser("id") userId: string
  ): Promise<TemplateLesson> {
    return this.templateLessonService.create(dto, userId);
  }

  @Delete("/:lessonId")
  @Auth()
  @Roles("ELDER")
  @UsePipes(new ValidationPipe({ transform: true }))
  async removeTemplateLesson(
    @Param("lessonId") lessonId: string,
    @CurrentUser("id") userId: string
  ): Promise<TemplateLesson> {
    return this.templateLessonService.deleteTemplateLesson(lessonId, userId);
  }

  @Get("group/:groupId")
  @Auth()
  async getTemplateLessonsByGroup(
    @Param("groupId") groupId: string,
    @CurrentUser("id") userId: string
  ): Promise<TemplateLesson[]> {
    return this.templateLessonService.getByGroup(groupId, userId);
  }

  @Get("cells/:templateLessonId")
  @Roles("ELDER")
  @Auth()
  async getCalendar(@Param("templateLessonId") templateLessonId: string) {
    return this.templateLessonService.generateCalendarCells(templateLessonId);
  }

  @Delete(":id/regular-slot")
  @Auth()
  @Roles("ELDER")
  async deleteRegularSlot(
    @Body() dto: DeleteRegularSlotsDto,
    @CurrentUser("id") userId: string
  ): Promise<{ message: string; deletedLessons: number }> {
    console.log(dto);
    return this.lessonService.deleteRegularSlot(dto, userId);
  }
}

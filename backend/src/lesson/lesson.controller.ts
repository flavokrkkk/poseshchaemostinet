import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { Lesson, Role } from "@prisma/client";
import { Auth } from "../auth/decorators/auth.decorator";
import { Roles } from "../user/decorators/role.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("lesson")
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @Auth()
  @Roles("ELDER")
  @UsePipes(new ValidationPipe({ transform: true }))
  async createLesson(
    @Body() dto: CreateLessonDto,
    @CurrentUser("id") userId: string
  ): Promise<Lesson> {
    return this.lessonService.createLesson(dto, userId);
  }

  @Get(":groupId")
  @Auth()
  async getLessons(
    @Param("groupId") groupId: string,
    @Query("date") date: string
  ): Promise<Lesson[]> {
    return this.lessonService.getLessons(groupId, date);
  }

  @Get("detail/:lessonId")
  @Auth()
  async getLessonDetail(@Param("lessonId") lessonId: string) {
    return this.lessonService.getLessonById(lessonId);
  }

  @Patch(":lessonId")
  @Auth()
  async updateLesson(
    @Param("lessonId") lessonId: string,
    @Body() dto: UpdateLessonDto,
    @CurrentUser("id") userId: string
  ) {
    return this.lessonService.updateLesson(lessonId, dto, userId);
  }

  @Delete(":lessonId")
  @Auth()
  async deleteLesson(
    @Param("lessonId") lessonId: string,
    @CurrentUser("id") userId: string
  ): Promise<void> {
    return this.lessonService.deleteLesson(lessonId, userId);
  }

  @Post(":id/upload-homework")
  @Roles(Role.ELDER)
  @Auth()
  @UseInterceptors(
    FilesInterceptor("files", 10, {
      limits: { fileSize: 10 * 1024 * 1024 },
    })
  )
  async uploadHomeworkFiles(
    @Param("id") lessonId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser("id") userId: string
  ) {
    return this.lessonService.uploadHomeworkFiles(lessonId, files, userId);
  }
}

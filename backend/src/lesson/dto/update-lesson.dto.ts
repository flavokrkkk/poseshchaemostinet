import {
  IsString,
  IsOptional,
  IsEnum,
  IsArray,
  IsDateString,
} from "class-validator";
import { LessonType, HomeworkStatus } from "@prisma/client";

export class UpdateLessonDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsEnum(LessonType)
  type?: LessonType;

  @IsOptional()
  @IsString()
  room?: string;

  @IsOptional()
  @IsString()
  teacherName?: string;

  @IsOptional()
  @IsString()
  homeworkDescription?: string;

  @IsOptional()
  @IsDateString()
  homeworkDueDate?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  homeworkFiles?: string[];

  @IsOptional()
  @IsEnum(HomeworkStatus)
  homeworkStatus?: HomeworkStatus;
}

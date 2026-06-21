import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { LessonType } from "@prisma/client";

export class CreateLessonDto {
  @ApiProperty({ description: "Schedule ID", example: "schedule-123" })
  @IsString()
  @IsNotEmpty()
  scheduleId: string;

  @ApiProperty({ description: "Lesson name", example: "Math" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "Start date", example: "09:00" })
  @IsString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: "End date", example: "2025-09-04" })
  @IsString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ enum: LessonType, description: "Lesson type" })
  @IsEnum(LessonType)
  type: LessonType;

  @ApiProperty({ description: "Room", example: "101", required: false })
  @IsOptional()
  @IsString()
  room?: string;

  @ApiProperty({
    description: "Teacher name",
    example: "John Doe",
    required: false,
  })
  @IsOptional()
  @IsString()
  teacherName?: string;
}

import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  Matches,
  ValidateNested,
} from "class-validator";
import { DayOfWeek, LessonType } from "@prisma/client";
import { Type } from "class-transformer";

export class DayOfWeekSlotDto {
  @ApiProperty({ enum: DayOfWeek, description: "Day of week" })
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  @ApiProperty({ description: "Start time", example: "09:00" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "timeStart must be HH:MM",
  })
  timeStart: string;

  @ApiProperty({ description: "End time", example: "10:00" })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "timeEnd must be HH:MM",
  })
  timeEnd: string;
}

export class CreateRegularScheduleDto {
  @ApiProperty({ description: "Template lesson ID", example: "template-123" })
  @IsString()
  @IsNotEmpty()
  templateLessonId: string;

  @ApiProperty({
    type: [DayOfWeekSlotDto],
    description: "Days and time slots of the week",
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayOfWeekSlotDto)
  daysOfWeek: DayOfWeekSlotDto[];

  @ApiProperty({ description: "Period start", example: "2025-09-01" })
  @IsString()
  @IsNotEmpty()
  periodStart: string;

  @ApiProperty({ description: "Period end", example: "2025-12-31" })
  @IsString()
  @IsNotEmpty()
  periodEnd: string;

  @ApiProperty({ enum: LessonType, description: "Lesson type" })
  @IsEnum(LessonType)
  type: LessonType;
}

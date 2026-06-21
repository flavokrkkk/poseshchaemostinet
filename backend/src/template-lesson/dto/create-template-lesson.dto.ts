import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  Matches,
} from "class-validator";
import { LessonType } from "@prisma/client";

export class CreateTemplateLessonDto {
  @ApiProperty({ description: "Group ID", example: "group-123" })
  @IsString()
  @IsNotEmpty()
  groupId: string;

  @ApiProperty({ description: "Lesson name", example: "Math" })
  @IsString()
  @IsNotEmpty()
  name: string;

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

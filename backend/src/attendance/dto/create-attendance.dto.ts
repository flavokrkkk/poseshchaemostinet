import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { AttendanceType } from "@prisma/client";

export class CreateAttendanceDto {
  @ApiProperty({ description: "Lesson ID", example: "lesson-123" })
  @IsString()
  @IsNotEmpty()
  lessonId: string;

  @ApiProperty({ description: "User ID", example: "user-456" })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ enum: AttendanceType, description: "Attendance status" })
  @IsEnum(AttendanceType)
  status: AttendanceType;
}

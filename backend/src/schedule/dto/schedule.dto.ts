import { IsString, IsNotEmpty, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateScheduleDto {
  @ApiProperty({ description: "Group ID", example: "group-123" })
  @IsString()
  @IsNotEmpty()
  groupId: string;

  @ApiProperty({
    description: "Day of the week (e.g., MONDAY)",
    example: "MONDAY",
  })
  @ApiProperty({ description: "Date", example: "2025-09-04" })
  @IsDateString()
  date: string;

  @ApiProperty({ description: "Start time", example: "09:00" })
  @IsString()
  @IsNotEmpty()
  timeStart: string;

  @ApiProperty({ description: "End time", example: "17:00" })
  @IsString()
  @IsNotEmpty()
  timeEnd: string;
}

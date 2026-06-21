import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { DayOfWeekSlotDto } from "src/schedule/dto/create-regular-schedule.dto";

export class DeleteRegularSlotsDto {
  @ApiProperty({
    description: "ID of the template lesson",
    example: "cmffed54u0001tf5cn8we4h0h",
  })
  @IsNotEmpty({ message: "templateLessonId is required" })
  @IsString({ message: "templateLessonId must be a string" })
  templateLessonId: string;

  @ApiProperty({
    type: [DayOfWeekSlotDto],
    description: "Days and time slots of the week to delete",
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DayOfWeekSlotDto)
  daysOfWeek: DayOfWeekSlotDto[];
}

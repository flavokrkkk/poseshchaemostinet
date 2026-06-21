import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
  @ApiProperty({ description: "Event title", example: "Seminar" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Event description",
    example: "Workshop on AI",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "Event date", example: "2025-09-10T10:00:00Z" })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: "University ID", example: "uni-123" })
  @IsString()
  @IsNotEmpty()
  universityId: string;
}

import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNewsDto {
  @ApiProperty({ description: "News title", example: "Seminar" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Event description",
    example: "Workshop on AI",
    required: false,
  })
  @IsString()
  content: string;

  @ApiProperty({ description: "University ID", example: "uni-123" })
  @IsString()
  @IsNotEmpty()
  universityId: string;
}

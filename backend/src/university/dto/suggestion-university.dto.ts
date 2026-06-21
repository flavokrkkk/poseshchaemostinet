import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class SuggestionUniversityDto {
  @IsString()
  @IsNotEmpty()
  query: string;

  @IsNumber()
  @Min(1)
  count: number;
}

import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateAchievementTemplateDto {
  @IsNotEmpty({ message: "Title is required" })
  @IsString({ message: "Title must be a string" })
  title: string;

  @IsOptional()
  @IsString({ message: "Description must be a string" })
  description?: string;

  @IsNotEmpty({ message: "Image URL is required" })
  @IsString({ message: "Image URL must be a string" })
  imageUrl: string;
}

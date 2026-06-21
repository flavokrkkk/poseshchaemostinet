import { IsString, IsNotEmpty } from "class-validator";

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  universityId: string;

  @IsString()
  elderId: string;
}

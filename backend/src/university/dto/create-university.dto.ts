import { Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";

class UniversityDataDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  inn: string;

  @IsString()
  @IsNotEmpty()
  orgn: string;

  @IsString()
  @IsNotEmpty()
  okpo: string;
}

export class CreateUniversityDto {
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsString()
  @IsNotEmpty()
  unrestricted_value: string;

  @ValidateNested()
  @Type(() => UniversityDataDto)
  @IsNotEmpty()
  data: UniversityDataDto;
}

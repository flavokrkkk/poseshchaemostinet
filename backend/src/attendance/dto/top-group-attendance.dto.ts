import { IsEnum, IsOptional, IsString } from "class-validator";
import { AttendanceType } from "@prisma/client";

export class GetTopGroupsDto {
  @IsEnum(AttendanceType)
  attendanceType: AttendanceType;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}

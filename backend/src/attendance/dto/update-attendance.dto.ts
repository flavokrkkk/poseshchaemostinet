import { IsEnum, IsString, IsNotEmpty } from "class-validator";
import { AttendanceType } from "@prisma/client";

export class UpdateAttendanceDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(AttendanceType)
  status: AttendanceType;
}

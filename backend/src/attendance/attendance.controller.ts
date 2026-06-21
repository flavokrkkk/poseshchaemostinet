import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  Patch,
} from "@nestjs/common";
import { Attendance, AttendanceType } from "@prisma/client";
import { Auth } from "../auth/decorators/auth.decorator";
import { Roles } from "../user/decorators/role.decorator";
import { CurrentUser } from "../auth/decorators/user.decorator";
import {
  AttendanceService,
  AttendanceTypeCell,
} from "src/attendance/attendance.service";
import { CreateAttendanceDto } from "src/attendance/dto/create-attendance.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import { GetTopGroupsDto } from "./dto/top-group-attendance.dto";

@Controller("attendance")
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @Auth()
  @Roles("ELDER")
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAttendance(
    @Body() dto: CreateAttendanceDto,
    @CurrentUser("id") userId: string
  ): Promise<Attendance> {
    return this.attendanceService.createAttendance(dto, userId);
  }

  @Get("user-analytics")
  @Auth()
  @Roles("STUDENT", "ELDER")
  @UsePipes(new ValidationPipe({ transform: true }))
  async getUserAnalytics(
    @CurrentUser("id") userId: string,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string
  ): Promise<AttendanceTypeCell[]> {
    return this.attendanceService.getUserAnalytics(userId, startDate, endDate);
  }

  @Patch(":lessonId")
  @Auth()
  @Roles("ELDER")
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateAttendance(
    @Param("lessonId") lessonId: string,
    @Body() dto: UpdateAttendanceDto,
    @CurrentUser("id") userId: string
  ): Promise<Attendance> {
    return this.attendanceService.updateAttendance(lessonId, dto, userId);
  }

  @Get("group-analytics/:groupId")
  @Auth()
  @Roles("ELDER")
  @UsePipes(new ValidationPipe({ transform: true }))
  async getGroupAnalytics(
    @Param("groupId") groupId: string,
    @Query("startDate") startDate?: string,
    @Query("endDate") endDate?: string,
    @Query("attendanceType") attendanceType?: AttendanceType
  ): Promise<{
    analytics: AttendanceTypeCell[];
    topStudents?: { userId: string; fullName: string; count: number }[];
  }> {
    return this.attendanceService.getGroupAnalytics(
      groupId,
      startDate,
      endDate,
      attendanceType
    );
  }

  @Get("top-groups/:universityId")
  @Auth()
  @Roles("ELDER")
  async getTopGroupsByAttendance(
    @Param("universityId") universityId: string,
    @Query() dto: GetTopGroupsDto
  ): Promise<{ groupId: string; groupName: string; count: number }[]> {
    return this.attendanceService.getTopGroupsByAttendance(
      universityId,
      dto.attendanceType,
      dto.startDate,
      dto.endDate
    );
  }
}

import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { Attendance, AttendanceType } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";

export type AttendanceTypeCell = {
  visitors: number;
  fill: string;
  attendance: string;
  attendanceType: AttendanceType;
};

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async updateAttendance(
    lessonId: string,
    dto: UpdateAttendanceDto,
    userId: string
  ): Promise<Attendance> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        schedule: { include: { group: { include: { elder: true } } } },
      },
    });

    if (!lesson || lesson.schedule.group.elderId !== userId) {
      throw new HttpException(
        "Only ELDER can update attendance",
        HttpStatus.FORBIDDEN
      );
    }

    const existingAttendance = await this.prisma.attendance.findFirst({
      where: {
        lessonId: lessonId,
        userId: dto.userId,
      },
    });

    if (!existingAttendance) {
      throw new HttpException(
        "Attendance record not found for this user and lesson",
        HttpStatus.NOT_FOUND
      );
    }

    return this.prisma.attendance.update({
      where: { id: existingAttendance.id },
      data: { status: dto.status },
      include: {
        user: true,
      },
    });
  }

  async createAttendance(
    dto: CreateAttendanceDto,
    userId: string
  ): Promise<Attendance> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: dto.lessonId },
      include: {
        schedule: { include: { group: { include: { elder: true } } } },
      },
    });
    if (!lesson || lesson.schedule.group.elderId !== userId) {
      throw new HttpException(
        "Only ELDER can mark attendance",
        HttpStatus.FORBIDDEN
      );
    }

    return this.prisma.attendance.create({
      data: {
        lessonId: dto.lessonId,
        userId: dto.userId,
        status: dto.status,
      },
    });
  }

  async getUserAnalytics(
    userId: string,
    startDate?: string,
    endDate?: string
  ): Promise<AttendanceTypeCell[]> {
    const { start, end } = this.getDefaultDateRange(startDate, endDate);

    if (startDate && isNaN(new Date(startDate).getTime())) {
      throw new BadRequestException("Invalid startDate format");
    }
    if (endDate && isNaN(new Date(endDate).getTime())) {
      throw new BadRequestException("Invalid endDate format");
    }

    const attendances = await this.prisma.attendance.findMany({
      where: {
        userId,
        lesson: {
          startDate: {
            gte: start,
            lte: end,
          },
        },
      },
    });

    return this.calculateStats(attendances);
  }

  async getGroupAnalytics(
    groupId: string,
    startDate?: string,
    endDate?: string,
    attendanceType?: AttendanceType
  ): Promise<{
    analytics: AttendanceTypeCell[];
    topStudents?: { userId: string; fullName: string; count: number }[];
  }> {
    const { start, end } = this.getDefaultDateRange(startDate, endDate);

    if (startDate && isNaN(new Date(startDate).getTime())) {
      throw new BadRequestException("Invalid startDate format");
    }
    if (endDate && isNaN(new Date(endDate).getTime())) {
      throw new BadRequestException("Invalid endDate format");
    }

    const attendances = await this.prisma.attendance.findMany({
      where: {
        lesson: {
          schedule: { groupId },
          startDate: {
            gte: start,
            lte: end,
          },
        },
      },
      include: { user: true },
    });

    const analytics = this.calculateStats(attendances);

    let topStudents: { userId: string; fullName: string; count: number }[] = [];
    if (attendanceType) {
      const attendanceByUser = attendances.reduce(
        (acc, attendance) => {
          if (attendance.status === attendanceType) {
            const user = attendance.user;
            acc[user.id] = acc[user.id] || {
              userId: user.id,
              fullName: user.fullName,
              count: 0,
            };
            acc[user.id].count += 1;
          }
          return acc;
        },
        {} as {
          [key: string]: { userId: string; fullName: string; count: number };
        }
      );

      topStudents = Object.values(attendanceByUser)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
    }

    return {
      analytics,
      topStudents: topStudents.length > 0 ? topStudents : undefined,
    };
  }

  private getDefaultDateRange(
    startDate?: string,
    endDate?: string
  ): { start: Date; end: Date } {
    if (startDate && endDate) {
      return { start: new Date(startDate), end: new Date(endDate) };
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    let startYear = currentYear;
    let endYear = currentYear + 1;

    if (currentMonth < 9) {
      startYear = currentYear - 1;
      endYear = currentYear;
    }

    const start = new Date(`${startYear}-09-01T00:00:00.000Z`);
    const end = new Date(`${endYear}-07-01T23:59:59.999Z`);

    return { start, end };
  }

  private calculateStats(attendances: any[]): AttendanceTypeCell[] {
    return [
      {
        visitors: attendances.filter((a) => a.status === "PRESENT").length,
        fill: "#3B82F6",
        attendance: "Присутствовал",
        attendanceType: AttendanceType.PRESENT,
      },
      {
        visitors: attendances.filter((a) => a.status === "ABSENT").length,
        fill: "#FF5A5F",
        attendance: "Прогул",
        attendanceType: AttendanceType.ABSENT,
      },
      {
        visitors: attendances.filter((a) => a.status === "EXCUSED").length,
        fill: "#DFE1EB",
        attendance: "Отсутствовал по уважительной причине",
        attendanceType: AttendanceType.EXCUSED,
      },
      {
        visitors: attendances.filter((a) => a.status === "EMPTIES").length,
        fill: "#008000",
        attendance: "Отметка не стоит",
        attendanceType: AttendanceType.EMPTIES,
      },
    ];
  }

  async getTopGroupsByAttendance(
    universityId: string,
    attendanceType: AttendanceType,
    startDate?: string,
    endDate?: string
  ): Promise<{ groupId: string; groupName: string; count: number }[]> {
    if (startDate && isNaN(new Date(startDate).getTime())) {
      throw new BadRequestException("Invalid startDate format");
    }
    if (endDate && isNaN(new Date(endDate).getTime())) {
      throw new BadRequestException("Invalid endDate format");
    }

    const { start, end } = this.getDefaultDateRange(startDate, endDate);

    const attendances = await this.prisma.attendance.findMany({
      where: {
        lesson: {
          schedule: {
            group: {
              universityId,
            },
          },
          startDate: {
            gte: start,
            lte: end,
          },
        },
        status: attendanceType,
      },
      include: {
        lesson: {
          include: {
            schedule: {
              include: {
                group: true,
              },
            },
          },
        },
      },
    });

    const attendanceByGroup = attendances.reduce(
      (acc, attendance) => {
        const group = attendance.lesson.schedule.group;
        const groupId = group.id;
        const groupName = group.name;

        acc[groupId] = acc[groupId] || {
          groupId,
          groupName,
          count: 0,
        };
        acc[groupId].count += 1;

        return acc;
      },
      {} as {
        [key: string]: { groupId: string; groupName: string; count: number };
      }
    );

    const topGroups = Object.values(attendanceByGroup)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return topGroups;
  }
}

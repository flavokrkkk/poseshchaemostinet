import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from "@nestjs/common";
import { Schedule } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateScheduleDto } from "./dto/schedule.dto";
import { endOfDay, startOfDay } from "date-fns";

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  async createSchedule(
    dto: CreateScheduleDto,
    userId: string
  ): Promise<Schedule> {
    const group = await this.prisma.group.findUnique({
      where: { id: dto.groupId },
      include: { elder: true },
    });
    if (!group || group.elderId !== userId) {
      throw new HttpException(
        "Only ELDER can create schedule",
        HttpStatus.FORBIDDEN
      );
    }

    const existingSchedule = await this.prisma.schedule.findFirst({
      where: {
        groupId: dto.groupId,
        date: new Date(dto.date),
      },
    });

    if (existingSchedule) {
      return existingSchedule;
    }

    return this.prisma.schedule.create({
      data: {
        groupId: dto.groupId,
        date: new Date(dto.date),
        timeStart: dto.timeStart,
        timeEnd: dto.timeEnd,
      },
    });
  }
  async getSchedules(
    groupId: string,
    date: string,
    userId: string
  ): Promise<Schedule | null> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException(
        "Invalid date format (expected YYYY-MM-DD)"
      );
    }
    const dayStart = startOfDay(parsedDate);
    const dayEnd = endOfDay(parsedDate);

    const schedule = await this.prisma.schedule.findFirst({
      where: {
        groupId,
        date: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
      include: {
        lessons: {
          where: {
            startDate: {
              gte: dayStart,
              lte: dayEnd,
            },
          },
          orderBy: {
            startDate: "asc",
          },
          include: {
            attendance: {
              where: {
                userId: userId,
              },
            },
          },
        },
      },
    });

    return schedule;
  }
}

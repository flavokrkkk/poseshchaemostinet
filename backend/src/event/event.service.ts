import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { Event } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(dto: CreateEventDto, userId: string): Promise<Event> {
    const university = await this.prisma.university.findUnique({
      where: { id: dto.universityId },
    });
    if (!university) {
      throw new NotFoundException("University not found");
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user || user.role !== "ADMIN") {
      throw new HttpException(
        "Only ADMIN can create events",
        HttpStatus.FORBIDDEN
      );
    }

    return this.prisma.event.create({
      data: {
        title: dto.title,
        description: dto.description,
        date: new Date(dto.date),
        universityId: dto.universityId,
      },
    });
  }

  async getEvents(universityId: string, date: string): Promise<Event[]> {
    const parsedDate = new Date(date);
    parsedDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(parsedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    return this.prisma.event.findMany({
      where: {
        date: {
          gte: parsedDate,
          lt: nextDay,
        },
        universityId,
      },
    });
  }
}

import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateTemplateLessonDto } from "./dto/create-template-lesson.dto";
import { LessonType, TemplateLesson } from "@prisma/client";

export type SlotType = "active" | "select" | "conflict" | null;

export interface CalendarCell {
  day: string;
  timeStart: string;
  timeEnd: string;
  isActive: boolean;
  lessonName: string | undefined;
  slotType: "active" | "select" | null;
  dayIndex: number;
  timeIndex: number;
  originalSlotType: SlotType;
  typeLesson: LessonType | undefined;
}

export const dayOfWeeks = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const timeSlots = [
  { start: "8:30", end: "10:10" },
  { start: "10:20", end: "11:40" },
  { start: "12:30", end: "14:00" },
  { start: "14:10", end: "15:40" },
  { start: "15:50", end: "17:20" },
  { start: "17:30", end: "19:00" },
];

@Injectable()
export class TemplateLessonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: CreateTemplateLessonDto,
    userId: string
  ): Promise<TemplateLesson> {
    const group = await this.prisma.group.findUnique({
      where: { id: dto.groupId },
      include: { elder: true },
    });
    if (!group || group.elderId !== userId) {
      throw new HttpException(
        "Only ELDER can create template lessons",
        HttpStatus.FORBIDDEN
      );
    }

    return this.prisma.templateLesson.create({
      data: {
        name: dto.name,
        room: dto.room,
        teacherName: dto.teacherName,
        groupId: dto.groupId,
      },
    });
  }

  async getByGroup(groupId: string, userId: string): Promise<TemplateLesson[]> {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
      include: { elder: true, users: true },
    });
    if (
      !group ||
      (group.elderId !== userId && !group.users.some((u) => u.id === userId))
    ) {
      throw new HttpException(
        "Access denied to group templates",
        HttpStatus.FORBIDDEN
      );
    }

    return this.prisma.templateLesson.findMany({
      where: { groupId },
    });
  }

  async deleteTemplateLesson(lessonId: string, userId: string) {
    const lesson = await this.prisma.templateLesson.findUnique({
      where: { id: lessonId },
      include: {
        group: true,
      },
    });
    if (!lesson || lesson.group.elderId !== userId) {
      throw new HttpException(
        "Only ELDER can delete lessons",
        HttpStatus.FORBIDDEN
      );
    }

    return await this.prisma.templateLesson.delete({
      where: {
        id: lessonId,
      },
    });
  }

  async generateCalendarCells(
    templateLessonId: string
  ): Promise<CalendarCell[][]> {
    const selectedLesson = await this.prisma.templateLesson.findUnique({
      where: { id: templateLessonId },
    });

    if (!selectedLesson) {
      throw new NotFoundException(
        `TemplateLesson ${templateLessonId} not found`
      );
    }

    return dayOfWeeks.map((day, dayIndex) => {
      return timeSlots.map((slot, timeIndex) => {
        let isActive = false;
        let lessonName: string | undefined;
        let typeLesson: LessonType | undefined;
        let slotType: SlotType = null;
        let originalSlotType: SlotType = null;

        const matchingSlot = (
          selectedLesson.daysOfWeek as {
            day: string;
            timeStart: string;
            timeEnd: string;
          }[]
        ).find(
          (d) =>
            d.day === day &&
            d.timeStart === slot.start &&
            d.timeEnd === slot.end
        );

        if (matchingSlot) {
          isActive = true;
          lessonName = selectedLesson.name;
          typeLesson = selectedLesson.typeLesson as LessonType;
          slotType = "active";
          originalSlotType = "active";
        }

        return {
          day,
          timeStart: slot.start,
          timeEnd: slot.end,
          isActive,
          lessonName,
          slotType,
          originalSlotType,
          dayIndex,
          timeIndex,
          typeLesson,
        };
      });
    });
  }
}

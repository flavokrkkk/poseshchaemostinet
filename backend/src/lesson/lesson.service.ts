import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { AttendanceType, DayOfWeek, Lesson } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import {
  addDays,
  endOfDay,
  getHours,
  getMinutes,
  set,
  startOfDay,
} from "date-fns";
import {
  CreateRegularScheduleDto,
  DayOfWeekSlotDto,
} from "src/schedule/dto/create-regular-schedule.dto";
import { DeleteRegularSlotsDto } from "./dto/deleteRegularSlot.dto";
import { normalizeTime } from "src/shared/lib/dateLib";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { FileService, FileStructure } from "src/file/file.service";

@Injectable()
export class LessonService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService
  ) {}

  async updateLesson(
    lessonId: string,
    dto: UpdateLessonDto,
    userId: string
  ): Promise<Lesson> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        schedule: { include: { group: { include: { elder: true } } } },
      },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }

    if (lesson.schedule.group.elderId !== userId) {
      throw new HttpException(
        "Only ELDER can update lessons",
        HttpStatus.FORBIDDEN
      );
    }

    if (dto.startDate || dto.endDate) {
      const startDate = dto.startDate
        ? new Date(dto.startDate)
        : lesson.startDate;
      const endDate = dto.endDate ? new Date(dto.endDate) : lesson.endDate;

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        throw new BadRequestException("Invalid startDate or endDate format");
      }

      if (startDate >= endDate) {
        throw new BadRequestException("startDate must be before endDate");
      }

      const overlappingLesson = await this.prisma.lesson.findFirst({
        where: {
          id: { not: lessonId },
          scheduleId: lesson.scheduleId,
          OR: [{ startDate: { lte: endDate }, endDate: { gte: startDate } }],
        },
      });

      if (overlappingLesson) {
        throw new BadRequestException(
          "Updated lesson time conflicts with an existing lesson"
        );
      }
    }

    if (dto.homeworkDueDate && isNaN(new Date(dto.homeworkDueDate).getTime())) {
      throw new BadRequestException("Invalid homeworkDueDate format");
    }

    const updatedLesson = await this.prisma.lesson.update({
      where: { id: lessonId },
      data: {
        name: dto.name,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        typeLesson: dto.type,
        room: dto.room,
        teacherName: dto.teacherName,
        homeworkFiles: dto.homeworkFiles,
        homeworkDescription: dto.homeworkDescription,
        homeworkDueDate: dto.homeworkDueDate
          ? new Date(dto.homeworkDueDate)
          : undefined,
        homeworkStatus: dto.homeworkStatus,
      },
      include: {
        attendance: { include: { user: true } },
      },
    });

    return updatedLesson;
  }

  async uploadHomeworkFiles(
    lessonId: string,
    files: Express.Multer.File[],
    userId: string
  ): Promise<Lesson> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        schedule: { include: { group: { include: { elder: true } } } },
      },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }

    if (lesson.schedule.group.elderId !== userId) {
      throw new HttpException(
        "Only ELDER can upload files",
        HttpStatus.FORBIDDEN
      );
    }

    const currentFiles =
      (lesson.homeworkFiles as unknown as FileStructure[]) || [];
    const newFileUrls = await this.fileService.uploadFiles(
      "lessons",
      lessonId,
      files
    );

    const updatedHomeworkFiles = [...currentFiles, ...newFileUrls];

    return this.prisma.lesson.update({
      where: { id: lessonId },
      data: {
        homeworkFiles: updatedHomeworkFiles as any,
      },
      include: {
        attendance: { include: { user: true } },
      },
    });
  }

  async createLesson(dto: CreateLessonDto, userId: string): Promise<Lesson> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id: dto.scheduleId },
      include: { group: { include: { elder: true, users: true } } },
    });
    if (!schedule || schedule.group.elderId !== userId) {
      throw new HttpException(
        "Only ELDER can create lessons",
        HttpStatus.FORBIDDEN
      );
    }

    const overlappingLesson = await this.prisma.lesson.findFirst({
      where: {
        scheduleId: dto.scheduleId,
        AND: [
          { startDate: { lt: dto.endDate } },
          { endDate: { gt: dto.startDate } },
        ],
      },
    });

    if (overlappingLesson) {
      throw new BadRequestException(
        "Урок пересекается с уже существующим по времени"
      );
    }

    const lesson = await this.prisma.lesson.create({
      data: {
        scheduleId: dto.scheduleId,
        name: dto.name,
        startDate: dto.startDate,
        endDate: dto.endDate,
        typeLesson: dto.type,
        room: dto.room,
        teacherName: dto.teacherName,
      },
    });

    if (!lesson) {
      throw new BadRequestException("Failed to create lesson");
    }

    const groupUsers = schedule.group.users;
    const attendanceData = groupUsers.map((user) => ({
      userId: user.id,
      lessonId: lesson.id,
      status: AttendanceType.EMPTIES,
    }));

    await this.prisma.attendance.createMany({
      data: attendanceData,
    });

    return lesson;
  }

  async getLessons(groupId: string, date: string): Promise<Lesson[]> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException(
        "Invalid date format (expected YYYY-MM-DD)"
      );
    }
    const dayStart = startOfDay(parsedDate);
    const dayEnd = endOfDay(parsedDate);

    return this.prisma.lesson.findMany({
      where: {
        schedule: { groupId },
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
          include: { user: true },
        },
      },
    });
  }

  async deleteLesson(id: string, userId: string): Promise<void> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id },
      include: {
        schedule: { include: { group: { include: { elder: true } } } },
      },
    });
    if (!lesson || lesson.schedule.group.elderId !== userId) {
      throw new HttpException(
        "Only ELDER can delete lessons",
        HttpStatus.FORBIDDEN
      );
    }

    await this.prisma.lesson.delete({
      where: { id },
    });
  }

  async getLessonById(lessonId: string): Promise<Lesson> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        attendance: {
          include: { user: true },
        },
      },
    });

    if (!lesson) {
      throw new NotFoundException(`Not Found lesson by ${lessonId}`);
    }

    return lesson;
  }

  async generateRegularLessons(
    dto: CreateRegularScheduleDto,
    userId: string
  ): Promise<{
    message: string;
    generatedLessons: number;
    conflictingSlots?: DayOfWeekSlotDto[];
  }> {
    const template = await this.prisma.templateLesson.findUnique({
      where: { id: dto.templateLessonId },
      include: { group: { include: { elder: true, users: true } } },
    });
    if (!template || template.group.elderId !== userId) {
      throw new HttpException(
        "Only ELDER can generate regular schedules",
        HttpStatus.FORBIDDEN
      );
    }

    const periodStart = new Date(dto.periodStart);
    const periodEnd = new Date(dto.periodEnd);
    if (periodEnd < periodStart) {
      throw new BadRequestException("periodEnd must be after periodStart");
    }

    if (dto.daysOfWeek.length === 0) {
      throw new BadRequestException("daysOfWeek must not be empty");
    }

    const days = dto.daysOfWeek.map((slot) => slot.day);
    const uniqueDays = new Set(days);
    if (uniqueDays.size !== days.length) {
      throw new BadRequestException(
        "Duplicate days in daysOfWeek are not allowed"
      );
    }

    for (const slot of dto.daysOfWeek) {
      const [startHour, startMinute] = slot.timeStart.split(":").map(Number);
      const [endHour, endMinute] = slot.timeEnd.split(":").map(Number);
      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;
      if (startMinutes >= endMinutes) {
        throw new BadRequestException(
          `Invalid time range for day ${slot.day}: start must be before end`
        );
      }
    }

    const parseTimeToMinutes = (time: string): number => {
      const [hour, minute] = time.split(":").map(Number);
      return hour * 60 + minute;
    };

    const timesOverlap = (
      start1: number,
      end1: number,
      start2: number,
      end2: number
    ): boolean => {
      return start1 < end2 && end1 > start2;
    };

    const existingSlotsByDay = new Map<
      DayOfWeek,
      { timeStart: string; timeEnd: string }[]
    >();
    (
      template.daysOfWeek as {
        day: DayOfWeek;
        timeStart: string;
        timeEnd: string;
      }[]
    ).forEach((slot) => {
      if (!existingSlotsByDay.has(slot.day)) {
        existingSlotsByDay.set(slot.day, []);
      }
      existingSlotsByDay
        .get(slot.day)!
        .push({ timeStart: slot.timeStart, timeEnd: slot.timeEnd });
    });

    const conflictingSlots: DayOfWeekSlotDto[] = [];
    const slotsToAdd = [...dto.daysOfWeek];

    for (const newSlot of dto.daysOfWeek) {
      const existingForDay = existingSlotsByDay.get(newSlot.day) || [];
      const newStartMin = parseTimeToMinutes(newSlot.timeStart);
      const newEndMin = parseTimeToMinutes(newSlot.timeEnd);

      let hasTemplateConflict = false;
      for (const exSlot of existingForDay) {
        const exStartMin = parseTimeToMinutes(exSlot.timeStart);
        const exEndMin = parseTimeToMinutes(exSlot.timeEnd);
        if (timesOverlap(newStartMin, newEndMin, exStartMin, exEndMin)) {
          hasTemplateConflict = true;
          break;
        }
      }

      if (hasTemplateConflict) {
        conflictingSlots.push(newSlot);
        continue;
      }

      let hasLessonConflict = false;
      let currentDate = new Date(periodStart);
      while (currentDate <= periodEnd && !hasLessonConflict) {
        if (this.getDayOfWeek(currentDate) === newSlot.day) {
          const [startHour, startMinute] = newSlot.timeStart
            .split(":")
            .map(Number);
          const [endHour, endMinute] = newSlot.timeEnd.split(":").map(Number);

          const startDateTime = set(currentDate, {
            hours: startHour,
            minutes: startMinute,
            seconds: 0,
            milliseconds: 0,
          });

          const endDateTime = set(currentDate, {
            hours: endHour,
            minutes: endMinute,
            seconds: 0,
            milliseconds: 0,
          });

          if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
            throw new BadRequestException(
              `Invalid date/time combination for ${currentDate.toISOString()} with slot ${newSlot.timeStart}-${newSlot.timeEnd}`
            );
          }

          const overlapping = await this.prisma.lesson.findFirst({
            where: {
              schedule: {
                groupId: template.groupId,
                date: {
                  gte: startOfDay(currentDate),
                  lte: endOfDay(currentDate),
                },
              },
              OR: [
                {
                  startDate: { lte: endDateTime },
                  endDate: { gte: startDateTime },
                },
              ],
            },
          });

          if (overlapping) {
            hasLessonConflict = true;
          }
        }
        currentDate = addDays(currentDate, 1);
      }

      if (hasLessonConflict) {
        conflictingSlots.push(newSlot);
      }
    }

    if (conflictingSlots.length > 0) {
      return {
        message:
          "Cannot generate regular schedule due to time conflicts in slots or lessons",
        generatedLessons: 0,
        conflictingSlots,
      };
    }

    const startDate = dto.daysOfWeek[0].timeStart;
    const endDate = dto.daysOfWeek[0].timeEnd;

    const updatedDaysOfWeek = [
      ...(template.daysOfWeek as {
        day: DayOfWeek;
        timeStart: string;
        timeEnd: string;
      }[]),
      ...slotsToAdd.map((slot) => ({
        day: slot.day,
        timeStart: slot.timeStart,
        timeEnd: slot.timeEnd,
      })),
    ];

    await this.prisma.templateLesson.update({
      where: { id: dto.templateLessonId },
      data: {
        daysOfWeek: updatedDaysOfWeek,
        periodStart,
        periodEnd,
        startDate,
        endDate,
        typeLesson: dto.type,
      },
    });

    let generatedCount = 0;

    await this.prisma.$transaction(async (tx) => {
      let currentDate = new Date(periodStart);

      while (currentDate <= periodEnd) {
        const dayOfWeek = this.getDayOfWeek(currentDate);
        const matchingSlot = dto.daysOfWeek.find(
          (slot) => slot.day === dayOfWeek
        );

        if (matchingSlot) {
          let schedule = await tx.schedule.findFirst({
            where: {
              groupId: template.groupId,
              date: {
                gte: startOfDay(currentDate),
                lte: endOfDay(currentDate),
              },
            },
          });
          if (!schedule) {
            schedule = await tx.schedule.create({
              data: {
                groupId: template.groupId,
                date: currentDate,
                timeStart: matchingSlot.timeStart,
                timeEnd: matchingSlot.timeEnd,
              },
            });
          }

          const [startHour, startMinute] = matchingSlot.timeStart
            .split(":")
            .map(Number);
          const [endHour, endMinute] = matchingSlot.timeEnd
            .split(":")
            .map(Number);

          const startDateTime = set(currentDate, {
            hours: startHour,
            minutes: startMinute,
            seconds: 0,
            milliseconds: 0,
          });

          const endDateTime = set(currentDate, {
            hours: endHour,
            minutes: endMinute,
            seconds: 0,
            milliseconds: 0,
          });

          const overlapping = await tx.lesson.findFirst({
            where: {
              scheduleId: schedule.id,
              OR: [
                {
                  startDate: { lte: endDateTime },
                  endDate: { gte: startDateTime },
                },
              ],
            },
          });
          if (overlapping) {
            throw new BadRequestException(
              `Unexpected time conflict on ${currentDate.toISOString()}`
            );
          }

          const lesson = await tx.lesson.create({
            data: {
              scheduleId: schedule.id,
              name: template.name,
              startDate: startDateTime,
              endDate: endDateTime,
              typeLesson: dto.type,
              room: template.room,
              teacherName: template.teacherName,
              templateLessonId: template.id,
            },
          });

          const groupUsers = template.group.users;
          const attendanceData = groupUsers.map((user) => ({
            userId: user.id,
            lessonId: lesson.id,
            status: AttendanceType.EMPTIES,
          }));
          await tx.attendance.createMany({ data: attendanceData });

          generatedCount++;
        }

        currentDate = addDays(currentDate, 1);
      }
    });

    return {
      message: "Regular schedule generated successfully",
      generatedLessons: generatedCount,
    };
  }

  private getDayOfWeek(date: Date): DayOfWeek {
    const dayNum = date.getDay();
    const days: DayOfWeek[] = [
      DayOfWeek.SUNDAY,
      DayOfWeek.MONDAY,
      DayOfWeek.TUESDAY,
      DayOfWeek.WEDNESDAY,
      DayOfWeek.THURSDAY,
      DayOfWeek.FRIDAY,
      DayOfWeek.SATURDAY,
    ];
    return days[dayNum];
  }

  async deleteRegularSlot(
    dto: DeleteRegularSlotsDto,
    userId: string
  ): Promise<{ message: string; deletedLessons: number }> {
    const { templateLessonId, daysOfWeek } = dto;

    const template = await this.prisma.templateLesson.findUnique({
      where: { id: templateLessonId },
      include: { group: true },
    });

    if (!template || template.group.elderId !== userId) {
      throw new HttpException(
        "Only ELDER can delete regular slots",
        HttpStatus.FORBIDDEN
      );
    }

    let totalDeletedLessons = 0;

    await this.prisma.$transaction(async (tx) => {
      for (const slot of daysOfWeek) {
        const updatedDaysOfWeek = (
          template.daysOfWeek as unknown as DayOfWeekSlotDto[]
        ).filter(
          (existingSlot) =>
            !(
              existingSlot.day === slot.day &&
              existingSlot.timeStart === slot.timeStart &&
              existingSlot.timeEnd === slot.timeEnd
            )
        );

        const lessons = await tx.lesson.findMany({
          where: {
            templateLessonId,
            startDate: {
              gte: template.periodStart!,
              lte: template.periodEnd!,
            },
          },
        });

        const targetLessons = lessons.filter((lesson) => {
          const lessonDay = this.getDayOfWeek(lesson.startDate);

          const lessonTimeStart = normalizeTime(
            `${getHours(lesson.startDate)}:${getMinutes(lesson.startDate)}`
          );
          const lessonTimeEnd = normalizeTime(
            `${getHours(lesson.endDate)}:${getMinutes(lesson.endDate)}`
          );

          const slotTimeStart = normalizeTime(slot.timeStart);
          const slotTimeEnd = normalizeTime(slot.timeEnd);

          return (
            lessonDay === slot.day &&
            lessonTimeStart === slotTimeStart &&
            lessonTimeEnd === slotTimeEnd
          );
        });

        console.log(targetLessons, "targetLessons");

        const lessonIds = targetLessons.map((l) => l.id);
        totalDeletedLessons += lessonIds.length;

        if (lessonIds.length > 0) {
          await tx.attendance.deleteMany({
            where: { lessonId: { in: lessonIds } },
          });

          await tx.lesson.deleteMany({
            where: { id: { in: lessonIds } },
          });
        }

        await tx.templateLesson.update({
          where: { id: templateLessonId },
          data: {
            daysOfWeek: updatedDaysOfWeek as any,
          },
        });
      }
    });

    return {
      message: `Slots deleted successfully: ${daysOfWeek
        .map((slot) => `${slot.day} ${slot.timeStart}-${slot.timeEnd}`)
        .join(", ")}`,
      deletedLessons: totalDeletedLessons,
    };
  }
}

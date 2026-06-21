import { Injectable } from "@nestjs/common";
import { CreateAchievementTemplateDto } from "./dto/create-achievement.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AchievementService {
  constructor(private prisma: PrismaService) {}

  async create(createAchievementTemplateDto: CreateAchievementTemplateDto) {
    return this.prisma.achievementTemplate.create({
      data: createAchievementTemplateDto,
    });
  }

  async findAllTemplates() {
    return this.prisma.achievementTemplate.findMany();
  }

  async getUserAchievements(userId: string) {
    const oneMonthAgo = new Date();
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

    const templates = await this.prisma.achievementTemplate.findMany();

    for (const template of templates) {
      let achievement = await this.prisma.achievement.findFirst({
        where: { userId, templateId: template.id },
      });

      if (!achievement) {
        achievement = await this.prisma.achievement.create({
          data: {
            userId,
            templateId: template.id,
            progress: 0,
            isCompleted: false,
          },
        });
      }

      let progress = 0;

      switch (template.id) {
        case "cmfv1zg9z0000tfv4i0qthzme": // Посещаемость Льда (лекции)
          progress = await this.calculateLectureAttendanceProgress(
            userId,
            oneMonthAgo
          );
          break;

        case "cmfv21cd30001tfv41rvqwfc7": // Галактический Посетитель (топ-10 в группе)
          progress = await this.calculateGroupTopProgress(userId, oneMonthAgo);
          break;

        case "cmfv22q5m0002tfv4jiqg84om": // Марсианская Точность (практики)
          progress = await this.calculatePracticeAttendanceProgress(
            userId,
            oneMonthAgo
          );
          break;

        case "cmfv23h940003tfv4q3smyupr": // Спонсор Посещаемости (топ группы в университете)
          progress = await this.calculateUniversityGroupTopProgress(
            userId,
            oneMonthAgo
          );
          break;

        case "cmfv27y9d0004tfv4t9wub7c4": // Акула Уроков (лабораторные)
          progress = await this.calculateLabAttendanceProgress(
            userId,
            oneMonthAgo
          );
          break;

        case "cmfv28nw80005tfv41e4bgbwt": // YOLO Посещаемость (PRESENT + EXCUSED)
          progress = await this.calculateYoloAttendanceProgress(
            userId,
            oneMonthAgo
          );
          break;

        default:
          progress = 0;
      }

      const isCompleted = progress >= 100;

      await this.prisma.achievement.update({
        where: { id: achievement.id },
        data: { progress, isCompleted },
      });
    }

    return this.prisma.achievement.findMany({
      where: { userId },
      include: { template: true },
    });
  }

  private async calculateLectureAttendanceProgress(
    userId: string,
    fromDate: Date
  ): Promise<number> {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        typeLesson: "LECTURE",
        startDate: { gte: fromDate },
        attendance: { some: { userId } },
      },
    });

    if (lessons.length === 0) return 0;

    const presentCount = await this.prisma.attendance.count({
      where: {
        userId,
        status: "PRESENT",
        lesson: { typeLesson: "LECTURE", startDate: { gte: fromDate } },
      },
    });

    return Math.min(100, Math.round((presentCount / lessons.length) * 100));
  }

  private async calculateGroupTopProgress(
    userId: string,
    fromDate: Date
  ): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { group: true },
    });
    if (!user?.groupId) return 0;

    const groupUsers = await this.prisma.user.findMany({
      where: { groupId: user.groupId },
    });

    const userAttendances: { userId: string; attendanceRate: number }[] = [];

    for (const groupUser of groupUsers) {
      const totalLessons = await this.prisma.lesson.count({
        where: {
          schedule: { groupId: user.groupId },
          startDate: { gte: fromDate },
        },
      });

      if (totalLessons === 0) continue;

      const presentCount = await this.prisma.attendance.count({
        where: {
          userId: groupUser.id,
          status: "PRESENT",
          lesson: { startDate: { gte: fromDate } },
        },
      });

      userAttendances.push({
        userId: groupUser.id,
        attendanceRate: (presentCount / totalLessons) * 100,
      });
    }

    userAttendances.sort((a, b) => b.attendanceRate - a.attendanceRate);
    const rank = userAttendances.findIndex((ua) => ua.userId === userId) + 1;

    if (rank <= 10) return 100;
    return Math.max(0, 100 - (rank - 10) * 5);
  }

  private async calculatePracticeAttendanceProgress(
    userId: string,
    fromDate: Date
  ): Promise<number> {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        typeLesson: "PRACTICE",
        startDate: { gte: fromDate },
        attendance: { some: { userId } },
      },
    });

    if (lessons.length === 0) return 0;

    const presentCount = await this.prisma.attendance.count({
      where: {
        userId,
        status: "PRESENT",
        lesson: { typeLesson: "PRACTICE", startDate: { gte: fromDate } },
      },
    });

    return Math.min(100, Math.round((presentCount / lessons.length) * 100));
  }

  private async calculateUniversityGroupTopProgress(
    userId: string,
    fromDate: Date
  ): Promise<number> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { group: { include: { university: true } } },
    });
    if (!user?.group?.universityId) return 0;

    const groups = await this.prisma.group.findMany({
      where: { universityId: user.group.universityId },
    });

    const groupAttendances: { groupId: string; avgAttendance: number }[] = [];

    for (const group of groups) {
      const groupUsers = await this.prisma.user.findMany({
        where: { groupId: group.id },
      });
      let totalAttendance = 0;
      let userCount = 0;

      for (const gUser of groupUsers) {
        const totalLessons = await this.prisma.lesson.count({
          where: {
            schedule: { groupId: group.id },
            startDate: { gte: fromDate },
          },
        });

        if (totalLessons === 0) continue;

        const presentCount = await this.prisma.attendance.count({
          where: {
            userId: gUser.id,
            status: "PRESENT",
            lesson: { startDate: { gte: fromDate } },
          },
        });

        totalAttendance += (presentCount / totalLessons) * 100;
        userCount++;
      }

      const avg = userCount > 0 ? totalAttendance / userCount : 0;
      groupAttendances.push({ groupId: group.id, avgAttendance: avg });
    }

    groupAttendances.sort((a, b) => b.avgAttendance - a.avgAttendance);
    const rank =
      groupAttendances.findIndex((ga) => ga.groupId === user.groupId) + 1;

    if (rank === 1) return 100;
    return Math.max(0, 100 - (rank - 1) * 10);
  }

  private async calculateLabAttendanceProgress(
    userId: string,
    fromDate: Date
  ): Promise<number> {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        typeLesson: "LABORATORY",
        startDate: { gte: fromDate },
        attendance: { some: { userId } },
      },
    });

    if (lessons.length === 0) return 0;

    const presentCount = await this.prisma.attendance.count({
      where: {
        userId,
        status: "PRESENT",
        lesson: { typeLesson: "LABORATORY", startDate: { gte: fromDate } },
      },
    });

    return Math.min(100, Math.round((presentCount / lessons.length) * 100));
  }

  private async calculateYoloAttendanceProgress(
    userId: string,
    fromDate: Date
  ): Promise<number> {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        startDate: { gte: fromDate },
        attendance: { some: { userId } },
      },
    });

    if (lessons.length === 0) return 0;

    const attendedCount = await this.prisma.attendance.count({
      where: {
        userId,
        status: { in: ["PRESENT", "EXCUSED"] },
        lesson: { startDate: { gte: fromDate } },
      },
    });

    return Math.min(100, Math.round((attendedCount / lessons.length) * 100));
  }
}

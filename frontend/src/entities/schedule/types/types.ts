import { ELessonTypes, Lesson } from "@/entities/lesson/types/types";
import { CalendarCell } from "@/entities/templateLesson/types/types";

export interface ScheduleDto {
  groupId: string;
  date: string;
  timeStart: string;
  timeEnd: string;
}

export interface Schedule {
  id: string;
  groupId: string;
  createdAt: Date;
  updatedAt: Date;
  date: string;
  timeStart: string;
  timeEnd: string;
  lessons: Lesson[];
}

export interface CreateRegularScheduleDto {
  templateLessonId: string;
  daysOfWeek: { day: string; timeStart: string; timeEnd: string }[];
  periodStart: string;
  periodEnd: string;
  type: ELessonTypes;
}

export interface DeleteRegularSlotsDto {
  templateLessonId: string;
  daysOfWeek: { day: string; timeStart: string; timeEnd: string }[];
}

export interface CreateRegularSlotsColflictResponse {
  conflictingSlots: CalendarCell[];
  generatedLessons: number;
  message: string;
}

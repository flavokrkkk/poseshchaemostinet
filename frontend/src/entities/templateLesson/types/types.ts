import { ELessonTypes, Lesson } from "@/entities/lesson/types/types";

export type SlotType = "active" | "select" | "conflict" | null;

export interface TemplateLesson extends Lesson {
  daysOfWeek: {
    day: string;
    timeEnd: string;
    timeStart: string;
  }[];
  periodStart: string | null;
  periodEnd: string | null;
}

export interface CalendarCell {
  day: string;
  timeStart: string;
  timeEnd: string;
  isActive: boolean;
  lessonName: string | undefined;
  slotType: SlotType;
  dayIndex: number;
  originalSlotType: SlotType;
  timeIndex: number;
  typeLesson: ELessonTypes | undefined;
}

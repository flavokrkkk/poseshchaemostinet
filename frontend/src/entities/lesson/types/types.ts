import { Attendance } from "@/entities/attendance/types/types";

export const enum ELessonTypes {
  PRACTICE = "PRACTICE",
  LECTURE = "LECTURE",
  LABORATORY = "LABORATORY",
}

enum HomeworkStatus {
  ISSUED = "ISSUED",
  SUBMITTED = "SUBMITTED",
  GRADED = "GRADED",
}

export interface FileStructure {
  fileName: string;
  fileUrl: string;
}

export interface Lesson {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  typeLesson: ELessonTypes;
  attendance: Array<Attendance>;
  room: string;
  teacherName: string;
  scheduleId: string;
  homeworkStatus: HomeworkStatus;
  homeworkDescription: string;
  homeworkDueDate: string;
  homeworkFiles: Array<FileStructure>;
}

export interface LessonCreateDto {
  name: string;
  startDate: string;
  endDate: string;
  type: ELessonTypes;
  room: string;
  teacherName: string;
  groupId: string;
  scheduleId: string;
}

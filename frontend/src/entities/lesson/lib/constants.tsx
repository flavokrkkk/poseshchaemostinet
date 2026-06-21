import { EAttendanceType } from "@/entities/attendance/types/types";
import { ELessonTypes } from "@/entities/lesson/types/types";
import { Check, GraduationCap, X } from "lucide-react";

export const attendanceParceType = {
  [EAttendanceType.PRESENT]: "Присутствовал",
  [EAttendanceType.ABSENT]: "Прогул",
  [EAttendanceType.EXCUSED]: "Отсутствовал по уважительной причине",
  [EAttendanceType.EMPTIES]: "Отметка не стоит",
};

export const lessonParceType = {
  [ELessonTypes.LABORATORY]: "Лаборотная",
  [ELessonTypes.LECTURE]: "Лекция",
  [ELessonTypes.PRACTICE]: "Практика",
};

export const typeTextColor = {
  [ELessonTypes.PRACTICE]: "text-green-500",
  [ELessonTypes.LECTURE]: "text-blue-500",
  [ELessonTypes.LABORATORY]: "text-orange-500",
};

export const typeColor = {
  [ELessonTypes.PRACTICE]: "border-l-green-500",
  [ELessonTypes.LECTURE]: "border-l-blue-500",
  [ELessonTypes.LABORATORY]: "border-l-orange-500",
};

export const lessonIconStatus = {
  [EAttendanceType.ABSENT]: {
    icon: <X className="text-[#FF4D4D]" />,
    color: "#FFE5E5",
  },
  [EAttendanceType.EMPTIES]: {
    icon: <GraduationCap className="text-zinc-100" />,
    color: "#d4d4d8",
  },
  [EAttendanceType.EXCUSED]: {
    icon: <GraduationCap className="text-zinc-600" />,
    color: "#d4d4d8",
  },
  [EAttendanceType.PRESENT]: {
    icon: <Check className="text-[#007AFF]" />,
    color: "#E8F5FF",
  },
};

export const LESSON_STATUSES = [
  EAttendanceType.ABSENT,
  EAttendanceType.EMPTIES,
  EAttendanceType.EXCUSED,
  EAttendanceType.PRESENT,
];

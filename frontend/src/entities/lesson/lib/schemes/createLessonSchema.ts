import { z } from "zod";
import { ELessonTypes } from "../../types/types";

export const createLessonSchema = z.object({
  groupId: z.string().min(1, "Group ID is required"),
  name: z.string().min(1, "Lesson name is required"),
  startTime: z
    .string()
    .min(1, "Start time is required")
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  endTime: z
    .string()
    .min(1, "End time is required")
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  type: z.enum([
    ELessonTypes.LECTURE,
    ELessonTypes.PRACTICE,
    ELessonTypes.LABORATORY,
  ]),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  room: z.string(),
  teacherName: z.string(),
});

export type CreateLessonFormData = z.infer<typeof createLessonSchema>;

import { ELessonTypes } from "@/entities/lesson/types/types";
import { z } from "zod";

export const CreateRegularScheduleSchema = z.object({
  type: z.enum([
    ELessonTypes.LECTURE,
    ELessonTypes.PRACTICE,
    ELessonTypes.LABORATORY,
  ]),
  periodStart: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  periodEnd: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export type CreateRegularScheduleTypeSchema = z.infer<
  typeof CreateRegularScheduleSchema
>;

import { z } from "zod";

export const CreateTemplateLessonSchema = z.object({
  groupId: z.string().min(1, "Group ID is required"),
  name: z.string().min(1, "Lesson name is required"),
  room: z.string(),
  teacherName: z.string(),
});

export type CreateTemplateLessonTypeSchema = z.infer<
  typeof CreateTemplateLessonSchema
>;

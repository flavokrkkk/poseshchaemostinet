import { z } from "zod";

export const GroupFormSchema = z.object({
  groupName: z.string().nonempty("Поле 'Группа' не может быть пустым"),
});

export type TypeGroupFormSchema = z.infer<typeof GroupFormSchema>;

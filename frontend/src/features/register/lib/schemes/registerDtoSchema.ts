import { z } from "zod";

export const RegisterDtoSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
  role: z.enum(["ELDER", "STUDENT", "ADMIN"]),
  gender: z.enum(["MALE", "FEMALE"]),
});

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;

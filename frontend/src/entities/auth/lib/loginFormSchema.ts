import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Пароль должен быть минимум 6 символов"),
});

export type LoginForm = z.infer<typeof LoginFormSchema>;

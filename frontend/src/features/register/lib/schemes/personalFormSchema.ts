import { z } from "zod";

export const PersonalFormSchema = z.object({
  name: z.string().nonempty("Поле 'Имя' не может быть пустым"),
  surname: z.string().nonempty("Поле 'Фамилия' не может быть пустым"),
  gender: z.enum(["MALE", "FEMALE"], {
    error: "Выберите ваш пол",
  }),
  email: z
    .string({
      message: "Email обязателен",
    })
    .email({
      message: "Введите корректный email-адрес",
    })
    .max(254, {
      message: "Email не должен превышать 254 символа",
    })
    .trim(),
  password: z
    .string({
      message: "Пароль обязателен",
    })
    .min(8, {
      message: "Пароль должен содержать минимум 8 символов",
    })
    .max(128, {
      message: "Пароль не должен превышать 128 символов",
    })
    .trim(),
});

export type TypePersonalFormSchema = z.infer<typeof PersonalFormSchema>;

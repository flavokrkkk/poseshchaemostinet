import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CircleAlert, X } from "lucide-react";
import {
  PersonalFormSchema,
  TypePersonalFormSchema,
} from "../lib/schemes/personalFormSchema";
import { Form, FormField, FormItem } from "@/shared/ui/form/form";
import { Button } from "@/shared/ui/button";
import clsx from "clsx";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { cn } from "@/shared";
import { ERegisterStep, StepsPropsType } from "../types";
import { useActions } from "@/shared/hooks/useActions";

export const PersonalStep = ({ handleNextStep }: StepsPropsType) => {
  const { setCustomerInfo } = useActions();
  const form = useForm<TypePersonalFormSchema>({
    resolver: zodResolver(PersonalFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      gender: "MALE",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = (data: TypePersonalFormSchema) => {
    reset();
    setCustomerInfo({ ...data, fullName: `${data.name} ${data.surname}` });
    handleNextStep(ERegisterStep.INFO_STEP);
  };

  return (
    <div className="space-y-2 w-full h-full flex items-center flex-col justify-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 flex flex-col w-full h-full justify-between max-w-xs"
        >
          <div />
          <section className="space-y-3">
            <h2 className="font-medium text-lg text-center">
              Давай познакомимся!
            </h2>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="relative">
                  <FloatingLabelInput
                    {...field}
                    label="Имя"
                    className={cn(
                      "py-1.5 bg-white rounded-xl shadow-sm border-white",
                      errors.name && "border-red-700"
                    )}
                  />
                  {field.value && (
                    <button
                      className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.name && (
                    <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                      <CircleAlert className="w-4 h-4" />
                    </button>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem className="relative">
                  <FloatingLabelInput
                    {...field}
                    label="Фамилия"
                    className={cn(
                      "py-1.5 bg-white rounded-xl shadow-sm border-white",
                      errors.surname && "border-red-700"
                    )}
                  />
                  {field.value && (
                    <button
                      className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.surname && (
                    <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                      <CircleAlert className="w-4 h-4" />
                    </button>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative gap-1">
                  <FloatingLabelInput
                    {...field}
                    label="Почта"
                    className={cn(
                      "py-1.5 bg-white rounded-xl shadow-sm border-white",
                      errors.email && "border-red-700"
                    )}
                  />
                  {errors.email && (
                    <span className="text-red-800 text-xs px-3">
                      {errors.email.message}
                    </span>
                  )}
                  {field.value && !errors.email && (
                    <button
                      className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.email && (
                    <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                      <CircleAlert className="w-4 h-4" />
                    </button>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative gap-1">
                  <FloatingLabelInput
                    {...field}
                    label="Пароль"
                    className={cn(
                      "py-1.5 bg-white rounded-xl shadow-sm border-white",
                      errors.password && "border-red-700"
                    )}
                  />
                  {errors.password && (
                    <span className="text-red-800 text-xs px-3">
                      {errors.password.message}
                    </span>
                  )}
                  {field.value && !errors.password && (
                    <button
                      className="absolute right-4 top-4.5 text-blue-800 cursor-pointer"
                      onClick={() => field.onChange("")}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  {errors.password && (
                    <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                      <CircleAlert className="w-4 h-4" />
                    </button>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex">
                  <div className="w-full">
                    <Button
                      variant={"outline"}
                      type="button"
                      className={clsx(
                        "rounded-lg w-full text-zinc-500",
                        field.value === "MALE" &&
                          "text-blue-700 border border-blue-700 hover:text-blue-800"
                      )}
                      onClick={() => field.onChange("MALE")}
                    >
                      Я – мальчик
                    </Button>
                  </div>

                  <div className="w-full">
                    <Button
                      variant={"outline"}
                      type="button"
                      className={clsx(
                        "rounded-lg w-full text-zinc-500",
                        field.value === "FEMALE" &&
                          "text-pink-700 border border-pink-700 hover:text-pink-800"
                      )}
                      onClick={() => field.onChange("FEMALE")}
                    >
                      Я – девочка
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </section>

          <div className="flex justify-center">
            <Button type="submit" className="px-6 py-5">
              Продолжить
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

import { Button, cn } from "@/shared";
import { Form, FormField, FormItem } from "@/shared/ui/form/form";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../hooks/useLoginMutate";
import {
  LoginForm as TypeLoginForm,
  LoginFormSchema,
} from "../lib/loginFormSchema";

export const LoginForm = () => {
  const { mutate: loginMutate } = useLoginMutation();

  const form = useForm<TypeLoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = (data: TypeLoginForm) => {
    loginMutate(data);
    reset();
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
            <h2 className="font-medium text-lg text-center">C возвращением!</h2>

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

import { Button, cn } from "@/shared";
import { CircleAlert, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  CreateTemplateLessonSchema,
  CreateTemplateLessonTypeSchema,
} from "../lib/schemes/createTemplateLessonSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/shared/ui/form/form";
import { Input } from "@/shared/ui/input";

interface CreateTemplateLessonFormProps {
  defaultValues: CreateTemplateLessonTypeSchema;
  onEventSubmit: (data: CreateTemplateLessonTypeSchema) => void;
}

export const CreateTemplateLessonForm = ({
  defaultValues,
  onEventSubmit,
}: CreateTemplateLessonFormProps) => {
  const form = useForm<CreateTemplateLessonTypeSchema>({
    resolver: zodResolver(CreateTemplateLessonSchema),
    defaultValues,
  });

  const {
    reset,
    formState: { errors },
    handleSubmit,
  } = form;

  const onSubmit = (data: CreateTemplateLessonTypeSchema) => {
    onEventSubmit(data);
    reset();
  };

  return (
    <Form {...form}>
      <form
        className="rounded-2xl shadow-xl p-5 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className=" space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-full">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="relative">
                    <Input
                      {...field}
                      placeholder="Название пары"
                      className={cn(
                        "py-5 rounded-xl text-lg font-semibold  border-white bg-white",
                        errors.name && "border-red-700"
                      )}
                    />
                    {field.value && (
                      <button
                        className="absolute right-4 top-3 text-blue-800 cursor-pointer"
                        onClick={() => field.onChange("")}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    {errors.name && (
                      <button className="absolute right-4 top-3 text-red-800 cursor-pointer">
                        <CircleAlert className="w-4 h-4" />
                      </button>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </div>
          <section className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <FormField
                name="teacherName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="relative">
                    <Input
                      {...field}
                      placeholder="Учитель"
                      className={cn(
                        "py-5 rounded-xl border-white bg-white",
                        errors.name && "border-red-700"
                      )}
                    />
                    {errors.name && (
                      <button className="absolute right-4 top-3 text-red-800 cursor-pointer">
                        <CircleAlert className="w-4 h-4" />
                      </button>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center space-x-2">
              <FormField
                name="room"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="relative">
                    <Input
                      {...field}
                      placeholder="Кабинет"
                      className={cn(
                        "py-5 rounded-xl border-white bg-white",
                        errors.name && "border-red-700"
                      )}
                    />
                    {errors.name && (
                      <button className="absolute right-4 top-3 text-red-800 cursor-pointer">
                        <CircleAlert className="w-4 h-4" />
                      </button>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </section>
        </header>
        <Button className="w-full rounded-xl py-4">Создать</Button>
      </form>
    </Form>
  );
};

import { Button, cn } from "@/shared";
import { DatePicker } from "@/shared/ui/datePicker/datePicker";
import { Form, FormField, FormItem } from "@/shared/ui/form/form";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { ELessonTypes } from "../types/types";
import { format } from "date-fns";
import {
  CreateLessonFormData,
  createLessonSchema,
} from "../lib/schemes/createLessonSchema";

interface CreateLessonFormProps {
  defaultValues: CreateLessonFormData;
  onEventSubmit: (data: CreateLessonFormData) => void;
}

export const CreateLessonForm = ({
  defaultValues,
  onEventSubmit,
}: CreateLessonFormProps) => {
  const form = useForm<CreateLessonFormData>({
    resolver: zodResolver(createLessonSchema),
    defaultValues: defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const onSubmit = async (data: CreateLessonFormData) => {
    onEventSubmit(data);
    reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-4 space-y-4"
      >
        <section className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="relative">
                <FloatingLabelInput
                  {...field}
                  label="Название урока"
                  labelClassName="text-blue-950"
                  className={cn(
                    "py-1.5 bg-white rounded-xl border-secondary",
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

          <div className="flex space-x-2">
            <div className="w-full">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FloatingLabelInput
                      {...field}
                      label="Время начала"
                      labelClassName="text-blue-950"
                      className={cn(
                        "py-1.5 bg-white rounded-xl border-secondary min-w-full",
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
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FloatingLabelInput
                      {...field}
                      label="Время окончания"
                      labelClassName="text-blue-950"
                      className={cn(
                        "py-1.5 bg-white rounded-xl border-secondary min-w-full",
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
            </div>
          </div>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="relative">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={ELessonTypes.LECTURE}
                >
                  <SelectTrigger className="w-full py-6 bg-white rounded-xl border-0 text-blue-950">
                    <SelectValue placeholder="Тип урока" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem
                      value={ELessonTypes.LECTURE}
                      className="py-2.5 rounded-lg"
                    >
                      Лекция
                    </SelectItem>
                    <SelectItem
                      value={ELessonTypes.PRACTICE}
                      className="py-2.5 rounded-lg"
                    >
                      Практика
                    </SelectItem>
                    <SelectItem
                      value={ELessonTypes.LABORATORY}
                      className="py-2.5 rounded-lg"
                    >
                      Лабораторная
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="relative">
                <DatePicker
                  className="bg-white text-blue-950"
                  date={new Date(field.value)}
                  onChangeDate={(date) => {
                    if (!date) return;
                    field.onChange(format(date, "yyyy-MM-dd"));
                  }}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="room"
            render={({ field }) => (
              <FormItem className="relative">
                <FloatingLabelInput
                  {...field}
                  label="Кабинет"
                  labelClassName="text-blue-950"
                  className={cn(
                    "py-1.5 bg-white rounded-xl border-secondary min-w-full",
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
            name="teacherName"
            render={({ field }) => (
              <FormItem className="relative">
                <FloatingLabelInput
                  {...field}
                  label="Преподаватель"
                  labelClassName="text-blue-950"
                  className={cn(
                    "py-1.5 bg-white rounded-xl border-secondary min-w-full",
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
        </section>
        <div className="p-0 py-4">
          <Button type="submit" className="w-full py-5 rounded-2xl">
            <Plus className="h-5 w-5" />
            Создать
          </Button>
        </div>
      </form>
    </Form>
  );
};

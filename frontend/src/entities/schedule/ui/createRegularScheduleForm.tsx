import { Button } from "@/shared";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/shared/ui/form/form";
import {
  CreateRegularScheduleSchema,
  CreateRegularScheduleTypeSchema,
} from "../lib/schemes/createRegularScheduleForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";
import { ELessonTypes } from "@/entities/lesson/types/types";
import { DatePicker } from "@/shared/ui/datePicker/datePicker";

interface CreateRegularScheduleProps {
  defaultValues: CreateRegularScheduleTypeSchema;
  onEventSubmit: (data: CreateRegularScheduleTypeSchema) => void;
}

export const CreateRegularScheduleForm = ({
  defaultValues,
  onEventSubmit,
}: CreateRegularScheduleProps) => {
  const form = useForm<CreateRegularScheduleTypeSchema>({
    resolver: zodResolver(CreateRegularScheduleSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = form;

  const onSubmit = (data: CreateRegularScheduleTypeSchema) => {
    onEventSubmit(data);
    reset();
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <header className=" space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-full">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="relative">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={ELessonTypes.LECTURE}
                    >
                      <SelectTrigger className="w-full  py-5 border-white bg-secondary rounded-xl text-blue-950 focus:ring-blue-500">
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
            </div>
          </div>
          <section className="flex space-x-4">
            <div className="flex items-center space-x-2 w-full">
              <FormField
                control={form.control}
                name="periodStart"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <DatePicker
                      className="border-white bg-secondary text-blue-950"
                      date={new Date(field.value)}
                      onChangeDate={(date) => {
                        if (!date) return;
                        field.onChange(date.toISOString());
                      }}
                    />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center space-x-2 w-full">
              <FormField
                control={form.control}
                name="periodEnd"
                render={({ field }) => (
                  <FormItem className="relative w-full">
                    <DatePicker
                      className="border-white bg-secondary text-blue-950"
                      date={new Date(field.value)}
                      onChangeDate={(date) => {
                        if (!date) return;
                        field.onChange(date.toISOString());
                      }}
                    />
                  </FormItem>
                )}
              />
            </div>
          </section>
          <Button className="w-full rounded-xl py-4">Далее</Button>
        </header>
      </form>
    </Form>
  );
};

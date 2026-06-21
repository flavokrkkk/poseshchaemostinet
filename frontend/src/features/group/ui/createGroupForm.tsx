import { Button, cn } from "@/shared";
import { Form, FormField, FormItem } from "@/shared/ui/form/form";
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  GroupFormSchema,
  TypeGroupFormSchema,
} from "../lib/schemes/groupFormSchema";

interface CreateGroupFormProps {
  onSubmitEvent: (data: TypeGroupFormSchema) => void;
  onCancel: () => void;
}

export const CreateGroupForm = ({
  onCancel,
  onSubmitEvent,
}: CreateGroupFormProps) => {
  const form = useForm<TypeGroupFormSchema>({
    resolver: zodResolver(GroupFormSchema),
    defaultValues: {
      groupName: "",
    },
  });

  const {
    formState: { errors },
    reset,
    handleSubmit,
  } = form;

  const onSubmit = (data: TypeGroupFormSchema) => {
    onSubmitEvent(data);
    reset();
  };

  return (
    <div className="flex flex-col w-full items-center justify-between h-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
          <div className="space-y-1">
            <h2 className="text-[13px] text-center">
              Введи название своей группы как в расписании
            </h2>
            <FormField
              name="groupName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="relative">
                  <FloatingLabelInput
                    {...field}
                    label="Название группы"
                    className={cn(
                      "py-1.5 rounded-xl border-white bg-secondary",
                      errors.groupName && "border-red-700"
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
                  {errors.groupName && (
                    <button className="absolute right-4 top-4.5 text-red-800 cursor-pointer">
                      <CircleAlert className="w-4 h-4" />
                    </button>
                  )}
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full space-x-4">
            <div className="w-full">
              <Button
                type="button"
                variant={"outline"}
                className="px-0 py-3 w-full"
                onClick={onCancel}
              >
                Отменить
              </Button>
            </div>
            <div className="w-full">
              <Button type="submit" className="px-0 py-3 w-full">
                Продолжить
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

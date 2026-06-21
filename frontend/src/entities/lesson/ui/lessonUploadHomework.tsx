import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/shared/ui/form/form";
import { useState } from "react";
import { Button } from "@/shared";
import { useUpdateLesson } from "../hooks/useUpdateLesson";
import { useUploadHomework } from "../hooks/useUploadHomework";
import { Lesson } from "../types/types";
import { LessonHomeworkFile } from "./lessonHomeworkFile";

const schema = z.object({
  description: z.string().optional(),
  files: z.array(z.instanceof(File)).optional(),
});

type FormValues = z.infer<typeof schema>;

interface LessonUploadHomeworkProps {
  lesson: Lesson;
  onSubmitting: () => void;
}

export const LessonUploadHomework = ({
  lesson,
  onSubmitting,
}: LessonUploadHomeworkProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { description: lesson.homeworkDescription, files: [] },
  });
  const { mutateAsync: updateLesson } = useUpdateLesson({
    onSuccess(data) {
      form.setValue("description", data.homeworkDescription);
    },
  });
  const { mutateAsync: uploadHomework } = useUploadHomework();

  const [existingFiles, setExistingFiles] = useState<Lesson["homeworkFiles"]>(
    lesson.homeworkFiles || []
  );

  const [filesList, setFilesList] = useState<File[]>([]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    if (filesList.length >= 5) {
      form.setError("files", { message: "Можно загрузить не более 5 файлов." });
      return;
    }

    const newFiles = [...filesList, ...Array.from(e.target.files)];
    setFilesList(newFiles);
    form.setValue("files", newFiles, { shouldDirty: true });
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    const updated = filesList.filter((_, i) => i !== index);
    setFilesList(updated);
    form.setValue("files", updated, { shouldDirty: true });
  };

  const deleteExistingFile = async (fileUrl: string) => {
    const newFiles = existingFiles.filter(
      (el) => !el.fileUrl.includes(fileUrl)
    );
    setExistingFiles(newFiles);
    await updateLesson({ ...lesson, homeworkFiles: newFiles });
  };

  const onSubmit = async (data: FormValues) => {
    if (data.description) {
      await updateLesson({ ...lesson, homeworkDescription: data.description });
    }

    if (data.files?.length) {
      await uploadHomework({ files: data.files, lessonId: lesson.id });
    }

    onSubmitting();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="bg-white rounded-3xl p-5 shadow">
              <h2>Описание</h2>
              <FormControl>
                <textarea
                  rows={3}
                  placeholder="Введите описание..."
                  className="resize-none text-xs p-3 bg-zinc-50 rounded-2xl text-zinc-600
                             placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="files"
          render={() => (
            <FormItem className="bg-white rounded-3xl p-5 shadow">
              <h2>Файлы</h2>
              <FormControl>
                <div>
                  <label className="flex items-center text-blue-500 space-x-1 cursor-pointer">
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFiles}
                    />
                    <span className="text-sm">Прикрепить файлы</span>
                    <Plus className="h-5 w-5" />
                  </label>

                  <div className="max-h-[100px] overflow-auto">
                    {(filesList.length > 0 || existingFiles.length > 0) && (
                      <ul className="mt-2 text-xs text-zinc-700 space-y-1">
                        {filesList.map((f, idx) => (
                          <LessonHomeworkFile
                            key={idx}
                            isDeleteAction
                            fileName={f.name}
                            onDelete={() => removeFile(idx)}
                          />
                        ))}
                        {existingFiles.map((f, idx) => (
                          <LessonHomeworkFile
                            key={idx}
                            isDeleteAction
                            fileName={f.fileName}
                            onDelete={() => deleteExistingFile(f.fileUrl)}
                          />
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.isDirty && (
          <Button type="submit" className="w-full rounded-xl">
            Сохранить
          </Button>
        )}
      </form>
    </Form>
  );
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTemplateLesson } from "../api/templateLessonService";
import { TEMPLATE_LESSONS_QUERY } from "./useGetTemplateLessons";
import { Lesson } from "@/entities/lesson/types/types";

export const useCreateTemplateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTemplateLesson,
    onSuccess(lesson) {
      queryClient.setQueryData(
        [TEMPLATE_LESSONS_QUERY],
        (templateLessons: Array<Lesson>) => [...templateLessons, lesson]
      );
    },
  });
};

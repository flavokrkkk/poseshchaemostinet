import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTemplateLesson } from "../api/templateLessonService";
import { TEMPLATE_LESSONS_QUERY } from "./useGetTemplateLessons";
import { Lesson } from "@/entities/lesson/types/types";

export const useDeleteTemplateLesson = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTemplateLesson,
    onSuccess(deleteLesson) {
      queryClient.setQueryData(
        [TEMPLATE_LESSONS_QUERY],
        (templateLessons: Array<Lesson>) =>
          templateLessons.filter((lesson) => lesson.id !== deleteLesson.id)
      );
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLesson } from "../api/lessonService";
import { ELDER_LESSON_DETAIL_QUERY } from "./useGetLessonById";
import { useActions } from "@/shared/hooks/useActions";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import { Lesson } from "../types/types";

export const useUpdateLesson = ({
  onSuccess,
}: {
  onSuccess?: (data: Lesson) => void;
}) => {
  const { updateDrawerData } = useActions();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLesson,
    onSuccess(data) {
      queryClient.setQueryData([ELDER_LESSON_DETAIL_QUERY, data.id], () => {
        updateDrawerData({
          type: EDrawerVariables.HOMEWORK_DRAWER,
          data: { ...data },
        });

        return data;
      });

      onSuccess?.(data);
    },
  });
};

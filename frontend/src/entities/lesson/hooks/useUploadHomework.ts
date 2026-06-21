import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadHomeworkFiles } from "../api/lessonService";
import { ELDER_LESSON_DETAIL_QUERY } from "./useGetLessonById";
import { useActions } from "@/shared/hooks/useActions";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";

export const useUploadHomework = () => {
  const queryClient = useQueryClient();
  const { updateDrawerData } = useActions();

  return useMutation({
    mutationFn: uploadHomeworkFiles,
    onSuccess(data) {
      queryClient.setQueryData([ELDER_LESSON_DETAIL_QUERY, data.id], () => {
        updateDrawerData({
          type: EDrawerVariables.HOMEWORK_DRAWER,
          data: { ...data },
        });

        return data;
      });
    },
  });
};

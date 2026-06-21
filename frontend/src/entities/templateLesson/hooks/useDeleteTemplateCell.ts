import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRegularSlots } from "../api/templateLessonService";
import { TEMPLATE_CELLS_QUERY } from "./useGenerateTemplateCell";

export const useDeleteTemplateCell = ({
  selectedLessonId,
}: {
  selectedLessonId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRegularSlots,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [TEMPLATE_CELLS_QUERY, selectedLessonId],
      });
    },
  });
};

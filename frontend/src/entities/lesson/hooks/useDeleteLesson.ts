import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLesson } from "../api/lessonService";
import { Lesson } from "../types/types";
import { SCHEDULE_QUERY } from "@/entities/schedule/hooks/useGetSchedule";
import { format } from "date-fns";
import { EDateFormats } from "@/shared/lib/utils/dateFormat";

export const useDeleteLesson = ({ lesson }: { lesson: Lesson }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteLesson({ lessonId: lesson.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          SCHEDULE_QUERY,
          format(lesson.startDate, EDateFormats.DATE_DASH),
        ],
      });
    },
  });
};

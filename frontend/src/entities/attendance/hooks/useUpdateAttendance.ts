import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendance } from "../api/attendanceService";
import { ELDER_LESSON_DETAIL_QUERY } from "@/entities/lesson/hooks/useGetLessonById";
import { Lesson } from "@/entities/lesson/types/types";

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAttendance,
    onSuccess: (data) => {
      if (!data) return;

      queryClient.setQueryData(
        [ELDER_LESSON_DETAIL_QUERY, data.lessonId],
        (lesson: Lesson) => {
          if (!lesson.attendance) return lesson;
          return {
            ...lesson,
            attendance: lesson.attendance.map((attendance) =>
              attendance.id === data.id ? data : attendance
            ),
          };
        }
      );
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { getLessonById } from "../api/lessonService";

export const ELDER_LESSON_DETAIL_QUERY = "elder-lesson-detail";

export const useLessonById = ({ lessonId }: { lessonId: string }) => {
  return useQuery({
    queryKey: [ELDER_LESSON_DETAIL_QUERY, lessonId],
    queryFn: () => getLessonById({ lessonId }),
  });
};

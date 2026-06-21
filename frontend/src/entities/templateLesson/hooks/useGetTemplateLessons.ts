import { useQuery } from "@tanstack/react-query";
import { getTemplateLessons } from "../api/templateLessonService";

export const TEMPLATE_LESSONS_QUERY = "template-lessons";

export const useGetTemplateLessons = ({ groupId }: { groupId: string }) => {
  return useQuery({
    queryKey: [TEMPLATE_LESSONS_QUERY],
    queryFn: () => getTemplateLessons({ groupId }),
  });
};

import { useQuery } from "@tanstack/react-query";
import { generateTemplateSlots } from "../api/templateLessonService";

export const TEMPLATE_CELLS_QUERY = "template-cells";

export const useGenerateTemplateCell = ({
  selectedLessonId,
}: {
  selectedLessonId: string;
}) => {
  return useQuery({
    queryKey: [TEMPLATE_CELLS_QUERY, selectedLessonId],
    queryFn: () => generateTemplateSlots({ lessonId: selectedLessonId }),
    enabled: !!selectedLessonId,
  });
};

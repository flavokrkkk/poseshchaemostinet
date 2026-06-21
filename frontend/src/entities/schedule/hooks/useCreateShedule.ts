import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchedule } from "../api/scheduleService";
import { createLesson } from "@/entities/lesson/api/lessonService";
import { ScheduleDto } from "../types/types";
import { LessonCreateDto } from "@/entities/lesson/types/types";
import { format } from "date-fns";
import { EDateFormats } from "@/shared/lib/utils/dateFormat";
import { SCHEDULE_QUERY } from "./useGetSchedule";

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      scheduleDto,
      lessonDto,
    }: {
      scheduleDto: ScheduleDto;
      lessonDto: Omit<LessonCreateDto, "scheduleId">;
    }) => {
      const scheduleResponse = await createSchedule(scheduleDto);
      const scheduleId = scheduleResponse.id;

      if (!scheduleId) {
        throw new Error("Failed to retrieve schedule ID");
      }

      const lessonResponse = await createLesson({ ...lessonDto, scheduleId });
      return lessonResponse;
    },

    onError: (error) => {
      console.error("Error creating schedule or lesson:", error);
    },
    onSuccess: (lesson) => {
      queryClient.invalidateQueries({
        queryKey: [
          SCHEDULE_QUERY,
          format(lesson.startDate, EDateFormats.DATE_DASH),
        ],
      });
    },
  });

  return mutation;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRegularSchedule } from "../api/scheduleService";
import { TEMPLATE_CELLS_QUERY } from "@/entities/templateLesson/hooks/useGenerateTemplateCell";
import { CalendarCell, SlotType } from "@/entities/templateLesson/types/types";

export const useCreateRegularSchedule = ({
  selectedLessonId,
  setCalendarCells,
}: {
  selectedLessonId: string;
  setCalendarCells: React.Dispatch<React.SetStateAction<CalendarCell[][]>>;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRegularSchedule,
    onSuccess(data) {
      if (data.conflictingSlots && data.conflictingSlots.length > 0) {
        setCalendarCells((prevCells) =>
          prevCells.map((dayRow, dayIndex) =>
            dayRow.map((cell, timeIndex) => {
              const conflictingSlot = data.conflictingSlots.find(
                (slot) =>
                  slot.dayIndex === dayIndex && slot.timeIndex === timeIndex
              );
              return conflictingSlot
                ? { ...cell, slotType: "conflict" as SlotType }
                : cell;
            })
          )
        );
      } else {
        setCalendarCells((prevCells) =>
          prevCells.map((dayRow) =>
            dayRow.map((cell) => ({
              ...cell,
              slotType: cell.originalSlotType,
            }))
          )
        );
        queryClient.invalidateQueries({
          queryKey: [TEMPLATE_CELLS_QUERY, selectedLessonId],
        });
      }
    },
    onError() {
      setCalendarCells((prevCells) =>
        prevCells.map((dayRow) =>
          dayRow.map((cell) => ({
            ...cell,
            slotType: cell.originalSlotType,
          }))
        )
      );
    },
  });
};

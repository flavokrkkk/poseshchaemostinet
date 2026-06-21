import { useGenerateTemplateCell } from "@/entities/templateLesson/hooks/useGenerateTemplateCell";
import { CalendarCell } from "@/entities/templateLesson/types/types";
import { useEffect, useMemo, useState } from "react";

export const dayOfWeeks = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

export const useGenerateRegularSchedule = ({
  selectedLessonId,
}: {
  selectedLessonId: string;
}) => {
  const [calendarCells, setCalendarCells] = useState<CalendarCell[][]>([[]]);

  const {
    data: newCells = [[]],
    isLoading,
    isError,
  } = useGenerateTemplateCell({ selectedLessonId });

  useEffect(() => {
    if (!newCells || newCells.length === 0) return;
    setCalendarCells(
      newCells.map((dayRow) =>
        dayRow.map((cell) => ({
          ...cell,
          slotType: cell.slotType,
        }))
      )
    );
  }, [newCells]);

  const createCells = useMemo(
    () =>
      calendarCells.flatMap((dayRow) =>
        dayRow.filter((cell) => cell.slotType === "select")
      ),
    [calendarCells]
  );

  const deleteCells = useMemo(
    () =>
      calendarCells.flatMap((dayRow) =>
        dayRow.filter(
          (cell) => cell.originalSlotType === "active" && cell.slotType === null
        )
      ),
    [calendarCells]
  );

  const selectCells = useMemo(
    () =>
      calendarCells.flatMap((dayRow) =>
        dayRow.filter(
          (cell) => cell.slotType === "select" || cell.slotType === "active"
        )
      ),
    [calendarCells]
  );

  const conflictCells = useMemo(
    () =>
      calendarCells.flatMap((dayRow) =>
        dayRow.filter((cell) => cell.slotType === "conflict")
      ),
    [calendarCells]
  );

  const handleClickCell = (dayIndex: number, timeIndex: number) => {
    setCalendarCells((prevCells) =>
      prevCells.map((dayRow, dIdx) =>
        dIdx === dayIndex
          ? dayRow.map((cell, tIdx) =>
              tIdx === timeIndex
                ? {
                    ...cell,
                    slotType:
                      cell.slotType === "active" || cell.slotType === "select"
                        ? null
                        : cell.originalSlotType === "active"
                        ? "active"
                        : "select",
                    isActive:
                      cell.slotType !== "active" && cell.slotType !== "select",
                  }
                : cell
            )
          : dayRow
      )
    );
  };

  return {
    isLoading,
    isError,
    calendarCells,
    selectCells,
    deleteCells,
    createCells,
    conflictCells,
    setCalendarCells,
    handleClickCell,
  };
};

import { cn } from "@/shared";
import {
  days,
  useGenerateRegularSchedule,
} from "../hooks/useGenerateRedularSchedule";
import { useCreateRegularSchedule } from "../hooks/useCreateRegularSchedule";
import { SaveScheduleWidget } from "@/widgets/saveScheduleWidget/ui/saveScheduleWidget";
import { CreateRegularScheduleTypeSchema } from "../lib/schemes/createRegularScheduleForm";
import { memo } from "react";
import { ScheduleRegularCell } from "./scheduleRegularCell";
import { useDeleteTemplateCell } from "@/entities/templateLesson/hooks/useDeleteTemplateCell";

interface ScheduleRegularCalendarProps {
  isOpenPanel: boolean;
  selectedLessonId: string;
  togglePanel: () => void;
}

export const ScheduleRegularCalendar = memo(
  ({
    isOpenPanel,
    selectedLessonId,
    togglePanel,
  }: ScheduleRegularCalendarProps) => {
    const {
      calendarCells,
      selectCells,
      createCells,
      deleteCells,
      setCalendarCells,
      handleClickCell,
    } = useGenerateRegularSchedule({ selectedLessonId });

    const { mutateAsync: createRegularSchedule } = useCreateRegularSchedule({
      selectedLessonId,
      setCalendarCells,
    });
    const { mutateAsync: deleteTemplateCell } = useDeleteTemplateCell({
      selectedLessonId,
    });

    const handleSaveRegularSchedule = async (
      settings: CreateRegularScheduleTypeSchema
    ) => {
      if (deleteCells.length) {
        await deleteTemplateCell({
          daysOfWeek: deleteCells,
          templateLessonId: selectedLessonId,
        });
      }

      if (createCells.length) {
        await createRegularSchedule({
          type: settings.type,
          daysOfWeek: createCells,
          periodEnd: settings.periodEnd,
          periodStart: settings.periodStart,
          templateLessonId: selectedLessonId,
        });
      }
    };

    return (
      <div className="bg-white p-2 space-y-0.5 rounded-2xl">
        {calendarCells.map((dayRow, dayIndex) => (
          <section
            key={dayIndex}
            className={cn(
              "w-full justify-between flex p-3",
              dayIndex !== 0 && "border-t"
            )}
          >
            <span className="text-zinc-600">{days[dayIndex]}</span>
            <ScheduleRegularCell
              key={dayIndex}
              dayRow={dayRow}
              dayIndex={dayIndex}
              selectCellsLength={selectCells.length}
              onClickCell={handleClickCell}
            />
          </section>
        ))}
        <SaveScheduleWidget
          isOpenPanel={isOpenPanel}
          selectCells={[...selectCells, ...deleteCells]}
          togglePanel={togglePanel}
          onSaveSchedule={handleSaveRegularSchedule}
        />
      </div>
    );
  }
);

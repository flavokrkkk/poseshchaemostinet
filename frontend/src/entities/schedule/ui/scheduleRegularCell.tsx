import { CalendarCell } from "@/entities/templateLesson/types/types";
import { getSlotClass } from "../lib/constants";
import { cn } from "@/shared";

interface ScheduleRegularCellProps {
  dayRow: CalendarCell[];
  dayIndex: number;
  selectCellsLength: number;
  onClickCell: (dayIndex: number, timeIndex: number) => void;
}

export const ScheduleRegularCell = ({
  dayRow,
  dayIndex,
  selectCellsLength,
  onClickCell,
}: ScheduleRegularCellProps) => {
  return (
    <div className="grid grid-cols-2 w-[273px] gap-2">
      {dayRow.map((cell, cellIndex) => (
        <button
          key={cellIndex}
          className={cn(
            "p-1.5 h-[60px] cursor-pointer flex-col justify-between text-sm border flex items-start rounded-md",
            getSlotClass(cell.slotType)
          )}
          disabled={
            selectCellsLength >= 10 &&
            cell.slotType !== "select" &&
            cell.slotType !== "active"
          }
          onClick={() => onClickCell(dayIndex, cellIndex)}
        >
          {cell.timeStart}-{cell.timeEnd}
          {cell.isActive && <span>{cell.lessonName}</span>}
        </button>
      ))}
    </div>
  );
};

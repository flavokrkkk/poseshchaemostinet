import { cn } from "@/shared/lib";

interface CalendarDay {
  date: Date;
  dayNumber: string;
  dayOfWeek: string;
  isSelected: boolean;
  isToday: boolean;
  isHoliday: boolean;
}

interface CalendarDaysGridProps {
  days: CalendarDay[];
  onSelect: (date: Date, disabled?: boolean) => void;
}

export const CalendarDaysGrid: React.FC<CalendarDaysGridProps> = ({
  days,
  onSelect,
}) => (
  <div className="grid gap-2 grid-cols-7 w-full border-gray-200 rounded-lg">
    {days.map((day) => (
      <div
        key={day.date.toISOString()}
        className="flex items-center justify-center"
      >
        <div
          onClick={() => onSelect(day.date, day.isHoliday)}
          className={cn(
            "flex-shrink-0 cursor-pointer flex flex-col items-center justify-center w-10 h-10 rounded-full transition select-none",
            day.isHoliday
              ? "opacity-50 cursor-not-allowed"
              : !day.isToday && !day.isSelected && "hover:bg-sky-100",
            day.isSelected && "bg-orange-600 text-white font-semibold",
            day.isToday && !day.isSelected && "bg-sky-500 text-white"
          )}
        >
          <div className="text-xs leading-none">{day.dayNumber}</div>
          <div className="text-[9px] leading-none uppercase opacity-70">
            {day.dayOfWeek}
          </div>
        </div>
      </div>
    ))}
  </div>
);

import { EDateFormats } from "@/shared/lib/utils/dateFormat";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  set,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ru } from "date-fns/locale";

export type ViewMode = "week" | "month";

export class DateManager {
  static generateDays(mode: ViewMode, viewDate: Date, selectedDate?: Date) {
    let startDate: Date;
    let endDate: Date;

    if (mode === "week") {
      startDate = startOfWeek(viewDate, { weekStartsOn: 1 });
      endDate = endOfWeek(viewDate, { weekStartsOn: 1 });
    } else {
      startDate = startOfMonth(viewDate);
      endDate = endOfMonth(viewDate);
    }

    const days = [] as {
      date: Date;
      dayNumber: string;
      dayOfWeek: string;
      isSelected: boolean;
      isToday: boolean;
      isHoliday: boolean;
    }[];

    for (let d = startDate; d <= endDate; d = addDays(d, 1)) {
      const isHoliday =
        d >= new Date(d.getFullYear(), 6, 1) &&
        d < new Date(d.getFullYear(), 8, 1);

      days.push({
        date: d,
        dayNumber: format(d, "d"),
        dayOfWeek: format(d, EDateFormats.DAY_FULL_LONG, { locale: ru }),
        isSelected: selectedDate ? isSameDay(d, selectedDate) : false,
        isToday: isSameDay(d, new Date()),
        isHoliday,
      });
    }

    return days;
  }

  static navigateDate(
    mode: ViewMode,
    viewDate: Date,
    direction: "prev" | "next"
  ) {
    if (mode === "week")
      return addDays(viewDate, direction === "next" ? 7 : -7);
    return direction === "next"
      ? addMonths(viewDate, 1)
      : subMonths(viewDate, 1);
  }
}

export function timeToMinutes(date: Date, timeStr: string): Date {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return set(date, { hours: hours, minutes: minutes });
}

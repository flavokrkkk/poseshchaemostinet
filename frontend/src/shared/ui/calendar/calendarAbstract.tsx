import React, { memo, useEffect, useMemo, useState } from "react";
import { format, getYear } from "date-fns";
import { ru } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { EDateFormats } from "@/shared/lib/utils/dateFormat";
import { DateManager, ViewMode } from "./lib/dateManager";
import { CalendarDaysGrid } from "./calendarDaysGrid";

interface CalendarAbstractProps {
  onChangeDate: (date: Date) => void;
  selectedDate: Date;
}

export const CalendarAbstract: React.FC<CalendarAbstractProps> = memo(
  ({ onChangeDate, selectedDate }) => {
    const [viewMode, setViewMode] = useState<ViewMode>("week");
    const [viewDate, setViewDate] = useState<Date>(selectedDate);

    const { days, monthName, year } = useMemo(() => {
      const days = DateManager.generateDays(viewMode, viewDate, selectedDate);
      return {
        days,
        monthName: format(viewDate, EDateFormats.MONTH_FULL, {
          locale: ru,
        }).replace(/^./, (c) => c.toUpperCase()),
        year: getYear(viewDate),
      };
    }, [viewMode, viewDate, selectedDate]);

    const handlePrev = () =>
      setViewDate((d) => DateManager.navigateDate(viewMode, d, "prev"));

    const handleNext = () =>
      setViewDate((d) => DateManager.navigateDate(viewMode, d, "next"));

    const toggleExpand = () =>
      setViewMode((m) => (m === "week" ? "month" : "week"));

    const handleSelect = (date: Date, disabled?: boolean) => {
      if (disabled) return;
      onChangeDate(date);
      setViewDate(date);
    };

    useEffect(() => setViewDate(selectedDate), [selectedDate]);

    return (
      <div className="relative bg-white p-4 rounded-3xl shadow-sm max-w-full space-y-3">
        <div className="flex items-center justify-between p-2 bg-gradient-to-r from-white to-sky-50 rounded-xl">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-zinc-500">{year}</span>
            <span className="text-sm font-medium text-gray-700">
              {monthName}
            </span>
          </div>
          <button
            aria-label="Toggle view"
            onClick={toggleExpand}
            className="flex items-center gap-1 text-sky-600 hover:text-sky-700 transition-colors px-2 py-1 rounded-md"
          >
            <span className="text-sm">
              {viewMode === "week" ? "Показать месяц" : "Показать неделю"}
            </span>
            {viewMode === "month" ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2 px-2 w-full justify-between">
            <button
              onClick={handlePrev}
              className="p-1 rounded-full border bg-sky-300 hover:bg-sky-100 transition"
            >
              <ChevronLeft className="w-5 h-5 text-sky-100" />
            </button>
            <p>{format(selectedDate, EDateFormats.DAY_FULL, { locale: ru })}</p>
            <button
              onClick={handleNext}
              className="p-1 rounded-full border bg-sky-300 hover:bg-sky-100 transition"
            >
              <ChevronRight className="w-5 h-5 text-sky-100" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <CalendarDaysGrid days={days} onSelect={handleSelect} />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }
);

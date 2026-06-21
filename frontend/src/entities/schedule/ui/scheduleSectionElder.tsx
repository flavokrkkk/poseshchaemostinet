import { ElderLessonItem } from "../../lesson/ui/elderLessonItem";
import { Plus } from "lucide-react";
import { useActions } from "@/shared/hooks/useActions";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import { useGetSchedule } from "../hooks/useGetSchedule";
import { useState } from "react";
import { format } from "date-fns/format";
import { LessonEmpty } from "@/entities/lesson/ui/lessonEmpty";
import { cn } from "@/shared";
import { EDateFormats } from "@/shared/lib/utils/dateFormat";
import { CalendarAbstract } from "@/shared/ui/calendar/calendarAbstract";
import { LoadingCard } from "@/widgets/loadingWidget/ui/loadingCard";

interface ScheduleSectionElderProps {
  groupId: string;
}

export const ScheduleSectionElder = ({
  groupId,
}: ScheduleSectionElderProps) => {
  const { setOpenDrawer } = useActions();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const { data: schedule, isLoading } = useGetSchedule({
    groupId,
    date: format(currentDate, EDateFormats.DATE_DASH),
  });

  const handleOpenCreateLessonDrawer = () =>
    setOpenDrawer({
      isOpen: true,
      type: EDrawerVariables.CREATE_LESSON_DRAWER,
      data: { groupId },
    });

  const handleChangeDate = (date: Date) => setCurrentDate(date);
  return (
    <div className={cn("space-y-4 relative")}>
      <CalendarAbstract
        selectedDate={currentDate}
        onChangeDate={handleChangeDate}
      />
      <section className="container mx-auto pb-4 space-y-2">
        {isLoading ? (
          <LoadingCard className="h-[40px]" />
        ) : schedule && schedule.lessons.length ? (
          <div className="space-y-4">
            {schedule.lessons.map((lesson) => (
              <ElderLessonItem key={lesson.id} lesson={lesson} />
            ))}
          </div>
        ) : (
          <LessonEmpty emptyMessage="Вы еще не добавили занятия" />
        )}
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          onClick={handleOpenCreateLessonDrawer}
        >
          <Plus className="h-6 w-6" />
        </button>
      </section>
    </div>
  );
};

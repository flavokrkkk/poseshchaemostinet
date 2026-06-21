import { format } from "date-fns";
import { useState } from "react";
import { useGetSchedule } from "../hooks/useGetSchedule";
import { PromoSlider } from "@/features/promo/ui/promoSlider";
import { promoImages } from "@/features/promo/lib/mockPromo";
import { CardContent } from "@/widgets/cardContent/ui/cardContent";
import { LessonList } from "@/entities/lesson/ui/lessonList";
import { EventList } from "@/entities/event/ui/eventList";
import { EDateFormats } from "@/shared/lib/utils/dateFormat";
import { CalendarAbstract } from "@/shared/ui/calendar/calendarAbstract";
import { LoadingCard } from "@/widgets/loadingWidget/ui/loadingCard";
import { LessonEmpty } from "@/entities/lesson/ui/lessonEmpty";

interface ScheduleSectionStudentProps {
  groupId: string;
}

export const ScheduleSectionStudent = ({
  groupId,
}: ScheduleSectionStudentProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const { data: schedule, isLoading } = useGetSchedule({
    groupId: groupId,
    date: format(currentDate, EDateFormats.DATE_DASH),
  });

  const handleChangeDate = (date: Date) => setCurrentDate(date);

  return (
    <div className="flex justify-center flex-col space-y-4 pb-4">
      <CalendarAbstract
        selectedDate={currentDate}
        onChangeDate={handleChangeDate}
      />
      <PromoSlider images={promoImages} />
      <CardContent>
        <h2 className="font-medium">Пары</h2>
        {isLoading ? (
          <LoadingCard className="h-[40px]" />
        ) : schedule && schedule.lessons.length ? (
          <LessonList lessons={schedule.lessons} />
        ) : (
          <LessonEmpty />
        )}
      </CardContent>
      <CardContent>
        <h2 className="font-medium">События университета</h2>
        <EventList />
      </CardContent>
    </div>
  );
};

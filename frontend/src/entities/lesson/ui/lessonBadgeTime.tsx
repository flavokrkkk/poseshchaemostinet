import { EDateFormats } from "@/shared/lib/utils/dateFormat";
import { format } from "date-fns";

interface LessonBadgeTimeProps {
  startDate: string;
  endDate: string;
}

export const LessonBadgeTime = ({
  startDate,
  endDate,
}: LessonBadgeTimeProps) => {
  return (
    <span className="text-gray-400">
      {format(new Date(startDate), EDateFormats.TIME_HM)} —{" "}
      {format(new Date(endDate), EDateFormats.TIME_HM)}
    </span>
  );
};

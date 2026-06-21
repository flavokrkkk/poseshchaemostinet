import { lessonIconStatus } from "@/entities/lesson/lib/constants";
import { AttendanceTypeCell } from "../types/types";

interface AnalyticAttendanceListProps {
  totalHours: number;
  analytics: AttendanceTypeCell[];
}

export const AnalyticAttendanceList = ({
  analytics,
  totalHours,
}: AnalyticAttendanceListProps) => {
  return (
    <div className="space-y-3">
      {analytics?.map((analytic, index) => {
        const hours = analytic.visitors * 2;
        const percent = totalHours ? Math.round((hours / totalHours) * 100) : 0;

        return (
          <div key={index} className="flex items-center space-x-2">
            <div className="h-10 w-10 flex items-center justify-center border rounded-xl">
              {lessonIconStatus[analytic.attendanceType].icon}
            </div>
            <div className="text-sm">
              <p className="text-zinc-500">{analytic.attendance}</p>
              <span>
                {hours} часа ({percent}%)
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

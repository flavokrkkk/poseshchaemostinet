import { Image } from "@/shared";
import { Attendance } from "../types/types";
import {
  attendanceParceType,
  LESSON_STATUSES,
  lessonIconStatus,
} from "@/entities/lesson/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";

interface AttendanceSelectProps {
  attendance: Attendance;
  onValueChange: (value: string) => void;
}

export const AttendanceSelect = ({
  attendance,
  onValueChange,
}: AttendanceSelectProps) => {
  return (
    <div className="flex flex-col p-3 py-4 rounded-2xl space-y-4 bg-white hover:bg-blue-100 shadow-sm transition">
      <section className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          <Image
            alt="attendance-avatar"
            src={attendance.user.avatarUrl}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium">{attendance.user.fullName}</p>
            <span className="text-xs text-gray-400">
              {attendance.user.role}
            </span>
          </div>
        </div>
        <div>{lessonIconStatus[attendance.status].icon}</div>
      </section>
      <div>
        <Select defaultValue={attendance.status} onValueChange={onValueChange}>
          <SelectTrigger className="w-full  py-5 bg-blue-400 rounded-xl text-white">
            <SelectValue placeholder="Тип урока" />
          </SelectTrigger>
          <SelectContent className="bg-blue-400 rounded-xl text-white">
            {LESSON_STATUSES.map((status) => (
              <SelectItem
                key={status}
                value={status}
                className="rounded-lg py-2"
              >
                {attendanceParceType[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1 rounded-xl text-sm">
        {LESSON_STATUSES.map((status) => {
          const { icon } = lessonIconStatus[status];
          const label = attendanceParceType[status];

          return (
            <div
              key={status}
              className="flex items-center gap-1 px-2 py-1 rounded-xl"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-md">
                {icon}
              </div>
              <span className="text-xs text-gray-700">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

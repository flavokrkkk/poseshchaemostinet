import { Image } from "@/shared";
import { Attendance } from "../types/types";
import { lessonIconStatus } from "@/entities/lesson/lib/constants";
import { useActions } from "@/shared/hooks/useActions";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";

interface AttendanceItemProps {
  attendance: Attendance;
}

export const AttendanceItem = ({ attendance }: AttendanceItemProps) => {
  const { setOpenDrawer } = useActions();

  const handleOpenDrawer = () => {
    setOpenDrawer({
      isOpen: true,
      type: EDrawerVariables.ATTENDANCE_DRAWER,
      data: { ...attendance },
    });
  };

  return (
    <div
      className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 shadow-sm transition"
      onClick={handleOpenDrawer}
    >
      <div className="flex items-center space-x-3">
        <Image
          alt="attendance-avatar"
          src={attendance.user.avatarUrl}
          className="h-10 w-10 rounded-full"
        />
        <div>
          <p className="text-sm font-medium">{attendance.user.fullName}</p>
          <span className="text-xs text-gray-400">{attendance.user.role}</span>
        </div>
      </div>
      <div>{lessonIconStatus[attendance.status].icon}</div>
    </div>
  );
};

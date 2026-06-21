import { motion } from "framer-motion";
import { BackBadge, ERouteNames, Image } from "@/shared";
import { useQueryCacheData } from "@/shared/hooks/useQueryCacheData";
import { CURRENT_GROUP_QUERY } from "@/entities/group/hooks/useGetGroup";
import { Group } from "@/entities/group/types/types";
import { useLeaderBoard } from "@/entities/attendance/hooks/useGetLeaderBoard";
import { EAttendanceType } from "@/entities/attendance/types/types";
import { AttendanceBoardContent } from "@/entities/attendance/ui/attendanceBoardContent";

const LeaderBoardPage = () => {
  const currentGroup = useQueryCacheData<Group>([CURRENT_GROUP_QUERY]);
  const { data: leaders } = useLeaderBoard({
    attendanceType: EAttendanceType.PRESENT,
    universityId: currentGroup.universityId,
  });

  return (
    <div className="space-y-4">
      <BackBadge
        backPath={`/${ERouteNames.DASHBOARD_ELDER_ROUTE}`}
        title="К расписанию"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative"
      >
        <Image
          src="/images/vacancy_main.png"
          alt="vacancy-banner"
          className="rounded-3xl w-full"
        />
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-medium text-white">
                Отслеживайте вашу группу в общем списке лидерборда
              </h1>
            </div>
          </div>
        </div>
      </motion.div>
      {leaders?.length && <AttendanceBoardContent leaders={leaders} />}
    </div>
  );
};

export default LeaderBoardPage;

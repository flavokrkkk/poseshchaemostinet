import { Icon, IconTypes, Image } from "@/shared";
import { motion } from "framer-motion";
import { TopGroupByAttendace } from "../types/types";
import { getAvatar } from "../lib/constants";

export const LeaderCard = ({
  leader,
  index,
}: {
  leader: TopGroupByAttendace;
  index: number;
}) => {
  return (
    <motion.div
      key={leader.groupId}
      className="flex items-center justify-between p-4 rounded-xl bg-white shadow-sm"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 * (index + 4) }}
    >
      <div className="flex items-center gap-4">
        <Image
          src={getAvatar(index + 4)}
          alt={`${leader.groupName}'s avatar`}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="font-semibold text-gray-900">{leader.groupName}</div>
          <div className="text-sm text-gray-500">{index + 4} Place</div>
        </div>
      </div>
      <div className="text-right flex flex-col items-center">
        <div className="font-medium text-gray-900">{leader.count}</div>
        <div className="text-sm text-blue-500">
          <Icon type={IconTypes.POSNET_V2_OUTLINED} className="text-xl" />
        </div>
      </div>
    </motion.div>
  );
};

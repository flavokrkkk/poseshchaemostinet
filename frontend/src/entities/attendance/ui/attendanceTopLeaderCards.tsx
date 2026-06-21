import { Image } from "@/shared";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import { TopGroupByAttendace } from "../types/types";
import { getAvatar } from "../lib/constants";

export const TopThreeLeaders = ({
  top3,
}: {
  top3: Array<TopGroupByAttendace>;
}) => {
  return (
    <div className="relative flex justify-around items-end gap-4">
      {top3[1] && (
        <motion.div
          className="flex flex-col items-center text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-4 border-zinc-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={getAvatar(2)}
              alt={`${top3[1].groupName}'s avatar`}
              className="w-full h-full rounded-full p-1"
            />
          </motion.div>
          <div className="mt-2 text-sm font-semibold text-blue-400">
            {top3[1].count}
          </div>
          <div className="text-xs text-blue-400">{top3[1].groupName}</div>
        </motion.div>
      )}

      {top3[0] && (
        <motion.div
          className="flex flex-col items-center text-white z-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            className="w-20 h-20 relative rounded-full bg-white flex items-center justify-center border-4 border-yellow-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="absolute -top-8 text-yellow-300">
              <Crown />
            </span>
            <Image
              src={getAvatar(1)}
              alt={`${top3[0].groupName}'s avatar`}
              className="w-full h-full rounded-full p-1"
            />
          </motion.div>
          <div className="mt-2 text-sm font-semibold text-blue-400">
            {top3[0].count}
          </div>
          <div className="text-sm text-blue-400">{top3[0].groupName}</div>
        </motion.div>
      )}

      {top3[2] && (
        <motion.div
          className="flex flex-col items-center text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-4 border-yellow-500"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={getAvatar(3)}
              alt={`${top3[2].groupName}'s avatar`}
              className="w-full h-full rounded-full p-1"
            />
          </motion.div>
          <div className="mt-2 text-sm font-semibold text-blue-400">
            {top3[2].count}
          </div>
          <div className="text-xs text-blue-400">{top3[2].groupName}</div>
        </motion.div>
      )}
    </div>
  );
};

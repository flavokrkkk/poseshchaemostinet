import { motion } from "framer-motion";

type ProgressBarProps = {
  progress: number;
};

const xpValue = 10.57;
const level = 10;

export const UserAchievementsProgress = ({ progress }: ProgressBarProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-5 bg-zinc-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>

      <div className="mt-2 text-sm font-semibold text-gray-300">
        {`${xpValue} XP | ${level} lvl`}
      </div>
    </div>
  );
};

import { Image } from "@/shared";
import { Achievement } from "../types/types";
import { motion } from "framer-motion";
import { useActions } from "@/shared/hooks/useActions";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";

interface AchievementCardProps {
  achievement: Achievement;
}

export const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const { setOpenDrawer } = useActions();

  const handleOpenAchievementsDrawer = () => {
    setOpenDrawer({
      isOpen: true,
      type: EDrawerVariables.ACHIEVEMENTS_DRAWER,
      data: { ...achievement },
    });
  };

  return (
    <div
      className="bg-white rounded-xl p-3 flex justify-center items-center flex-col"
      onClick={handleOpenAchievementsDrawer}
    >
      <Image
        alt={`achievement-${achievement.id}`}
        src={achievement.template.imageUrl}
        width={110}
        height={110}
      />
      <div className="w-full">
        <div className="p-2 py-1 pb-2">
          <div className="bg-zinc-300 h-1.5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${achievement.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${achievement.progress}%` }}
            />
          </div>
        </div>
        <h3 className="text-center text-sm truncate">
          {achievement.template.title}
        </h3>
      </div>
    </div>
  );
};

import { Image } from "@/shared";
import { Achievement } from "../types/types";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface AchievementWidgetProps {
  achievement: Achievement;
}

export const AchievementWidget = ({ achievement }: AchievementWidgetProps) => {
  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <div className="h-60 w-full flex justify-center items-center">
          <Image
            alt={`achievement-${achievement.id}`}
            src={achievement.template.imageUrl}
            width={140}
            height={140}
          />
        </div>
        <div className="bg-white p-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">
              {achievement.template.title}
            </h3>
            <p className="text-sm text-gray-600">
              {achievement.template.description}
            </p>
          </div>
          <div className="space-y-1">
            <div className="bg-zinc-300 h-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${achievement.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${achievement.progress}%` }}
              />
            </div>
            <div className="text-gray-500 text-xs">
              <span>{achievement.progress}% из</span>
              <span> 100%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="flex items-center justify-between bg-blue-400 text-white rounded-2xl px-4 py-3 shadow-md">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">
              Есть у 14% пользователей
            </span>
            <span className="text-xs text-zinc-200">
              Так просто не встретишь
            </span>
          </div>
          <div className="flex items-center justify-center bg-white border-blue-300 border rounded-full w-7 h-7">
            <Star size={16} className="text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

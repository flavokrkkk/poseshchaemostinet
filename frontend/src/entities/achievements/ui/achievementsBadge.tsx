import { ERouteNames, Image } from "@/shared";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui/carousel/carousel";
import { motion } from "framer-motion";
import { CardContent } from "@/widgets/cardContent/ui/cardContent";
import { Link } from "react-router-dom";
import { Achievement } from "../types/types";
import { LoadingCard } from "@/widgets/loadingWidget/ui/loadingCard";

interface AchievementsBadgeProps {
  achievements: Achievement[] | undefined;
  isLoading: boolean;
}

export const AchievementsBadge = ({
  achievements,
  isLoading,
}: AchievementsBadgeProps) => {
  return (
    <CardContent
      cardTitle={
        <section className="flex justify-between w-full items-center">
          <p>Достижения</p>
          <Link
            to={`/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}/${ERouteNames.ACHIEVEMENTS_ROUTE}`}
            className="text-sm text-blue-400"
          >
            Все 6
          </Link>
        </section>
      }
    >
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full max-w-sm"
      >
        <CarouselContent className="space-x-2">
          {isLoading ? (
            <LoadingCard className="h-40" />
          ) : achievements && achievements.length > 0 ? (
            achievements.map((achievement, index) => (
              <CarouselItem
                key={index}
                className="bg-zinc-100 rounded-2xl  flex justify-center items-center"
                style={{
                  flexBasis: `calc(1/3 * 95%)`,
                }}
              >
                <div className="p-1">
                  <Image
                    alt={`achievement-${index}`}
                    src={achievement.template.imageUrl}
                    width={90}
                    height={90}
                  />
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
                </div>
              </CarouselItem>
            ))
          ) : null}
        </CarouselContent>
      </Carousel>
    </CardContent>
  );
};

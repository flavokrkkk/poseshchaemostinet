import { BackBadge, ERouteNames } from "@/shared";
import { useGetAchievements } from "@/entities/achievements/hooks/useGetAchievements";
import { AchievementCard } from "@/entities/achievements/ui/achievementCard";
import { LoadingCard } from "@/widgets/loadingWidget/ui/loadingCard";

const AchievementsPage = () => {
  const { data: achievements, isLoading } = useGetAchievements();

  return (
    <div className="space-y-4">
      <BackBadge
        backPath={`/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}`}
        title="Достижения"
      />
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
          {isLoading ? (
            <LoadingCard className="h-20" />
          ) : achievements && achievements.length > 0 ? (
            achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;

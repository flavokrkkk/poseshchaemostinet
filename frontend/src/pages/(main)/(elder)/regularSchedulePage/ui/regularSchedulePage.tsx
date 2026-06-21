import { CURRENT_GROUP_QUERY } from "@/entities/group/hooks/useGetGroup";
import { Group } from "@/entities/group/types/types";
import { ScheduleRegularContent } from "@/entities/schedule/ui/scheduleRegularContent";
import { useGetTemplateLessons } from "@/entities/templateLesson/hooks/useGetTemplateLessons";
import { BackBadge, ERouteNames } from "@/shared";
import { useQueryCacheData } from "@/shared/hooks/useQueryCacheData";
import { LoadingCard } from "@/widgets/loadingWidget/ui/loadingCard";

const RegularSchedulePage = () => {
  const currentGroup = useQueryCacheData<Group>([CURRENT_GROUP_QUERY]);
  const { data: templateLessons, isLoading } = useGetTemplateLessons({
    groupId: currentGroup.id,
  });

  return (
    <div className="space-y-3 ">
      <BackBadge
        backPath={`/${ERouteNames.DASHBOARD_ELDER_ROUTE}/${ERouteNames.SCHEDULE_ROUTE}`}
        title="К настройкам расписания"
      />
      {isLoading ? (
        <LoadingCard className="h-60" />
      ) : (
        templateLessons &&
        templateLessons.length > 0 && (
          <ScheduleRegularContent templateLessons={templateLessons} />
        )
      )}
    </div>
  );
};

export default RegularSchedulePage;

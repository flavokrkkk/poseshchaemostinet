import { NewsList } from "@/entities/news/ui/newsList";
import { BackBadge, ERouteNames } from "@/shared";

const NewsPage = () => {
  return (
    <div className="pb-4 space-y-4">
      <BackBadge
        backPath={`/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}`}
        title="Новости"
      />
      <NewsList />
    </div>
  );
};

export default NewsPage;

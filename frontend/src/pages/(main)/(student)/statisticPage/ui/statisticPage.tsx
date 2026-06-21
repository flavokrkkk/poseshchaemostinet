"use client";

import { Filter } from "lucide-react";
import { CardContent } from "@/widgets/cardContent/ui/cardContent";
import { useActions } from "@/shared/hooks/useActions";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";

import {
  useCustomerAnalytics,
  useGroupAnalytics,
} from "@/entities/analytics/hooks/useGetAnalytics";
import { AnalyticsContent } from "@/entities/analytics/ui/analyticsContent";
import { AnalyticStudentList } from "@/entities/analytics/ui/analyticStudentList";
import { LoadingCard } from "@/widgets/loadingWidget/ui/loadingCard";
import { AnalyticsStudentEmpty } from "@/entities/analytics/ui/analyticsStudentEmpty";

export const description = "A donut chart with text";

function StatisticPage() {
  const { data: analytics, isLoading: isLoadingPersonalAnalytic } =
    useCustomerAnalytics();
  const { data: groupAnalytics, isLoading: isLoadingGroupAnalytic } =
    useGroupAnalytics();
  const { setOpenDrawer } = useActions();

  const handleOpenStatisticDrawer = () => {
    setOpenDrawer({ isOpen: true, type: EDrawerVariables.STATISTIC_DRAWER });
  };

  return (
    <div className="flex flex-col space-y-4 pb-4">
      <CardContent
        cardTitle={
          <section className="flex justify-between items-center w-full">
            <h2>Статистика</h2>
            <button onClick={handleOpenStatisticDrawer}>
              <Filter className="h-5 w-5 text-zinc-500" />
            </button>
          </section>
        }
      >
        {isLoadingPersonalAnalytic ? (
          <LoadingCard className="h-[446px]" />
        ) : analytics && analytics.length ? (
          <AnalyticsContent analytics={analytics} />
        ) : (
          <AnalyticsStudentEmpty />
        )}
      </CardContent>
      <CardContent cardTitle="Топ группы">
        {isLoadingGroupAnalytic ? (
          <LoadingCard className="h-[210px]" />
        ) : groupAnalytics && groupAnalytics.topStudents.length ? (
          <AnalyticStudentList studentsAnalytic={groupAnalytics.topStudents} />
        ) : (
          <AnalyticsStudentEmpty />
        )}
      </CardContent>
    </div>
  );
}

export default StatisticPage;

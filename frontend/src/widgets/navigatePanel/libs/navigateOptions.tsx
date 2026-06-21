import { ERouteNames } from "@/shared";
import { ChartPie, ListOrdered, UserRound } from "lucide-react";

export const navigateOptions = [
  {
    id: 1,
    icon: <ListOrdered />,
    path: `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}`,
    pathSelect: () => [`/${ERouteNames.DASHBOARD_STUDENT_ROUTE}`],
  },
  {
    id: 2,
    icon: <ChartPie />,
    path: `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.STATISTIC_ROUTE}`,
    pathSelect: () => [
      `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.STATISTIC_ROUTE}`,
    ],
  },
  {
    id: 3,
    icon: <UserRound />,
    path: `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}`,
    pathSelect: (pathId: string) => [
      `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}`,
      `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}/${ERouteNames.ACHIEVEMENTS_ROUTE}`,
      `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}/${ERouteNames.NEWS_ROUTE}`,
      `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}/${ERouteNames.SETTINGS_ROUTE}`,
      `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}/${pathId}`,
      `/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}/${ERouteNames.GROUP_ROUTE}/${pathId}`,
    ],
  },
];

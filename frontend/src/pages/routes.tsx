import { ERouteNames } from "@/shared/lib/utils/routeVariables";
import RootPage from "./(main)/rootPage";
import ErrorPage from "./(main)/errorPage";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { lazy } from "react";
import AuthPage from "./(auth)/authPage";
import { routesWithHoc } from "@/shared/lib/utils/routesWithHoc";
import { privatePage } from "@/entities/viewer/lib/hoc/privatePage";
import { roleProtectedPage } from "@/entities/viewer/lib/hoc/rolePage";
import { groupInviteAction } from "@/entities/group/actions/groupInviteActions";
import { NavigatePanel } from "@/widgets/navigatePanel/ui/navigatePanel";
import { lessonDetailAction } from "@/entities/lesson/actions/lessonDetailAction";

const ElderDashboardPage = lazy(
  () => import("@/pages/(main)/(elder)/elderDashboardPage")
);
const StudentDashboardPage = lazy(
  () => import("@/pages/(main)/(student)/studentDashboardPage")
);
const UniversityPage = lazy(
  () => import("@/pages/(main)/(elder)/universityPage")
);

const LeaderBoardPage = lazy(
  () => import("@/pages/(main)/(elder)/leaderBoardPage")
);
const LendingPage = lazy(() => import("@/pages/(static)/lendingPage"));
const RegisterPage = lazy(() => import("@/pages/(auth)/registerPage"));
const LoginPage = lazy(() => import("@/pages/(auth)/loginPage"));

const ProfilePage = lazy(() => import("@/pages/(main)/(student)/profilePage"));
const ProfileDetailPage = lazy(
  () => import("@/pages/(main)/(student)/profileDetailPage")
);
const GroupPage = lazy(() => import("@/pages/(main)/(student)/groupPage"));
const GroupSettings = lazy(
  () => import("@/pages/(main)/(elder)/groupSettings")
);

const TemplateLessonPage = lazy(
  () => import("@/pages/(main)/(elder)/templateLessonPage")
);

const SchedulePage = lazy(() => import("@/pages/(main)/(elder)/schedulePage"));
const RegularSchedulePage = lazy(
  () => import("@/pages/(main)/(elder)/regularSchedulePage")
);

const StatisticPage = lazy(
  () => import("@/pages/(main)/(student)/statisticPage")
);

const AchievementsPage = lazy(
  () => import("@/pages/(main)/(student)/achievementsPage")
);
const NewsPage = lazy(() => import("@/pages/(main)/(student)/newsPage"));
const SettingsPage = lazy(
  () => import("@/pages/(main)/(student)/settingsPage")
);
const ElderLessonPage = lazy(
  () => import("@/pages/(main)/(elder)/elderLessonPage")
);

const AdvertisementPage = lazy(
  () => import("@/pages/(static)/advertisementPage")
);
const BrandPage = lazy(() => import("@/pages/(static)/brandPage"));
const RetentionPage = lazy(() => import("@/pages/(static)/retentionPage"));

export const routes = createBrowserRouter([
  {
    path: ERouteNames.DEFAULT_ROUTE,
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      ...routesWithHoc(privatePage, [
        {
          path: ERouteNames.EMPTY_ROUTE,
          element: <LendingPage />,
        },
        {
          path: ERouteNames.PRESENTATION_ROUTE,
          element: <Outlet />,
          children: [
            {
              path: ERouteNames.ADVERTISEMEN_ROUTE,
              element: <AdvertisementPage />,
            },
            {
              path: ERouteNames.BRAND_ROUTE,
              element: <BrandPage />,
            },
            {
              path: ERouteNames.RETENTION_ROUTE,
              element: <RetentionPage />,
            },
          ],
        },
        ...routesWithHoc(roleProtectedPage("ELDER", undefined), [
          {
            path: ERouteNames.DASHBOARD_ELDER_ROUTE,
            element: <Outlet />,
            children: [
              {
                path: ERouteNames.EMPTY_ROUTE,
                element: <ElderDashboardPage />,
              },
              {
                path: ERouteNames.UNIVERSITY_ROUTE,
                element: <UniversityPage />,
              },
              {
                path: ERouteNames.SCHEDULE_ROUTE,
                element: <Outlet />,
                children: [
                  {
                    path: ERouteNames.EMPTY_ROUTE,
                    element: <SchedulePage />,
                  },
                  {
                    path: ERouteNames.TEMPLATE_LESSON_ROUTE,
                    element: <TemplateLessonPage />,
                  },
                  {
                    path: ERouteNames.REGULAR_SCHEDULE_ROUTE,
                    element: <RegularSchedulePage />,
                  },
                ],
              },
              {
                path: ERouteNames.GROUP_SETTINGS,
                element: <GroupSettings />,
              },
              {
                path: ERouteNames.LEADER_BOARD_ROUTE,
                element: <LeaderBoardPage />,
              },
              {
                path: ERouteNames.ELDER_LESSON_ROUTE,
                loader: lessonDetailAction,
                element: <ElderLessonPage />,
              },
            ],
          },
        ]),
        {
          path: ERouteNames.INVITE_ROUTE,
          loader: groupInviteAction,
        },
        {
          path: ERouteNames.DASHBOARD_STUDENT_ROUTE,
          element: (
            <div>
              <Outlet />
              <NavigatePanel />
            </div>
          ),
          children: [
            {
              path: ERouteNames.EMPTY_ROUTE,
              element: <StudentDashboardPage />,
            },
            {
              path: ERouteNames.STATISTIC_ROUTE,
              element: <StatisticPage />,
            },
            {
              path: ERouteNames.PROFILE_ROUTE,
              element: <Outlet />,
              children: [
                {
                  path: ERouteNames.EMPTY_ROUTE,
                  element: <ProfilePage />,
                },
                {
                  path: ERouteNames.PROFILE_DETAIL_ROUTE,
                  element: <ProfileDetailPage />,
                },
                {
                  path: `${ERouteNames.GROUP_ROUTE}/${ERouteNames.GROUP_DETAIL_ROUTE}`,
                  element: <GroupPage />,
                },
                {
                  path: ERouteNames.ACHIEVEMENTS_ROUTE,
                  element: <AchievementsPage />,
                },
                {
                  path: ERouteNames.NEWS_ROUTE,
                  element: <NewsPage />,
                },
                {
                  path: ERouteNames.SETTINGS_ROUTE,
                  element: <SettingsPage />,
                },
              ],
            },
          ],
        },
      ]),
      {
        path: ERouteNames.AUTH_ROUTE,
        element: <AuthPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ERouteNames.EMPTY_ROUTE,
            element: <Navigate to={ERouteNames.REGISTER_ROUTE} replace />,
          },
          {
            path: ERouteNames.REGISTER_ROUTE,
            element: <RegisterPage />,
          },
          {
            path: ERouteNames.LOGIN_ROUTE,
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);

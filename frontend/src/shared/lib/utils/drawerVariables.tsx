import { AchievementsDrawer } from "@/features/drawers/ui/achievementsDrawer";
import { AttendanceDrawer } from "@/features/drawers/ui/attendanceDrawer";
import { CreateLessonDrawer } from "@/features/drawers/ui/createLessonDrawer";
import { CreateTemplateLessonDrawer } from "@/features/drawers/ui/createTemplateLessonDrawer";
import { EventDrawer } from "@/features/drawers/ui/eventDrawer";
import { HomeworkDrawer } from "@/features/drawers/ui/homeworkDrawer";
import { LessonDrawer } from "@/features/drawers/ui/lessonDrawer";
import { NewsDrawer } from "@/features/drawers/ui/newsDrawer";
import { StatisticDrawer } from "@/features/drawers/ui/statisticDrawer";
import { JSX } from "react";

export const enum EDrawerVariables {
  LESSON_DRAWER = "lesson-drawer",
  EVENT_DRAWER = "event-drawer",
  NEWS_DRAWER = "news-drawer",
  STATISTIC_DRAWER = "statistic-drawer",
  CREATE_LESSON_DRAWER = "create-lesson-drawer",
  CREATE_TEMPLATE_LESSON_DRAWER = "create-template-lesson-drawer",
  ATTENDANCE_DRAWER = "attendance-drawer",
  HOMEWORK_DRAWER = "homework-drawer",
  ACHIEVEMENTS_DRAWER = "achievements-drawer",
}

export const drawerComponents: Record<EDrawerVariables, JSX.Element> = {
  [EDrawerVariables.LESSON_DRAWER]: <LessonDrawer />,
  [EDrawerVariables.EVENT_DRAWER]: <EventDrawer />,
  [EDrawerVariables.NEWS_DRAWER]: <NewsDrawer />,
  [EDrawerVariables.STATISTIC_DRAWER]: <StatisticDrawer />,
  [EDrawerVariables.CREATE_LESSON_DRAWER]: <CreateLessonDrawer />,
  [EDrawerVariables.CREATE_TEMPLATE_LESSON_DRAWER]: (
    <CreateTemplateLessonDrawer />
  ),
  [EDrawerVariables.ATTENDANCE_DRAWER]: <AttendanceDrawer />,
  [EDrawerVariables.HOMEWORK_DRAWER]: <HomeworkDrawer />,
  [EDrawerVariables.ACHIEVEMENTS_DRAWER]: <AchievementsDrawer />,
};

export const getDrawerComponent = (type: EDrawerVariables): React.ReactNode => {
  return drawerComponents[type];
};

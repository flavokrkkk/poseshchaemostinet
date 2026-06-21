import { CURRENT_GROUP_QUERY } from "@/entities/group/hooks/useGetGroup";
import { Group } from "@/entities/group/types/types";
import { LessonEmpty } from "@/entities/lesson/ui/lessonEmpty";
import { useGetTemplateLessons } from "@/entities/templateLesson/hooks/useGetTemplateLessons";
import { TemplateLessonItem } from "@/entities/templateLesson/ui/templateLessonItem";
import { BackBadge, ERouteNames, Image } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useQueryCacheData } from "@/shared/hooks/useQueryCacheData";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import { CreateTemplateLessonWidget } from "@/widgets/createTemplateLessonWidget/ui/createTemplateLessonWidget";
import { LoadingCard } from "@/widgets/loadingWidget/ui/loadingCard";
import { motion } from "framer-motion";

const TemplateLessonPage = () => {
  const { setOpenDrawer } = useActions();

  const currentGroup = useQueryCacheData<Group>([CURRENT_GROUP_QUERY]);

  const { data: templateLessons, isLoading } = useGetTemplateLessons({
    groupId: currentGroup.id,
  });

  const handleCreateTemplateDrawerOpen = () =>
    setOpenDrawer({
      isOpen: true,
      type: EDrawerVariables.CREATE_TEMPLATE_LESSON_DRAWER,
      data: { groupId: currentGroup.id },
    });

  return (
    <div className="space-y-3 pb-40">
      <BackBadge
        backPath={`/${ERouteNames.DASHBOARD_ELDER_ROUTE}/${ERouteNames.SCHEDULE_ROUTE}`}
        title="К настройкам расписания"
      />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative"
      >
        <Image
          src="/images/vacancy_main.png"
          alt="vacancy-banner"
          className="rounded-3xl w-full"
        />

        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-medium text-white">
                Создание шаблонных уроков
              </h1>
            </div>
          </div>
        </div>
      </motion.div>
      {isLoading ? (
        <LoadingCard className="h-60" />
      ) : templateLessons && templateLessons.length > 0 ? (
        <section className="space-y-3">
          {templateLessons.map((lesson) => (
            <TemplateLessonItem key={lesson.id} lesson={lesson} />
          ))}
        </section>
      ) : (
        <div className="pt-10">
          <LessonEmpty emptyMessage="Шаблонные уроки отсутствуют" />
        </div>
      )}
      <CreateTemplateLessonWidget onClick={handleCreateTemplateDrawerOpen} />
    </div>
  );
};

export default TemplateLessonPage;

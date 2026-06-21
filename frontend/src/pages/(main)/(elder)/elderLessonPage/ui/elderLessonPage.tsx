import { Lesson } from "@/entities/lesson/types/types";

import { useLoaderData } from "react-router-dom";
import { BackBadge, ERouteNames } from "@/shared";

import { useLessonById } from "@/entities/lesson/hooks/useGetLessonById";
import { LessonCard } from "@/entities/lesson/ui/lessonCard";
import { LoadingCard } from "@/widgets/loadingWidget/ui/loadingCard";

const ElderLessonPage = () => {
  const lessonId = useLoaderData<Lesson["id"]>();
  const {
    data: currentLesson,
    isLoading,
    isPending,
  } = useLessonById({
    lessonId: lessonId,
  });

  if (isLoading || isPending) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <LoadingCard className="h-20" />
      </div>
    );
  }

  return (
    <section className="space-y-3 pb-4">
      <BackBadge
        backPath={`/${ERouteNames.DASHBOARD_ELDER_ROUTE}`}
        title="К расписанию"
      />
      {currentLesson && <LessonCard lesson={currentLesson} />}
    </section>
  );
};

export default ElderLessonPage;

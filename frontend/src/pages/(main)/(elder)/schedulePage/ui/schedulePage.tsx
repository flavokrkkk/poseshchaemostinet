import { CURRENT_GROUP_QUERY } from "@/entities/group/hooks/useGetGroup";
import { Group } from "@/entities/group/types/types";
import { useGetTemplateLessons } from "@/entities/templateLesson/hooks/useGetTemplateLessons";
import { BackBadge, Button, ERouteNames, Image } from "@/shared";
import { useQueryCacheData } from "@/shared/hooks/useQueryCacheData";
import { motion } from "framer-motion";

import { BookHeartIcon, Calendar, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SchedulePage = () => {
  const navigate = useNavigate();

  const currentGroup = useQueryCacheData<Group>([CURRENT_GROUP_QUERY]);

  const { data: templateLessons } = useGetTemplateLessons({
    groupId: currentGroup.id,
  });

  const handleToTemplateLesson = () =>
    navigate(ERouteNames.TEMPLATE_LESSON_ROUTE);

  const handleToRegularSchedule = () =>
    navigate(ERouteNames.REGULAR_SCHEDULE_ROUTE);

  return (
    <div className="space-y-3">
      <BackBadge
        backPath={`/${ERouteNames.DASHBOARD_ELDER_ROUTE}`}
        title="К расписанию"
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
                Создавайте шаблоны расписаний так, как удобно именно вам
              </h1>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="p-4 flex flex-col space-y-4 rounded-3xl bg-blue-400/60"
      >
        <section className="flex items-center space-x-3">
          <span>
            <BookHeartIcon className="w-5 h-5 text-blue-700" />
          </span>

          <div className="flex flex-col">
            <p className="font-semibold text-white">Перечень уроков</p>
            <p className="text-xs text-white">
              Создайте учебный перечень пар на семестр или учебный год. Это
              позволит использовать их в шаблонах расписания.
            </p>
          </div>
        </section>
        <div className="w-full">
          <Button
            className="w-full rounded-xl"
            onClick={handleToTemplateLesson}
          >
            Перейти
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="p-4 flex flex-col space-y-4 rounded-3xl bg-zinc-400/60"
      >
        <section className="flex items-center space-x-3">
          <span>
            <Calendar className="w-5 h-5 text-zinc-700" />
          </span>

          <div className="flex flex-col">
            <p className="font-semibold text-white">Шаблон расписания</p>
            <p className="text-xs text-white">
              С помощью данного шаблона вам не придётся добавлять пары каждый
              день вручную.
            </p>
          </div>
        </section>
        <div className="w-full space-y-1">
          <Button
            disabled={!templateLessons?.length}
            className="w-full rounded-xl bg-zinc-500"
            onClick={handleToRegularSchedule}
          >
            {templateLessons?.length ? "Перейти" : <Lock />}
          </Button>
          {!templateLessons?.length && (
            <p className="text-xs text-center text-zinc-600">
              Откроется когда будет добавлен перечень пар
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SchedulePage;

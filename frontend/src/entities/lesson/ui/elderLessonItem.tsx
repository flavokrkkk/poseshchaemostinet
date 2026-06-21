import { Lesson } from "@/entities/lesson/types/types";
import { useActions } from "@/shared/hooks/useActions";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { Archive, Calendar, GraduationCap, Trash2 } from "lucide-react";
import { cn, ERouteNames } from "@/shared";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { typeColor } from "@/entities/lesson/lib/constants";
import { EDateFormats } from "@/shared/lib/utils/dateFormat";
import { LessonBadgeTime } from "@/entities/lesson/ui/lessonBadgeTime";
import { useDeleteLesson } from "../hooks/useDeleteLesson";

interface ElderLessonItemProps {
  lesson: Lesson;
}

export const ElderLessonItem = ({ lesson }: ElderLessonItemProps) => {
  const navigate = useNavigate();
  const { setOpenModal } = useActions();
  const { mutate: deleteLesson } = useDeleteLesson({ lesson });

  const handleOpenDrawer = () =>
    navigate(
      `${ERouteNames.ELDER_LESSON_ROUTE}`.replace(":lessonId", lesson.id)
    );

  const handleDeleteLesson = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenModal({
      isOpen: true,
      type: EModalVariables.LESSON_DELETE_MODAL,
      data: {
        lesson,
        type: "default-lesson",
        onClickEvent: () => deleteLesson(),
      },
    });
  };

  const isArchived = new Date(lesson.endDate) < new Date();

  return (
    <div
      className={cn(
        `relative bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border-l-4`,
        typeColor[lesson.typeLesson],
        isArchived && "opacity-70 bg-zinc-200"
      )}
      onClick={handleOpenDrawer}
    >
      <section className="space-y-2">
        <h3
          className={cn(
            "font-semibold text-gray-800",
            isArchived && "line-through text-gray-400"
          )}
        >
          {lesson.name}
        </h3>
        <section>
          <div className="flex items-center space-x-1 text-gray-600 text-sm">
            <GraduationCap className="h-4 w-4" />
            <span>{lesson.teacherName}</span>
          </div>
          <div className="flex items-center justify-between space-x-1 text-gray-600 text-sm">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>
                {format(new Date(lesson.startDate), EDateFormats.DATE)},{" "}
                {format(new Date(lesson.startDate), EDateFormats.DAY_FULL, {
                  locale: ru,
                })}
              </span>
            </div>
            <LessonBadgeTime
              startDate={lesson.startDate}
              endDate={lesson.endDate}
            />
          </div>
        </section>
      </section>

      {isArchived ? (
        <button className="absolute top-2 cursor-pointer right-2 p-1">
          <Archive className="h-5 w-5 text-gray-400" />
        </button>
      ) : (
        <button
          className="absolute top-2 cursor-pointer right-2 p-1 rounded-full bg-red-100 hover:bg-red-200 transition-colors duration-200"
          onClick={handleDeleteLesson}
        >
          <Trash2 className="h-5 w-5 text-red-500 hover:text-red-700" />
        </button>
      )}
    </div>
  );
};

import { useActions } from "@/shared/hooks/useActions";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import { useCallback } from "react";
import { StudentLessonItem } from "./studentLessonItem";
import { Lesson } from "../types/types";

interface LessonListProps {
  lessons: Array<Lesson>;
}

export const LessonList = ({ lessons }: LessonListProps) => {
  const { setOpenDrawer } = useActions();

  const handleOpenDrawer = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const lessonIds = Number(event.currentTarget.value);
      if (!lessonIds && lessonIds !== 0) return;
      setOpenDrawer({
        isOpen: true,
        type: EDrawerVariables.LESSON_DRAWER,
        data: { ...lessons[lessonIds] },
      });
    },
    []
  );

  return (
    <div className="space-y-2">
      {lessons.map((lesson, index) => (
        <StudentLessonItem
          key={lesson.id}
          index={index}
          lesson={lesson}
          handleOpenDrawer={handleOpenDrawer}
        />
      ))}
    </div>
  );
};

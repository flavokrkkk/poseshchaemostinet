import { Lesson } from "@/entities/lesson/types/types";
import { useDeleteTemplateLesson } from "../hooks/useDeleteTemplateLesson";
import { DoorOpen, GraduationCap } from "lucide-react";
import { Button } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";

interface TemplateLessonItemProps {
  lesson: Lesson;
}

export const TemplateLessonItem = ({ lesson }: TemplateLessonItemProps) => {
  const { setOpenModal } = useActions();

  const { mutate: deleteTemplateLesson } = useDeleteTemplateLesson();

  const handleDeleteLesson = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenModal({
      isOpen: true,
      type: EModalVariables.LESSON_DELETE_MODAL,
      data: {
        lesson,
        type: "regular-lesson",
        onClickEvent: () => deleteTemplateLesson({ lessonId: lesson.id }),
      },
    });
  };

  return (
    <div className="rounded-3xl shadow-xl bg-white p-5 space-y-4">
      <header className="space-y-3">
        <div className="flex space-x-2 items-center">
          <h2 className="text-lg font-semibold leading-5">{lesson.name}</h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4" />
            <span>{lesson.teacherName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DoorOpen className="h-4 w-4" />
            <span>{lesson.room}</span>
          </div>
        </div>
        <Button className="w-full rounded-xl py-4" onClick={handleDeleteLesson}>
          Удалить
        </Button>
      </header>
    </div>
  );
};

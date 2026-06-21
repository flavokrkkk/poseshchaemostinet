import { Clock, GraduationCap } from "lucide-react";
import { Lesson } from "../types/types";
import { lessonIconStatus, lessonParceType } from "../lib/constants";
import { LessonBadgeTime } from "./lessonBadgeTime";

interface StudentLessonItemProps {
  lesson: Lesson;
  index: number;
  handleOpenDrawer: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const StudentLessonItem = ({
  lesson,
  index,
  handleOpenDrawer,
}: StudentLessonItemProps) => {
  const lessonParam = !!lesson.attendance.length
    ? lessonIconStatus[lesson.attendance[0].status]
    : { icon: <GraduationCap className="text-zinc-100" />, color: "#d4d4d8" };

  return (
    <button
      value={index}
      className="w-full cursor-pointer"
      onClick={handleOpenDrawer}
    >
      <div className="flex h-full space-x-3">
        <div
          style={{ background: lessonParam.color }}
          className="h-10 w-10 flex items-center justify-center border rounded-xl"
        >
          {lessonParam.icon}
        </div>

        <div className="flex flex-col flex-1 items-start">
          <h3 className="text-[15px]">{lesson.name}</h3>
          <span className="text-xs text-zinc-400">
            {lessonParceType[lesson.typeLesson]}
          </span>
        </div>
        <div className="min-h-full flex items-end text-xs space-x-1 text-zinc-500">
          <span className="pb-0.5">
            <Clock className="h-3 w-3" />
          </span>
          <LessonBadgeTime
            startDate={lesson.startDate}
            endDate={lesson.endDate}
          />
        </div>
      </div>
    </button>
  );
};

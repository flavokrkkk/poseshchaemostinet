import { Lesson } from "../types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion/accordion";
import {
  attendanceParceType,
  LESSON_STATUSES,
  lessonParceType,
  typeTextColor,
} from "@/entities/lesson/lib/constants";
import { motion } from "framer-motion";
import { AttendanceItem } from "@/entities/attendance/ui/attendanceItem";
import { format, isAfter } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar, Gamepad2, GraduationCap } from "lucide-react";
import { Button, cn, Image } from "@/shared";
import { LessonBadgeTime } from "./lessonBadgeTime";
import { useActions } from "@/shared/hooks/useActions";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { EDateFormats } from "@/shared/lib/utils/dateFormat";
import { Attendance, EAttendanceType } from "@/entities/attendance/types/types";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";

const filterAttendanceByStatus = (
  attendances: Attendance[],
  status: EAttendanceType
) => {
  return attendances.filter((attendance) => attendance.status === status);
};

interface LessonCardProps {
  lesson: Lesson;
}

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const { setOpenModal, setOpenDrawer } = useActions();

  const canEdit = !isAfter(new Date(lesson.startDate), new Date());

  const handleDeleteLesson = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenModal({
      isOpen: true,
      type: EModalVariables.LESSON_DELETE_MODAL,
      data: { type: "default-lesson", lesson, onClickEvent: () => {} },
    });
  };

  const handleOpenHomeworkDrawer = () => {
    setOpenDrawer({
      isOpen: true,
      type: EDrawerVariables.HOMEWORK_DRAWER,
      data: { ...lesson },
    });
  };

  return (
    <div className="rounded-3xl shadow-xl bg-white p-5 space-y-4">
      <header className="border-b pb-3 space-y-3">
        <div className="flex space-x-2 items-center">
          <h2 className="text-lg font-semibold leading-5">{lesson.name}</h2>
          <p className={cn("text-xs pt-0.5", typeTextColor[lesson.typeLesson])}>
            ({lessonParceType[lesson.typeLesson]})
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4" />
            <span>{lesson.teacherName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(lesson.startDate), EDateFormats.DATE)},{" "}
              {format(new Date(lesson.startDate), EDateFormats.DAY_FULL, {
                locale: ru,
              })}
            </span>
            <LessonBadgeTime
              startDate={lesson.startDate}
              endDate={lesson.endDate}
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="w-full">
            <Button
              className="w-full rounded-xl py-4"
              disabled={!canEdit}
              onClick={handleOpenHomeworkDrawer}
            >
              Д/З
            </Button>
          </div>
          <div className="w-full">
            <Button
              className="w-full rounded-xl py-4"
              onClick={handleDeleteLesson}
            >
              Удалить
            </Button>
          </div>
        </div>
      </header>

      <div className={cn("relative", !canEdit && "select-none")}>
        <Accordion type="multiple" className="space-y-3">
          {LESSON_STATUSES.map((status) => (
            <AccordionItem key={status} value={attendanceParceType[status]}>
              <AccordionTrigger>
                <div className="flex items-center space-x-2 w-full justify-between">
                  <span>{attendanceParceType[status]}</span>
                  <span className="border rounded-full h-5 w-5 text-white bg-blue-400 flex items-center justify-center text-xs">
                    {filterAttendanceByStatus(lesson.attendance, status).length}
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent className="grid sm:grid-cols-2 gap-3 mt-2">
                {(() => {
                  const list = filterAttendanceByStatus(
                    lesson.attendance,
                    status
                  );
                  return list.length ? (
                    list.map((a) => (
                      <AttendanceItem key={a.id} attendance={a} />
                    ))
                  ) : (
                    <div className="flex items-center flex-col justify-center text-blue-500">
                      <Gamepad2 />
                      <p>В этом списке пусто.</p>
                    </div>
                  );
                })()}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {!canEdit && (
          <div className="absolute inset-0 grid place-content-center rounded-3xl backdrop-blur-md bg-white ">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-2 text-blue-400 dark:text-slate-300"
            >
              <Image
                alt="lock-edit-attendance"
                src="/images/Protect-Privacy-2--Streamline-Manila.png"
                width={160}
                height={160}
              />
              <p className="text-sm font-medium">
                Посещаемость откроется в день урока
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

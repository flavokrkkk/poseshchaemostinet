import { LessonHomeworkFile } from "./lessonHomeworkFile";
import { useDownloadFile } from "@/shared/hooks/useDownloadFiles";
import { LessonHomeworkText } from "./lessonHomeworkText";
import { Image } from "@/shared";
import { Lesson } from "../types/types";

interface LessonHomeworkProps {
  lesson: Lesson;
}

export const LessonHomework = ({ lesson }: LessonHomeworkProps) => {
  const tasks = lesson.homeworkDescription?.split(/\r?\n/).filter(Boolean);

  const { downloadFile } = useDownloadFile();

  return (
    <div>
      {(lesson.homeworkDescription || !!lesson.homeworkFiles.length) && (
        <div className="space-y-3">
          {lesson.homeworkDescription && (
            <div className="space-y-3 bg-white rounded-3xl p-5">
              <h2>Описание</h2>
              <ul className="space-y-2">
                {tasks.map((description, idx) => (
                  <LessonHomeworkText key={idx} description={description} />
                ))}
              </ul>
            </div>
          )}

          {!!lesson.homeworkFiles.length && (
            <div className="space-y-3 bg-white rounded-3xl p-5">
              <h2>Прикрепленные файлы</h2>
              <ul className="space-y-2 space-x-2 flex flex-wrap">
                {lesson.homeworkFiles.map((file, idx) => (
                  <LessonHomeworkFile
                    key={idx}
                    isDeleteAction={false}
                    fileName={file.fileName}
                    onDownload={() => downloadFile(file.fileUrl)}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {!lesson.homeworkDescription && !lesson.homeworkFiles.length && (
        <div className="flex justify-center flex-col items-center space-y-1 bg-white rounded-3xl p-5">
          <Image
            alt="empty-homework"
            width={169}
            height={169}
            src="/public/images/Graduation-1--Streamline-Manila.png"
          />
          <p className="text-sm text-center">
            Домашнего задания нет <br />
            можно отдохнуть
          </p>
        </div>
      )}
    </div>
  );
};

import { Button } from "@/shared";
import { Link, X } from "lucide-react";

interface LessonHomeworkFileProps {
  isDeleteAction: boolean;
  fileName: string;
  onDownload?: () => {};
  onDelete?: () => void;
}

export const LessonHomeworkFile = ({
  isDeleteAction,
  fileName,
  onDownload,
  onDelete,
}: LessonHomeworkFileProps) => {
  return (
    <Button
      className="flex w-full items-center justify-between text-black font-light bg-[#E8E1FD] rounded-2xl"
      onClick={onDownload}
    >
      <div className="flex space-x-2 items-center">
        <Link className="w-4 h-4" />
        <span className="truncate block w-full text-wrap">{fileName}</span>
      </div>

      {isDeleteAction && (
        <span
          className="text-red-500 hover:text-red-600 ml-2"
          aria-label="Удалить файл"
          onClick={onDelete}
        >
          <X className="w-4 h-4" />
        </span>
      )}
    </Button>
  );
};

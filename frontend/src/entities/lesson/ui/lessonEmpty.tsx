import { Image } from "@/shared";

interface LessonEmptyProps {
  emptyMessage?: string;
}

export const LessonEmpty = ({ emptyMessage }: LessonEmptyProps) => {
  return (
    <div className="flex items-center flex-col space-y-2">
      <Image
        src="\images\Group.png"
        alt="lesson-empty"
        width={163}
        height={163}
      />
      <p>{emptyMessage || "Сегодня пар нет, можно остаться дома!"}</p>
    </div>
  );
};

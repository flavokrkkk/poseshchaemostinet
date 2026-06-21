import { Check } from "lucide-react";

export const LessonHomeworkText = ({
  description,
}: {
  description: string;
}) => {
  return (
    <li className="flex items-start gap-2">
      <Check className="text-green-500 mt-1 shrink-0" size={28} />
      <span className="text-gray-800 text-sm">{description}</span>
    </li>
  );
};

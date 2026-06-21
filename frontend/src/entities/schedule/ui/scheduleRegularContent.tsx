import { TemplateLesson } from "@/entities/templateLesson/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";
import { ScheduleRegularCalendar } from "@/entities/schedule/ui/scheduleRegularCalendar";
import { useCallback, useState } from "react";
import { cn } from "@/shared";

interface ScheduleRegularContentProps {
  templateLessons: TemplateLesson[];
}

export const ScheduleRegularContent = ({
  templateLessons,
}: ScheduleRegularContentProps) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number>(0);

  const handleTogglePanel = useCallback(() => {
    setIsPanelOpen((prev) => !prev);
  }, []);

  return (
    <div className={cn("space-y-3 pb-[76px]", isPanelOpen && "pb-60")}>
      <Select
        defaultValue={String(selectedIds)}
        onValueChange={(value) => setSelectedIds(Number(value))}
      >
        <SelectTrigger className="w-full py-6 bg-white text-black rounded-xl border-2 border-blue-400">
          <SelectValue placeholder="Тип урока" />
        </SelectTrigger>
        <SelectContent className="bg-white rounded-xl text-black border-2 border-blue-400">
          {templateLessons.map((lesson, index) => (
            <SelectItem
              key={lesson.id}
              value={String(index)}
              className="rounded-lg py-3"
            >
              {lesson.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ScheduleRegularCalendar
        isOpenPanel={isPanelOpen}
        selectedLessonId={templateLessons[selectedIds].id}
        togglePanel={handleTogglePanel}
      />
    </div>
  );
};

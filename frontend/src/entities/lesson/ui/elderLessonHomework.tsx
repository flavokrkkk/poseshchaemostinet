import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/tabs/tabs";
import { Lesson } from "../types/types";
import { LessonUploadHomework } from "./lessonUploadHomework";
import { useCallback, useState } from "react";
import { LessonHomework } from "./lessonHomework";

interface ElderLessonHomeworkProps {
  lesson: Lesson;
}

export const ElderLessonHomework = ({ lesson }: ElderLessonHomeworkProps) => {
  const [tabValue, setTabValue] = useState<"watch" | "upload">("watch");

  const onWatchTab = useCallback(() => setTabValue("watch"), []);
  const onUploadTab = useCallback(() => setTabValue("upload"), []);

  return (
    <div>
      <Tabs value={tabValue}>
        <TabsList className="w-full">
          <TabsTrigger value="watch" onClick={onWatchTab}>
            Просмотр
          </TabsTrigger>
          <TabsTrigger value="upload" onClick={onUploadTab}>
            Загрузить
          </TabsTrigger>
        </TabsList>
        <TabsContent value="watch" className="max-h-[280px] overflow-auto">
          <LessonHomework lesson={lesson} />
        </TabsContent>
        <TabsContent value="upload">
          <LessonUploadHomework lesson={lesson} onSubmitting={onWatchTab} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

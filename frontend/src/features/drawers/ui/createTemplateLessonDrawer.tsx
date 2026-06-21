import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { useCreateTemplateLesson } from "@/entities/templateLesson/hooks/useCreateTemplateLesson";
import { CreateTemplateLessonTypeSchema } from "@/entities/templateLesson/lib/schemes/createTemplateLessonSchema";
import { CreateTemplateLessonForm } from "@/entities/templateLesson/ui/createTemplateLessonForm";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer/drawer";
import { useMemo } from "react";

export const CreateTemplateLessonDrawer = () => {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const { groupId } = useAppSelector(drawerSelectors.data) as {
    groupId: string;
  };

  const { toggleDrawer } = useActions();

  const { mutate: createTemplateLesson } = useCreateTemplateLesson();

  const isDrawerOpen =
    isOpen && type === EDrawerVariables.CREATE_TEMPLATE_LESSON_DRAWER;

  const defaultValues = useMemo(
    () => ({
      groupId: groupId || "",
      name: "",
      room: "",
      teacherName: "",
    }),
    [groupId]
  );

  const handleClose = () => {
    toggleDrawer(false);
  };

  const onEventSubmit = (data: CreateTemplateLessonTypeSchema) => {
    handleClose();
    createTemplateLesson(data);
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent className="rounded-t-3xl shadow-2xl">
        <div className="mx-auto w-full">
          <DrawerHeader className="pb-0">
            <DrawerTitle className="text-lg font-bold">
              Создать шаблон пары
            </DrawerTitle>
          </DrawerHeader>
          <CreateTemplateLessonForm
            defaultValues={defaultValues}
            onEventSubmit={onEventSubmit}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

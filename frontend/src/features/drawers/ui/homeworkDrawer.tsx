import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { Lesson } from "@/entities/lesson/types/types";
import { ElderLessonHomework } from "@/entities/lesson/ui/elderLessonHomework";
import { Button } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer/drawer";

export const HomeworkDrawer = () => {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const selectLesson = useAppSelector(
    drawerSelectors.data
  ) as unknown as Lesson;
  const { toggleDrawer } = useActions();

  const isDrawerOpen = isOpen && type === EDrawerVariables.HOMEWORK_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent className="bg-blue-100">
        <div>
          <DrawerHeader>
            <DrawerTitle className="text-lg">
              {selectLesson.name} (Д/З)
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col p-4 pb-0 py-0 space-y-4">
            <ElderLessonHomework lesson={selectLesson} />
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                variant={"outline"}
                type="submit"
                className="w-full bg-white text-black py-5 rounded-2xl"
              >
                Закрыть
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

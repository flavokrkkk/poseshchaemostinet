import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { mockAllLessons } from "@/entities/lesson/lib/mockLessons";
import { Button } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer/drawer";

export const StatisticDrawer = () => {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const { toggleDrawer } = useActions();

  const isDrawerOpen = isOpen && type === EDrawerVariables.STATISTIC_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-lg">Фильтры по предметам</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col p-4 pb-0 py-0 space-y-4">
            <ul className="space-y-3">
              {mockAllLessons.map((lesson) => (
                <li key={lesson.id} className="flex items-center space-x-2">
                  <Checkbox />
                  <p>{lesson.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Закрыть</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

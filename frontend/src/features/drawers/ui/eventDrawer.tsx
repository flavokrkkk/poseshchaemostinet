import {
  ChevronDown,
  CircleQuestionMark,
  Clock,
  DoorOpen,
  GraduationCap,
} from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@shared/ui/drawer/drawer";
import { Button } from "@/shared";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { useActions } from "@/shared/hooks/useActions";
import { Event } from "@/entities/event/types/types";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";

export function EventDrawer() {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const selectEvent = useAppSelector(drawerSelectors.data) as unknown as Event;
  const { toggleDrawer } = useActions();

  const isDrawerOpen = isOpen && type === EDrawerVariables.EVENT_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent>
        <div>
          <DrawerHeader>
            <DrawerTitle className="text-lg">{selectEvent.name}</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col p-4 pb-0 py-0 space-y-4">
            <section className="bg-white rounded-3xl p-5 space-y-3">
              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center space-x-1">
                  <span>
                    <Clock className="h-4 w-4" />
                  </span>
                  <span>Время</span>
                </div>
                <div>
                  {selectEvent.startTime} - {selectEvent.endTime}
                </div>
              </div>
              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center space-x-1">
                  <span>
                    <GraduationCap className="h-4 w-4" />
                  </span>
                  <span>Проводит</span>
                </div>
                <div>ITAM</div>
              </div>
              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center space-x-1">
                  <span>
                    <DoorOpen className="h-4 w-4" />
                  </span>
                  <span>Кабинет</span>
                </div>
                <div>Г-513</div>
              </div>
              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center space-x-1">
                  <span>
                    <CircleQuestionMark className="h-4 w-4" />
                  </span>
                  <span>О событии</span>
                </div>
                <div>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </section>
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
}

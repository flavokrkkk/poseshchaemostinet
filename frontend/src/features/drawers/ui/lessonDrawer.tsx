import { Clock, DoorOpen, GraduationCap, School2 } from "lucide-react";

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
import { Lesson } from "@/entities/lesson/types/types";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import { LessonBadgeTime } from "@/entities/lesson/ui/lessonBadgeTime";
import { LessonHomework } from "@/entities/lesson/ui/lessonHomework";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/ui/tabs/tabs";
import {
  attendanceParceType,
  lessonIconStatus,
  lessonParceType,
} from "@/entities/lesson/lib/constants";

export function LessonDrawer() {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const selectLesson = useAppSelector(
    drawerSelectors.data
  ) as unknown as Lesson;
  const { toggleDrawer } = useActions();

  const isDrawerOpen = isOpen && type === EDrawerVariables.LESSON_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent className="bg-blue-100">
        <div>
          <DrawerHeader>
            <DrawerTitle className="text-lg">{selectLesson.name}</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col p-4 pb-0 py-0 space-y-4">
            <Tabs defaultValue="info">
              <TabsList className="w-full">
                <TabsTrigger value="info">Информация</TabsTrigger>
                <TabsTrigger value="homework">Домашнее задание</TabsTrigger>
              </TabsList>
              <TabsContent
                value="info"
                className="max-h-[280px] overflow-auto space-y-3"
              >
                <section className="bg-white rounded-3xl p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <span>
                        <Clock className="h-4 w-4" />
                      </span>
                      <span>Время</span>
                    </div>
                    <LessonBadgeTime
                      startDate={selectLesson.startDate}
                      endDate={selectLesson.endDate}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <span>
                        <GraduationCap className="h-4 w-4" />
                      </span>
                      <span>Преподаватель</span>
                    </div>
                    <div>{selectLesson.teacherName}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <span>
                        <School2 className="h-4 w-4" />
                      </span>
                      <span>Тип урока</span>
                    </div>
                    <div>{lessonParceType[selectLesson.typeLesson]}</div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <span>
                        <DoorOpen className="h-4 w-4" />
                      </span>
                      <span>Кабинет</span>
                    </div>
                    <div>{selectLesson.room}</div>
                  </div>
                  <div
                    style={{
                      background:
                        lessonIconStatus[selectLesson.attendance[0].status]
                          .color,
                    }}
                    className="rounded-3xl p-2 flex space-x-2 justify-center items-center"
                  >
                    <span>
                      {lessonIconStatus[selectLesson.attendance[0].status].icon}
                    </span>
                    <span className="text-center text-sm">
                      {attendanceParceType[selectLesson.attendance[0].status]}
                    </span>
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="homework">
                <LessonHomework lesson={selectLesson} />
              </TabsContent>
            </Tabs>
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

import { drawerSelectors } from "@/entities/drawer/model/store/drawerSlice";
import { CreateLessonFormData } from "@/entities/lesson/lib/schemes/createLessonSchema";
import { ELessonTypes } from "@/entities/lesson/types/types";
import { CreateLessonForm } from "@/entities/lesson/ui/createLessonForm";
import { useCreateSchedule } from "@/entities/schedule/hooks/useCreateShedule";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import { timeToMinutes } from "@/shared/ui/calendar/lib/dateManager";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/shared/ui/drawer/drawer";
import { useMemo } from "react";

export const CreateLessonDrawer = () => {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const { groupId } = useAppSelector(drawerSelectors.data) as {
    groupId: string;
  };

  const { toggleDrawer } = useActions();

  const { mutateAsync } = useCreateSchedule();

  const isDrawerOpen = isOpen && type === EDrawerVariables.CREATE_LESSON_DRAWER;

  const defaultValues = useMemo(
    () => ({
      groupId: groupId || "",
      name: "",
      startTime: "",
      endTime: "",
      type: ELessonTypes.LECTURE,
      date: new Date().toISOString().split("T")[0],
      room: "",
      teacherName: "",
    }),
    [groupId]
  );

  const handleClose = () => {
    toggleDrawer(false);
  };

  const onEventSubmit = async (data: CreateLessonFormData) => {
    const date = new Date(data.date);
    const endDate = timeToMinutes(date, data.endTime);
    const startDate = timeToMinutes(date, data.startTime);

    await mutateAsync({
      scheduleDto: {
        date: data.date,
        groupId: data.groupId,
        timeStart: "8:30",
        timeEnd: "18:00",
      },
      lessonDto: {
        ...data,
        endDate: endDate.toISOString(),
        startDate: startDate.toISOString(),
      },
    });
    handleClose();
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent className=" rounded-t-3xl shadow-2xl">
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader className="pt-4 pb-0">
            <DrawerTitle className="text-lg font-bold">
              Создать пару
            </DrawerTitle>
          </DrawerHeader>
          <CreateLessonForm
            defaultValues={defaultValues}
            onEventSubmit={onEventSubmit}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

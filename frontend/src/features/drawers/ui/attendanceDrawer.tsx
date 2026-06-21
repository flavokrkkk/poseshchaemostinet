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
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import { Attendance, EAttendanceType } from "@/entities/attendance/types/types";
import { AttendanceSelect } from "@/entities/attendance/ui/attendanceSelect";
import { useUpdateAttendance } from "@/entities/attendance/hooks/useUpdateAttendance";

export const AttendanceDrawer = () => {
  const isOpen = useAppSelector(drawerSelectors.isOpen);
  const type = useAppSelector(drawerSelectors.selectType);
  const selectAttendance = useAppSelector(
    drawerSelectors.data
  ) as unknown as Attendance;

  const { mutate: attendanceMutate } = useUpdateAttendance();

  const { toggleDrawer } = useActions();

  const isDrawerOpen = isOpen && type === EDrawerVariables.ATTENDANCE_DRAWER;

  const handleClose = () => {
    toggleDrawer(false);
  };

  const handleChangeValue = (attendanceType: string) => {
    attendanceMutate({
      lessonId: selectAttendance.lessonId,
      status: attendanceType as EAttendanceType,
      userId: selectAttendance.userId,
    });

    handleClose();
  };

  return (
    <Drawer open={isDrawerOpen} onClose={handleClose}>
      <DrawerContent className="bg-blue-100">
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle className="text-lg">Посещаемость</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col p-4 pb-0 py-2 space-y-4">
            <AttendanceSelect
              attendance={selectAttendance}
              onValueChange={handleChangeValue}
            />
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

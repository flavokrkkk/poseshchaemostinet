import { Lesson } from "@/entities/lesson/types/types";
import { modalSelectors } from "@/entities/modal/model/store/modalSlice";
import { Button, Image } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";

export const LessonDeleteModal = () => {
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);
  const {
    type: typeLesson,
    lesson,
    onClickEvent,
  } = useAppSelector(modalSelectors.data) as unknown as {
    type: "default-lesson" | "regular-lesson";
    lesson: Lesson;
    onClickEvent: () => {};
  };

  const { toggleModal } = useActions();

  const isModalOpen = isOpen && type === EModalVariables.LESSON_DELETE_MODAL;

  const handleClose = () => {
    toggleModal(false);
  };

  const handleDeleteLesson = () => {
    onClickEvent();
    handleClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="border rounded-3xl py-6 md:py-8 overflow-hidden">
        <div className="flex flex-col items-center space-y-1 mb-2">
          <DialogTitle className="text-2xl font-bold text-center text-zinc-300">
            <Image
              src="\images\Protect-Privacy-2--Streamline-Manila.png"
              alt="welcome-step"
              width={163}
              height={163}
            />
          </DialogTitle>
          <div className="text-center text-[13px] w-full">
            Ты хочешь{" "}
            {typeLesson === "default-lesson" ? "удалить урок" : "шаблон урока"}{" "}
            - {lesson.name}?
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full space-x-4">
            <div className="w-full">
              <Button
                variant={"outline"}
                className="px-0 py-3 w-full"
                onClick={handleClose}
              >
                Отменить
              </Button>
            </div>
            <div className="w-full">
              <Button className="px-0 py-3 w-full" onClick={handleDeleteLesson}>
                Удалить
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

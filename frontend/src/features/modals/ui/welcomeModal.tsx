import { modalSelectors } from "@/entities/modal/model/store/modalSlice";
import { Button, Image } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";
import { EModalVariables } from "../../../shared/lib/utils/modalVariables";

export const WelcomeModal = () => {
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);
  const { onEvent, customerType } = useAppSelector(modalSelectors.data) as {
    onEvent: VoidFunction;
    customerType: "student" | "elder";
  };

  const { toggleModal } = useActions();

  const isModalOpen = isOpen && type === EModalVariables.WELCOME_MODAL;

  const handleClose = () => {
    localStorage.setItem(
      `${EModalVariables.WELCOME_MODAL}-${customerType}`,
      "true"
    );
    toggleModal(false);
  };

  const handleEvent = () => {
    handleClose();
    console.log(onEvent);
    onEvent();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="border rounded-3xl py-6 md:py-8 overflow-hidden">
        <div className="flex flex-col items-center px-4 space-y-1 mb-2">
          <DialogTitle className="text-2xl font-bold text-center text-zinc-300">
            <Image
              src="\images\Online-Exams-Tests-1--Streamline-Manila.png"
              alt="welcome-step"
              width={163}
              height={163}
            />
          </DialogTitle>
          <div className="text-center text-xs w-[220px] md:w-full">
            {customerType === "elder" &&
              "Ты успешно зарегестрировался! Теперь давай составим расписание твоей группы вместе"}
            {customerType === "student" &&
              "Ты успешно зарегестрировался! Теперь попроси старосту отправить пригласительную ссылку в группу"}
          </div>
        </div>

        <DialogFooter className="px-6 gap-3">
          {customerType === "elder" && (
            <Button className="px-0 py-3 w-full" onClick={handleEvent}>
              Продолжить
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

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
import { FloatingLabelInput } from "@/shared/ui/input/floatingInputLabel";
import { useState } from "react";

export const GroupLeaveModal = () => {
  const [leaveStep, setLeaveStep] = useState<"accept" | "leave">("accept");
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);

  const { toggleModal } = useActions();

  const isModalOpen = isOpen && type === EModalVariables.GROUP_LEAVE_MODAL;

  const handleClose = () => {
    toggleModal(false);
  };

  const handleResumeStep = () => {
    if (leaveStep === "accept") {
      setLeaveStep("leave");
    }
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
            {leaveStep === "accept" &&
              `Ты хочешь выйти из группы БИВТ-24-12 При выходе из
            группы, у тебя будет возможность вернуться в нее в течении всего
            семестра без потери статистики посещений`}
            {leaveStep === "leave" && (
              <div className="w-full space-y-2">
                <p>Чтобы выйти из группы, введи имя старосты</p>
                <FloatingLabelInput
                  label="Имя старосты"
                  className="py-1 bg-white rounded-xl shadow-sm border-secondary"
                />
              </div>
            )}
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
              <Button className="px-0 py-3 w-full" onClick={handleResumeStep}>
                Продолжить
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select/select";

export const UniversityModal = () => {
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);

  const { toggleModal } = useActions();

  const isModalOpen = isOpen && type === EModalVariables.UNIVERSITY_MODAL;

  const handleClose = () => {
    toggleModal(false);
  };

  const handleEvent = () => {
    handleClose();
  };

  //TODO: Отображаем список всех вузов, при выборе подгружаем вуз в наш основной список

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="border rounded-3xl py-6 md:py-8 overflow-hidden">
        <div className="flex flex-col items-center mb-2 space-y-6">
          <DialogTitle className="text-2xl font-bold text-center text-zinc-300">
            <Image
              src="\images\knowledge-base--customer-service-support-knowledge-base.png"
              alt="welcome-step"
              width={154}
              height={142}
            />
          </DialogTitle>
          <div className="w-full">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Центральный университет</SelectItem>
                <SelectItem value="dark">МТУСИ</SelectItem>
                <SelectItem value="system">ИТМО</SelectItem>
              </SelectContent>
            </Select>
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
              <Button className="px-0 py-3 w-full" onClick={handleEvent}>
                Продолжить
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { UniversitySuggest } from "@/entities";
import { modalSelectors } from "@/entities/modal/model/store/modalSlice";
import { useCreateOrGetUniversity } from "@/entities/university/hooks/useCreateOrGetUniversity";
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

export const ScheduleAcceptModal = () => {
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);
  const { onUniversitySelect, selectUniversity } = useAppSelector(
    modalSelectors.data
  ) as {
    onUniversitySelect: (universityId: string) => void;
    selectUniversity: UniversitySuggest;
  };

  const { mutateAsync: createOrGetUniversity } = useCreateOrGetUniversity();

  const { toggleModal } = useActions();

  const isModalOpen = isOpen && type === EModalVariables.SCHEDULE_ACCEPT_MODAL;

  const handleClose = () => {
    toggleModal(false);
  };

  const handleEvent = async () => {
    handleClose();
    const data = await createOrGetUniversity({
      universitySuggest: selectUniversity,
    });
    if (data?.universityId) {
      onUniversitySelect(data.universityId);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="border rounded-3xl py-6 md:py-8 overflow-hidden">
        <div className="flex flex-col items-center px-4 space-y-6 mb-2">
          <DialogTitle className="text-2xl font-bold text-center text-zinc-300">
            <Image
              src="\images\knowledge-base--customer-service-support-knowledge-base.png"
              alt="welcome-step"
              width={154}
              height={142}
            />
          </DialogTitle>
          <div className="text-center text-xs  md:w-full">
            Ты выбрал {selectUniversity.value}
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full space-x-4">
            <div className="w-full">
              <Button className="px-0 py-3 w-full" variant={"outline"}>
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

import { modalSelectors } from "@/entities/modal/model/store/modalSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";
import { Button, Image } from "@/shared";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { Copy, Share } from "lucide-react";
import { useCreateInvite } from "@/entities/group/hooks/useCreateInvite";
import { useOrigin } from "@/shared/hooks/useOrigin";
import { useCopied } from "@/shared/hooks/useCopy";

export const GroupInviteModal = () => {
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);
  const { groupId } = useAppSelector(modalSelectors.data) as {
    groupId: string;
  };

  const { mutateAsync: groupCreateInvite } = useCreateInvite();

  const { toggleModal } = useActions();

  const { origin } = useOrigin();
  const { handleCopyClick } = useCopied();

  const isModalOpen = isOpen && type === EModalVariables.GROUP_INVITE_MODAL;

  const handleClose = () => {
    toggleModal(false);
  };

  const handleCreateInvite = async () => {
    const data = await groupCreateInvite({ groupId });
    if (data.token) {
      handleCopyClick(`${origin}/invite/${data.token}`);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="border rounded-3xl py-6 md:py-8 overflow-hidden">
        <div className="flex flex-col items-center px-4 space-y-1 mb-2">
          <DialogTitle className="text-2xl font-bold text-center text-zinc-300">
            <Image
              src="\images\Blockchain-Network--Streamline-Manila.png"
              alt="welcome-step"
              width={163}
              height={163}
            />
          </DialogTitle>
          <div className="text-center text-xs  md:w-full">
            Пригласительная ссылка в группу{" "}
            <span className="font-semibold">БИВТ-24-12</span> Вы также сможете
            найти ее в профиле группы
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full space-x-4">
            <div className="w-full">
              <Button className="px-0 py-3 w-full" onClick={handleCreateInvite}>
                <Copy className="h-5 w-5" />
                Копировать
              </Button>
            </div>
            <div className="w-full">
              <Button className="px-0 py-3 w-full">
                <Share className="h-5 w-5" />
                Поделиться
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

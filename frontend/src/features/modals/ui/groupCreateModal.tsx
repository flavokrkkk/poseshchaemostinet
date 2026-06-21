import { modalSelectors } from "@/entities/modal/model/store/modalSlice";
import { Image } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog/dialog";
import { EModalVariables } from "../../../shared/lib/utils/modalVariables";

import { CreateGroupForm } from "@/features/group/ui/createGroupForm";
import { useCreateGroup } from "@/entities/group/hooks/useCreateGroup";
import { useQueryCacheData } from "@/shared/hooks/useQueryCacheData";
import { CURRENT_CUSTOMER_QUERY } from "@/entities/customer/hooks/useCurrentCustomer";
import { Customer } from "@/entities";
import { TypeGroupFormSchema } from "@/features/group/lib/schemes/groupFormSchema";

export const GroupCreateModal = () => {
  const isOpen = useAppSelector(modalSelectors.isOpen);
  const type = useAppSelector(modalSelectors.selectType);

  const { universityId } = useAppSelector(modalSelectors.data) as {
    universityId: string;
  };

  const currentCustomer = useQueryCacheData<Customer>([CURRENT_CUSTOMER_QUERY]);

  const { mutate: createGroup } = useCreateGroup();

  const { toggleModal } = useActions();

  const isModalOpen = isOpen && type === EModalVariables.GROUP_CREATE_MODAL;

  const handleClose = () => {
    toggleModal(false);
  };

  const handleEvent = (groupSubmitData: TypeGroupFormSchema) => {
    handleClose();
    if (currentCustomer && universityId) {
      createGroup({
        name: groupSubmitData.groupName,
        universityId,
        elderId: currentCustomer.id,
      });
    }
  };

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

          <CreateGroupForm onCancel={handleClose} onSubmitEvent={handleEvent} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

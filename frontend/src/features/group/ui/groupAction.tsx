import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { useActions } from "@/shared/hooks/useActions";
import { Calendar1, Plus } from "lucide-react";
import { CustomerRole } from "@/entities";

interface GroupActionProps {
  groupId?: string;
  userRole: CustomerRole;
}

export const GroupAction = ({ userRole, groupId }: GroupActionProps) => {
  const { setOpenModal } = useActions();

  const handleOpenInviteModal = () => {
    setOpenModal({
      isOpen: true,
      type: EModalVariables.GROUP_INVITE_MODAL,
      data: { groupId },
    });
  };

  return (
    <div className="flex space-x-3 items-center pr-3">
      <Calendar1 className="h-4 w-4 text-zinc-500" />
      {userRole === "ELDER" && (
        <button disabled={!groupId} onClick={handleOpenInviteModal}>
          <Plus className="h-4 w-4 text-zinc-500" />
        </button>
      )}
    </div>
  );
};

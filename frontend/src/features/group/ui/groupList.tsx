import { GroupItem } from "./groupItem";
import { useActions } from "@/shared/hooks/useActions";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { useCallback } from "react";
import { Group } from "@/entities/group/types/types";
import { CircleArrowDown, Trash2Icon } from "lucide-react";

interface GroupListProps {
  group: Group;
}

export const GroupList = ({ group }: GroupListProps) => {
  const { setOpenModal } = useActions();

  const handleDeleteInGroup = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const customerIds = Number(event.currentTarget.value);
      if (!customerIds && customerIds !== 0) return;
      setOpenModal({
        isOpen: true,
        type: EModalVariables.GROUP_KICK_MODAL,
        data: { ...group.users[customerIds] },
      });
    },
    []
  );

  return (
    <div className="space-y-3">
      {group.users.map((customer, index) => (
        <GroupItem
          key={customer.id}
          customer={customer}
          action={
            <div className="flex space-x-3">
              <CircleArrowDown className="h-4 w-4 text-zinc-400 hover:text-sky-600 transition" />
              <button value={index} onClick={handleDeleteInGroup}>
                <Trash2Icon className="h-4 w-4 text-zinc-400 hover:text-red-500 transition" />
              </button>
            </div>
          }
        />
      ))}
    </div>
  );
};

import { mockEvents } from "../lib/mockEvents";
import { EventEmpty } from "./eventEmpty";
import { useActions } from "@/shared/hooks/useActions";
import { EDrawerVariables } from "@/shared/lib/utils/drawerVariables";
import { EventItem } from "./eventItem";

export const EventList = () => {
  const { setOpenDrawer } = useActions();

  const handleOpenDrawer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const eventIds = Number(event.currentTarget.value);
    if (!eventIds && eventIds !== 0) return;
    setOpenDrawer({
      isOpen: true,
      type: EDrawerVariables.EVENT_DRAWER,
      data: { ...mockEvents[eventIds] },
    });
  };

  return (
    <div className="space-y-2">
      {!!mockEvents ? (
        mockEvents.map((event, index) => (
          <EventItem
            key={event.id}
            index={index}
            event={event}
            handleOpenDrawer={handleOpenDrawer}
          />
        ))
      ) : (
        <EventEmpty />
      )}
    </div>
  );
};

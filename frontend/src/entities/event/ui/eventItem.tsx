import { Icon, IconTypes } from "@/shared";
import { Event } from "../types/types";
import { Clock } from "lucide-react";

interface EventItemProps {
  event: Event;
  index: number;
  handleOpenDrawer: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const EventItem = ({
  index,
  event,
  handleOpenDrawer,
}: EventItemProps) => {
  return (
    <button
      value={index}
      onClick={handleOpenDrawer}
      className="w-full cursor-pointer"
    >
      <div className="flex h-full space-x-3">
        <div className="h-10 w-10 bg-zinc-300 flex items-center justify-center border rounded-xl">
          <Icon
            type={IconTypes.MICRO_OUTLINED}
            className="text-2xl text-zinc-600"
          />
        </div>

        <div className="flex flex-col items-start flex-1 w-full">
          <h3 className="text-[15px]">{event.name}</h3>
          <span className="text-xs text-zinc-400">{event.type}</span>
        </div>
        <div className="min-h-full flex items-end text-xs space-x-1 text-zinc-500">
          <span>
            <Clock className="h-3 w-3" />
          </span>
          <span className="leading-3">
            {event.startTime} - {event.endTime}
          </span>
        </div>
      </div>
    </button>
  );
};

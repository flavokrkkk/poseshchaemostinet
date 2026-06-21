import { Icon, IconTypes } from "@/shared";
import { CircleQuestionMark } from "lucide-react";

export const Header = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center space-x-1">
        <Icon type={IconTypes.POSNET_V2_OUTLINED} className="text-2xl" />
        <span className="font-semibold font-sans text-xl text-zinc-600 pb-1">
          посещаемости.net
        </span>
      </div>
      <span>
        <CircleQuestionMark className="h-4 w-4 text-zinc-600 cursor-pointer" />
      </span>
    </div>
  );
};

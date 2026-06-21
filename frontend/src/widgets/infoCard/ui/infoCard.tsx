import { cn } from "@/shared";
import { ChevronRight } from "lucide-react";

export const InfoCard = ({
  icon,
  title,
  className,
  arrowClassName,
  onClick,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  onClick?: () => void;
  arrowClassName?: string;
  className?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-blue-500 rounded-3xl h-full flex flex-col justify-between p-4 gap-2 cursor-pointer w-full",
        className
      )}
    >
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center ">
        {icon}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-sky-200 leading-4 pl-2">{title}</span>
        <ChevronRight className={cn("text-sky-200", arrowClassName)} />
      </div>
    </div>
  );
};

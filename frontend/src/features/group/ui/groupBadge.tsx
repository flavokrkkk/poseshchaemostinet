import { Group } from "@/entities/group/types/types";
import { ERouteNames } from "@/shared";
import { CardContent } from "@/widgets/cardContent/ui/cardContent";
import { ChevronRightIcon, ListOrdered } from "lucide-react";
import { Link } from "react-router-dom";

interface GroupBadgeProps {
  group: Group;
}

export const GroupBadge = ({ group }: GroupBadgeProps) => {
  return (
    <CardContent cardTitle={"Группа"}>
      <Link
        to={`/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}/group/groupId`}
      >
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 flex items-center justify-center border rounded-xl">
              <ListOrdered />
            </div>
            <div>
              <p className="text-xs text-gray-500">{group.name}</p>
              <p className="text-xs text-gray-400">
                {group.users.length} человека
              </p>
            </div>
          </div>
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </div>
      </Link>
    </CardContent>
  );
};

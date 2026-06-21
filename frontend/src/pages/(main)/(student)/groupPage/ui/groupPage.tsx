import { Customer } from "@/entities";
import { CURRENT_CUSTOMER_QUERY } from "@/entities/customer/hooks/useCurrentCustomer";
import { CURRENT_GROUP_QUERY } from "@/entities/group/hooks/useGetGroup";
import { Group } from "@/entities/group/types/types";
import { GroupAction } from "@/features/group/ui/groupAction";
import { GroupList } from "@/features/group/ui/groupList";
import { ERouteNames } from "@/shared";
import { useQueryCacheData } from "@/shared/hooks/useQueryCacheData";
import { CardContent } from "@/widgets/cardContent/ui/cardContent";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const GroupPage = () => {
  const currentGroup = useQueryCacheData<Group>([CURRENT_GROUP_QUERY]);
  const currentUser = useQueryCacheData<Customer>([CURRENT_CUSTOMER_QUERY]);

  return (
    <CardContent
      cardTitle={
        <section className="flex items-center w-full justify-between">
          <div className="flex items-center space-x-3">
            <Link
              to={`/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}/profileId`}
              className="cursor-pointer"
            >
              <ArrowLeft className="h-5 w-5 text-gray-400" />
            </Link>
            <h2> Группа</h2>
          </div>

          <GroupAction groupId={currentGroup.id} userRole={currentUser.role} />
        </section>
      }
    >
      {currentGroup && <GroupList group={currentGroup} />}
    </CardContent>
  );
};

export default GroupPage;

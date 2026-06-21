import { Customer } from "@/entities";
import { useGetAchievements } from "@/entities/achievements/hooks/useGetAchievements";
import { AchievementsBadge } from "@/entities/achievements/ui/achievementsBadge";
import { CURRENT_CUSTOMER_QUERY } from "@/entities/customer/hooks/useCurrentCustomer";
import { CURRENT_GROUP_QUERY } from "@/entities/group/hooks/useGetGroup";
import { Group } from "@/entities/group/types/types";
import { GroupBadge } from "@/features/group/ui/groupBadge";
import { UserDetailBadge } from "@/features/user/ui/userDetailBadge";
import { BackBadge, Button, ERouteNames } from "@/shared";
import { useActions } from "@/shared/hooks/useActions";
import { useQueryCacheData } from "@/shared/hooks/useQueryCacheData";
import { EModalVariables } from "@/shared/lib/utils/modalVariables";
import { CardContent } from "@/widgets/cardContent/ui/cardContent";
import { Download, LogOut } from "lucide-react";

const ProfileDetailPage = () => {
  const currentCustomer = useQueryCacheData<Customer>([CURRENT_CUSTOMER_QUERY]);
  const currentGroup = useQueryCacheData<Group>([CURRENT_GROUP_QUERY]);
  const { data: achievements, isLoading } = useGetAchievements();
  const { setOpenModal } = useActions();

  const handleLeaveGroupModal = () =>
    setOpenModal({ isOpen: true, type: EModalVariables.GROUP_LEAVE_MODAL });

  return (
    <div className="space-y-4">
      <BackBadge
        backPath={`/${ERouteNames.DASHBOARD_STUDENT_ROUTE}/${ERouteNames.PROFILE_ROUTE}`}
        title="Профиль"
      />
      <CardContent>
        <UserDetailBadge customer={currentCustomer} />
      </CardContent>
      <GroupBadge group={currentGroup} />
      <AchievementsBadge achievements={achievements} isLoading={isLoading} />
      <Button
        className="w-full rounded-xl py-4"
        onClick={handleLeaveGroupModal}
      >
        <LogOut />
        Выйти
      </Button>

      <div className="flex justify-center items-center space-x-2 mt-4 text-zinc-500">
        <Download className="h-5 w-5" />
        <span>Скачать таблицу посещаемости</span>
      </div>
    </div>
  );
};

export default ProfileDetailPage;

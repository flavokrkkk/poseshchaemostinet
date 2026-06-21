import { Customer } from "@/entities";
import { CURRENT_CUSTOMER_QUERY } from "@/entities/customer/hooks/useCurrentCustomer";
import { CURRENT_GROUP_QUERY } from "@/entities/group/hooks/useGetGroup";
import { Group } from "@/entities/group/types/types";
import { ScheduleSectionElder } from "@/entities/schedule/ui/scheduleSectionElder";
import { useGroupCountInUniversity } from "@/entities/university/hooks/useGroupCountInUniversity";
import { useWelcomeModal } from "@/features/modals/hooks/useWelcomeModal";
import { ERouteNames } from "@/shared";
import { useQueryCacheData } from "@/shared/hooks/useQueryCacheData";
import { BannerCard } from "@/widgets/bannerCard/ui/bannerCard";
import { InfoWidget } from "@/widgets/infoWidget/ui/infoWidget";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ElderDashboardPage = () => {
  const currentCustomer = useQueryCacheData<Customer>([CURRENT_CUSTOMER_QUERY]);
  const currentGroup = useQueryCacheData<Group>([CURRENT_GROUP_QUERY]);

  const { data: universityGroups } = useGroupCountInUniversity({
    universityId: currentGroup?.universityId,
  });

  const isStatisticClose = (universityGroups?.groupCount ?? 0) < 3;

  const navigate = useNavigate();

  const handleToLeaderBoard = () => navigate(ERouteNames.LEADER_BOARD_ROUTE);

  useWelcomeModal({
    customerType: "elder",
    onEvent: () => navigate(ERouteNames.UNIVERSITY_ROUTE),
  });

  return (
    <div className="space-y-4">
      <InfoWidget
        bannerCard={
          <BannerCard
            imageSrc="/images/Blue Holo (49).png"
            title={
              currentCustomer?.groupId
                ? isStatisticClose
                  ? "Статистика будет доступна после появления более 3-х групп в вашем учебном заведении"
                  : "Отслеживайте статистику вашей группы"
                : "Создайте группу"
            }
            highlight={isStatisticClose ? "" : `«${currentGroup.name}»`}
            buttonText={isStatisticClose ? <Lock /> : "Смотреть"}
            disabled={isStatisticClose}
            onClick={handleToLeaderBoard}
          />
        }
      />
      <ScheduleSectionElder groupId={currentGroup?.id} />
    </div>
  );
};

export default ElderDashboardPage;

import { CURRENT_GROUP_QUERY } from "@/entities/group/hooks/useGetGroup";
import { Group } from "@/entities/group/types/types";
import { ScheduleSectionStudent } from "@/entities/schedule/ui/scheduleSectionStudent";
import { useWelcomeModal } from "@/features/modals/hooks/useWelcomeModal";

import { useQueryCacheData } from "@/shared/hooks/useQueryCacheData";

const StudentDashboardPage = () => {
  const currentGroup = useQueryCacheData<Group>([CURRENT_GROUP_QUERY]);

  useWelcomeModal({
    customerType: "student",
  });

  return <ScheduleSectionStudent groupId={currentGroup.id} />;
};

export default StudentDashboardPage;

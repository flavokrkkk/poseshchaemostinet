import { useQuery } from "@tanstack/react-query";
import { getSchedule } from "../api/scheduleService";

export const SCHEDULE_QUERY = "schedule";

export const useGetSchedule = ({
  groupId,
  date,
}: {
  groupId: string;
  date: string;
}) => {
  const scheduleQuery = useQuery({
    queryKey: [SCHEDULE_QUERY, date],
    queryFn: () => getSchedule({ groupId, date }),
  });

  return scheduleQuery;
};

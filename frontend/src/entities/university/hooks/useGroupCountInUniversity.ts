import { useQuery } from "@tanstack/react-query";
import { getGroupCountByUniversity } from "../api/universityService";

export const GROUP_COUNT_IN_UNIVERSITY_QUERY = "group-count-university";

export const useGroupCountInUniversity = ({
  universityId,
}: {
  universityId: string;
}) => {
  return useQuery({
    queryKey: [GROUP_COUNT_IN_UNIVERSITY_QUERY],
    queryFn: () => getGroupCountByUniversity({ universityId }),
  });
};

import { useQuery } from "@tanstack/react-query";
import { getCurrentGroup } from "../api/groupService";

export const CURRENT_GROUP_QUERY = "current-group";

export const useGetGroup = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: [CURRENT_GROUP_QUERY],
    queryFn: getCurrentGroup,
    enabled,
  });
};

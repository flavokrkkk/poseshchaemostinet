import { useQuery } from "@tanstack/react-query";
import { getTopGroupByAttendance } from "../api/attendanceService";
import { GetTopGroupsDto } from "../types/types";

export const LEADER_BOARD_QUERY = "leader-board-query";

export const useLeaderBoard = (
  dto: GetTopGroupsDto & { universityId: string }
) => {
  return useQuery({
    queryKey: [LEADER_BOARD_QUERY],
    queryFn: () => getTopGroupByAttendance(dto),
  });
};

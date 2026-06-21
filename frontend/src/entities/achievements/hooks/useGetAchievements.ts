import { useQuery } from "@tanstack/react-query";
import { getUserAchievements } from "../api/achievementsService";

export const ALL_ACHIEVENTS_QUERY = "all-achievements";

export const useGetAchievements = () => {
  return useQuery({
    queryKey: [ALL_ACHIEVENTS_QUERY],
    queryFn: getUserAchievements,
  });
};

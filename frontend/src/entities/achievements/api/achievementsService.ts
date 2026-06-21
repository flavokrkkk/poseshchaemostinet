import { authApi } from "@/shared";
import { EAchievementsEndpoints } from "../lib/achievementsEndpoints";
import { ErrorMessages } from "@/shared/api/queryError";
import { Achievement } from "../types/types";

class AchievementsService {
  async getUserAchievements(): Promise<Array<Achievement>> {
    try {
      const response = await authApi
        .get(EAchievementsEndpoints.GET_ALL_ACHIEVENTS)
        .json<Array<Achievement>>();
      return response;
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }
}

export const { getUserAchievements } = new AchievementsService();

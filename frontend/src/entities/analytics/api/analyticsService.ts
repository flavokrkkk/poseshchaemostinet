import { authApi } from "@/shared";
import { ErrorMessages } from "@/shared/api/queryError";
import { EAnalyticsEndpoints } from "../lib/endpoints";
import { AttendanceTypeCell, GroupAnalytics } from "../types/types";
import { EAttendanceType } from "@/entities/attendance/types/types";

class AnalyticsService {
  public async getAnalyticsByGroup({
    groupId,
    attendanceType,
  }: {
    groupId: string;
    attendanceType: EAttendanceType;
  }): Promise<GroupAnalytics> {
    try {
      return await authApi
        .get(
          `attendance/${EAnalyticsEndpoints.GROUP_ANALYTICS.replace(
            ":groupId",
            groupId
          )}?attendanceType=${attendanceType}`
        )
        .json<GroupAnalytics>();
    } catch (e) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async getAnalyticsByCustomer() {
    try {
      return await authApi
        .get(`attendance/${EAnalyticsEndpoints.CUSTOMER_ANALYTICS}`)
        .json<AttendanceTypeCell[]>();
    } catch (e) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }
}

export const { getAnalyticsByGroup, getAnalyticsByCustomer } =
  new AnalyticsService();

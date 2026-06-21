import {
  Attendance,
  GetTopGroupsDto,
  TopGroupByAttendace,
  UpdateAttendanceDto,
} from "../types/types";
import { authApi } from "@/shared";
import { EAttendanceEndpoints } from "../lib/endpoints";
import { ErrorMessages } from "@/shared/api/queryError";
import { buildQueryString } from "@/shared/lib/utils/buildQueryString";

class AttendanceService {
  async updateAttendance(
    updateAttendanceDto: UpdateAttendanceDto
  ): Promise<Attendance> {
    try {
      const response = await authApi
        .patch(
          EAttendanceEndpoints.UPDATE_ATTENDANCE.replace(
            ":lessonId",
            updateAttendanceDto.lessonId
          ),
          { json: updateAttendanceDto }
        )
        .json<Attendance>();

      return response;
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  async getTopGroupByAttendance(
    getTopGroupDto: GetTopGroupsDto & { universityId: string }
  ): Promise<TopGroupByAttendace[]> {
    try {
      const { universityId, ...dto } = getTopGroupDto;

      const url = buildQueryString(
        EAttendanceEndpoints.GET_TOP_GROUP_BY_ATTENDACE.replace(
          ":universityId",
          universityId
        ),
        {
          attendanceType: dto.attendanceType,
        }
      );
      const response = await authApi.get(url).json<TopGroupByAttendace[]>();

      return response;
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }
}

export const { updateAttendance, getTopGroupByAttendance } =
  new AttendanceService();

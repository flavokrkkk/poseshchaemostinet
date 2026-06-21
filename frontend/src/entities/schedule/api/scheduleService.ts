import { ErrorMessages } from "@/shared/api/queryError";
import {
  CreateRegularScheduleDto,
  CreateRegularSlotsColflictResponse,
  Schedule,
  ScheduleDto,
} from "../types/types";
import { EScheduleEndpoints } from "../lib/endpoints";
import { authApi } from "@/shared";
import { buildQueryString } from "@/shared/lib/utils/buildQueryString";

class ScheduleService {
  public async createSchedule(scheduleDto: ScheduleDto): Promise<Schedule> {
    try {
      return await authApi
        .post(EScheduleEndpoints.CREATE_SCHEDULE, { json: scheduleDto })
        .json<Schedule>();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async getSchedule({
    groupId,
    date,
  }: {
    groupId: string;
    date: string;
  }): Promise<Schedule> {
    try {
      const url = buildQueryString(
        EScheduleEndpoints.GET_SCHEDULE.replace(":id", groupId),
        { date }
      );

      return await authApi.get(url).json<Schedule>();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async createRegularSchedule(
    regularScheduleDto: CreateRegularScheduleDto
  ): Promise<CreateRegularSlotsColflictResponse> {
    try {
      return await authApi
        .post(`${EScheduleEndpoints.CREATE_SCHEDULE}/regular`, {
          json: regularScheduleDto,
        })
        .json<CreateRegularSlotsColflictResponse>();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }
}

export const { createSchedule, getSchedule, createRegularSchedule } =
  new ScheduleService();

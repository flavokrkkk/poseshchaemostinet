import { authApi } from "@/shared/api/baseQueryInstance";
import { EGroupEndpoints } from "../lib/endpoints";
import { ErrorMessages } from "@/shared/api/queryError";
import { Group, GroupDto, GroupInviteDto } from "../types/types";

class GroupService {
  public async createGroup(groupDto: GroupDto): Promise<Group> {
    try {
      return await authApi
        .post(EGroupEndpoints.GROUP, { json: groupDto })
        .json<Group>();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  async groupInvite({ groupId }: GroupInviteDto): Promise<{
    token: string;
  }> {
    try {
      return await authApi
        .post(`${EGroupEndpoints.GROUP_INVITE}`, {
          json: { groupId },
        })
        .json<{ token: string }>();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  async groupJoin({ token }: { token: string }): Promise<unknown> {
    try {
      return await authApi
        .patch(`${EGroupEndpoints.GROUP_INVITE}/${token}`)
        .json();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  async groupLeave({ group_id }: { group_id: string }): Promise<unknown> {
    try {
      return await authApi
        .post(
          `${EGroupEndpoints.GROUP}/${group_id}/${EGroupEndpoints.GROUP_LEAVE}`
        )
        .json();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async getCurrentGroup(): Promise<Group> {
    try {
      return await authApi.get(`${EGroupEndpoints.GROUP}`).json<Group>();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }
}

export const {
  groupJoin,
  groupLeave,
  groupInvite,
  getCurrentGroup,
  createGroup,
} = new GroupService();

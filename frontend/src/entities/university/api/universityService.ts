import { authApi } from "@/shared/api/baseQueryInstance";
import { ErrorMessages } from "@/shared/api/queryError";
import { EUniversityEndpoints } from "../lib/endpoints";
import { UniversitySuggest } from "../types";

class UniversityService {
  public async getUniversityByName({
    universityName,
  }: {
    universityName: string;
  }): Promise<Array<UniversitySuggest>> {
    try {
      return await authApi
        .post(`${EUniversityEndpoints.UNIVERSITIES_SUGGESTION}`, {
          json: {
            query: universityName,
            count: 20,
          },
        })
        .json<Array<UniversitySuggest>>();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async createOrGetUniversity({
    universitySuggest,
  }: {
    universitySuggest: UniversitySuggest;
  }): Promise<{ universityId: string }> {
    try {
      const response = await authApi
        .post(`${EUniversityEndpoints.CREATE_OR_GET_UNIVERSITY}`, {
          json: universitySuggest,
        })
        .json<{ universityId: string }>();
      return response;
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }

  public async getGroupCountByUniversity({
    universityId,
  }: {
    universityId: string;
  }): Promise<{ groupCount: number }> {
    try {
      const response = await authApi
        .get(`${EUniversityEndpoints.UNIVERSITY_GROUP_COUNT}/${universityId}`)
        .json<{ groupCount: number }>();
      return response;
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }
}

export const {
  getUniversityByName,
  createOrGetUniversity,
  getGroupCountByUniversity,
} = new UniversityService();

import { authApi } from "@/shared/api/baseQueryInstance";
import { NewsParams } from "../types/types";
import { buildQueryString } from "@/shared/lib/utils/buildQueryString";
import { ENewsEndpoints } from "../lib/endpoints";
import { ErrorMessages } from "@/shared/api/queryError";

class NewsService {
  public async getAllNews(params: NewsParams): Promise<unknown> {
    try {
      return await authApi
        .get(buildQueryString(ENewsEndpoints.NEWS, params))
        .json();
    } catch (error) {
      throw new Error(ErrorMessages.REQUEST_PREPARATION_ERROR);
    }
  }
}

export const { getAllNews } = new NewsService();

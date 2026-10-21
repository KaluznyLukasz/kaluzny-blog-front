import { articleListSchema } from "../schemas/article";
import { parseResponse } from "../utils/parseResponse";
import { sortNewestFirst } from "../utils/sortNewestFirst";
import { apiClient } from "./apiClient";

export const ARTICLES_PATH = "/api/v1/articles";

export const getArticles = async (signal?: AbortSignal) => {
  const { data } = await apiClient.get<unknown>(ARTICLES_PATH, { signal });

  return sortNewestFirst(parseResponse(articleListSchema, data));
};

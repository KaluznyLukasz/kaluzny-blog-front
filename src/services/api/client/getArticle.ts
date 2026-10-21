import { articleSchema } from "../schemas/article";
import { parseResponse } from "../utils/parseResponse";
import { apiClient } from "./apiClient";
import { ARTICLES_PATH } from "./getArticles";

export const getArticle = async (id: string, signal?: AbortSignal) => {
  const { data } = await apiClient.get<unknown>(
    `${ARTICLES_PATH}/${encodeURIComponent(id)}`,
    { signal },
  );

  return parseResponse(articleSchema, data);
};

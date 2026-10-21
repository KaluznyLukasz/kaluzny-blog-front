import type { Article } from "../schemas/article";

export const sortNewestFirst = (articles: Article[]) => {
  return [...articles].sort(
    (first, second) =>
      Date.parse(second.publishedAt) - Date.parse(first.publishedAt),
  );
};

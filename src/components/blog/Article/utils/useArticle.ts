import { useCallback, useEffect, useState } from "react";
import { getArticle } from "../../../../services/api/client/getArticle";
import { articleIdSchema } from "../../../../services/api/schemas/article";
import { ApiError } from "../../../../services/api/utils/apiError";
import type { ArticleState } from "../Article.types";

interface Result {
  id: string;
  attempt: number;
  state: ArticleState;
}

const LOADING: ArticleState = { status: "loading" };
const NOT_FOUND: ArticleState = { status: "not-found" };
const ERROR: ArticleState = { status: "error" };
const NOT_FOUND_STATUSES = [400, 404];

const isNotFound = (error: unknown) =>
  error instanceof ApiError &&
  error.reason === "http" &&
  error.status !== undefined &&
  NOT_FOUND_STATUSES.includes(error.status);

export const useArticle = (id: string) => {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result>();
  const isValidId = articleIdSchema.safeParse(id).success;

  useEffect(() => {
    if (!isValidId) return;

    const controller = new AbortController();
    const settle = (state: ArticleState) => {
      if (!controller.signal.aborted) {
        setResult({ id, attempt, state });
      }
    };

    getArticle(id, controller.signal).then(
      (article) => settle({ status: "success", article }),
      (error: unknown) => settle(isNotFound(error) ? NOT_FOUND : ERROR),
    );

    return () => controller.abort();
  }, [id, attempt, isValidId]);

  const retry = useCallback(() => setAttempt((current) => current + 1), []);

  if (!isValidId) {
    return { state: NOT_FOUND, retry };
  }

  const isCurrent = result?.id === id && result.attempt === attempt;

  return { state: isCurrent ? result.state : LOADING, retry };
};

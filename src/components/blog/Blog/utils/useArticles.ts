import { useCallback, useEffect, useState } from "react";
import { getArticles } from "../../../../services/api/client/getArticles";
import type { ArticlesState } from "../Blog.types";

export const useArticles = () => {
  const [state, setState] = useState<ArticlesState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getArticles(controller.signal).then(
      (articles) => {
        if (!controller.signal.aborted) {
          setState({ status: "success", articles });
        }
      },
      () => {
        if (!controller.signal.aborted) {
          setState({ status: "error" });
        }
      },
    );

    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((current) => current + 1);
  }, []);

  return { state, retry };
};

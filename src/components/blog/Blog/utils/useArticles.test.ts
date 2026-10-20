import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getArticles } from "../../../../services/api/client/getArticles";
import type { Article } from "../../../../services/api/schemas/article";
import { ApiError } from "../../../../services/api/utils/apiError";
import { useArticles } from "./useArticles";

vi.mock("../../../../services/api/client/getArticles");

const ARTICLES: Article[] = [
  {
    id: "5e1f0a2b-0002-4000-8000-000000000002",
    title: "My first month with Docker",
    content: "Everything in this project runs in containers.",
    publishedAt: "2025-02-14T12:30:00.000Z",
  },
];

const waitForAnswer = () => {
  let answer: (articles: Article[]) => void = () => {};
  vi.mocked(getArticles).mockReturnValueOnce(
    new Promise((resolve) => {
      answer = resolve;
    }),
  );

  return (articles: Article[]) => answer(articles);
};

describe("useArticles", () => {
  beforeEach(() => {
    vi.mocked(getArticles).mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("when it starts", () => {
    it("is loading and asks for the articles once", () => {
      waitForAnswer();

      const { result } = renderHook(() => useArticles());

      expect(result.current.state).toEqual({ status: "loading" });
      expect(getArticles).toHaveBeenCalledTimes(1);
      expect(getArticles).toHaveBeenCalledWith(expect.any(AbortSignal));
    });
  });

  describe("when the API answers with articles", () => {
    it("holds the articles", async () => {
      vi.mocked(getArticles).mockResolvedValueOnce(ARTICLES);

      const { result } = renderHook(() => useArticles());

      await waitFor(() =>
        expect(result.current.state).toEqual({
          status: "success",
          articles: ARTICLES,
        }),
      );
    });
  });

  describe("when the API answers with no articles", () => {
    it("holds an empty list", async () => {
      vi.mocked(getArticles).mockResolvedValueOnce([]);

      const { result } = renderHook(() => useArticles());

      await waitFor(() =>
        expect(result.current.state).toEqual({
          status: "success",
          articles: [],
        }),
      );
    });
  });

  describe("when the articles cannot be loaded", () => {
    it("holds an error", async () => {
      vi.mocked(getArticles).mockRejectedValueOnce(
        new ApiError("network", "Unreachable"),
      );

      const { result } = renderHook(() => useArticles());

      await waitFor(() =>
        expect(result.current.state).toEqual({ status: "error" }),
      );
    });
  });

  describe("when the visitor tries again", () => {
    it("loads the articles again", async () => {
      vi.mocked(getArticles).mockRejectedValueOnce(
        new ApiError("network", "Unreachable"),
      );
      const { result } = renderHook(() => useArticles());
      await waitFor(() =>
        expect(result.current.state).toEqual({ status: "error" }),
      );
      const answer = waitForAnswer();

      act(() => result.current.retry());

      expect(result.current.state).toEqual({ status: "loading" });
      expect(getArticles).toHaveBeenCalledTimes(2);

      await act(async () => answer(ARTICLES));

      expect(result.current.state).toEqual({
        status: "success",
        articles: ARTICLES,
      });
    });
  });

  describe("when the visitor leaves before the answer arrives", () => {
    it("cancels the request and stays quiet when the answer comes", async () => {
      const consoleError = vi.spyOn(console, "error");
      const consoleWarn = vi.spyOn(console, "warn");
      const answer = waitForAnswer();
      const { unmount } = renderHook(() => useArticles());
      const [signal] = vi.mocked(getArticles).mock.calls[0];

      unmount();
      await act(async () => answer(ARTICLES));

      expect(signal?.aborted).toBe(true);
      expect(consoleError).not.toHaveBeenCalled();
      expect(consoleWarn).not.toHaveBeenCalled();
    });

    it("stays quiet when the cancelled request fails", async () => {
      const consoleError = vi.spyOn(console, "error");
      let fail: (reason: ApiError) => void = () => {};
      vi.mocked(getArticles).mockReturnValueOnce(
        new Promise((_, reject) => {
          fail = reject;
        }),
      );
      const { unmount } = renderHook(() => useArticles());

      unmount();
      await act(async () => fail(new ApiError("cancelled", "Cancelled")));

      expect(consoleError).not.toHaveBeenCalled();
    });
  });
});

import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getArticle } from "../../../../services/api/client/getArticle";
import type { Article } from "../../../../services/api/schemas/article";
import { ApiError } from "../../../../services/api/utils/apiError";
import { useArticle } from "./useArticle";

vi.mock("../../../../services/api/client/getArticle");

const FIRST: Article = {
  id: "5e1f0a2b-0001-4000-8000-000000000001",
  title: "Hello, world: why I started this blog",
  content: "I want a place to write down what I learn.",
  publishedAt: "2025-01-10T09:00:00.000Z",
};

const SECOND: Article = {
  id: "5e1f0a2b-0002-4000-8000-000000000002",
  title: "My first month with Docker",
  content: "Everything in this project runs in containers.",
  publishedAt: "2025-02-14T12:30:00.000Z",
};

const waitForAnswer = () => {
  let answer: (article: Article) => void = () => {};
  vi.mocked(getArticle).mockReturnValueOnce(
    new Promise((resolve) => {
      answer = resolve;
    }),
  );

  return (article: Article) => answer(article);
};

describe("useArticle", () => {
  beforeEach(() => {
    vi.mocked(getArticle).mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("when it starts", () => {
    it("is loading and asks for that article once", () => {
      waitForAnswer();

      const { result } = renderHook(() => useArticle(FIRST.id));

      expect(result.current.state).toEqual({ status: "loading" });
      expect(getArticle).toHaveBeenCalledTimes(1);
      expect(getArticle).toHaveBeenCalledWith(
        FIRST.id,
        expect.any(AbortSignal),
      );
    });
  });

  describe("when the API answers with the article", () => {
    it("holds the article", async () => {
      vi.mocked(getArticle).mockResolvedValueOnce(FIRST);

      const { result } = renderHook(() => useArticle(FIRST.id));

      await waitFor(() =>
        expect(result.current.state).toEqual({
          status: "success",
          article: FIRST,
        }),
      );
    });
  });

  describe("when the article does not exist", () => {
    it.each([
      ["answers that it is not there", 404],
      ["answers that the ID is not valid", 400],
    ])("holds not found when the API %s", async (_, status) => {
      vi.mocked(getArticle).mockRejectedValueOnce(
        new ApiError("http", `Status ${status}`, { status }),
      );

      const { result } = renderHook(() => useArticle(FIRST.id));

      await waitFor(() =>
        expect(result.current.state).toEqual({ status: "not-found" }),
      );
    });
  });

  describe("when the ID in the address is not a valid ID", () => {
    it.each([
      "123",
      "not-an-id",
      "",
      "../blog",
    ])("holds not found for %j without asking the API", (id) => {
      const { result } = renderHook(() => useArticle(id));

      expect(result.current.state).toEqual({ status: "not-found" });
      expect(getArticle).not.toHaveBeenCalled();
    });
  });

  describe("when the article cannot be loaded", () => {
    it.each([
      ["the API is down", new ApiError("network", "Unreachable")],
      [
        "the API answers with an error",
        new ApiError("http", "Status 500", { status: 500 }),
      ],
      ["the API never answers", new ApiError("timeout", "Too slow")],
      [
        "the answer does not match the schema",
        new ApiError("invalid-response", "Broken answer"),
      ],
      ["something unexpected happens", new Error("Boom")],
    ])("holds an error when %s", async (_, error) => {
      vi.mocked(getArticle).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useArticle(FIRST.id));

      await waitFor(() =>
        expect(result.current.state).toEqual({ status: "error" }),
      );
    });
  });

  describe("when the visitor tries again", () => {
    it("loads the article again", async () => {
      vi.mocked(getArticle).mockRejectedValueOnce(
        new ApiError("network", "Unreachable"),
      );
      const { result } = renderHook(() => useArticle(FIRST.id));
      await waitFor(() =>
        expect(result.current.state).toEqual({ status: "error" }),
      );
      const answer = waitForAnswer();

      act(() => result.current.retry());

      expect(result.current.state).toEqual({ status: "loading" });
      expect(getArticle).toHaveBeenCalledTimes(2);

      await act(async () => answer(FIRST));

      expect(result.current.state).toEqual({
        status: "success",
        article: FIRST,
      });
    });
  });

  describe("when the visitor goes to another article", () => {
    it("is loading at once and never holds the old article under the new ID", async () => {
      vi.mocked(getArticle).mockResolvedValueOnce(FIRST);
      const { result, rerender } = renderHook(({ id }) => useArticle(id), {
        initialProps: { id: FIRST.id },
      });
      await waitFor(() =>
        expect(result.current.state).toMatchObject({ status: "success" }),
      );
      const answer = waitForAnswer();

      rerender({ id: SECOND.id });

      expect(result.current.state).toEqual({ status: "loading" });

      await act(async () => answer(SECOND));

      expect(result.current.state).toEqual({
        status: "success",
        article: SECOND,
      });
    });

    it("cancels the request for the old article and ignores its late answer", async () => {
      const answerFirst = waitForAnswer();
      const { result, rerender } = renderHook(({ id }) => useArticle(id), {
        initialProps: { id: FIRST.id },
      });
      const [, firstSignal] = vi.mocked(getArticle).mock.calls[0];
      const answerSecond = waitForAnswer();

      rerender({ id: SECOND.id });
      await act(async () => answerSecond(SECOND));
      await act(async () => answerFirst(FIRST));

      expect(firstSignal?.aborted).toBe(true);
      expect(result.current.state).toEqual({
        status: "success",
        article: SECOND,
      });
    });

    it("shows not found at once when the new ID is not valid", async () => {
      vi.mocked(getArticle).mockResolvedValueOnce(FIRST);
      const { result, rerender } = renderHook(({ id }) => useArticle(id), {
        initialProps: { id: FIRST.id },
      });
      await waitFor(() =>
        expect(result.current.state).toMatchObject({ status: "success" }),
      );

      rerender({ id: "123" });

      expect(result.current.state).toEqual({ status: "not-found" });
    });
  });

  describe("when the visitor leaves before the answer arrives", () => {
    it("cancels the request and stays quiet when the answer comes", async () => {
      const consoleError = vi.spyOn(console, "error");
      const consoleWarn = vi.spyOn(console, "warn");
      const answer = waitForAnswer();
      const { unmount } = renderHook(() => useArticle(FIRST.id));
      const [, signal] = vi.mocked(getArticle).mock.calls[0];

      unmount();
      await act(async () => answer(FIRST));

      expect(signal?.aborted).toBe(true);
      expect(consoleError).not.toHaveBeenCalled();
      expect(consoleWarn).not.toHaveBeenCalled();
    });

    it("stays quiet when the cancelled request fails", async () => {
      const consoleError = vi.spyOn(console, "error");
      let fail: (reason: ApiError) => void = () => {};
      vi.mocked(getArticle).mockReturnValueOnce(
        new Promise((_, reject) => {
          fail = reject;
        }),
      );
      const { unmount } = renderHook(() => useArticle(FIRST.id));

      unmount();
      await act(async () => fail(new ApiError("cancelled", "Cancelled")));

      expect(consoleError).not.toHaveBeenCalled();
    });
  });
});

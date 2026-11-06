import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { COPY_FEEDBACK_MS, useCopyToClipboard } from "./useCopyToClipboard";

const stubClipboard = (writeText: () => Promise<void>) =>
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });

describe("useCopyToClipboard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    Reflect.deleteProperty(navigator, "clipboard");
  });

  describe("when used", () => {
    it("has copied nothing yet", () => {
      const { result } = renderHook(() => useCopyToClipboard());

      expect(result.current.status).toBe("idle");
    });
  });

  describe("when the text is copied", () => {
    it("puts it on the clipboard and reports it", async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      stubClipboard(writeText);
      const { result } = renderHook(() => useCopyToClipboard());

      await act(() => result.current.copy("hello"));

      expect(writeText).toHaveBeenCalledWith("hello");
      expect(result.current.status).toBe("copied");
    });

    it("goes back to idle after a moment", async () => {
      stubClipboard(vi.fn().mockResolvedValue(undefined));
      const { result } = renderHook(() => useCopyToClipboard());

      await act(() => result.current.copy("hello"));
      act(() => {
        vi.advanceTimersByTime(COPY_FEEDBACK_MS);
      });

      expect(result.current.status).toBe("idle");
    });
  });

  describe("when the browser refuses to copy", () => {
    it("reports the failure", async () => {
      stubClipboard(vi.fn().mockRejectedValue(new Error("denied")));
      const { result } = renderHook(() => useCopyToClipboard());

      await act(() => result.current.copy("hello"));

      expect(result.current.status).toBe("failed");
    });
  });
});

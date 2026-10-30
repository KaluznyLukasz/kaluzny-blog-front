import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ReadingProgress from "./ReadingProgress";

const setPage = ({
  scrollY,
  scrollHeight,
  innerHeight,
}: {
  scrollY: number;
  scrollHeight: number;
  innerHeight: number;
}) => {
  Object.defineProperty(window, "scrollY", {
    value: scrollY,
    configurable: true,
  });
  Object.defineProperty(window, "innerHeight", {
    value: innerHeight,
    configurable: true,
  });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
};

const barOf = (container: HTMLElement) =>
  container.firstElementChild as HTMLElement;

describe("<ReadingProgress />", () => {
  beforeEach(() => {
    setPage({ scrollY: 0, scrollHeight: 2000, innerHeight: 1000 });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("when the visitor is at the top of the page", () => {
    it("shows an empty bar", () => {
      const { container } = render(<ReadingProgress />);

      expect(barOf(container).style.transform).toBe("scaleX(0)");
    });

    it("hides the bar from screen readers, because it only decorates", () => {
      const { container } = render(<ReadingProgress />);

      expect(barOf(container)).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("when the visitor scrolls down", () => {
    it("fills the bar in proportion to how much of the page was passed", () => {
      const { container } = render(<ReadingProgress />);

      setPage({ scrollY: 500, scrollHeight: 2000, innerHeight: 1000 });
      fireEvent.scroll(window);

      expect(barOf(container).style.transform).toBe("scaleX(0.5)");
    });

    it("never fills it beyond the end, even on overscroll", () => {
      const { container } = render(<ReadingProgress />);

      setPage({ scrollY: 5000, scrollHeight: 2000, innerHeight: 1000 });
      fireEvent.scroll(window);

      expect(barOf(container).style.transform).toBe("scaleX(1)");
    });

    it("never empties it below the start, even on overscroll", () => {
      const { container } = render(<ReadingProgress />);

      setPage({ scrollY: -50, scrollHeight: 2000, innerHeight: 1000 });
      fireEvent.scroll(window);

      expect(barOf(container).style.transform).toBe("scaleX(0)");
    });
  });

  describe("when the window is resized", () => {
    it("recalculates the bar for the new height", () => {
      const { container } = render(<ReadingProgress />);

      setPage({ scrollY: 250, scrollHeight: 2000, innerHeight: 1500 });
      fireEvent(window, new Event("resize"));

      expect(barOf(container).style.transform).toBe("scaleX(0.5)");
    });
  });

  describe("when the whole page fits on the screen", () => {
    it("keeps the bar empty", () => {
      setPage({ scrollY: 0, scrollHeight: 800, innerHeight: 1000 });

      const { container } = render(<ReadingProgress />);

      expect(barOf(container).style.transform).toBe("scaleX(0)");
    });
  });

  describe("when it is removed", () => {
    it("stops listening to the page", () => {
      const removeEventListener = vi.spyOn(window, "removeEventListener");
      const { unmount } = render(<ReadingProgress />);

      unmount();

      expect(removeEventListener).toHaveBeenCalledWith(
        "scroll",
        expect.any(Function),
      );
      expect(removeEventListener).toHaveBeenCalledWith(
        "resize",
        expect.any(Function),
      );
    });
  });
});

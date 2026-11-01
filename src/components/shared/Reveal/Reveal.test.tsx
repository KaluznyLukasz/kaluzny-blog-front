import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Reveal from "./Reveal";
import { REVEAL_THRESHOLD } from "./Reveal.constants";

const SCREEN_HEIGHT = 800;

interface Sighting {
  visibleShare: number;
  height?: number;
  screenHeight?: number | null;
}

class IntersectionObserverMock {
  static latest: IntersectionObserverMock | undefined;
  readonly callback: IntersectionObserverCallback;
  readonly options?: IntersectionObserverInit;
  readonly observe = vi.fn();
  readonly disconnect = vi.fn();

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.callback = callback;
    this.options = options;
    IntersectionObserverMock.latest = this;
  }

  report(isIntersecting: boolean) {
    this.sight({ visibleShare: isIntersecting ? 1 : 0 });
  }

  sight({
    visibleShare,
    height = 200,
    screenHeight = SCREEN_HEIGHT,
  }: Sighting) {
    act(() => {
      this.callback(
        [
          {
            isIntersecting: visibleShare > 0,
            intersectionRatio: visibleShare,
            boundingClientRect: { height } as DOMRectReadOnly,
            rootBounds:
              screenHeight === null
                ? null
                : ({ height: screenHeight } as DOMRectReadOnly),
          } as IntersectionObserverEntry,
        ],
        this as unknown as IntersectionObserver,
      );
    });
  }
}

const getObserver = () => {
  const observer = IntersectionObserverMock.latest;
  if (!observer) throw new Error("No IntersectionObserver was created");
  return observer;
};

describe("<Reveal />", () => {
  describe("when the browser cannot observe what is on screen", () => {
    it("shows the content right away, without an animation", () => {
      render(<Reveal>Hello</Reveal>);

      expect(screen.getByText("Hello")).not.toHaveClass("opacity-0");
      expect(screen.getByText("Hello")).toHaveClass("animate-in");
    });
  });

  describe("when the browser can observe what is on screen", () => {
    beforeEach(() => {
      IntersectionObserverMock.latest = undefined;
      vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    describe("and the content is not on screen yet", () => {
      it("keeps the content hidden", () => {
        render(<Reveal>Hello</Reveal>);

        getObserver().report(false);

        expect(screen.getByText("Hello")).toHaveClass("opacity-0");
        expect(getObserver().observe).toHaveBeenCalledWith(
          screen.getByText("Hello"),
        );
      });

      it("shows the content to users who prefer reduced motion", () => {
        render(<Reveal>Hello</Reveal>);

        expect(screen.getByText("Hello")).toHaveClass(
          "motion-reduce:opacity-100",
        );
      });
    });

    describe("and the content scrolls onto the screen", () => {
      it("animates the content in", () => {
        render(<Reveal>Hello</Reveal>);

        getObserver().report(true);

        expect(screen.getByText("Hello")).not.toHaveClass("opacity-0");
        expect(screen.getByText("Hello")).toHaveClass(
          "animate-in",
          "fade-in",
          "slide-in-from-bottom-8",
        );
      });

      it("stops observing the content", () => {
        render(<Reveal>Hello</Reveal>);
        const observer = getObserver();

        observer.report(true);

        expect(observer.disconnect).toHaveBeenCalled();
      });

      it("watches both when the content appears and when enough of it is visible", () => {
        render(<Reveal>Hello</Reveal>);

        expect(getObserver().options?.threshold).toEqual([0, REVEAL_THRESHOLD]);
      });
    });

    describe("and only the edge of the content is on screen", () => {
      it("keeps the content hidden until more of it is visible", () => {
        render(<Reveal>Hello</Reveal>);

        getObserver().sight({ visibleShare: REVEAL_THRESHOLD / 2 });

        expect(screen.getByText("Hello")).toHaveClass("opacity-0");
      });
    });

    describe("and the content is too tall to ever be visible enough, as when the page is zoomed in", () => {
      it("shows the content as soon as it appears", () => {
        render(<Reveal>Hello</Reveal>);
        const height = (SCREEN_HEIGHT / REVEAL_THRESHOLD) * 2;

        getObserver().sight({ visibleShare: 0.01, height });

        expect(screen.getByText("Hello")).not.toHaveClass("opacity-0");
      });

      it("measures the window when the browser does not report the screen size", () => {
        vi.stubGlobal("innerHeight", SCREEN_HEIGHT);
        render(<Reveal>Hello</Reveal>);
        const height = (SCREEN_HEIGHT / REVEAL_THRESHOLD) * 2;

        getObserver().sight({ visibleShare: 0.01, height, screenHeight: null });

        expect(screen.getByText("Hello")).not.toHaveClass("opacity-0");
      });
    });

    describe("and the content comes from a side", () => {
      it("slides the content in from that side on wide screens", () => {
        render(<Reveal from="right">Hello</Reveal>);

        getObserver().report(true);

        expect(screen.getByText("Hello")).toHaveClass(
          "lg:slide-in-from-right-6",
        );
      });
    });

    describe("and the component is removed before it was shown", () => {
      it("stops observing the content", () => {
        const { unmount } = render(<Reveal>Hello</Reveal>);
        const observer = getObserver();

        unmount();

        expect(observer.disconnect).toHaveBeenCalled();
      });
    });
  });

  describe("when rendered with a delay", () => {
    it("starts the animation after that delay", () => {
      render(<Reveal delay={120}>Hello</Reveal>);

      expect(screen.getByText("Hello")).toHaveStyle({
        animationDelay: "120ms",
      });
    });
  });

  describe("when rendered with extra classes", () => {
    it("adds them to the wrapper", () => {
      render(<Reveal className="self-end">Hello</Reveal>);

      expect(screen.getByText("Hello")).toHaveClass("self-end");
    });
  });
});

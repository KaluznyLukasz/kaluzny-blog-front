import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Article } from "../../../../services/api/schemas/article";
import ArticleFeed from "./ArticleFeed";
import { ACCENT_ORDER, FEED_MESSAGES } from "./ArticleFeed.constants";

const article = (index: number): Article => ({
  id: `5e1f0a2b-000${index}-4000-8000-00000000000${index}`,
  title: `Article number ${index}`,
  content: "Some content.",
  publishedAt: `2025-0${index}-10T09:00:00.000Z`,
});

const ARTICLES = [article(5), article(4), article(3), article(2), article(1)];

const rowOf = (title: string) =>
  screen.getByRole("region", { name: title }).parentElement?.parentElement;

describe("<ArticleFeed />", () => {
  describe("when the articles are loading", () => {
    it("tells the visitor they are loading", () => {
      render(<ArticleFeed state={{ status: "loading" }} onRetry={vi.fn()} />);

      expect(screen.getByRole("status")).toHaveTextContent(
        FEED_MESSAGES.loading,
      );
    });

    it("shows placeholders only to sighted visitors", () => {
      render(<ArticleFeed state={{ status: "loading" }} onRetry={vi.fn()} />);

      expect(screen.queryByRole("region")).not.toBeInTheDocument();
      expect(
        screen.getByRole("status").querySelectorAll("[aria-hidden='true']"),
      ).toHaveLength(2);
    });
  });

  describe("when the API answered with articles", () => {
    it("shows every article as its own section, in the given order", () => {
      render(
        <ArticleFeed
          state={{ status: "success", articles: ARTICLES }}
          onRetry={vi.fn()}
        />,
      );

      expect(
        screen
          .getAllByRole("heading", { level: 2 })
          .map((heading) => heading.textContent),
      ).toEqual(ARTICLES.map(({ title }) => title));
      expect(screen.getAllByRole("region")).toHaveLength(ARTICLES.length);
    });

    it("zig-zags the sections from side to side", () => {
      render(
        <ArticleFeed
          state={{ status: "success", articles: ARTICLES }}
          onRetry={vi.fn()}
        />,
      );

      expect(rowOf(ARTICLES[0].title)).toHaveClass("lg:flex-row-reverse");
      expect(rowOf(ARTICLES[1].title)).not.toHaveClass("lg:flex-row-reverse");
      expect(rowOf(ARTICLES[2].title)).toHaveClass("lg:flex-row-reverse");
    });

    it("gives the calendar pages different colours, starting again after the last one", () => {
      render(
        <ArticleFeed
          state={{ status: "success", articles: ARTICLES }}
          onRetry={vi.fn()}
        />,
      );
      const stripOf = (month: string) =>
        screen.getByText(month).parentElement?.className;

      expect(ACCENT_ORDER).toHaveLength(4);
      expect(stripOf("May")).toContain("bg-gi-primary");
      expect(stripOf("Apr")).toContain("bg-gi-orange");
      expect(stripOf("Mar")).toContain("bg-gi-secondary");
      expect(stripOf("Feb")).toContain("bg-gi-blue");
      expect(stripOf("Jan")).toContain("bg-gi-primary");
    });
  });

  describe("when the API answered with no articles", () => {
    it("says there are no articles yet", () => {
      render(
        <ArticleFeed
          state={{ status: "success", articles: [] }}
          onRetry={vi.fn()}
        />,
      );

      expect(screen.getByRole("status")).toHaveTextContent(FEED_MESSAGES.empty);
      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });
  });

  describe("when the articles could not be loaded", () => {
    it("shows an error message and a way to try again", () => {
      render(<ArticleFeed state={{ status: "error" }} onRetry={vi.fn()} />);

      expect(screen.getByRole("alert")).toHaveTextContent(FEED_MESSAGES.error);
      expect(
        screen.getByRole("button", { name: FEED_MESSAGES.retry }),
      ).toBeEnabled();
      expect(screen.queryByRole("region")).not.toBeInTheDocument();
    });

    it("tries again when the visitor asks", () => {
      const handleRetry = vi.fn();
      render(<ArticleFeed state={{ status: "error" }} onRetry={handleRetry} />);

      fireEvent.click(
        screen.getByRole("button", { name: FEED_MESSAGES.retry }),
      );

      expect(handleRetry).toHaveBeenCalledTimes(1);
    });
  });
});

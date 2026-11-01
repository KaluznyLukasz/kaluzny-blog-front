import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SITE_NAME } from "../../../../constants/common";
import { ARTICLE_MESSAGES } from "../Article.constants";
import ArticleError from "./ArticleError";

describe("<ArticleError />", () => {
  describe("when rendered", () => {
    it("announces that the article could not be loaded", () => {
      render(<ArticleError onRetry={vi.fn()} />);

      expect(screen.getByRole("alert")).toHaveTextContent(
        ARTICLE_MESSAGES.error,
      );
    });

    it("gives the page a main heading for screen reader users", () => {
      render(<ArticleError onRetry={vi.fn()} />);

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: ARTICLE_MESSAGES.errorTitle,
        }),
      ).toHaveClass("sr-only");
    });

    it("names the browser tab after the error", () => {
      render(<ArticleError onRetry={vi.fn()} />);

      expect(document.title).toBe(
        `${ARTICLE_MESSAGES.errorTitle} · ${SITE_NAME}`,
      );
    });
  });

  describe("when the visitor tries again", () => {
    it("asks to load the article again", () => {
      const handleRetry = vi.fn();
      render(<ArticleError onRetry={handleRetry} />);

      fireEvent.click(
        screen.getByRole("button", { name: ARTICLE_MESSAGES.retry }),
      );

      expect(handleRetry).toHaveBeenCalledTimes(1);
    });
  });
});

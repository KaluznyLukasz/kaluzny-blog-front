import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ARTICLE_MESSAGES } from "../Article.constants";
import ArticleNotFound from "./ArticleNotFound";

describe("<ArticleNotFound />", () => {
  describe("when rendered", () => {
    it("says that the article does not exist, as the main heading", () => {
      render(<ArticleNotFound />);

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: ARTICLE_MESSAGES.notFound,
        }),
      ).toBeInTheDocument();
    });

    it("explains why it may be missing", () => {
      render(<ArticleNotFound />);

      expect(screen.getByText(ARTICLE_MESSAGES.notFoundHint)).toBeVisible();
    });

    it("is not announced as an error, and has nothing to retry", () => {
      render(<ArticleNotFound />);

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("hides the decorative icon from screen readers", () => {
      const { container } = render(<ArticleNotFound />);

      expect(
        container.querySelector(
          "svg:not([aria-hidden='true'], [aria-hidden='true'] svg)",
        ),
      ).toBeNull();
    });
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ARTICLE_MESSAGES } from "../Article.constants";
import ArticleLoading from "./ArticleLoading";

describe("<ArticleLoading />", () => {
  describe("when rendered", () => {
    it("tells the visitor that the article is loading", () => {
      render(<ArticleLoading />);

      expect(screen.getByRole("status")).toHaveTextContent(
        ARTICLE_MESSAGES.loading,
      );
    });

    it("shows the placeholder only to sighted visitors", () => {
      render(<ArticleLoading />);

      expect(
        screen.getByRole("status").querySelectorAll("[aria-hidden='true']"),
      ).toHaveLength(1);
      expect(screen.queryByRole("article")).not.toBeInTheDocument();
      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("pulses only for visitors who accept motion", () => {
      render(<ArticleLoading />);

      expect(
        screen.getByRole("status").querySelector("[aria-hidden='true']"),
      ).toHaveClass("motion-safe:animate-pulse");
    });
  });
});

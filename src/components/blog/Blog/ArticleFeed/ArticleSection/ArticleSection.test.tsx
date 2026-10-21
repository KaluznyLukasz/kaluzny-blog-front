import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ArticleSection from "./ArticleSection";

const ARTICLE = {
  title: "My first month with Docker",
  content: "Everything in this project runs in containers.",
  publishedAt: "2025-02-14T12:30:00.000Z",
};

const getRow = () =>
  screen.getByRole("region", { name: ARTICLE.title }).parentElement
    ?.parentElement;

describe("<ArticleSection />", () => {
  describe("when rendered", () => {
    it("is a section named by the article title", () => {
      render(<ArticleSection {...ARTICLE} side="right" accent="primary" />);

      expect(
        screen.getByRole("heading", { level: 2, name: ARTICLE.title }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("region", { name: ARTICLE.title }),
      ).toBeInTheDocument();
    });

    it("shows the publication date in words, with the exact moment for machines", () => {
      render(<ArticleSection {...ARTICLE} side="right" accent="primary" />);

      expect(screen.getByText("14 February 2025")).toHaveAttribute(
        "datetime",
        ARTICLE.publishedAt,
      );
    });

    it("shows the beginning of the article", () => {
      render(<ArticleSection {...ARTICLE} side="right" accent="primary" />);

      expect(screen.getByText(ARTICLE.content)).toHaveClass("line-clamp-4");
    });

    it("shows a calendar page next to the section instead of an image", () => {
      render(<ArticleSection {...ARTICLE} side="right" accent="primary" />);
      const day = screen.getByText("14");

      expect(getRow()).toContainElement(day);
      expect(
        screen.getByRole("region", { name: ARTICLE.title }),
      ).not.toContainElement(day);
    });
  });

  describe("when placed on the left", () => {
    it("keeps the section on the left", () => {
      render(<ArticleSection {...ARTICLE} side="left" accent="orange" />);

      expect(getRow()).not.toHaveClass("lg:flex-row-reverse");
    });
  });

  describe("when placed on the right", () => {
    it("moves the section to the right on wide screens", () => {
      render(<ArticleSection {...ARTICLE} side="right" accent="orange" />);

      expect(getRow()).toHaveClass("lg:flex-row-reverse");
    });
  });

  describe("when the article was published late in the evening, Polish time", () => {
    it("shows the date as it was in Poland", () => {
      render(
        <ArticleSection
          {...ARTICLE}
          publishedAt="2025-03-31T22:30:00.000Z"
          side="right"
          accent="primary"
        />,
      );

      expect(screen.getByText("1 April 2025")).toBeInTheDocument();
    });
  });
});

import { render as renderInDom, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import ArticleSection from "./ArticleSection";
import { READ_MORE_LABEL } from "./ArticleSection.constants";

const ARTICLE = {
  id: "5e1f0a2b-0002-4000-8000-000000000002",
  title: "My first month with Docker",
  content: "Everything in this project runs in containers.",
  publishedAt: "2025-02-14T12:30:00.000Z",
};

const render = (ui: ReactElement) => renderInDom(ui, { wrapper: MemoryRouter });

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

  describe("when the visitor wants to read the whole article", () => {
    it("offers a link to the page of this article, named after it", () => {
      render(<ArticleSection {...ARTICLE} side="right" accent="primary" />);

      expect(
        screen.getByRole("link", {
          name: `${READ_MORE_LABEL} about ${ARTICLE.title}`,
        }),
      ).toHaveAttribute("href", `/articles/${ARTICLE.id}`);
    });

    it("keeps the link inside the section", () => {
      render(<ArticleSection {...ARTICLE} side="right" accent="primary" />);

      expect(
        screen.getByRole("region", { name: ARTICLE.title }),
      ).toContainElement(screen.getByRole("link"));
    });
  });

  describe("when the content has HTML", () => {
    it("shows it as text and never as elements", () => {
      const { container } = render(
        <ArticleSection
          {...ARTICLE}
          content="<script>alert(1)</script><b>bold</b>"
          side="right"
          accent="primary"
        />,
      );

      expect(
        screen.getByText("<script>alert(1)</script><b>bold</b>"),
      ).toBeInTheDocument();
      expect(container.querySelector("script, b")).toBeNull();
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

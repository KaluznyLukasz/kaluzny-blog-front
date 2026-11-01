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

const IMAGE_URL =
  "http://localhost/api/v1/images/616ad187-7d8e-4e85-912d-36c743357d1a";

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
      const { container } = render(
        <ArticleSection {...ARTICLE} side="right" accent="primary" />,
      );
      const day = screen.getByText("14");

      expect(getRow()).toContainElement(day);
      expect(
        screen.getByRole("region", { name: ARTICLE.title }),
      ).not.toContainElement(day);
      expect(container.querySelector("img")).toBeNull();
      expect(day.closest(".hidden")).toHaveClass("lg:block");
    });
  });

  describe("when the article has a cover image", () => {
    it("shows the image next to the section, just as it was given", () => {
      const { container } = render(
        <ArticleSection
          {...ARTICLE}
          imageUrl={IMAGE_URL}
          side="right"
          accent="primary"
        />,
      );
      const image = container.querySelector("img");

      expect(image).toHaveAttribute("src", IMAGE_URL);
      expect(getRow()).toContainElement(image);
      expect(
        screen.getByRole("region", { name: ARTICLE.title }),
      ).not.toContainElement(image);
    });

    it("shows the image instead of the calendar page, never both", () => {
      render(
        <ArticleSection
          {...ARTICLE}
          imageUrl={IMAGE_URL}
          side="right"
          accent="primary"
        />,
      );

      expect(screen.queryByText("14")).not.toBeInTheDocument();
      expect(screen.queryByText("Feb")).not.toBeInTheDocument();
    });

    it("keeps the date in words next to the title", () => {
      render(
        <ArticleSection
          {...ARTICLE}
          imageUrl={IMAGE_URL}
          side="right"
          accent="primary"
        />,
      );

      expect(screen.getByText("14 February 2025")).toHaveAttribute(
        "datetime",
        ARTICLE.publishedAt,
      );
    });

    it("hides the image from screen readers, as the title is right next to it", () => {
      const { container } = render(
        <ArticleSection
          {...ARTICLE}
          imageUrl={IMAGE_URL}
          side="right"
          accent="primary"
        />,
      );

      expect(container.querySelector("img")).toHaveAttribute("alt", "");
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("loads the image only when it comes into view", () => {
      const { container } = render(
        <ArticleSection
          {...ARTICLE}
          imageUrl={IMAGE_URL}
          side="right"
          accent="primary"
        />,
      );

      expect(container.querySelector("img")).toHaveAttribute("loading", "lazy");
    });

    it("keeps the image on small screens, where the calendar page is hidden", () => {
      const { container } = render(
        <ArticleSection
          {...ARTICLE}
          imageUrl={IMAGE_URL}
          side="right"
          accent="primary"
        />,
      );

      expect(container.querySelector("img")?.parentElement).not.toHaveClass(
        "hidden",
      );
    });

    it("crops the image to a fixed shape, whatever its own shape is", () => {
      const { container } = render(
        <ArticleSection
          {...ARTICLE}
          imageUrl={IMAGE_URL}
          side="right"
          accent="primary"
        />,
      );

      expect(container.querySelector("img")).toHaveClass(
        "aspect-4/3",
        "w-full",
        "object-cover",
      );
    });
  });

  describe("when the article has no cover image", () => {
    it.each([
      ["null", null],
      ["undefined", undefined],
      ["an empty string", ""],
    ])("shows the calendar page when the address is %s", (_, imageUrl) => {
      const { container } = render(
        <ArticleSection
          {...ARTICLE}
          imageUrl={imageUrl}
          side="right"
          accent="primary"
        />,
      );

      expect(getRow()).toContainElement(screen.getByText("14"));
      expect(container.querySelector("img")).toBeNull();
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

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ArticleContent from "./ArticleContent";

const ARTICLE = {
  title: "My first month with Docker",
  content:
    "Everything in this project runs in containers.\n\nIt felt strange for a week.\nThen I stopped caring.",
  publishedAt: "2025-02-14T12:30:00.000Z",
};

const IMAGE_URL =
  "http://localhost/api/v1/images/616ad187-7d8e-4e85-912d-36c743357d1a";

describe("<ArticleContent />", () => {
  describe("when rendered", () => {
    it("shows the title as the main heading of an article", () => {
      render(<ArticleContent {...ARTICLE} />);

      expect(
        screen.getByRole("heading", { level: 1, name: ARTICLE.title }),
      ).toBeInTheDocument();
      expect(screen.getByRole("article")).toContainElement(
        screen.getByRole("heading", { level: 1 }),
      );
    });

    it("shows the publication date in words, with the exact moment for machines", () => {
      render(<ArticleContent {...ARTICLE} />);

      expect(screen.getByText("14 February 2025")).toHaveAttribute(
        "datetime",
        ARTICLE.publishedAt,
      );
    });

    it("shows the whole content, not only its beginning", () => {
      render(<ArticleContent {...ARTICLE} />);
      const article = screen.getByRole("article");

      expect(article).toHaveTextContent("Everything in this project runs");
      expect(article).toHaveTextContent("Then I stopped caring.");
      expect(article.querySelector(".line-clamp-4")).toBeNull();
    });

    it("keeps the paragraphs", () => {
      const { container } = render(<ArticleContent {...ARTICLE} />);

      expect(
        Array.from(container.querySelectorAll("p")).map(
          (paragraph) => paragraph.textContent,
        ),
      ).toEqual([
        "Everything in this project runs in containers.",
        "It felt strange for a week.",
        "Then I stopped caring.",
      ]);
    });
  });

  describe("when the article has a cover image", () => {
    it("shows the image inside the article, just as it was given", () => {
      render(<ArticleContent {...ARTICLE} imageUrl={IMAGE_URL} />);
      const image = screen.getByRole("article").querySelector("img");

      expect(image).toHaveAttribute("src", IMAGE_URL);
    });

    it("puts the image between the header and the text", () => {
      const { container } = render(
        <ArticleContent {...ARTICLE} imageUrl={IMAGE_URL} />,
      );
      const image = container.querySelector("img") as HTMLElement;
      const header = container.querySelector("header") as HTMLElement;
      const firstParagraph = container.querySelector("p") as HTMLElement;

      expect(header.compareDocumentPosition(image)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
      expect(image.compareDocumentPosition(firstParagraph)).toBe(
        Node.DOCUMENT_POSITION_FOLLOWING,
      );
      expect(header).not.toContainElement(image);
    });

    it("fills the width of the article and keeps a fixed shape, so the text never jumps", () => {
      const { container } = render(
        <ArticleContent {...ARTICLE} imageUrl={IMAGE_URL} />,
      );

      expect(container.querySelector("img")).toHaveClass(
        "aspect-video",
        "w-full",
        "object-cover",
      );
    });

    it("hides the image from screen readers, as the title is right above it", () => {
      const { container } = render(
        <ArticleContent {...ARTICLE} imageUrl={IMAGE_URL} />,
      );

      expect(container.querySelector("img")).toHaveAttribute("alt", "");
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("loads the image at once and early, as it is at the top of the page", () => {
      const { container } = render(
        <ArticleContent {...ARTICLE} imageUrl={IMAGE_URL} />,
      );
      const image = container.querySelector("img");

      expect(image).not.toHaveAttribute("loading", "lazy");
      expect(image).toHaveAttribute("fetchpriority", "high");
    });

    it("leaves the rest of the article as it is", () => {
      const { container } = render(
        <ArticleContent {...ARTICLE} imageUrl={IMAGE_URL} />,
      );

      expect(
        screen.getByRole("heading", { level: 1, name: ARTICLE.title }),
      ).toBeInTheDocument();
      expect(screen.getByText("14 February 2025")).toBeInTheDocument();
      expect(screen.getByText("1 min read")).toBeInTheDocument();
      expect(container.querySelectorAll("p")).toHaveLength(3);
    });
  });

  describe("when the article has no cover image", () => {
    it.each([
      ["null", null],
      ["undefined", undefined],
      ["an empty string", ""],
    ])("shows no image when the address is %s", (_, imageUrl) => {
      const { container } = render(
        <ArticleContent {...ARTICLE} imageUrl={imageUrl} />,
      );

      expect(container.querySelector("img")).toBeNull();
    });
  });

  describe("when the article is short", () => {
    it("shows how long it takes to read, at least one minute", () => {
      render(<ArticleContent {...ARTICLE} />);

      expect(screen.getByText("1 min read")).toBeInTheDocument();
    });
  });

  describe("when the article is long", () => {
    it("shows how many minutes it takes to read", () => {
      const content = Array.from({ length: 450 }, () => "word").join(" ");

      render(<ArticleContent {...ARTICLE} content={content} />);

      expect(screen.getByText("3 min read")).toBeInTheDocument();
    });
  });

  describe("when the article has several paragraphs", () => {
    it("shows the first one larger, as an introduction", () => {
      const { container } = render(<ArticleContent {...ARTICLE} />);
      const [first, second] = Array.from(container.querySelectorAll("p"));

      expect(first).toHaveClass("text-xl");
      expect(second).not.toHaveClass("text-xl");
    });
  });

  describe("when the article has one paragraph", () => {
    it("shows it like any other paragraph", () => {
      const { container } = render(
        <ArticleContent {...ARTICLE} content="Only one paragraph." />,
      );

      expect(container.querySelector("p")).not.toHaveClass("text-xl");
    });
  });

  describe("when it appears", () => {
    it("fades and slides in, so the page does not jump in", () => {
      render(<ArticleContent {...ARTICLE} />);

      expect(screen.getByRole("article")).toHaveClass(
        "animate-in",
        "fade-in",
        "slide-in-from-bottom-8",
      );
    });

    it("shows at once for visitors who prefer reduced motion", () => {
      render(<ArticleContent {...ARTICLE} />);

      expect(screen.getByRole("article")).toHaveClass(
        "motion-reduce:animate-none",
      );
    });

    it("never hides the article while it waits to be seen", () => {
      render(<ArticleContent {...ARTICLE} />);

      expect(screen.getByRole("article")).not.toHaveClass("opacity-0");
    });
  });

  describe("when the content is empty", () => {
    it("still shows the title and the date, without paragraphs or reading time", () => {
      const { container } = render(<ArticleContent {...ARTICLE} content="" />);

      expect(screen.queryByText(/min read/)).not.toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
      expect(screen.getByText("14 February 2025")).toBeInTheDocument();
      expect(container.querySelectorAll("p")).toHaveLength(0);
    });
  });

  describe("when the content has HTML", () => {
    it("shows <script> and <b> as text and never as elements", () => {
      const { container } = render(
        <ArticleContent
          {...ARTICLE}
          content={"<script>window.hacked = true</script>\n<b>Bold?</b>"}
        />,
      );

      expect(
        screen.getByText("<script>window.hacked = true</script>"),
      ).toBeInTheDocument();
      expect(screen.getByText("<b>Bold?</b>")).toBeInTheDocument();
      expect(container.querySelector("script, b")).toBeNull();
      expect(Reflect.get(window, "hacked")).toBeUndefined();
    });

    it("never turns an attribute with a script into a working element", () => {
      const { container } = render(
        <ArticleContent
          {...ARTICLE}
          content={'<img src=x onerror="window.hacked = true">'}
        />,
      );

      expect(container.querySelector("img")).toBeNull();
      expect(container.querySelector("[onerror]")).toBeNull();
    });

    it("shows HTML in the title as text too", () => {
      const { container } = render(
        <ArticleContent {...ARTICLE} title="<i>Italic</i> title" />,
      );

      expect(
        screen.getByRole("heading", { level: 1, name: "<i>Italic</i> title" }),
      ).toBeInTheDocument();
      expect(container.querySelector("i")).toBeNull();
    });
  });
});

import {
  fireEvent,
  render as renderInDom,
  screen,
} from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getArticle } from "../../../services/api/client/getArticle";
import { getArticles } from "../../../services/api/client/getArticles";
import type { Article as ArticleData } from "../../../services/api/schemas/article";
import { ApiError } from "../../../services/api/utils/apiError";
import Article from "./Article";
import { ARTICLE_MESSAGES } from "./Article.constants";

vi.mock("../../../services/api/client/getArticle");
vi.mock("../../../services/api/client/getArticles");

const FIRST: ArticleData = {
  id: "5e1f0a2b-0001-4000-8000-000000000001",
  title: "Hello, world: why I started this blog",
  content:
    "I want a place to write down what I learn.\n\nThis blog is my notebook.",
  publishedAt: "2025-01-10T09:00:00.000Z",
};

const SECOND: ArticleData = {
  id: "5e1f0a2b-0002-4000-8000-000000000002",
  title: "My first month with Docker",
  content: "Everything in this project runs in containers.",
  publishedAt: "2025-02-14T12:30:00.000Z",
};

const render = (ui: ReactElement) => renderInDom(ui, { wrapper: MemoryRouter });

describe("<Article />", () => {
  beforeEach(() => {
    vi.mocked(getArticle).mockReset();
    vi.mocked(getArticle).mockReturnValue(new Promise(() => {}));
    vi.mocked(getArticles).mockReset();
    vi.mocked(getArticles).mockResolvedValue([SECOND, FIRST]);
  });

  describe("when the article is loading", () => {
    it("tells the visitor and asks the API for that article", () => {
      render(<Article id={FIRST.id} />);

      expect(screen.getByRole("status")).toHaveTextContent(
        ARTICLE_MESSAGES.loading,
      );
      expect(getArticle).toHaveBeenCalledWith(
        FIRST.id,
        expect.any(AbortSignal),
      );
    });

    it("shows placeholders only to sighted visitors, and no article yet", () => {
      render(<Article id={FIRST.id} />);

      expect(
        screen.getByRole("status").querySelectorAll("[aria-hidden='true']"),
      ).toHaveLength(1);
      expect(screen.queryByRole("article")).not.toBeInTheDocument();
    });

    it("already offers the way back", () => {
      render(<Article id={FIRST.id} />);

      expect(
        screen.getByRole("link", { name: ARTICLE_MESSAGES.back }),
      ).toHaveAttribute("href", "/blog");
    });
  });

  describe("when the API answers with the article", () => {
    it("shows the whole article, with its paragraphs", async () => {
      vi.mocked(getArticle).mockResolvedValueOnce(FIRST);

      render(<Article id={FIRST.id} />);

      expect(
        await screen.findByRole("heading", { level: 1, name: FIRST.title }),
      ).toBeInTheDocument();
      expect(screen.getByText("10 January 2025")).toBeInTheDocument();
      expect(
        Array.from(document.querySelectorAll("article p")).map(
          (paragraph) => paragraph.textContent,
        ),
      ).toEqual([
        "I want a place to write down what I learn.",
        "This blog is my notebook.",
      ]);
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    it("offers more articles after the last paragraph", async () => {
      vi.mocked(getArticle).mockResolvedValueOnce(FIRST);

      render(<Article id={FIRST.id} />);
      await screen.findByRole("article");

      expect(
        screen.getByRole("link", { name: ARTICLE_MESSAGES.more }),
      ).toHaveAttribute("href", "/blog");
      expect(screen.getByRole("article")).not.toContainElement(
        screen.getByRole("link", { name: ARTICLE_MESSAGES.more }),
      );
    });

    it("keeps the way back", async () => {
      vi.mocked(getArticle).mockResolvedValueOnce(FIRST);

      render(<Article id={FIRST.id} />);
      await screen.findByRole("article");

      expect(
        screen.getByRole("link", { name: ARTICLE_MESSAGES.back }),
      ).toHaveAttribute("href", "/blog");
    });
  });

  describe("when the content has HTML", () => {
    it("shows the text and never runs a script", async () => {
      vi.mocked(getArticle).mockResolvedValueOnce({
        ...FIRST,
        content: "<script>window.hacked = true</script>\n<b>Bold?</b>",
      });

      render(<Article id={FIRST.id} />);

      expect(
        await screen.findByText("<script>window.hacked = true</script>"),
      ).toBeInTheDocument();
      expect(screen.getByText("<b>Bold?</b>")).toBeInTheDocument();
      expect(document.querySelector("script, b")).toBeNull();
      expect(Reflect.get(window, "hacked")).toBeUndefined();
    });
  });

  describe("when the article does not exist", () => {
    it.each([
      ["the API answers that it is not there", 404],
      ["the API answers that the ID is not valid", 400],
    ])("says so and offers the way back when %s", async (_, status) => {
      vi.mocked(getArticle).mockRejectedValueOnce(
        new ApiError("http", `Status ${status}`, { status }),
      );

      render(<Article id={FIRST.id} />);

      expect(
        await screen.findByRole("heading", {
          level: 1,
          name: ARTICLE_MESSAGES.notFound,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: ARTICLE_MESSAGES.back }),
      ).toHaveAttribute("href", "/blog");
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: ARTICLE_MESSAGES.more }),
      ).not.toBeInTheDocument();
    });
  });

  describe("when the ID in the address is not valid", () => {
    it.each([
      "123",
      "not-an-id",
      "../blog",
    ])("says the article does not exist for %j, without asking the API", (id) => {
      render(<Article id={id} />);

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: ARTICLE_MESSAGES.notFound,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: ARTICLE_MESSAGES.back }),
      ).toHaveAttribute("href", "/blog");
      expect(getArticle).not.toHaveBeenCalled();
    });
  });

  describe("when the article cannot be loaded", () => {
    it.each([
      ["the API is down", new ApiError("network", "Unreachable")],
      [
        "the API answers with an error",
        new ApiError("http", "Status 500", { status: 500 }),
      ],
      ["the API never answers", new ApiError("timeout", "Too slow")],
      [
        "the answer does not match the schema",
        new ApiError("invalid-response", "Broken answer"),
      ],
    ])("shows an error and a way to try again when %s", async (_, error) => {
      vi.mocked(getArticle).mockRejectedValueOnce(error);

      render(<Article id={FIRST.id} />);

      expect(await screen.findByRole("alert")).toHaveTextContent(
        ARTICLE_MESSAGES.error,
      );
      expect(
        screen.getByRole("button", { name: ARTICLE_MESSAGES.retry }),
      ).toBeEnabled();
      expect(screen.queryByRole("article")).not.toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: ARTICLE_MESSAGES.back }),
      ).toBeInTheDocument();
    });
  });

  describe("when the visitor tries again", () => {
    it("loads the article again", async () => {
      vi.mocked(getArticle)
        .mockRejectedValueOnce(new ApiError("network", "Unreachable"))
        .mockResolvedValueOnce(FIRST);
      render(<Article id={FIRST.id} />);

      fireEvent.click(
        await screen.findByRole("button", { name: ARTICLE_MESSAGES.retry }),
      );

      expect(screen.getByRole("status")).toHaveTextContent(
        ARTICLE_MESSAGES.loading,
      );
      expect(
        await screen.findByRole("heading", { level: 1, name: FIRST.title }),
      ).toBeInTheDocument();
      expect(getArticle).toHaveBeenCalledTimes(2);
    });
  });
});

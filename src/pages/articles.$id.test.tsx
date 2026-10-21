import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ARTICLE_MESSAGES } from "../components/blog/Article/Article.constants";
import { SITE_NAME } from "../constants/common";
import { getArticle } from "../services/api/client/getArticle";
import { getArticles } from "../services/api/client/getArticles";
import type { Article as ArticleData } from "../services/api/schemas/article";
import ArticlePage, { meta } from "./articles.$id";
import BlogPage from "./blog";

vi.mock("../services/api/client/getArticle");
vi.mock("../services/api/client/getArticles");

const FIRST: ArticleData = {
  id: "5e1f0a2b-0001-4000-8000-000000000001",
  title: "Hello, world: why I started this blog",
  content: "I want a place to write down what I learn.",
  publishedAt: "2025-01-10T09:00:00.000Z",
};

const SECOND: ArticleData = {
  id: "5e1f0a2b-0002-4000-8000-000000000002",
  title: "My first month with Docker",
  content: "Everything in this project runs in containers.",
  publishedAt: "2025-02-14T12:30:00.000Z",
};

const renderApp = (initialEntries: string[], initialIndex?: number) => {
  const router = createMemoryRouter(
    [
      {
        Component: Outlet,
        children: [
          { path: "/", Component: () => <h1>About me</h1> },
          { path: "/blog", Component: BlogPage },
          { path: "/articles/:id", Component: ArticlePage },
        ],
      },
    ],
    { initialEntries, initialIndex },
  );
  render(<RouterProvider router={router} />);

  return router;
};

describe("the article page", () => {
  beforeEach(() => {
    vi.mocked(getArticle).mockReset();
    vi.mocked(getArticles).mockReset();
    vi.mocked(getArticles).mockResolvedValue([SECOND, FIRST]);
  });

  describe("when it is described to the browser", () => {
    it("has a title with the name of the site", () => {
      expect(meta()).toEqual([{ title: `Article · ${SITE_NAME}` }]);
    });
  });

  describe("when the visitor picks an article in the blog", () => {
    it("opens the page of that article without asking for the list again", async () => {
      vi.mocked(getArticle).mockResolvedValueOnce(FIRST);
      const router = renderApp(["/blog"]);

      fireEvent.click(
        await screen.findByRole("link", {
          name: `Read more about ${FIRST.title}`,
        }),
      );

      expect(
        await screen.findByRole("heading", { level: 1, name: FIRST.title }),
      ).toBeInTheDocument();
      expect(router.state.location.pathname).toBe(`/articles/${FIRST.id}`);
      expect(getArticle).toHaveBeenCalledWith(
        FIRST.id,
        expect.any(AbortSignal),
      );
      expect(getArticles).toHaveBeenCalledTimes(1);
    });
  });

  describe("when the visitor uses the way back", () => {
    it("is back on the blog", async () => {
      vi.mocked(getArticle).mockResolvedValueOnce(FIRST);
      renderApp(["/blog", `/articles/${FIRST.id}`], 1);
      await screen.findByRole("article");

      fireEvent.click(
        screen.getByRole("link", { name: ARTICLE_MESSAGES.back }),
      );

      expect(
        await screen.findByRole("heading", { level: 1, name: "Blog" }),
      ).toBeInTheDocument();
    });
  });

  describe("when the visitor uses the browser's Back button", () => {
    it("is back on the page they came from", async () => {
      vi.mocked(getArticle).mockResolvedValueOnce(FIRST);
      const router = renderApp(["/", `/articles/${FIRST.id}`], 1);
      await screen.findByRole("article");

      await act(() => router.navigate(-1));

      expect(
        await screen.findByRole("heading", { level: 1, name: "About me" }),
      ).toBeInTheDocument();
      expect(screen.queryByRole("article")).not.toBeInTheDocument();
    });
  });

  describe("when the visitor opens an article address directly", () => {
    it("loads the article without the visitor having been on any other page", async () => {
      vi.mocked(getArticle).mockResolvedValueOnce(SECOND);

      renderApp([`/articles/${SECOND.id}`]);

      expect(
        await screen.findByRole("heading", { level: 1, name: SECOND.title }),
      ).toBeInTheDocument();
      expect(getArticles).not.toHaveBeenCalled();
    });

    it("says the article does not exist when the address has an invalid ID", async () => {
      renderApp(["/articles/123"]);

      expect(
        await screen.findByRole("heading", {
          level: 1,
          name: ARTICLE_MESSAGES.notFound,
        }),
      ).toBeInTheDocument();
      expect(getArticle).not.toHaveBeenCalled();
    });
  });

  describe("when the visitor goes from one article to another", () => {
    it("loads the new article and never shows the old one under the new address", async () => {
      vi.mocked(getArticle).mockResolvedValueOnce(FIRST);
      const router = renderApp([`/articles/${FIRST.id}`]);
      await screen.findByRole("heading", { level: 1, name: FIRST.title });
      let answer: (article: ArticleData) => void = () => {};
      vi.mocked(getArticle).mockReturnValueOnce(
        new Promise((resolve) => {
          answer = resolve;
        }),
      );

      await act(() => router.navigate(`/articles/${SECOND.id}`));

      expect(screen.queryByText(FIRST.title)).not.toBeInTheDocument();
      expect(screen.getByRole("status")).toHaveTextContent(
        ARTICLE_MESSAGES.loading,
      );

      await act(async () => answer(SECOND));

      await waitFor(() =>
        expect(
          screen.getByRole("heading", { level: 1, name: SECOND.title }),
        ).toBeInTheDocument(),
      );
      expect(screen.queryByText(FIRST.title)).not.toBeInTheDocument();
    });
  });
});

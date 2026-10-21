import {
  fireEvent,
  render as renderInDom,
  screen,
} from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getArticles } from "../../../services/api/client/getArticles";
import type { Article } from "../../../services/api/schemas/article";
import { ApiError } from "../../../services/api/utils/apiError";
import { FEED_MESSAGES } from "./ArticleFeed/ArticleFeed.constants";
import Blog from "./Blog";
import { BLOG_DESCRIPTION } from "./Blog.constants";

vi.mock("../../../services/api/client/getArticles");

const ARTICLES: Article[] = [
  {
    id: "5e1f0a2b-0005-4000-8000-000000000005",
    title: "Scenarios are documentation that runs",
    content: "A Gherkin scenario describes behaviour in plain words.",
    publishedAt: "2025-04-02T08:15:00.000Z",
  },
  {
    id: "5e1f0a2b-0001-4000-8000-000000000001",
    title: "Hello, world: why I started this blog",
    content: "I want a place to write down what I learn.",
    publishedAt: "2025-01-10T09:00:00.000Z",
  },
];

const render = (ui: ReactElement) => renderInDom(ui, { wrapper: MemoryRouter });

const articleTitles = () =>
  screen
    .getAllByRole("heading", { level: 2 })
    .map((heading) => heading.textContent);

describe("<Blog />", () => {
  beforeEach(() => {
    vi.mocked(getArticles).mockReset();
    vi.mocked(getArticles).mockReturnValue(new Promise(() => {}));
  });

  describe("when rendered", () => {
    it("shows Blog as the only main heading", () => {
      render(<Blog />);

      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole("heading", { level: 1, name: "Blog" }),
      ).toBeInTheDocument();
    });

    it("shows the description", () => {
      render(<Blog />);

      expect(screen.getByText(BLOG_DESCRIPTION)).toBeInTheDocument();
    });
  });

  describe("when the articles are loading", () => {
    it("tells the visitor and shows the rest of the page without waiting", () => {
      render(<Blog />);

      expect(screen.getByRole("status")).toHaveTextContent(
        FEED_MESSAGES.loading,
      );
      expect(screen.getByText(BLOG_DESCRIPTION)).toBeVisible();
    });
  });

  describe("when the API answers with articles", () => {
    it("shows every article as its own section, in the order the service returns them", async () => {
      vi.mocked(getArticles).mockResolvedValueOnce(ARTICLES);

      render(<Blog />);

      expect(await screen.findAllByRole("region")).toHaveLength(
        ARTICLES.length,
      );
      expect(articleTitles()).toEqual(ARTICLES.map(({ title }) => title));
    });
  });

  describe("when the API answers with no articles", () => {
    it("says there are no articles yet", async () => {
      vi.mocked(getArticles).mockResolvedValueOnce([]);

      render(<Blog />);

      expect(await screen.findByText(FEED_MESSAGES.empty)).toBeInTheDocument();
    });
  });

  describe("when the articles cannot be loaded", () => {
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
    ])("shows the same error when %s, and the rest of the page", async (_, error) => {
      vi.mocked(getArticles).mockRejectedValueOnce(error);

      render(<Blog />);

      expect(await screen.findByRole("alert")).toHaveTextContent(
        FEED_MESSAGES.error,
      );
      expect(screen.queryByRole("region")).not.toBeInTheDocument();
      expect(
        screen.getByRole("heading", { level: 1, name: "Blog" }),
      ).toBeVisible();
    });
  });

  describe("when the visitor tries again", () => {
    it("loads the articles again", async () => {
      vi.mocked(getArticles)
        .mockRejectedValueOnce(new ApiError("network", "Unreachable"))
        .mockResolvedValueOnce(ARTICLES);
      render(<Blog />);

      fireEvent.click(
        await screen.findByRole("button", { name: FEED_MESSAGES.retry }),
      );

      expect(screen.getByRole("status")).toHaveTextContent(
        FEED_MESSAGES.loading,
      );
      expect(await screen.findAllByRole("region")).toHaveLength(
        ARTICLES.length,
      );
      expect(getArticles).toHaveBeenCalledTimes(2);
    });
  });
});

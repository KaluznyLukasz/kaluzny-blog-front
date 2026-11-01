import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";
import { BLOG_DESCRIPTION } from "../components/blog/Blog/Blog.constants";
import { SITE_NAME } from "../constants/common";
import { getArticles } from "../services/api/client/getArticles";
import BlogPage, { meta } from "./blog";

vi.mock("../services/api/client/getArticles");

describe("the blog page", () => {
  describe("when it is described to the browser", () => {
    it("has a title with the name of the site", () => {
      expect(meta()).toContainEqual({ title: `Blog · ${SITE_NAME}` });
    });

    it("has a description", () => {
      expect(meta()).toContainEqual({
        name: "description",
        content: BLOG_DESCRIPTION,
      });
    });
  });

  describe("when it is shown", () => {
    it("shows the blog", () => {
      vi.mocked(getArticles).mockReturnValue(new Promise(() => {}));

      render(<BlogPage />, { wrapper: MemoryRouter });

      expect(
        screen.getByRole("heading", { level: 1, name: "Blog" }),
      ).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { NOT_FOUND_MESSAGES } from "../components/shared/NotFound/NotFound.constants";
import { SITE_NAME } from "../constants/common";
import NotFoundPage, { meta } from "./$";

describe("the page for an unknown address", () => {
  describe("when it is described to the browser", () => {
    it("has a title with the name of the site", () => {
      expect(meta()).toContainEqual({
        title: `Page not found · ${SITE_NAME}`,
      });
    });

    it("asks search engines to leave it out of their results", () => {
      expect(meta()).toContainEqual({ name: "robots", content: "noindex" });
    });
  });

  describe("when it is shown", () => {
    it("says that the page does not exist", () => {
      render(<NotFoundPage />, { wrapper: MemoryRouter });

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: NOT_FOUND_MESSAGES.title,
        }),
      ).toBeInTheDocument();
    });
  });
});

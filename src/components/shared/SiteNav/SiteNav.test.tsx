import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import SiteNav from "./SiteNav";

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <SiteNav />
    </MemoryRouter>,
  );

describe("<SiteNav />", () => {
  describe("when rendered", () => {
    it("shows the main navigation with three pages, in order", () => {
      renderAt("/");
      const nav = screen.getByRole("navigation", { name: "Main" });

      expect(
        within(nav)
          .getAllByRole("link")
          .map((link) => [link.textContent, link.getAttribute("href")]),
      ).toEqual([
        ["About me", "/"],
        ["Portfolio", "/portfolio"],
        ["Blog", "/blog"],
      ]);
    });
  });

  describe("when the visitor is on a page", () => {
    it("marks only that page as the current one", () => {
      renderAt("/portfolio");

      expect(screen.getByRole("link", { name: "Portfolio" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      expect(
        screen.getByRole("link", { name: "About me" }),
      ).not.toHaveAttribute("aria-current");
      expect(screen.getByRole("link", { name: "Blog" })).not.toHaveAttribute(
        "aria-current",
      );
    });
  });

  describe("when the visitor chooses another page", () => {
    it("marks the chosen page as the current one", () => {
      renderAt("/");

      fireEvent.click(screen.getByRole("link", { name: "Blog" }));

      expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      expect(
        screen.getByRole("link", { name: "About me" }),
      ).not.toHaveAttribute("aria-current");
    });
  });
});

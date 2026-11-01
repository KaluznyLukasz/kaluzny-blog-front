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
    it("shows the main navigation with four pages, in order", () => {
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
        ["Contact", "/contact"],
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
      expect(screen.getByRole("link", { name: "Contact" })).not.toHaveAttribute(
        "aria-current",
      );
    });
  });

  describe("when the links do not fit on one line, as on a narrow or zoomed-in screen", () => {
    it("wraps them onto the next line instead of cutting them off", () => {
      renderAt("/");

      expect(screen.getByRole("list")).toHaveClass("flex-wrap");
    });
  });

  describe("when the visitor uses a high contrast theme, which removes backgrounds", () => {
    it("still marks the current page, with an underline", () => {
      renderAt("/");

      expect(screen.getByRole("link", { name: "About me" })).toHaveClass(
        "forced-colors:aria-[current=page]:underline",
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

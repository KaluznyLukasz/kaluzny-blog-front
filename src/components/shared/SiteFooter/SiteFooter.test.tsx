import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { SITE_NAME } from "../../../constants/common";
import { CONTACTS } from "../../../constants/contacts";
import SiteFooter from "./SiteFooter";
import { LEGAL_LINKS } from "./SiteFooter.constants";

const renderFooter = () =>
  render(
    <MemoryRouter>
      <SiteFooter />
    </MemoryRouter>,
  );

describe("<SiteFooter />", () => {
  describe("when rendered", () => {
    it("shows the footer landmark", () => {
      renderFooter();

      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("shows no heading or other text besides the copyright", () => {
      renderFooter();

      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
      expect(screen.getAllByRole("paragraph")).toHaveLength(1);
    });

    it("shows the legal pages in their own navigation, in order", () => {
      renderFooter();
      const nav = screen.getByRole("navigation", { name: "Legal" });

      expect(
        within(nav)
          .getAllByRole("link")
          .map((link) => [link.textContent, link.getAttribute("href")]),
      ).toEqual([
        ["Privacy policy", "/privacy"],
        ["Legal notice", "/legal"],
      ]);
    });

    it("shows a link for every contact, after the legal pages", () => {
      renderFooter();

      expect(
        within(screen.getByRole("contentinfo"))
          .getAllByRole("link")
          .map((link) => link.getAttribute("href")),
      ).toEqual([
        ...LEGAL_LINKS.map(({ to }) => to),
        ...CONTACTS.map(({ href }) => href),
      ]);
    });

    it("shows the copyright for the current year", () => {
      renderFooter();

      expect(
        screen.getByText(`© ${new Date().getFullYear()} ${SITE_NAME}`),
      ).toBeInTheDocument();
    });
  });
});

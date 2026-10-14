import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SITE_NAME } from "../../../constants/common";
import SiteFooter from "./SiteFooter";
import { CONTACTS } from "./SiteFooter.constants";

describe("<SiteFooter />", () => {
  describe("when rendered", () => {
    it("shows the footer landmark", () => {
      render(<SiteFooter />);

      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("shows no heading or other text besides the copyright", () => {
      render(<SiteFooter />);

      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
      expect(screen.getAllByRole("paragraph")).toHaveLength(1);
    });

    it("shows a link for every contact", () => {
      render(<SiteFooter />);

      expect(
        within(screen.getByRole("contentinfo"))
          .getAllByRole("link")
          .map((link) => link.getAttribute("href")),
      ).toEqual(CONTACTS.map(({ href }) => href));
    });

    it("shows the copyright for the current year", () => {
      render(<SiteFooter />);

      expect(
        screen.getByText(`© ${new Date().getFullYear()} ${SITE_NAME}`),
      ).toBeInTheDocument();
    });
  });
});

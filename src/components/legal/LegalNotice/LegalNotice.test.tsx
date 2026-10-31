import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import LegalNotice from "./LegalNotice";
import { LEGAL_NOTICE_SECTIONS } from "./LegalNotice.constants";

const renderNotice = () => render(<LegalNotice />, { wrapper: MemoryRouter });

describe("<LegalNotice />", () => {
  describe("when rendered", () => {
    it("shows the title as the main heading", () => {
      renderNotice();

      expect(
        screen.getByRole("heading", { level: 1, name: "Legal notice" }),
      ).toBeInTheDocument();
    });

    it("shows every section of the notice", () => {
      renderNotice();

      expect(
        screen
          .getAllByRole("heading", { level: 2 })
          .map((heading) => heading.textContent),
      ).toEqual(LEGAL_NOTICE_SECTIONS.map(({ title }) => title));
    });

    it("says who runs the website and links to the contact page and privacy policy", () => {
      renderNotice();

      expect(
        screen.getByRole("region", { name: "Who runs this website" }),
      ).toHaveTextContent("Łukasz Kałużny");
      expect(
        screen.getByRole("link", { name: "Contact page" }),
      ).toHaveAttribute("href", "/contact");
      expect(
        screen.getByRole("link", { name: "Privacy policy" }),
      ).toHaveAttribute("href", "/privacy");
    });

    it("names the owners of the trademarks it mentions", () => {
      renderNotice();
      const section = screen.getByRole("region", { name: "Trademarks" });

      expect(section).toHaveTextContent("Apple Inc.");
      expect(section).toHaveTextContent("Google LLC");
    });

    it("links to the licences of the open-source software it includes", () => {
      renderNotice();

      expect(
        screen.getByRole("link", { name: "Third-party licences" }),
      ).toHaveAttribute("href", "/third-party-licenses.txt");
    });
  });
});

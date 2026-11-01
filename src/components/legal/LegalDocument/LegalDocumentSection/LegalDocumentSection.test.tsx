import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import type { LegalSection } from "../LegalDocument.types";
import LegalDocumentSection from "./LegalDocumentSection";

const SECTION: LegalSection = {
  title: "Your rights",
  paragraphs: ["You have rights.", "Here is how to use them."],
  items: ["access your data", "have your data deleted"],
  links: [
    { label: "Contact page", to: "/contact" },
    { label: "Licences", to: "/licences.txt", reloadDocument: true },
  ],
};

const renderSection = (section: LegalSection = SECTION) =>
  render(<LegalDocumentSection {...section} />, { wrapper: MemoryRouter });

describe("<LegalDocumentSection />", () => {
  describe("when rendered", () => {
    it("is a region named by its heading", () => {
      renderSection();

      expect(
        screen.getByRole("region", { name: SECTION.title }),
      ).toContainElement(
        screen.getByRole("heading", { level: 2, name: SECTION.title }),
      );
    });

    it("shows every paragraph, in order", () => {
      const { container } = renderSection();

      expect(
        Array.from(container.querySelectorAll("p")).map(
          (paragraph) => paragraph.textContent,
        ),
      ).toEqual(SECTION.paragraphs);
    });

    it("shows the items as a list", () => {
      renderSection();
      const [items] = screen.getAllByRole("list");

      expect(
        within(items)
          .getAllByRole("listitem")
          .map((item) => item.textContent),
      ).toEqual(SECTION.items);
    });

    it("shows every link, in order", () => {
      renderSection();

      expect(
        screen
          .getAllByRole("link")
          .map((link) => [link.textContent, link.getAttribute("href")]),
      ).toEqual([
        ["Contact page", "/contact"],
        ["Licences", "/licences.txt"],
      ]);
    });
  });

  describe("when rendered with paragraphs only", () => {
    it("shows no list and no link", () => {
      renderSection({ title: "Changes", paragraphs: ["Nothing yet."] });

      expect(screen.queryByRole("list")).not.toBeInTheDocument();
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
    });
  });
});

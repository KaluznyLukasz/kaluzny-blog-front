import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import LegalDocument from "./LegalDocument";
import type { LegalSection } from "./LegalDocument.types";

const SECTIONS: LegalSection[] = [
  { title: "Who I am", paragraphs: ["A developer."] },
  { title: "Your rights", paragraphs: ["You have rights."] },
];

const renderDocument = () =>
  render(
    <LegalDocument
      title="Privacy policy"
      description="What happens to your data."
      updatedAt="2026-10-31"
      sections={SECTIONS}
    />,
    { wrapper: MemoryRouter },
  );

describe("<LegalDocument />", () => {
  describe("when rendered", () => {
    it("shows the title as the only main heading", () => {
      renderDocument();

      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole("heading", { level: 1, name: "Privacy policy" }),
      ).toBeInTheDocument();
    });

    it("shows the description", () => {
      renderDocument();

      expect(
        screen.getByText("What happens to your data."),
      ).toBeInTheDocument();
    });

    it("shows when it was last updated, in words and for machines", () => {
      renderDocument();

      expect(screen.getByText("31 October 2026")).toHaveAttribute(
        "datetime",
        "2026-10-31",
      );
      expect(screen.getByText(/^Last updated:/)).toBeInTheDocument();
    });

    it("shows every section under its own heading, in order", () => {
      renderDocument();

      expect(
        screen
          .getAllByRole("heading", { level: 2 })
          .map((heading) => heading.textContent),
      ).toEqual(SECTIONS.map(({ title }) => title));
    });
  });
});

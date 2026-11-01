import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { CONTACT_CTA_MESSAGES } from "../../shared/ContactCta/ContactCta.constants";
import Portfolio from "./Portfolio";
import { PORTFOLIO_DESCRIPTION, PROJECTS } from "./Portfolio.constants";

describe("<Portfolio />", () => {
  describe("when rendered", () => {
    it("shows Portfolio as the only main heading", () => {
      render(<Portfolio />, { wrapper: MemoryRouter });

      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole("heading", { level: 1, name: "Portfolio" }),
      ).toBeInTheDocument();
    });

    it("shows the description", () => {
      render(<Portfolio />, { wrapper: MemoryRouter });

      expect(screen.getByText(PORTFOLIO_DESCRIPTION)).toBeInTheDocument();
    });

    it("shows every project as its own section, in order", () => {
      render(<Portfolio />, { wrapper: MemoryRouter });

      for (const { name } of PROJECTS) {
        expect(screen.getByRole("region", { name })).toBeInTheDocument();
      }
      expect(
        screen
          .getAllByRole("heading", { level: 2 })
          .map((heading) => heading.textContent),
      ).toEqual([
        ...PROJECTS.map(({ name }) => name),
        CONTACT_CTA_MESSAGES.title,
      ]);
    });

    it("invites the visitor to get in touch after the projects", () => {
      render(<Portfolio />, { wrapper: MemoryRouter });
      const regions = screen.getAllByRole("region");

      expect(regions.at(-1)).toHaveAccessibleName(CONTACT_CTA_MESSAGES.title);
    });

    it("shows the status and the tags of every project", () => {
      render(<Portfolio />, { wrapper: MemoryRouter });

      for (const { name, tags = [] } of PROJECTS) {
        const region = screen.getByRole("region", { name });

        for (const tag of tags) {
          expect(within(region).getByText(tag)).toBeInTheDocument();
        }
      }
      expect(screen.getByText("Live")).toBeInTheDocument();
      expect(screen.getByText("In progress")).toBeInTheDocument();
    });

    it("alternates the projects from side to side", () => {
      render(<Portfolio />, { wrapper: MemoryRouter });

      expect(
        screen
          .getAllByRole("region")
          .slice(0, PROJECTS.length)
          .map((region) =>
            region.parentElement?.parentElement?.classList.contains(
              "lg:flex-row-reverse",
            ),
          ),
      ).toEqual(PROJECTS.map((_, index) => index % 2 === 0));
    });

    it("shows the app icon of every project next to it", () => {
      render(<Portfolio />, { wrapper: MemoryRouter });

      for (const { name } of PROJECTS) {
        const icon = screen.getByRole("img", { name: `${name} app icon` });

        expect(
          screen.getByRole("region", { name }).parentElement?.parentElement,
        ).toContainElement(icon);
      }
    });
  });
});

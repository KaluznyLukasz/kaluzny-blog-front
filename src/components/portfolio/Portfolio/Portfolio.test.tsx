import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Portfolio from "./Portfolio";
import { PORTFOLIO_DESCRIPTION, PROJECTS } from "./Portfolio.constants";

describe("<Portfolio />", () => {
  describe("when rendered", () => {
    it("shows Portfolio as the only main heading", () => {
      render(<Portfolio />);

      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole("heading", { level: 1, name: "Portfolio" }),
      ).toBeInTheDocument();
    });

    it("shows the description", () => {
      render(<Portfolio />);

      expect(screen.getByText(PORTFOLIO_DESCRIPTION)).toBeInTheDocument();
    });

    it("shows every project as its own section, in order", () => {
      render(<Portfolio />);

      for (const { name } of PROJECTS) {
        expect(screen.getByRole("region", { name })).toBeInTheDocument();
      }
      expect(
        screen
          .getAllByRole("heading", { level: 2 })
          .map((heading) => heading.textContent),
      ).toEqual(PROJECTS.map(({ name }) => name));
    });

    it("alternates the projects from side to side", () => {
      render(<Portfolio />);

      expect(
        screen
          .getAllByRole("region")
          .map((region) =>
            region.parentElement?.parentElement?.classList.contains(
              "lg:flex-row-reverse",
            ),
          ),
      ).toEqual(PROJECTS.map((_, index) => index % 2 === 0));
    });

    it("shows the app icon of every project next to it", () => {
      render(<Portfolio />);

      for (const { name } of PROJECTS) {
        const icon = screen.getByRole("img", { name: `${name} app icon` });

        expect(
          screen.getByRole("region", { name }).parentElement?.parentElement,
        ).toContainElement(icon);
      }
    });
  });
});

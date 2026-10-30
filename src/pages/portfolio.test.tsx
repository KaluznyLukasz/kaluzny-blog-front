import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { PORTFOLIO_DESCRIPTION } from "../components/portfolio/Portfolio/Portfolio.constants";
import { SITE_NAME } from "../constants/common";
import PortfolioPage, { meta } from "./portfolio";

describe("the portfolio page", () => {
  describe("when it is described to the browser", () => {
    it("has a title with the name of the site", () => {
      expect(meta()).toContainEqual({ title: `Portfolio · ${SITE_NAME}` });
    });

    it("has a description", () => {
      expect(meta()).toContainEqual({
        name: "description",
        content: PORTFOLIO_DESCRIPTION,
      });
    });
  });

  describe("when it is shown", () => {
    it("shows the portfolio", () => {
      render(<PortfolioPage />, { wrapper: MemoryRouter });

      expect(
        screen.getByRole("heading", { level: 1, name: "Portfolio" }),
      ).toBeInTheDocument();
    });
  });
});

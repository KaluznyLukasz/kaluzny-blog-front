import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SITE_NAME } from "../constants/common";
import PortfolioPage, { meta } from "./portfolio";

describe("the portfolio page", () => {
  describe("when it is described to the browser", () => {
    it("has a title with the name of the site", () => {
      expect(meta()).toEqual([{ title: `Portfolio · ${SITE_NAME}` }]);
    });
  });

  describe("when it is shown", () => {
    it("shows the portfolio", () => {
      render(<PortfolioPage />);

      expect(
        screen.getByRole("heading", { level: 1, name: "Portfolio" }),
      ).toBeInTheDocument();
    });
  });
});

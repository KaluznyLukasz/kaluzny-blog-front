import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import NotFound from "./NotFound";
import { NOT_FOUND_MESSAGES } from "./NotFound.constants";

describe("<NotFound />", () => {
  describe("when rendered", () => {
    it("says that the page does not exist, as the main heading", () => {
      render(<NotFound />, { wrapper: MemoryRouter });

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: NOT_FOUND_MESSAGES.title,
        }),
      ).toBeInTheDocument();
    });

    it("explains what may have happened", () => {
      render(<NotFound />, { wrapper: MemoryRouter });

      expect(screen.getByText(NOT_FOUND_MESSAGES.hint)).toBeVisible();
    });

    it("offers the way back to the home page", () => {
      render(<NotFound />, { wrapper: MemoryRouter });

      expect(
        screen.getByRole("link", { name: NOT_FOUND_MESSAGES.home }),
      ).toHaveAttribute("href", "/");
    });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SITE_NAME } from "../../../constants/common";
import ErrorPage from "./ErrorPage";
import { ERROR_PAGE_MESSAGES } from "./ErrorPage.constants";

describe("<ErrorPage />", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("when rendered", () => {
    it("says that something went wrong, as the main heading", () => {
      render(<ErrorPage />, { wrapper: MemoryRouter });

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: ERROR_PAGE_MESSAGES.title,
        }),
      ).toBeInTheDocument();
    });

    it("names the browser tab after the error", () => {
      render(<ErrorPage />, { wrapper: MemoryRouter });

      expect(document.title).toBe(
        `${ERROR_PAGE_MESSAGES.title} · ${SITE_NAME}`,
      );
    });

    it("explains what the visitor can do", () => {
      render(<ErrorPage />, { wrapper: MemoryRouter });

      expect(screen.getByText(ERROR_PAGE_MESSAGES.hint)).toBeVisible();
    });

    it("offers the way back to the home page", () => {
      render(<ErrorPage />, { wrapper: MemoryRouter });

      expect(
        screen.getByRole("link", { name: ERROR_PAGE_MESSAGES.home }),
      ).toHaveAttribute("href", "/");
    });
  });

  describe("when the visitor chooses to reload the page", () => {
    it("loads the page again", () => {
      const reload = vi.fn();
      vi.stubGlobal("location", { ...window.location, reload });
      render(<ErrorPage />, { wrapper: MemoryRouter });

      fireEvent.click(
        screen.getByRole("button", { name: ERROR_PAGE_MESSAGES.reload }),
      );

      expect(reload).toHaveBeenCalledTimes(1);
    });
  });
});

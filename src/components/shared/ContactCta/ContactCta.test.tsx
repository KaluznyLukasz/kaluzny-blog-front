import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import ContactCta from "./ContactCta";
import { CONTACT_CTA_MESSAGES } from "./ContactCta.constants";

describe("<ContactCta />", () => {
  describe("when rendered", () => {
    it("shows an invitation as a section named after its heading", () => {
      render(<ContactCta />, { wrapper: MemoryRouter });

      expect(
        screen.getByRole("region", { name: CONTACT_CTA_MESSAGES.title }),
      ).toContainElement(
        screen.getByRole("heading", {
          level: 2,
          name: CONTACT_CTA_MESSAGES.title,
        }),
      );
    });

    it("explains why to get in touch", () => {
      render(<ContactCta />, { wrapper: MemoryRouter });

      expect(screen.getByText(CONTACT_CTA_MESSAGES.text)).toBeInTheDocument();
    });

    it("keeps the text solid white, readable across the whole gradient", () => {
      render(<ContactCta />, { wrapper: MemoryRouter });

      expect(screen.getByText(CONTACT_CTA_MESSAGES.text).className).not.toMatch(
        /text-white\//,
      );
    });

    it("shows a white focus outline on its link, visible on the gradient", () => {
      render(<ContactCta />, { wrapper: MemoryRouter });

      expect(
        screen.getByRole("link", { name: CONTACT_CTA_MESSAGES.action }),
      ).toHaveClass("focus-visible:outline-white");
    });

    it("links to the contact page", () => {
      render(<ContactCta />, { wrapper: MemoryRouter });

      expect(
        screen.getByRole("link", { name: CONTACT_CTA_MESSAGES.action }),
      ).toHaveAttribute("href", "/contact");
    });
  });
});

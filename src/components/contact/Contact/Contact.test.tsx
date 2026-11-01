import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CONTACTS } from "../../../constants/contacts";
import Contact from "./Contact";
import { CONTACT_DESCRIPTION, CONTACT_HINTS } from "./Contact.constants";

describe("<Contact />", () => {
  describe("when rendered", () => {
    it("shows the page title as the only main heading", () => {
      render(<Contact />);

      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole("heading", { level: 1, name: "Contact" }),
      ).toBeInTheDocument();
    });

    it("invites the visitor to pick a channel", () => {
      render(<Contact />);

      expect(screen.getByText(CONTACT_DESCRIPTION)).toBeInTheDocument();
    });

    it("shows a link for every contact, in order", () => {
      render(<Contact />);
      const list = screen.getByRole("list");

      expect(
        within(list)
          .getAllByRole("link")
          .map((link) => link.getAttribute("href")),
      ).toEqual(CONTACTS.map(({ href }) => href));
    });

    it("tells the visitor what every channel is good for", () => {
      render(<Contact />);

      for (const { label, kind } of CONTACTS) {
        expect(
          screen.getByRole("link", {
            name: `${label} ${CONTACT_HINTS[kind]}`,
          }),
        ).toBeInTheDocument();
      }
    });
  });
});

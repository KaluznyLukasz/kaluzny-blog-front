import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CONTACT_EMAIL, CONTACTS } from "../../../constants/contacts";
import Contact from "./Contact";
import {
  CONTACT_CHANNELS_TITLE,
  CONTACT_DESCRIPTION,
  CONTACT_HINTS,
} from "./Contact.constants";
import { CONTACT_FORM_MESSAGES } from "./ContactForm/ContactForm.constants";

describe("<Contact />", () => {
  describe("when rendered", () => {
    it("shows the page title as the only main heading", () => {
      render(<Contact />);

      expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
      expect(
        screen.getByRole("heading", { level: 1, name: "Contact" }),
      ).toBeInTheDocument();
    });

    it("invites the visitor to write", () => {
      render(<Contact />);

      expect(screen.getByText(CONTACT_DESCRIPTION)).toBeInTheDocument();
    });

    it("offers a message form and the email address", () => {
      render(<Contact />);

      expect(
        screen.getByRole("form", { name: CONTACT_FORM_MESSAGES.title }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: CONTACT_EMAIL }),
      ).toBeInTheDocument();
    });

    it("names the section with the other channels", () => {
      render(<Contact />);

      expect(
        screen.getByRole("heading", {
          level: 2,
          name: CONTACT_CHANNELS_TITLE,
        }),
      ).toBeInTheDocument();
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

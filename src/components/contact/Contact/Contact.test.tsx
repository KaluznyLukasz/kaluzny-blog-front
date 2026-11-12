import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CONTACT_EMAIL } from "../../../constants/contacts";
import Contact from "./Contact";
import { CONTACT_DESCRIPTION } from "./Contact.constants";
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
  });
});

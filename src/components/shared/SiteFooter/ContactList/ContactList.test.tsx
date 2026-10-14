import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactList from "./ContactList";
import type { Contact } from "./ContactList.types";

const CONTACTS: Contact[] = [
  { kind: "email", label: "Email", href: "mailto:hello@example.com" },
  { kind: "github", label: "GitHub", href: "https://github.com/example" },
  {
    kind: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/example",
  },
  {
    kind: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/example",
  },
  {
    kind: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/example",
  },
  { kind: "website", label: "Website", href: "https://example.com" },
];

describe("<ContactList />", () => {
  describe("when rendered with contacts", () => {
    it("shows a link to every contact, named for screen readers, in the given order", () => {
      render(<ContactList contacts={CONTACTS} />);

      expect(
        screen
          .getAllByRole("link")
          .map((link) => [link.textContent, link.getAttribute("href")]),
      ).toEqual(CONTACTS.map(({ label, href }) => [label, href]));
    });

    it("shows every contact as an icon hidden from assistive technologies", () => {
      render(<ContactList contacts={CONTACTS} />);

      for (const link of screen.getAllByRole("link")) {
        expect(link.querySelector("svg")).toHaveAttribute(
          "aria-hidden",
          "true",
        );
      }
    });

    it("keeps the name of every contact visually hidden", () => {
      render(<ContactList contacts={CONTACTS} />);

      expect(screen.getByText("GitHub")).toHaveClass("sr-only");
    });
  });
});

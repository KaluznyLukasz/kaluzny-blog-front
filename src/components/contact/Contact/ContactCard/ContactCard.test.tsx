import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ContactCard from "./ContactCard";

describe("<ContactCard />", () => {
  describe("when rendered for a contact", () => {
    it("shows one link to the contact, named after the label and the hint", () => {
      render(
        <ContactCard
          kind="github"
          label="GitHub"
          href="https://github.com/example"
          hint="Browse the code I write"
        />,
      );

      expect(
        screen.getByRole("link", {
          name: "GitHub Browse the code I write",
        }),
      ).toHaveAttribute("href", "https://github.com/example");
    });

    it("shows the label and the hint as text", () => {
      render(
        <ContactCard
          kind="github"
          label="GitHub"
          href="https://github.com/example"
          hint="Browse the code I write"
        />,
      );

      expect(screen.getByText("GitHub")).toBeVisible();
      expect(screen.getByText("Browse the code I write")).toBeVisible();
    });

    it("hides the decorative icons from screen readers", () => {
      const { container } = render(
        <ContactCard
          kind="email"
          label="Email"
          href="mailto:hello@example.com"
          hint="Write to me directly"
        />,
      );

      expect(
        container.querySelector(
          "svg:not([aria-hidden='true'], [aria-hidden='true'] svg)",
        ),
      ).toBeNull();
      expect(container.querySelectorAll("svg")).toHaveLength(2);
    });
  });
});

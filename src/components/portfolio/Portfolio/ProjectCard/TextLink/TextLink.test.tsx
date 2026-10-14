import { render, screen } from "@testing-library/react";
import { Mail } from "lucide-react";
import { describe, expect, it } from "vitest";
import TextLink from "./TextLink";

describe("<TextLink />", () => {
  describe("when rendered with a text and an address", () => {
    it("shows a link to that address", () => {
      render(<TextLink href="https://example.com">Example</TextLink>);

      expect(screen.getByRole("link", { name: "Example" })).toHaveAttribute(
        "href",
        "https://example.com",
      );
    });

    it("shows no icon", () => {
      const { container } = render(
        <TextLink href="https://example.com">Example</TextLink>,
      );

      expect(container.querySelector("svg")).not.toBeInTheDocument();
    });
  });

  describe("when rendered with an icon", () => {
    it("hides the icon from assistive technologies", () => {
      const { container } = render(
        <TextLink href="mailto:hello@example.com" LeftIcon={<Mail />}>
          hello@example.com
        </TextLink>,
      );

      expect(
        container.querySelector("svg")?.closest("[aria-hidden]"),
      ).toBeInTheDocument();
    });

    it("keeps only the text as the link name", () => {
      render(
        <TextLink href="mailto:hello@example.com" LeftIcon={<Mail />}>
          hello@example.com
        </TextLink>,
      );

      expect(
        screen.getByRole("link", { name: "hello@example.com" }),
      ).toBeInTheDocument();
    });
  });
});

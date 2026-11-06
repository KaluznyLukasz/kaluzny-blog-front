import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CONTACT_EMAIL } from "../../../../constants/contacts";
import { PROFILE } from "../../../about-me/AboutMe/AboutMe.constants";
import DirectContact from "./DirectContact";
import { DIRECT_CONTACT_MESSAGES } from "./DirectContact.constants";

describe("<DirectContact />", () => {
  describe("when rendered", () => {
    it("is a section named after its heading", () => {
      render(<DirectContact />);

      expect(
        screen.getByRole("region", { name: DIRECT_CONTACT_MESSAGES.title }),
      ).toBeInTheDocument();
    });

    it("shows who the visitor is writing to", () => {
      render(<DirectContact />);

      expect(screen.getByText(PROFILE.name)).toBeInTheDocument();
      expect(screen.getByText(PROFILE.role)).toBeInTheDocument();
      expect(
        screen.getByText(DIRECT_CONTACT_MESSAGES.location),
      ).toBeInTheDocument();
    });

    it("links to the email address", () => {
      render(<DirectContact />);

      expect(screen.getByRole("link", { name: CONTACT_EMAIL })).toHaveAttribute(
        "href",
        `mailto:${CONTACT_EMAIL}`,
      );
    });

    it("offers to copy the email address", () => {
      render(<DirectContact />);

      expect(
        screen.getByRole("button", { name: "Copy email" }),
      ).toBeInTheDocument();
    });
  });
});

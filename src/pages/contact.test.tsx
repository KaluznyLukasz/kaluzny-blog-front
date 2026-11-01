import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CONTACT_DESCRIPTION } from "../components/contact/Contact/Contact.constants";
import { SITE_NAME } from "../constants/common";
import ContactPage, { meta } from "./contact";

describe("the contact page", () => {
  describe("when it is described to the browser", () => {
    it("has a title with the name of the site", () => {
      expect(meta()).toContainEqual({ title: `Contact · ${SITE_NAME}` });
    });

    it("has a description", () => {
      expect(meta()).toContainEqual({
        name: "description",
        content: CONTACT_DESCRIPTION,
      });
    });
  });

  describe("when it is shown", () => {
    it("shows the contact options", () => {
      render(<ContactPage />);

      expect(
        screen.getByRole("heading", { level: 1, name: "Contact" }),
      ).toBeInTheDocument();
    });
  });
});

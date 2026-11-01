import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { PRIVACY_POLICY_DESCRIPTION } from "../components/legal/PrivacyPolicy/PrivacyPolicy.constants";
import { SITE_NAME } from "../constants/common";
import PrivacyPage, { meta } from "./privacy";

describe("the privacy policy page", () => {
  describe("when it is described to the browser", () => {
    it("has a title with the name of the site", () => {
      expect(meta()).toContainEqual({
        title: `Privacy policy · ${SITE_NAME}`,
      });
    });

    it("has a description", () => {
      expect(meta()).toContainEqual({
        name: "description",
        content: PRIVACY_POLICY_DESCRIPTION,
      });
    });
  });

  describe("when it is shown", () => {
    it("shows the privacy policy", () => {
      render(<PrivacyPage />, { wrapper: MemoryRouter });

      expect(
        screen.getByRole("heading", { level: 1, name: "Privacy policy" }),
      ).toBeInTheDocument();
    });
  });
});

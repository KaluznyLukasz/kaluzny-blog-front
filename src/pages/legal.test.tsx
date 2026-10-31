import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import { LEGAL_NOTICE_DESCRIPTION } from "../components/legal/LegalNotice/LegalNotice.constants";
import { SITE_NAME } from "../constants/common";
import LegalPage, { meta } from "./legal";

describe("the legal notice page", () => {
  describe("when it is described to the browser", () => {
    it("has a title with the name of the site", () => {
      expect(meta()).toContainEqual({ title: `Legal notice · ${SITE_NAME}` });
    });

    it("has a description", () => {
      expect(meta()).toContainEqual({
        name: "description",
        content: LEGAL_NOTICE_DESCRIPTION,
      });
    });
  });

  describe("when it is shown", () => {
    it("shows the legal notice", () => {
      render(<LegalPage />, { wrapper: MemoryRouter });

      expect(
        screen.getByRole("heading", { level: 1, name: "Legal notice" }),
      ).toBeInTheDocument();
    });
  });
});

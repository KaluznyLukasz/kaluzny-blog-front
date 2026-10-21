import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PROFILE } from "../components/about-me/AboutMe/AboutMe.constants";
import Index from "./_index";

describe("the about me page", () => {
  describe("when it is shown", () => {
    it("shows my name as the main heading", () => {
      render(<Index />);

      expect(
        screen.getByRole("heading", { level: 1, name: PROFILE.name }),
      ).toBeInTheDocument();
    });
  });
});

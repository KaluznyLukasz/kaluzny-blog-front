import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PROJECT_STATUS } from "../ProjectCard.constants";
import ProjectStatusBadge from "./ProjectStatusBadge";

describe("<ProjectStatusBadge />", () => {
  describe("when the project is live", () => {
    it("says so", () => {
      render(<ProjectStatusBadge status="live" />);

      expect(screen.getByText(PROJECT_STATUS.live.label)).toBeInTheDocument();
    });
  });

  describe("when the project is still in progress", () => {
    it("says so", () => {
      render(<ProjectStatusBadge status="in-progress" />);

      expect(
        screen.getByText(PROJECT_STATUS["in-progress"].label),
      ).toBeInTheDocument();
    });
  });
});

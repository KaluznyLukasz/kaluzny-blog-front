import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatusBadge from "./StatusBadge";
import { STATUS_BADGE_CLASSES } from "./StatusBadge.constants";

describe("<StatusBadge />", () => {
  describe("when rendered with a label", () => {
    it("shows the label", () => {
      render(<StatusBadge type="success">Done</StatusBadge>);

      expect(screen.getByText("Done")).toBeInTheDocument();
    });
  });

  describe("when rendered as a success or an info", () => {
    it.each([
      ["success", "Done"],
      ["info", "In progress"],
    ] as const)("uses a text colour dark enough to read on its tinted background (%s)", (type, label) => {
      const { container } = render(
        <StatusBadge type={type}>{label}</StatusBadge>,
      );

      expect(
        container.getElementsByClassName(STATUS_BADGE_CLASSES[type]),
      ).toHaveLength(1);
    });
  });

  describe("when rendered as a default", () => {
    it("keeps the text colour of the design system", () => {
      const { container } = render(
        <StatusBadge type="default">Up next</StatusBadge>,
      );

      expect(container.querySelector("[class*='-hover']")).toBeNull();
    });
  });
});

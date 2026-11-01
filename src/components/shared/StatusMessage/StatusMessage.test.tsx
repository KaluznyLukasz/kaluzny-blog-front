import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StatusMessage from "./StatusMessage";
import { STATUS_MESSAGE_CLASSES } from "./StatusMessage.constants";

describe("<StatusMessage />", () => {
  describe("when rendered as a status", () => {
    it("shows the message in a status region", () => {
      render(
        <StatusMessage variant="info" role="status">
          Nothing here yet
        </StatusMessage>,
      );

      expect(screen.getByRole("status")).toHaveTextContent("Nothing here yet");
    });
  });

  describe("when rendered as an alert", () => {
    it("shows the message in an alert", () => {
      render(
        <StatusMessage variant="error" role="alert">
          Something broke
        </StatusMessage>,
      );

      expect(screen.getByRole("alert")).toHaveTextContent("Something broke");
    });
  });

  describe.each([
    ["info", "status"],
    ["error", "alert"],
  ] as const)("when rendered as %s", (variant, role) => {
    it("uses text dark and large enough to read on a white background", () => {
      render(
        <StatusMessage variant={variant} role={role}>
          Message
        </StatusMessage>,
      );

      expect(screen.getByRole(role)).toHaveClass(
        ...STATUS_MESSAGE_CLASSES[variant].split(" "),
      );
    });

    it("hides the icon from screen readers", () => {
      render(
        <StatusMessage variant={variant} role={role}>
          Message
        </StatusMessage>,
      );

      expect(screen.getByRole(role).querySelector("svg")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });
  });
});

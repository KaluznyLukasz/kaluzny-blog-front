import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RetryMessage from "./RetryMessage";

const MESSAGE = "Sorry, this could not be loaded.";
const RETRY_LABEL = "Try again";

describe("<RetryMessage />", () => {
  describe("when rendered", () => {
    it("shows the message as an alert", () => {
      render(
        <RetryMessage
          message={MESSAGE}
          retryLabel={RETRY_LABEL}
          onRetry={vi.fn()}
        />,
      );

      expect(screen.getByRole("alert")).toHaveTextContent(MESSAGE);
    });

    it("offers a button to try again", () => {
      render(
        <RetryMessage
          message={MESSAGE}
          retryLabel={RETRY_LABEL}
          onRetry={vi.fn()}
        />,
      );

      expect(screen.getByRole("button", { name: RETRY_LABEL })).toBeEnabled();
    });
  });

  describe("when the visitor presses the button", () => {
    it("asks to try again once", () => {
      const handleRetry = vi.fn();
      render(
        <RetryMessage
          message={MESSAGE}
          retryLabel={RETRY_LABEL}
          onRetry={handleRetry}
        />,
      );

      fireEvent.click(screen.getByRole("button", { name: RETRY_LABEL }));

      expect(handleRetry).toHaveBeenCalledTimes(1);
    });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MAIN_CONTENT_ID } from "../PageLayout/PageLayout.constants";
import { STATUS_MESSAGE_CLASSES } from "../StatusMessage/StatusMessage.constants";
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

    it("moves focus to the main content, as the button goes away while loading", () => {
      render(
        <main id={MAIN_CONTENT_ID} tabIndex={-1}>
          <RetryMessage
            message={MESSAGE}
            retryLabel={RETRY_LABEL}
            onRetry={vi.fn()}
          />
        </main>,
      );
      const button = screen.getByRole("button", { name: RETRY_LABEL });

      button.focus();
      fireEvent.click(button);

      expect(screen.getByRole("main")).toHaveFocus();
    });
  });

  describe("when rendered with an error", () => {
    it("uses text dark enough to read", () => {
      render(
        <RetryMessage
          message={MESSAGE}
          retryLabel={RETRY_LABEL}
          onRetry={vi.fn()}
        />,
      );

      expect(screen.getByRole("alert")).toHaveClass(
        ...STATUS_MESSAGE_CLASSES.error.split(" "),
      );
    });
  });
});

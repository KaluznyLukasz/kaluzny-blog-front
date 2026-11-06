import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { COPY_FEEDBACK_MS } from "../../../../utils/useCopyToClipboard";
import CopyLinkButton from "./CopyLinkButton";
import { COPY_STATUS } from "./CopyLinkButton.constants";

const stubClipboard = (writeText: () => Promise<void>) =>
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });

const announcement = () =>
  document.querySelector<HTMLElement>("[aria-live='polite']");

const press = async () => {
  await act(async () => {
    fireEvent.click(screen.getByRole("button"));
  });
};

describe("<CopyLinkButton />", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    Reflect.deleteProperty(navigator, "clipboard");
  });

  describe("when rendered", () => {
    it("offers to copy the link", () => {
      render(<CopyLinkButton />);

      expect(
        screen.getByRole("button", { name: COPY_STATUS.idle.label }),
      ).toBeInTheDocument();
    });

    it("has nothing to announce yet, outside the button", () => {
      render(<CopyLinkButton />);

      expect(announcement()).toBeEmptyDOMElement();
      expect(screen.getByRole("button")).not.toContainElement(announcement());
    });
  });

  describe("when the visitor presses it", () => {
    it("copies the address of the page", async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      stubClipboard(writeText);
      render(<CopyLinkButton />);

      await press();

      expect(writeText).toHaveBeenCalledWith(window.location.href);
    });

    it("confirms it on the button", async () => {
      stubClipboard(vi.fn().mockResolvedValue(undefined));
      render(<CopyLinkButton />);

      await press();

      expect(
        screen.getByRole("button", { name: COPY_STATUS.copied.label }),
      ).toBeInTheDocument();
    });

    it("confirms it, in a way screen readers announce", async () => {
      stubClipboard(vi.fn().mockResolvedValue(undefined));
      render(<CopyLinkButton />);

      await press();

      expect(announcement()).toHaveTextContent(COPY_STATUS.copied.label);
    });

    it("does not announce the label switching back", async () => {
      stubClipboard(vi.fn().mockResolvedValue(undefined));
      render(<CopyLinkButton />);

      await press();
      act(() => {
        vi.advanceTimersByTime(COPY_FEEDBACK_MS);
      });

      expect(announcement()).toBeEmptyDOMElement();
    });

    it("offers to copy again after a moment", async () => {
      stubClipboard(vi.fn().mockResolvedValue(undefined));
      render(<CopyLinkButton />);

      await press();
      act(() => {
        vi.advanceTimersByTime(COPY_FEEDBACK_MS);
      });

      expect(
        screen.getByRole("button", { name: COPY_STATUS.idle.label }),
      ).toBeInTheDocument();
    });

    it("starts the moment over when it is pressed again", async () => {
      stubClipboard(vi.fn().mockResolvedValue(undefined));
      render(<CopyLinkButton />);

      await press();
      act(() => {
        vi.advanceTimersByTime(COPY_FEEDBACK_MS - 100);
      });
      await press();
      act(() => {
        vi.advanceTimersByTime(COPY_FEEDBACK_MS - 100);
      });

      expect(
        screen.getByRole("button", { name: COPY_STATUS.copied.label }),
      ).toBeInTheDocument();
    });
  });

  describe("when the browser refuses to copy", () => {
    it("says so", async () => {
      stubClipboard(vi.fn().mockRejectedValue(new Error("denied")));
      render(<CopyLinkButton />);

      await press();

      expect(
        screen.getByRole("button", { name: COPY_STATUS.failed.label }),
      ).toBeInTheDocument();
      expect(announcement()).toHaveTextContent(COPY_STATUS.failed.label);
    });
  });

  describe("when the browser cannot copy at all", () => {
    it("says so instead of breaking", async () => {
      render(<CopyLinkButton />);

      await press();

      expect(
        screen.getByRole("button", { name: COPY_STATUS.failed.label }),
      ).toBeInTheDocument();
      expect(announcement()).toHaveTextContent(COPY_STATUS.failed.label);
    });
  });

  describe("when it is removed before the moment is over", () => {
    it("leaves nothing running behind", async () => {
      stubClipboard(vi.fn().mockResolvedValue(undefined));
      const { unmount } = render(<CopyLinkButton />);

      await press();
      unmount();

      expect(vi.getTimerCount()).toBe(0);
    });
  });
});

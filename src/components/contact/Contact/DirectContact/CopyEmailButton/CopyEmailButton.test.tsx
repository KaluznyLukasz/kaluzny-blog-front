import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CONTACT_EMAIL } from "../../../../../constants/contacts";
import CopyEmailButton from "./CopyEmailButton";
import { COPY_EMAIL_STATUS } from "./CopyEmailButton.constants";

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

describe("<CopyEmailButton />", () => {
  afterEach(() => {
    Reflect.deleteProperty(navigator, "clipboard");
  });

  describe("when rendered", () => {
    it("offers to copy the address, with nothing to announce yet", () => {
      render(<CopyEmailButton />);

      expect(
        screen.getByRole("button", { name: COPY_EMAIL_STATUS.idle.label }),
      ).toBeInTheDocument();
      expect(announcement()).toBeEmptyDOMElement();
    });
  });

  describe("when the visitor presses it", () => {
    it("copies the email address", async () => {
      const writeText = vi.fn().mockResolvedValue(undefined);
      stubClipboard(writeText);
      render(<CopyEmailButton />);

      await press();

      expect(writeText).toHaveBeenCalledWith(CONTACT_EMAIL);
    });

    it("confirms it on the button and to screen readers", async () => {
      stubClipboard(vi.fn().mockResolvedValue(undefined));
      render(<CopyEmailButton />);

      await press();

      expect(
        screen.getByRole("button", { name: COPY_EMAIL_STATUS.copied.label }),
      ).toBeInTheDocument();
      expect(announcement()).toHaveTextContent(COPY_EMAIL_STATUS.copied.label);
    });
  });

  describe("when the browser refuses to copy", () => {
    it("says so", async () => {
      stubClipboard(vi.fn().mockRejectedValue(new Error("denied")));
      render(<CopyEmailButton />);

      await press();

      expect(
        screen.getByRole("button", { name: COPY_EMAIL_STATUS.failed.label }),
      ).toBeInTheDocument();
    });
  });
});

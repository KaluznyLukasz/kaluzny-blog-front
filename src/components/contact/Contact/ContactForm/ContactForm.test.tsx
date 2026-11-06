import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PRIVACY_PATH } from "../../../../constants/common";
import ContactForm from "./ContactForm";
import {
  CONTACT_FORM_MESSAGES,
  CONTACT_TOPICS,
  MESSAGE_MAX_LENGTH,
} from "./ContactForm.constants";
import { buildMailtoHref } from "./utils/buildMailtoHref";
import { openMailApp } from "./utils/openMailApp";

vi.mock("./utils/openMailApp", () => ({ openMailApp: vi.fn() }));

const nameField = () =>
  screen.getByRole("textbox", {
    name: new RegExp(CONTACT_FORM_MESSAGES.name),
  });

const messageField = () =>
  screen.getByRole("textbox", { name: CONTACT_FORM_MESSAGES.message });

const type = (field: HTMLElement, value: string) =>
  fireEvent.change(field, { target: { value } });

const submit = () =>
  fireEvent.click(
    screen.getByRole("button", { name: CONTACT_FORM_MESSAGES.submit }),
  );

describe("<ContactForm />", () => {
  beforeEach(() => {
    vi.mocked(openMailApp).mockClear();
  });

  describe("when rendered", () => {
    it("is a form named after its heading", () => {
      render(<ContactForm />);

      expect(
        screen.getByRole("form", { name: CONTACT_FORM_MESSAGES.title }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          level: 2,
          name: CONTACT_FORM_MESSAGES.title,
        }),
      ).toBeInTheDocument();
    });

    it("asks for a name and a message", () => {
      render(<ContactForm />);

      expect(nameField()).toBeRequired();
      expect(messageField()).toBeRequired();
    });

    it("offers the topics, with none picked", () => {
      render(<ContactForm />);

      for (const topic of CONTACT_TOPICS) {
        expect(screen.getByRole("radio", { name: topic })).not.toBeChecked();
      }
      expect(
        screen.getByRole("group", { name: CONTACT_FORM_MESSAGES.topic }),
      ).toBeInTheDocument();
    });

    it("limits the length of the message", () => {
      render(<ContactForm />);

      expect(messageField()).toHaveAttribute(
        "maxlength",
        String(MESSAGE_MAX_LENGTH),
      );
    });

    it("says where the message goes before it is sent", () => {
      render(<ContactForm />);

      expect(screen.getByRole("status")).toHaveTextContent(
        CONTACT_FORM_MESSAGES.note,
      );
    });

    it("links to the privacy policy in a new tab, so nothing typed is lost", () => {
      render(<ContactForm />);
      const link = screen.getByRole("link", {
        name: new RegExp(CONTACT_FORM_MESSAGES.privacyLink),
      });

      expect(link).toHaveTextContent(CONTACT_FORM_MESSAGES.newTab);
      expect(link).toHaveAttribute("href", PRIVACY_PATH);
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  describe("when the visitor types a message", () => {
    it("shows how much of the limit is used", () => {
      render(<ContactForm />);

      type(messageField(), "Hello there");

      expect(screen.getByText(`11/${MESSAGE_MAX_LENGTH}`)).toBeInTheDocument();
    });
  });

  describe("when the visitor picks a topic", () => {
    it("selects only that topic", () => {
      render(<ContactForm />);
      const [first, second] = CONTACT_TOPICS;

      fireEvent.click(screen.getByRole("radio", { name: first }));
      fireEvent.click(screen.getByRole("radio", { name: second }));

      expect(screen.getByRole("radio", { name: first })).not.toBeChecked();
      expect(screen.getByRole("radio", { name: second })).toBeChecked();
    });
  });

  describe("when the visitor submits a filled form", () => {
    it("opens the email app with what they wrote", () => {
      render(<ContactForm />);
      const [topic] = CONTACT_TOPICS;

      type(nameField(), "Anna");
      fireEvent.click(screen.getByRole("radio", { name: topic }));
      type(messageField(), "Hello there");
      submit();

      expect(openMailApp).toHaveBeenCalledExactlyOnceWith(
        buildMailtoHref({ name: "Anna", topic, message: "Hello there" }),
      );
    });

    it("tells them what to do if nothing happened", () => {
      render(<ContactForm />);

      type(nameField(), "Anna");
      type(messageField(), "Hello there");
      submit();

      expect(screen.getByRole("status")).toHaveTextContent(
        CONTACT_FORM_MESSAGES.handedOff,
      );
    });

    it("keeps what they wrote, in case the email app did not open", () => {
      render(<ContactForm />);

      type(nameField(), "Anna");
      type(messageField(), "Hello there");
      submit();

      expect(nameField()).toHaveValue("Anna");
      expect(messageField()).toHaveValue("Hello there");
    });
  });

  describe("when the visitor submits it without a message", () => {
    it("does not open the email app", () => {
      render(<ContactForm />);

      type(nameField(), "Anna");
      submit();

      expect(openMailApp).not.toHaveBeenCalled();
    });
  });

  describe("when the visitor submits it without a name", () => {
    it("does not open the email app", () => {
      render(<ContactForm />);

      type(messageField(), "Hello there");
      submit();

      expect(openMailApp).not.toHaveBeenCalled();
    });
  });
});

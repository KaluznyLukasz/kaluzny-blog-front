import { describe, expect, it } from "vitest";
import { CONTACT_EMAIL } from "../../../../../constants/contacts";
import { buildMailtoHref } from "./buildMailtoHref";

const parse = (href: string) => {
  const url = new URL(href);

  return {
    protocol: url.protocol,
    address: url.pathname,
    subject: url.searchParams.get("subject"),
    body: url.searchParams.get("body"),
  };
};

describe("buildMailtoHref", () => {
  describe("when the visitor picked a topic", () => {
    it("addresses the email to me, with the topic and the name as the subject", () => {
      const email = parse(
        buildMailtoHref({ name: "Anna", topic: "App idea", message: "Hello" }),
      );

      expect(email.protocol).toBe("mailto:");
      expect(email.address).toBe(CONTACT_EMAIL);
      expect(email.subject).toBe("App idea from Anna");
    });
  });

  describe("when the visitor did not pick a topic", () => {
    it("uses a general subject with the name", () => {
      const email = parse(
        buildMailtoHref({ name: "Anna", topic: "", message: "Hello" }),
      );

      expect(email.subject).toBe("Message from Anna");
    });
  });

  describe("when the message is written", () => {
    it("signs it with the name of the visitor", () => {
      const email = parse(
        buildMailtoHref({ name: "Anna", topic: "", message: "Hello" }),
      );

      expect(email.body).toBe("Hello\r\n\r\nAnna");
    });

    it("keeps its line breaks, as CRLF", () => {
      const href = buildMailtoHref({
        name: "Anna",
        topic: "",
        message: "One\nTwo\r\nThree",
      });

      expect(parse(href).body).toBe("One\r\nTwo\r\nThree\r\n\r\nAnna");
    });

    it("cannot break out of the link with special characters", () => {
      const href = buildMailtoHref({
        name: "Łukasz & co",
        topic: "",
        message: "50% off?&bcc=someone@example.com#ą",
      });

      expect(parse(href).body).toBe(
        "50% off?&bcc=someone@example.com#ą\r\n\r\nŁukasz & co",
      );
      expect(parse(href).subject).toBe("Message from Łukasz & co");
      expect(new URL(href).searchParams.has("bcc")).toBe(false);
    });
  });
});

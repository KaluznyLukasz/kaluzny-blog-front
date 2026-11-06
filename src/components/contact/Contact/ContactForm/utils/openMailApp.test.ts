import { afterEach, describe, expect, it, vi } from "vitest";
import { openMailApp } from "./openMailApp";

const MAILTO_HREF = "mailto:hello@example.com?subject=Hello";

describe("openMailApp", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("when given a mailto link", () => {
    it("sends the browser to it, which opens the email app", () => {
      vi.stubGlobal("location", { href: "/contact" });

      openMailApp(MAILTO_HREF);

      expect(window.location.href).toBe(MAILTO_HREF);
    });
  });
});

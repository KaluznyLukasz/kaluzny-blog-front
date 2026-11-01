import { afterEach, describe, expect, it } from "vitest";
import { MAIN_CONTENT_ID } from "../PageLayout.constants";
import { focusMainContent } from "./focusMainContent";

describe("focusMainContent", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("when the page has main content", () => {
    it("moves focus to it", () => {
      document.body.innerHTML = `<main id="${MAIN_CONTENT_ID}" tabindex="-1"></main>`;

      focusMainContent();

      expect(document.activeElement).toBe(
        document.getElementById(MAIN_CONTENT_ID),
      );
    });
  });

  describe("when the page has no main content", () => {
    it("leaves focus where it is", () => {
      document.body.innerHTML = "<button>Stay</button>";
      document.querySelector("button")?.focus();

      focusMainContent();

      expect(document.activeElement).toBe(document.querySelector("button"));
    });
  });
});

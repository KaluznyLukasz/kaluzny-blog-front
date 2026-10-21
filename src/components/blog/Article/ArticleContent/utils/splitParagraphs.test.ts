import { describe, expect, it } from "vitest";
import { splitParagraphs } from "./splitParagraphs";

describe("splitParagraphs", () => {
  describe("when the content is one paragraph", () => {
    it("returns it as the only paragraph", () => {
      expect(splitParagraphs("Just one paragraph.")).toEqual([
        "Just one paragraph.",
      ]);
    });
  });

  describe("when the content has several paragraphs", () => {
    it("returns each paragraph, in order", () => {
      expect(splitParagraphs("First.\n\nSecond.\nThird.")).toEqual([
        "First.",
        "Second.",
        "Third.",
      ]);
    });

    it("understands Windows line endings", () => {
      expect(splitParagraphs("First.\r\n\r\nSecond.")).toEqual([
        "First.",
        "Second.",
      ]);
    });
  });

  describe("when there are empty lines and spaces around the text", () => {
    it("leaves no empty paragraphs and trims the rest", () => {
      expect(splitParagraphs("\n\n  First.  \n   \n\n Second. \n")).toEqual([
        "First.",
        "Second.",
      ]);
    });
  });

  describe("when the content is empty", () => {
    it.each(["", "   ", "\n\n"])("returns no paragraphs for %j", (content) => {
      expect(splitParagraphs(content)).toEqual([]);
    });
  });

  describe("when the content has HTML", () => {
    it("keeps it as plain text, untouched", () => {
      expect(splitParagraphs("<script>alert(1)</script>\n<b>Bold</b>")).toEqual(
        ["<script>alert(1)</script>", "<b>Bold</b>"],
      );
    });
  });
});

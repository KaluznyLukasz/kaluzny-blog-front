import { describe, expect, it } from "vitest";
import { WORDS_PER_MINUTE } from "../ArticleContent.constants";
import { getReadingMinutes } from "./getReadingMinutes";

const words = (count: number) =>
  Array.from({ length: count }, () => "word").join(" ");

describe("getReadingMinutes", () => {
  describe("when the content is short", () => {
    it("takes one minute, however few the words", () => {
      expect(getReadingMinutes("One")).toBe(1);
      expect(getReadingMinutes(words(WORDS_PER_MINUTE))).toBe(1);
    });
  });

  describe("when the content is longer", () => {
    it("rounds up to the next full minute", () => {
      expect(getReadingMinutes(words(WORDS_PER_MINUTE + 1))).toBe(2);
      expect(getReadingMinutes(words(WORDS_PER_MINUTE * 3))).toBe(3);
    });

    it("counts words in every paragraph, however they are separated", () => {
      const content = `${words(WORDS_PER_MINUTE)}\n\n  ${words(WORDS_PER_MINUTE)}\r\n${words(1)}`;

      expect(getReadingMinutes(content)).toBe(3);
    });
  });

  describe("when there is nothing to read", () => {
    it.each(["", "   ", "\n\n"])("takes no time for %j", (content) => {
      expect(getReadingMinutes(content)).toBe(0);
    });
  });
});

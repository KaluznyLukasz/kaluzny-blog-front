import { describe, expect, it } from "vitest";
import { sortNewestFirst } from "./sortNewestFirst";

const article = (id: string, publishedAt: string) => ({
  id,
  title: `Article ${id}`,
  content: "Content",
  publishedAt,
});

const OLDEST = article("oldest", "2025-01-10T09:00:00.000Z");
const MIDDLE = article("middle", "2025-02-14T12:30:00.000Z");
const NEWEST = article("newest", "2025-04-02T08:15:00.000Z");

describe("sortNewestFirst", () => {
  describe("when the articles are in any order", () => {
    it("puts the newest article first", () => {
      expect(sortNewestFirst([MIDDLE, OLDEST, NEWEST])).toEqual([
        NEWEST,
        MIDDLE,
        OLDEST,
      ]);
    });

    it("leaves the original list as it was", () => {
      const articles = [OLDEST, NEWEST];

      sortNewestFirst(articles);

      expect(articles).toEqual([OLDEST, NEWEST]);
    });
  });

  describe("when the dates use different time zones", () => {
    it("compares the moments, not the text", () => {
      const earlier = article("earlier", "2025-03-20T18:30:00+02:00");
      const later = article("later", "2025-03-20T17:00:00.000Z");

      expect(sortNewestFirst([earlier, later])).toEqual([later, earlier]);
    });
  });

  describe("when two articles were published at the same moment", () => {
    it("keeps them in the order the API sent them", () => {
      const first = article("first", "2025-03-20T18:00:00.000Z");
      const second = article("second", "2025-03-20T18:00:00.000Z");

      expect(sortNewestFirst([OLDEST, first, second])).toEqual([
        first,
        second,
        OLDEST,
      ]);
    });
  });
});

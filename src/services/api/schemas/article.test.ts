import { describe, expect, it } from "vitest";
import { articleIdSchema, articleListSchema, articleSchema } from "./article";

const ARTICLE = {
  id: "5e1f0a2b-0001-4000-8000-000000000001",
  title: "Hello, world: why I started this blog",
  content: "I want a place to write down what I learn.",
  publishedAt: "2025-01-10T09:00:00.000Z",
};

describe("articleListSchema", () => {
  describe("when the answer is a list of articles", () => {
    it("accepts it", () => {
      expect(articleListSchema.parse([ARTICLE])).toEqual([ARTICLE]);
    });

    it("accepts a publication date with a time zone offset", () => {
      const article = { ...ARTICLE, publishedAt: "2025-01-10T10:00:00+01:00" };

      expect(articleListSchema.parse([article])).toEqual([article]);
    });

    it("leaves out fields it does not know", () => {
      expect(articleListSchema.parse([{ ...ARTICLE, author: "Me" }])).toEqual([
        ARTICLE,
      ]);
    });
  });

  describe("when the answer is an empty list", () => {
    it("accepts it", () => {
      expect(articleListSchema.parse([])).toEqual([]);
    });
  });

  describe("when one article in the list is broken", () => {
    it.each([
      ["has no title", { ...ARTICLE, title: undefined }],
      ["has an empty title", { ...ARTICLE, title: "" }],
      ["has no content", { ...ARTICLE, content: undefined }],
      ["has an ID that is not a UUID", { ...ARTICLE, id: "1" }],
      ["has a date that is not a date", { ...ARTICLE, publishedAt: "today" }],
      ["has a number as its title", { ...ARTICLE, title: 42 }],
    ])("rejects the whole list when it %s", (_, broken) => {
      expect(articleListSchema.safeParse([ARTICLE, broken]).success).toBe(
        false,
      );
    });
  });

  describe("when the answer is not a list", () => {
    it.each([
      ["an article", ARTICLE],
      ["null", null],
      ["an HTML page", "<!doctype html><html></html>"],
      ["an error", { statusCode: 500, message: "Internal server error" }],
    ])("rejects %s", (_, answer) => {
      expect(articleListSchema.safeParse(answer).success).toBe(false);
    });
  });
});

describe("articleSchema", () => {
  describe("when the answer is an article", () => {
    it("accepts it and leaves out fields it does not know", () => {
      expect(articleSchema.parse({ ...ARTICLE, author: "Me" })).toEqual(
        ARTICLE,
      );
    });

    it("keeps content with HTML as plain text", () => {
      const content = "<script>alert(1)</script> and <b>bold</b>";

      expect(articleSchema.parse({ ...ARTICLE, content }).content).toBe(
        content,
      );
    });
  });

  describe("when the answer is not an article", () => {
    it.each([
      ["a list of articles", [ARTICLE]],
      ["null", null],
      ["an article without a title", { ...ARTICLE, title: undefined }],
      ["an article with an ID that is not a UUID", { ...ARTICLE, id: "1" }],
      ["an error", { statusCode: 404, message: "Not found" }],
    ])("rejects %s", (_, answer) => {
      expect(articleSchema.safeParse(answer).success).toBe(false);
    });
  });
});

describe("articleIdSchema", () => {
  it("accepts a UUID", () => {
    expect(articleIdSchema.safeParse(ARTICLE.id).success).toBe(true);
  });

  it.each([
    ["a number", "123"],
    ["a word", "not-an-id"],
    ["an empty string", ""],
    ["a path", "../../etc/passwd"],
  ])("rejects %s", (_, id) => {
    expect(articleIdSchema.safeParse(id).success).toBe(false);
  });
});

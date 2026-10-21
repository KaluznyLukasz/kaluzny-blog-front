import { describe, expect, it } from "vitest";
import { getArticlePath } from "./getArticlePath";

describe("getArticlePath", () => {
  describe("when given an article ID", () => {
    it("returns the address of the article page", () => {
      expect(getArticlePath("5e1f0a2b-0001-4000-8000-000000000001")).toBe(
        "/articles/5e1f0a2b-0001-4000-8000-000000000001",
      );
    });
  });

  describe("when the ID has characters that mean something in an address", () => {
    it("encodes them so the visitor stays on the article page", () => {
      expect(getArticlePath("../blog?x=1#top")).toBe(
        "/articles/..%2Fblog%3Fx%3D1%23top",
      );
    });
  });
});

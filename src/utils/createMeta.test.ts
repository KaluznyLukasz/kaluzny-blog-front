import { describe, expect, it } from "vitest";
import { SITE_NAME } from "../constants/common";
import { createMeta } from "./createMeta";

describe("createMeta", () => {
  describe("when given a title and a description", () => {
    const meta = createMeta("Blog · Site", "Stories about code.");

    it("sets the title and the description of the page", () => {
      expect(meta).toContainEqual({ title: "Blog · Site" });
      expect(meta).toContainEqual({
        name: "description",
        content: "Stories about code.",
      });
    });

    it("sets how the page looks when it is shared", () => {
      expect(meta).toEqual(
        expect.arrayContaining([
          { property: "og:type", content: "website" },
          { property: "og:site_name", content: SITE_NAME },
          { property: "og:title", content: "Blog · Site" },
          { property: "og:description", content: "Stories about code." },
          { name: "twitter:card", content: "summary" },
          { name: "twitter:title", content: "Blog · Site" },
          { name: "twitter:description", content: "Stories about code." },
        ]),
      );
    });
  });
});

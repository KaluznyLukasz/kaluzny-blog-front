import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDocumentTitle } from "./useDocumentTitle";

describe("useDocumentTitle", () => {
  describe("when used with a title", () => {
    it("sets it as the title of the document", () => {
      renderHook(() => useDocumentTitle("My article · Site"));

      expect(document.title).toBe("My article · Site");
    });
  });

  describe("when the title changes", () => {
    it("sets the new title", () => {
      const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
        initialProps: { title: "First · Site" },
      });

      rerender({ title: "Second · Site" });

      expect(document.title).toBe("Second · Site");
    });
  });
});

import { describe, expect, it } from "vitest";
import { ZodError, z } from "zod";
import { ApiError } from "./apiError";
import { parseResponse } from "./parseResponse";

const schema = z.object({ title: z.string() });

describe("parseResponse", () => {
  describe("when the answer matches the schema", () => {
    it("returns the checked data", () => {
      expect(parseResponse(schema, { title: "Hello", extra: true })).toEqual({
        title: "Hello",
      });
    });
  });

  describe("when the answer does not match the schema", () => {
    it("throws an ApiError that keeps what was wrong", () => {
      const parse = () => parseResponse(schema, { title: 42 });

      expect(parse).toThrow(ApiError);
      expect(parse).toThrow(
        expect.objectContaining({
          reason: "invalid-response",
          cause: expect.any(ZodError),
        }),
      );
    });
  });
});

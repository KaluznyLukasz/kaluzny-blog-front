import { AxiosError, AxiosHeaders, CanceledError } from "axios";
import { describe, expect, it } from "vitest";
import { ApiError, toApiError } from "./apiError";

const CONFIG = { headers: new AxiosHeaders() };

const answeredWith = (status: number) =>
  new AxiosError(
    `Request failed with status code ${status}`,
    AxiosError.ERR_BAD_RESPONSE,
    CONFIG,
    {},
    { data: {}, status, statusText: "", headers: {}, config: CONFIG },
  );

describe("ApiError", () => {
  describe("when it is created", () => {
    it("keeps the reason, the status and the original error", () => {
      const cause = new Error("original");

      const error = new ApiError("http", "Failed", { status: 404, cause });

      expect(error).toBeInstanceOf(Error);
      expect(error).toMatchObject({
        name: "ApiError",
        message: "Failed",
        reason: "http",
        status: 404,
        cause,
      });
    });

    it("has no status when none is given", () => {
      expect(new ApiError("network", "Failed").status).toBeUndefined();
    });
  });
});

describe("toApiError", () => {
  describe("when the error is already an ApiError", () => {
    it("returns it unchanged", () => {
      const error = new ApiError("invalid-response", "Broken answer");

      expect(toApiError(error)).toBe(error);
    });
  });

  describe("when the request was cancelled", () => {
    it("says it was cancelled", () => {
      expect(toApiError(new CanceledError())).toMatchObject({
        reason: "cancelled",
      });
    });
  });

  describe("when the API answered with an error status", () => {
    it.each([404, 500, 503])("keeps status %i", (status) => {
      const error = answeredWith(status);

      expect(toApiError(error)).toMatchObject({
        reason: "http",
        status,
        cause: error,
      });
    });
  });

  describe("when the API never answered", () => {
    it.each([
      AxiosError.ECONNABORTED,
      AxiosError.ETIMEDOUT,
    ])("treats %s as a timeout", (code) => {
      const error = new AxiosError("timeout of 10000ms exceeded", code);

      expect(toApiError(error)).toMatchObject({
        reason: "timeout",
        cause: error,
      });
    });
  });

  describe("when the API could not be reached", () => {
    it("says it is a network problem", () => {
      const error = new AxiosError("Network Error", AxiosError.ERR_NETWORK);

      expect(toApiError(error)).toMatchObject({
        reason: "network",
        cause: error,
      });
    });

    it("says it is a network problem when Axios gives no code", () => {
      expect(toApiError(new AxiosError("Network Error"))).toMatchObject({
        reason: "network",
      });
    });
  });

  describe("when something else went wrong", () => {
    it("wraps it as an unknown problem", () => {
      const error = new TypeError("Something broke");

      expect(toApiError(error)).toMatchObject({
        reason: "unknown",
        cause: error,
      });
    });
  });
});

import {
  type AxiosAdapter,
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { afterEach, describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { ApiError } from "../utils/apiError";
import { API_TIMEOUT, apiClient } from "./apiClient";
import { ARTICLES_PATH, getArticles } from "./getArticles";

const OLDER = {
  id: "5e1f0a2b-0001-4000-8000-000000000001",
  title: "Hello, world: why I started this blog",
  content: "I want a place to write down what I learn.",
  publishedAt: "2025-01-10T09:00:00.000Z",
};

const NEWER = {
  id: "5e1f0a2b-0002-4000-8000-000000000002",
  title: "My first month with Docker",
  content: "Everything in this project runs in containers.",
  publishedAt: "2025-02-14T12:30:00.000Z",
};

const defaultAdapter = apiClient.defaults.adapter;

const answerWith = (data: unknown) => {
  const adapter: AxiosAdapter = async (config) => ({
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config,
  });
  apiClient.defaults.adapter = adapter;
};

const failWith = (
  createError: (config: InternalAxiosRequestConfig) => AxiosError,
) => {
  const adapter: AxiosAdapter = async (config) => {
    throw createError(config);
  };
  apiClient.defaults.adapter = adapter;
};

describe("getArticles", () => {
  afterEach(() => {
    apiClient.defaults.adapter = defaultAdapter;
  });

  describe("when it is called", () => {
    it("asks the articles endpoint and passes the abort signal on", async () => {
      let requestedUrl = "";
      let requestedSignal: unknown;
      apiClient.defaults.adapter = async (config) => {
        requestedUrl = apiClient.getUri(config);
        requestedSignal = config.signal;
        return { data: [], status: 200, statusText: "OK", headers: {}, config };
      };
      const { signal } = new AbortController();

      await getArticles(signal);

      expect(requestedUrl).toBe(`http://localhost${ARTICLES_PATH}`);
      expect(requestedSignal).toBe(signal);
    });
  });

  describe("when the API answers with articles", () => {
    it("returns every article, newest first", async () => {
      answerWith([OLDER, NEWER]);

      await expect(getArticles()).resolves.toEqual([NEWER, OLDER]);
    });
  });

  describe("when the API answers with no articles", () => {
    it("returns an empty list", async () => {
      answerWith([]);

      await expect(getArticles()).resolves.toEqual([]);
    });
  });

  describe("when the answer does not match the schema", () => {
    it("fails instead of returning the articles that do match", async () => {
      answerWith([NEWER, { ...OLDER, publishedAt: "yesterday" }]);

      await expect(getArticles()).rejects.toBeInstanceOf(ApiError);
      await expect(getArticles()).rejects.toMatchObject({
        reason: "invalid-response",
        cause: expect.any(ZodError),
      });
    });

    it("fails when the answer is not a list at all", async () => {
      answerWith("<!doctype html><html></html>");

      await expect(getArticles()).rejects.toMatchObject({
        reason: "invalid-response",
      });
    });
  });

  describe("when the request fails", () => {
    it("fails with the status when the API answers with an error", async () => {
      failWith((config) => {
        const response = {
          data: { statusCode: 500, message: "Internal server error" },
          status: 500,
          statusText: "Internal Server Error",
          headers: {},
          config,
        };
        return new AxiosError(
          "Request failed with status code 500",
          AxiosError.ERR_BAD_RESPONSE,
          config,
          {},
          response,
        );
      });

      await expect(getArticles()).rejects.toMatchObject({
        name: "ApiError",
        reason: "http",
        status: 500,
      });
    });

    it("fails when the API is down", async () => {
      failWith(
        (config) =>
          new AxiosError("Network Error", AxiosError.ERR_NETWORK, config),
      );

      await expect(getArticles()).rejects.toMatchObject({
        name: "ApiError",
        reason: "network",
      });
    });

    it("fails when the API never answers", async () => {
      failWith(
        (config) =>
          new AxiosError(
            `timeout of ${API_TIMEOUT}ms exceeded`,
            AxiosError.ECONNABORTED,
            config,
          ),
      );

      await expect(getArticles()).rejects.toMatchObject({
        name: "ApiError",
        reason: "timeout",
      });
    });
  });
});

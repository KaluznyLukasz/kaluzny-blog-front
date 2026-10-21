import {
  type AxiosAdapter,
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { afterEach, describe, expect, it } from "vitest";
import { ZodError } from "zod";
import { ApiError } from "../utils/apiError";
import { API_TIMEOUT, apiClient } from "./apiClient";
import { getArticle } from "./getArticle";
import { ARTICLES_PATH } from "./getArticles";

const ARTICLE = {
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

const failWithStatus = (status: number) =>
  failWith((config) => {
    const response = {
      data: { statusCode: status, message: "Failed" },
      status,
      statusText: "Failed",
      headers: {},
      config,
    };
    return new AxiosError(
      `Request failed with status code ${status}`,
      AxiosError.ERR_BAD_REQUEST,
      config,
      {},
      response,
    );
  });

describe("getArticle", () => {
  afterEach(() => {
    apiClient.defaults.adapter = defaultAdapter;
  });

  describe("when it is called", () => {
    it("asks the endpoint of that article and passes the abort signal on", async () => {
      let requestedUrl = "";
      let requestedSignal: unknown;
      apiClient.defaults.adapter = async (config) => {
        requestedUrl = apiClient.getUri(config);
        requestedSignal = config.signal;
        return {
          data: ARTICLE,
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        };
      };
      const { signal } = new AbortController();

      await getArticle(ARTICLE.id, signal);

      expect(requestedUrl).toBe(
        `http://localhost${ARTICLES_PATH}/${ARTICLE.id}`,
      );
      expect(requestedSignal).toBe(signal);
    });

    it("never lets the ID change the path of the request", async () => {
      let requestedUrl = "";
      apiClient.defaults.adapter = async (config) => {
        requestedUrl = apiClient.getUri(config);
        return { data: {}, status: 200, statusText: "OK", headers: {}, config };
      };

      await getArticle("../status?x=1#top").catch(() => {});

      expect(requestedUrl).toBe(
        `http://localhost${ARTICLES_PATH}/..%2Fstatus%3Fx%3D1%23top`,
      );
    });
  });

  describe("when the API answers with the article", () => {
    it("returns it", async () => {
      answerWith(ARTICLE);

      await expect(getArticle(ARTICLE.id)).resolves.toEqual(ARTICLE);
    });

    it("returns content with HTML unchanged, as text", async () => {
      const content = "<script>alert(1)</script><b>bold</b>";
      answerWith({ ...ARTICLE, content });

      await expect(getArticle(ARTICLE.id)).resolves.toMatchObject({ content });
    });
  });

  describe("when the answer does not match the schema", () => {
    it.each([
      ["a date that is not a date", { ...ARTICLE, publishedAt: "yesterday" }],
      ["no title", { ...ARTICLE, title: undefined }],
      ["a list of articles", [ARTICLE]],
      ["an HTML page", "<!doctype html><html></html>"],
    ])("fails when it has %s", async (_, answer) => {
      answerWith(answer);

      await expect(getArticle(ARTICLE.id)).rejects.toBeInstanceOf(ApiError);
      await expect(getArticle(ARTICLE.id)).rejects.toMatchObject({
        reason: "invalid-response",
      });
    });

    it("keeps the Zod error as the cause", async () => {
      answerWith({ ...ARTICLE, title: "" });

      await expect(getArticle(ARTICLE.id)).rejects.toMatchObject({
        cause: expect.any(ZodError),
      });
    });
  });

  describe("when the request fails", () => {
    it.each([
      [404, "the article does not exist"],
      [400, "the ID is not valid"],
      [500, "the API answers with an error"],
    ])("fails with status %i when %s", async (status) => {
      failWithStatus(status);

      await expect(getArticle(ARTICLE.id)).rejects.toMatchObject({
        name: "ApiError",
        reason: "http",
        status,
      });
    });

    it("fails when the API is down", async () => {
      failWith(
        (config) =>
          new AxiosError("Network Error", AxiosError.ERR_NETWORK, config),
      );

      await expect(getArticle(ARTICLE.id)).rejects.toMatchObject({
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

      await expect(getArticle(ARTICLE.id)).rejects.toMatchObject({
        name: "ApiError",
        reason: "timeout",
      });
    });
  });
});

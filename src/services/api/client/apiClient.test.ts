import { type AxiosAdapter, AxiosError } from "axios";
import { afterEach, describe, expect, it, vi } from "vitest";

const loadApiClient = async () => {
  vi.resetModules();

  return import("./apiClient");
};

describe("apiClient", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe("when VITE_API_URL is set", () => {
    it("sends requests to that address", async () => {
      vi.stubEnv("VITE_API_URL", "https://api.example.com");

      const { apiClient } = await loadApiClient();

      expect(apiClient.defaults.baseURL).toBe("https://api.example.com");
    });
  });

  describe("when the project is run with its default settings", () => {
    it("sends requests to the local API", async () => {
      const { apiClient } = await loadApiClient();

      expect(apiClient.defaults.baseURL).toBe("http://localhost");
    });
  });

  describe("when the API never answers", () => {
    it("gives up after the timeout", async () => {
      const { apiClient, API_TIMEOUT } = await loadApiClient();

      expect(API_TIMEOUT).toBeGreaterThan(0);
      expect(apiClient.defaults.timeout).toBe(API_TIMEOUT);
    });
  });

  describe("when a request fails", () => {
    it("turns the Axios error into an ApiError", async () => {
      const { apiClient } = await loadApiClient();
      const networkError: AxiosAdapter = async (config) => {
        throw new AxiosError("Network Error", AxiosError.ERR_NETWORK, config);
      };

      const request = apiClient.get("/anything", { adapter: networkError });

      await expect(request).rejects.toMatchObject({
        name: "ApiError",
        reason: "network",
      });
    });
  });

  describe("when a request succeeds", () => {
    it("passes the answer through unchanged", async () => {
      const { apiClient } = await loadApiClient();
      const answer: AxiosAdapter = async (config) => ({
        data: { ok: true },
        status: 200,
        statusText: "OK",
        headers: {},
        config,
      });

      const { data } = await apiClient.get("/anything", { adapter: answer });

      expect(data).toEqual({ ok: true });
    });
  });
});

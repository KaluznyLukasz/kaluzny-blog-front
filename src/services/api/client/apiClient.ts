import axios from "axios";
import { toApiError } from "../utils/apiError";

export const API_TIMEOUT = 10_000;

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: API_TIMEOUT,
});

apiClient.interceptors.response.use(undefined, (error: unknown) =>
  Promise.reject(toApiError(error)),
);

import { AxiosError, isAxiosError, isCancel } from "axios";

export type ApiErrorReason =
  | "cancelled"
  | "timeout"
  | "network"
  | "http"
  | "invalid-response"
  | "unknown";

interface ApiErrorOptions {
  status?: number;
  cause?: unknown;
}

export class ApiError extends Error {
  readonly reason: ApiErrorReason;
  readonly status?: number;

  constructor(
    reason: ApiErrorReason,
    message: string,
    { status, cause }: ApiErrorOptions = {},
  ) {
    super(message, { cause });
    this.name = "ApiError";
    this.reason = reason;
    this.status = status;
  }
}

const TIMEOUT_CODES: string[] = [AxiosError.ECONNABORTED, AxiosError.ETIMEDOUT];

export const toApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    return error;
  }

  if (isCancel(error)) {
    return new ApiError("cancelled", "The request was cancelled", {
      cause: error,
    });
  }

  if (!isAxiosError(error)) {
    return new ApiError("unknown", "The request failed", { cause: error });
  }

  if (error.response) {
    const { status } = error.response;

    return new ApiError("http", `The API answered with status ${status}`, {
      status,
      cause: error,
    });
  }

  if (error.code && TIMEOUT_CODES.includes(error.code)) {
    return new ApiError("timeout", "The API did not answer in time", {
      cause: error,
    });
  }

  return new ApiError("network", "The API could not be reached", {
    cause: error,
  });
};

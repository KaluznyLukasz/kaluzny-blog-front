import type { StatusMessageVariant } from "./StatusMessage.types";

export const STATUS_MESSAGE_CLASSES: Record<StatusMessageVariant, string> = {
  info: "text-sm text-gi-blue-hover",
  error: "text-sm text-gi-red-hover",
};

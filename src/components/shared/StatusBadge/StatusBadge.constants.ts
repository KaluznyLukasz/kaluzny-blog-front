import type { StatusBadgeType } from "./StatusBadge.types";

export const STATUS_BADGE_CLASSES: Record<StatusBadgeType, string> = {
  success: "text-gi-green-hover",
  info: "text-gi-blue-hover",
  default: "",
};
